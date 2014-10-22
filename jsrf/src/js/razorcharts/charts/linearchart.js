define(['razorcharts/renderers/column', 
        'razorcharts/renderers/line', 
        'razorcharts/renderers/area', 
        'razorcharts/scales/scale', 
        'razorcharts/axes/axis', 
        'razorcharts/axes/grid', 
        'razorcharts/utils/graphutils', 
        'razorcharts/utils/tooltip',
        'vendor/lodash'], function (Column, Line, Area, Scale, Axis, Grid, graphUtils, Tooltip, _) {
    var LinearChart = function () {
        var self = this,
            options = {},
            stacked = false,
            xAxisGroup = null,
            yAxisGroup = null,
            xAxis = null,
            yAxis = {},
            container = null,
            core = null,
            series = null,
            charts = {},
            xScale = null,
            yScale = {},
            rightYScale = null,
            allData = [],
            dataByAxisType = {
                'left': [],
                'right': []
            },
            dataByChartType = {

            },
            stackedByChartType = {},
            paper = null,
            yAxisWidth = null,
            xAxisHeight = null,
            width = null,
            height = null,
            grid = null,
            dualAxis = false,
            eventManager = null,
            tooltip = new Tooltip();

        self.config = function (_options) {
            var chartSeriesByType = {},
                chartTypeKeys = [],
                i;
            options = _options;
            series = options.series,
            labels = options.labels;
            // stacked = _.reduce(series, function(item, mem) {
            //     return mem.stacked || item.stacked;
            // });
            var dataList = _.flatten(_.pluck(series, 'data'));
            chartTypeKeys = _.uniq(_.pluck(series, 'displayType'));
            var seriesIndex = 1;
            for(var c=-1; ++c<chartTypeKeys.length;) {
                var chartType = chartTypeKeys[c];
                var _series = _.where(series, {displayType: chartType});
                // debugger
                stackedByChartType[chartType] = _.reduce(_series, function(item, mem) {
                    return mem.stacked || (item && item.stacked);
                });
                chartSeriesByType[chartType] = _series;
                var _data = [];
                if(stackedByChartType[chartType]) {
                    for(i=-1; ++i<_series.length;) {
                        for(var j=-1; ++j<_series[i].data.length;) {
                            if(typeof _data[j] === 'undefined') {
                                 _data[j] = 0;
                             }
                            if(_data[j] < 0 && _series[i].data[j] > 0 || _data[j] > 0 && _series[i].data[j] < 0) {
                                _data.push(_series[i].data[j]);
                            }
                            _data[j] += _series[i].data[j];
                        }
                    }
                } else {
                    for(i=-1; ++i<_series.length;) {
                        _data = _data.concat(_series[i].data);
                    }
                }
                allData = allData.concat(_data);
                dataByChartType[chartType] = _data;
                for(var l=-1; ++l<_series.length;) {
                    var item = _series[l];
                    item.seriesIndex = (item.seriesIndex + 1) || seriesIndex++;
                    dataByAxisType[item.yAxis || 'left'] = dataByAxisType[item.yAxis || 'left'].concat(item.data);    
                }
                
            }

            dualAxis = options.dualAxis;
            eventManager = options.eventManager;
            
            var max = _.max(allData),
                min = _.min(dataList);
            
            xScale = new Scale.ordinal();
            xScale.domain(options.labels);
            if(options.dualAxis) {
                max = _.max(dataByAxisType['left']),
                min = _.min(dataByAxisType['left']);

                yScale['left'] = new Scale.linear();
                if(options.yAxis[0].minValue) {
                    var min = options.yAxis[0].minValue;
                    yScale['left'].domain([min, max]);
                } else {
                    yScale['left'].domain([min < 0 ? min : 0, max]);    
                }
                

                max = _.max(dataByAxisType['right']);
                min = _.min(dataByAxisType['right']);

                yScale['right'] = new Scale.linear();
                 if(options.yAxis[1].minValue) {
                    var min = options.yAxis[1].minValue;
                    yScale['right'].domain([min, max]);
                } else {
                    yScale['right'].domain([min < 0 ? min : 0, max]);    
                }
            } else {
                yScale = new Scale.linear();
                if(options.yAxis.minValue) {
                    var min = options.yAxis.minValue;
                    yScale.domain([min, max]);
                } else {
                    yScale.domain([min < 0 ? min : 0, max]);
                }
            }
                

            for(var key in chartSeriesByType) {
                if(chartSeriesByType.hasOwnProperty(key)) {
                    charts[key] = createChartByType(key);
                    charts[key].config({
                        yScale: yScale,
                        stacked: stackedByChartType[key],
                        series: chartSeriesByType[key],
                        dualAxis: !!options.dualAxis,
                        animateOnRender: !!options.animateOnRender,
                        eventManager: eventManager,
                        labels: labels,
                        tooltip: tooltip,
                        plotItemClasses: options.plotItemClasses
                    });
                }
            }

            if(options.dualAxis) {
                var lMin = _.min(dataByAxisType['left']) < 0 ? _.min(dataByAxisType['left']) : 0;
                var rMin = _.min(dataByAxisType['right']) < 0 ? _.min(dataByAxisType['right']) : 0;
                var domains = graphUtils.dualAxisDomain([lMin, _.max(dataByAxisType['left'])], [rMin, _.max(dataByAxisType['right'])]);
                if(options.yAxis[0].minValue || options.yAxis[0].maxValue || options.yAxis[1].minValue || options.yAxis[1].maxValue) {
                    if(options.yAxis[0].numTicks !== options.yAxis[1].numTicks) {
                        throw "numTicks for both axes should be same";
                    }                    

                    var min = options.yAxis[0].minValue || 0;
                    var max = options.yAxis[0].maxValue || _.max(dataByAxisType['left']);
                    var numTicks = options.yAxis[0].numTicks - 1 || 5;
                    var unit = (max - min) / numTicks;
                    for(var i=-1; ++i<numTicks + 1;) {
                        domains['lDomain'].ticks[i] = (min + unit * i);
                    }

                    min = options.yAxis[1].minValue || 0;
                    max = options.yAxis[1].maxValue || _.max(dataByAxisType['left']);
                    numTicks = options.yAxis[1].numTicks - 1 || 5;
                    unit = (max - min) / numTicks;
                    for(var i=-1; ++i<numTicks + 1;) {
                        domains['rDomain'].ticks[i] = (min + unit * i);
                    }
                }
                yAxis['left'] = new Axis();
                if(dataByAxisType.left.length) {
                    yAxis['left'].config(_.extend(_.where(options.yAxis, {type: 'left'})[0] || {}, {
                        scale: yScale['left'],
                        type: 'left',
                        forceDomain: true,
                        domain: domains.lDomain,
                        dataMin: min,
                        dataMax: max
                    }));
                }
                yAxis['right'] = new Axis();
                if(dataByAxisType.right.length) {
                    yAxis['right'].config(_.extend(_.where(options.yAxis, {type: 'right'})[0] || {}, {
                        scale: yScale['right'],
                        type: 'right',
                        forceDomain: true,
                        domain: domains.rDomain,
                        dataMin: min,
                        dataMax: max
                    }));
                }
            } else {
                yAxis = new Axis();
                yAxis.config(_.extend(options.yAxis || {}, {
                    scale: yScale,
                    type: 'left',
                    dataMin: min,
                    dataMax: max
                }));
            }

            xAxis = new Axis();
            xAxis.config(_.extend(options.xAxis || {}, {
                scale: xScale,
                type: 'bottom',
                eventManager: eventManager,
                tooltip: options.axesTooltip,
                showLabelFlag: options.showLabelFlag,
                labelStep: options.labelStep
            }));

            grid = new Grid();
            grid.config({
                yScale: options.dualAxis ? yScale['left'] : yScale,
                yAxis: options.dualAxis ? yAxis['left'] : yAxis,
                type: 'y'
            });
            if(options.tooltip) {
                tooltip.config({
                    type: 'item',
                    display: 'custom',
                    popup: true,
                    onShow: options.tooltip.onShow,
                    onHide: options.tooltip.onHide,
                    data: function(seriesIndex, num) {
                        return {
                            label: options.labels[num],
                            data: [_.where(options.series, {'seriesIndex' : seriesIndex + 1})[0].data[num]],
                            seriesIndex: [_.where(options.series, {'seriesIndex' : seriesIndex + 1})[0].seriesIndex],
                            seriesLabels: [_.where(options.series, {'seriesIndex' : seriesIndex + 1})[0].caption],
                            color: _.where(options.series, {'seriesIndex' : seriesIndex + 1})[0].color
                        };
                    }
                });
            } else {
                tooltip.config({
                    type: 'item',
                    numLabels: 1,
                    popup: true,
                    popupType: 'top',
                    data: function(seriesIndex, num) {
                        return {
                            label: options.labels[num],
                            data: [options.series[seriesIndex].data[num]],
                            seriesIndex: [_.pluck(options.series, 'seriesIndex')[seriesIndex]],
                            seriesLabels: [_.pluck(options.series, 'caption')[seriesIndex]]
                        };
                    }
                });
            }
                
        };

        self.renderTo = function (_paper, w, h) {
            paper = _paper;
            container = paper.group('container');
            xAxisGroup = paper.group('xAxis', container);
            if(dualAxis) {
                yAxisGroup = {};
                yAxisGroup['left'] = paper.group('yAxis-left', container);
                yAxisGroup['right'] = paper.group('yAxis-right', container);
            } else {
                yAxisGroup = paper.group('yAxis', container);    
            }
            
            core = paper.group('core', container);
            width = w;
            height = h - 20;
            container.transform('t0, 10');
            if(dualAxis) {
                yScale['left'].range([0, height]);
                yScale['right'].range([0, height]);
                if(dataByAxisType.left.length) {
                    yAxis['left'].renderTo(paper, yAxisGroup['left'], null, height);
                }
                if(dataByAxisType.right.length) {
                    yAxis['right'].renderTo(paper, yAxisGroup['right'], null, height);
                }
                yAxisWidth = yAxisGroup['left'].node.getBBox().width + yAxisGroup['right'].node.getBBox().width;
            } else {
                yScale.range([0, height]);    
                yAxis.renderTo(paper, yAxisGroup, null, height);
                yAxisWidth = yAxisGroup.node.getBBox().width;
            }
            
            xScale.range([0, width]);
            
            xScale.range([0, width - yAxisWidth]);
            xAxis.setOffsets(yAxisWidth, height);
            xAxis.renderTo(paper, xAxisGroup, width - yAxisWidth, height);
            xAxisHeight = xAxisGroup.node.getBBox().height;

            if(dualAxis) {
                yScale['left'].range([0, height - xAxisHeight]);
                yScale['right'].range([0, height - xAxisHeight]);
                if(dataByAxisType.left.length) {
                    yAxis['left'].resizeTo(width, height - xAxisHeight);
                }
                if(dataByAxisType.right.length) {
                    yAxis['right'].resizeTo(width, height - xAxisHeight);
                }
                yAxisGroup['right'].transform('t' + (width - yAxisGroup['right'].node.getBBox().width) + ' ,0');
                // yAxisWidth = yAxisGroup['left'].node.getBBox().width + yAxisGroup['right'].node.getBBox().width;
            } else {
                yScale.range([0, height - xAxisHeight]);
                yAxis.resizeTo(w, height - xAxisGroup.node.getBBox().height);
                // yAxisWidth = yAxisGroup.node.getBBox().width;
            }
            
            // debugger
            var t = dualAxis ? yAxisGroup['left'].node.getBBox().width : yAxisGroup.node.getBBox().width;
            xAxisGroup.transform('t' + t +',' + (height - xAxisHeight));
            grid.renderTo(paper, core, width - yAxisWidth, height - xAxisHeight);

            if(charts['column']) {
                charts['column'].renderTo(paper, core, width - yAxisWidth, height - xAxisGroup.node.getBBox().height);
            }

            if(charts['area']) {
                charts['area'].renderTo(paper, core, width - yAxisWidth, height - xAxisGroup.node.getBBox().height);
            }

            if(charts['line']) {
                charts['line'].renderTo(paper, core, width - yAxisWidth, height - xAxisGroup.node.getBBox().height);
            }
            core.transform('t' + t + ',0');

            // for(var key in charts) {
            //     charts[key].renderTo(paper, core, width - yAxisWidth, height - xAxisGroup.node.getBBox().height);
                
            // }
            tooltip.renderTo(paper, core, width - yAxisWidth, height - xAxisHeight, yAxisWidth, 0);
        };

        self.resizeTo = function (w, h) {
            width = w;
            height = h - 20;
            updateAxesSizes();
            if(dualAxis) {
                yAxisWidth = yAxisGroup['left'].node.getBBox().width + yAxisGroup['right'].node.getBBox().width;
            }
            xScale.range([0, width - yAxisWidth]);
            xAxis.setOffsets(yAxisWidth, height);
            xAxis.resizeTo(width - yAxisWidth, height);
            if(dualAxis) {
                xAxisGroup.transform('t' +  yAxisGroup['left'].node.getBBox().width +',' + (height - xAxisHeight));    
            } else {
                xAxisGroup.transform('t' +  yAxisGroup.node.getBBox().width +',' + (height - xAxisHeight));    
            }
            
            updateAxesSizes();
            if(dualAxis) {
                yScale['left'].range([0, height - xAxisHeight]);
                yScale['right'].range([0, height - xAxisHeight]);
                if(dataByAxisType.left.length) {
                    yAxis['left'].resizeTo(width, height - xAxisHeight);
                }
                if(dataByAxisType.right.length) {
                    yAxis['right'].resizeTo(width, height - xAxisHeight);
                }
                yAxisGroup['right'].transform('t' + (width - yAxisGroup['right'].node.getBBox().width) + ' ,0');

            } else {
                yScale.range([0, height - xAxisHeight]);
                yAxis.resizeTo(width, height - xAxisHeight);
            }

            var diff = 0;
            if(dualAxis && diff > 0) {
                diff = xAxisGroup._getBBox().width + yAxisGroup['right']._getBBox().width - width;
                xScale.range([0, width - yAxisWidth - diff]);
                xAxis.resizeTo(width - yAxisWidth - diff, height);
                xAxisGroup.transform('t' + diff +',' + (height - xAxisHeight));
            }
            
            if(dualAxis && !dataByAxisType.left.length) {
                grid.updateConfig({
                    yScale: yScale['right'],
                    yAxis: yAxis['right'],
                    type: 'y'
                });
                grid.renderTo(paper, core, width - yAxisWidth - diff, height - xAxisHeight);
            }

            grid.resizeTo(width - yAxisWidth - diff, height - xAxisHeight);

            if(dualAxis) {
                yAxisWidth = yAxisGroup['left'].node.getBBox().width + yAxisGroup['right'].node.getBBox().width;
            }
            for(var key in charts) {
                if(charts.hasOwnProperty(key)) {
                    charts[key].resizeTo(width - yAxisWidth - diff, height - xAxisHeight);
                }
            }
            if(dualAxis) {
                yAxisWidth = yAxisGroup['left'].node.getBBox().width;
            }
            core.transform('t' + (yAxisWidth + diff) + ',0');
            
            tooltip.resizeTo(width, height, yAxisWidth, 0);
        };

        var updateAxesSizes = function() {
            var oldyAxisWidth = yAxisWidth,
                oldxAxisHeight = xAxisHeight;
            if(!dualAxis) {
                yAxisWidth = yAxisGroup.node.getBBox().width;
            }
            xAxisHeight = xAxisGroup.node.getBBox().height;
            return oldxAxisHeight !== xAxisHeight || oldyAxisWidth !== yAxisWidth;
        };

        self.updateSeries = function (_series) {
            var chartSeriesByType = {},
                chartTypeKeys = [],
                i;
            // for(var key in charts) {
            //     charts[key].resizeTo(width - yAxisWidth, height - xAxisHeight);
            //     core.transform('t' + yAxisWidth + ',0');
            // }
            for(i=-1; ++i<_series.length;) {
                var id = _series[i].id;
                if(id) {
                    var obj = _.each(_.where(series, {id: id}), function(item) {
                        item.data = _series[i].data;
                    });
                } else if(_.isArray(_series[i])) {
                    series[i].data = _series[i];
                }
            }

            allData = [];
            dataByAxisType = {
                'left': [],
                'right': []
            };
            // for(var i = -1; ++i<series.length;) {
            //     var item = series[i];
            //     if(stacked) {
            //         for(var j=-1;++j<item.data.length;) {
            //             allData[j] = allData[j] 
            //                     ? ((allData[j] < 0 && item.data[j] > 0 ) || (allData[j] > 0 && item.data[j] < 0)) ? allData[j] : allData[j] + item.data[j]
            //                     : item.data[j];
            //         }
            //     } else {
            //         allData = allData.concat(item.data);    
            //     }
            // }
            for(i = -1; ++i<series.length;) {
                var item = series[i];
                if(!chartSeriesByType[item.displayType]) {
                    chartSeriesByType[item.displayType] = [];
                }
                item.seriesIndex = i + 1;
                chartSeriesByType[item.displayType].push(item);
                if(options.stacked) {
                    for(var j=-1;++j<item.data.length;) {
                        allData[j] = allData[j] ?
                                ((allData[j] < 0 && item.data[j] > 0 ) || (allData[j] > 0 && item.data[j] < 0)) ? allData[j] : allData[j] + item.data[j] :
                                item.data[j];
                        dataByAxisType[item.yAxis][j] = dataByAxisType[item.yAxis][j] ?
                                                    ((dataByAxisType[item.yAxis][j] < 0 && item.data[j] > 0 ) || (dataByAxisType[item.yAxis][j] > 0 && item.data[j] < 0)) ? dataByAxisType[item.yAxis][j] : dataByAxisType[item.yAxis][j]+ item.data[j] :
                                                    item.data[j];
                    }

                } else {
                    dataByAxisType[item.yAxis || 'left'] = dataByAxisType[item.yAxis || 'left'].concat(item.data);
                    allData = allData.concat(item.data);    
                }
            }

            var max = _.max(allData),
                min = _.min(allData);
            if(dualAxis) {
                max = _.max(dataByAxisType['left']),
                min = _.min(dataByAxisType['left']);

                yScale['left'].domain([min < 0 ? min : 0, max]);
                yAxis['left'].update();
                var domain = graphUtils.prettyDomain(min < 0 ? min : 0, max);
                max = _.max(dataByAxisType['right']);
                min = _.max(dataByAxisType['right']);

                yScale['right'].domain([min < 0 ? min : 0, max]);
                yAxis['right'].setConfigValue('forceNumTicks',domain.numTicks);
                yAxis['right'].update();
            } else {
                yScale.domain([min < 0 ? min : 0, max]);
                yAxis.update();
            }

            // if(dualAxis) {
            //     yScale['left'].domain([min < 0 ? min : 0, max]);
            //     yAxis.update();
            // } else {
            //     yScale.domain([min < 0 ? min : 0, max]);
            //     yAxis.update();    
            // }
            if(dualAxis) {
                yAxisWidth = yAxisGroup['left'].node.getBBox().width + yAxisGroup['right'].node.getBBox().width;
            }
            grid.update(width - yAxisWidth, height - xAxisHeight);
            updateAxesSizes();
            xScale.range([0, width - yAxisWidth]);
            xAxis.resizeTo(width - yAxisWidth, height);
            for(var key in charts) {
                if(charts.hasOwnProperty(key)) {
                    charts[key].updateSeries(width - yAxisWidth, height - xAxisHeight);
                }
            }
            if(dualAxis) {
                yAxisWidth = yAxisGroup['left'].node.getBBox().width;
            }

            core.animate({'transform': 't' + yAxisWidth + ',0'}, 500);

            xAxisGroup.transform('t' + yAxisWidth +',' + (height - xAxisHeight));
        };


        var createChartByType = function (type) {
            if(type === 'column') {
                return new Column();
            } else if(type === 'line') {
                return new Line();
            } else if(type === 'area') {
                return new Area();
            }

            throw new Error("Chart type `" + type + "` is not found!");
        };
    };

    return LinearChart;
    });