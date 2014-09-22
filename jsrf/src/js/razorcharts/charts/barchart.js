define(['razorcharts/renderers/bar',
        'razorcharts/scales/scale', 
        'razorcharts/axes/axis', 
        'razorcharts/axes/grid',
        'razorcharts/utils/tooltip',
        'vendor/lodash'], function (Bar, Scale, Axis, Grid, Tooltip, _) {
    var xPadding = 30,
        yPadding = 20;
    var BarChart = function () {
        var self = this,
            options = {},
            xAxisGroup = null,
            yAxisGroup = null,
            xAxis = null,
            yAxis = null,
            core = null,
            series = null,
            charts = {},
            xScale = null,
            yScale = null,
            allData = [],
            paper = null,
            yAxisWidth = null,
            xAxisHeight = null,
            seriesGroups = [],
            seriesPlotItems = [],
            barChart = null,
            width = null,
            height = null,
            grid = null,
            tooltip = new Tooltip(),
            eventManager = null;

        self.config = function (_options) {
            options = _options;
            series = options.series;
            eventManager = options.eventManager;
            options.stacked = !!_.compact(_.pluck(series, 'stacked')).length;

            for(var i = -1; ++i<series.length;) {
                series[i].seriesIndex = series[i].seriesIndex !== undefined ? series[i].seriesIndex + 1 : (i + 1);
                var item = series[i];
                if(options.stacked) {
                    for(var j=-1;++j<item.data.length;) {
                        if(typeof allData[j] === 'undefined') {
                            allData[j] = {positive: 0, negative: 0};
                        }
                        
                        allData[j][item.data[j] < 0 ? 'negative': 'positive'] += item.data[j];
                        
                        // if(allData[j] > 0 && item.data[j] < 0 || allData[j] < 0 && item.data[j] > 0) {
                        //     allData.push(item.data[j]);
                        // } else {
                        //     allData[j] += item.data[j];
                        // }
                    }
                } else {
                    allData = allData.concat(item.data);    
                }
            }
        
            var max = options.stacked ? _.max(_.pluck(allData, 'positive')) : _.max(allData),
                min = options.stacked ? _.min(_.pluck(allData, 'negative')) : _.min(allData);
            
            yScale = new Scale.ordinal();
            yScale.domain(options.labels);

            xScale = new Scale.linear();
            xScale.domain([min < 0 ? min : 0 , max]);

            barChart = new Bar();
            barChart.config({
                xScale: xScale,
                stacked: !!options.stacked,
                series: options.series,
                animateOnRender: !!options.animateOnRender,
                eventManager: eventManager,
                labels: options.labels,
                tooltip: tooltip
            });

            yAxis = new Axis();
            yAxis.config(_.extend(options.yAxis || {}, {
                scale: yScale,
                type: 'left',
                showLabelFlag: options.showLabelFlag
            }));

            xAxis = new Axis();
            xAxis.config(_.extend(options.xAxis || {}, {
                scale: xScale,
                type: 'bottom',
                dataMin: min,
                dataMax: max
            }));

            grid = new Grid();
            grid.config({
                xScale: xScale,
                xAxis: xAxis,
                type: 'x'
            });
            if(options.tooltip) {
                tooltip.config({
                    type: 'item',
                    display: 'custom',
                    popup: true,
                    popupType: 'left',
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
                    popupType: 'left',
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
            width = w - xPadding;
            height = h - yPadding;
            var series = options.series;
            paper = _paper;
            xAxisGroup = paper.group('xAxis');
            yAxisGroup = paper.group('yAxis');
            core = paper.group('core');
            yScale.range([0, height]);
            xScale.range([0, width]);

            yAxis.renderTo(paper, yAxisGroup, null, height);
            yAxisGroup.transform('t0,10');
            yAxisWidth = yAxisGroup.node.getBBox().width;
            xScale.range([0, width - yAxisWidth]);

            
            xAxis.renderTo(paper, xAxisGroup, width - yAxisGroup.node.getBBox().width, null);
            xAxisHeight = xAxisGroup.node.getBBox().height;
            yScale.range([0, height - xAxisHeight]);
            
            yAxis.resizeTo(w, height - xAxisGroup.node.getBBox().height);
            yAxisWidth = yAxisGroup.node.getBBox().width;
            xAxisGroup.transform('t' + (yAxisGroup.node.getBBox().width + 10) +',' + (height - xAxisHeight + 10));

            grid.renderTo(paper, core, width - yAxisWidth, height - xAxisHeight);

            width = width - yAxisWidth;
            height = height - xAxisHeight;
            h = height - xAxisHeight;
            barChart.renderTo(paper, core, width, height);
            core.transform("t" + (yAxisWidth + 10) + ",10");
            tooltip.renderTo(paper, core, width, height, yAxisWidth, 0);
        };

        self.resizeTo = function (w, h) {
            width = w - xPadding;
            height = h - yPadding;
            yScale.range([0, height - xAxisHeight]);
            xScale.range([0, width - yAxisWidth]);
            xAxis.resizeTo(width - yAxisWidth, height);
            yAxis.resizeTo(width, height - xAxisHeight);
            xAxisGroup.transform('t' + (yAxisWidth + 10) +',' + (height - xAxisHeight + 10));
            grid.resizeTo(width - yAxisWidth, height - xAxisHeight);
            h = height - xAxisHeight;
            barChart.resizeTo(width - yAxisWidth, h);
            core.transform("t" + (yAxisWidth + 10) + ",10");
            tooltip.resizeTo(width, height, yAxisWidth, 0);
        };

        self.updateSeries = function (_series) {
            var series = options.series, i;
            for(i=-1; ++i<_series.length;) {
                var id = _series[i].id;
                var obj = _.each(_.where(series, {id: id}), function(item) {
                    item.data = _series[i].data;
                });
            }
            allData = [];
            for(i = -1; ++i<series.length;) {
                var item = series[i];
                if(options.stacked) {
                    for(var j=-1;++j<item.data.length;) {
                        allData[j] = allData[j] ?
                                ((allData[j] < 0 && item.data[j] > 0 ) || (allData[j] > 0 && item.data[j] < 0)) ? allData[j] : allData[j] + item.data[j] :
                                item.data[j];
                    }
                } else {
                    allData = allData.concat(item.data);    
                }
            }

            var max = _.max(allData),
                min = _.min(allData);
                
            xScale.domain([min < 0 ? min : 0 , max]);
            xAxis.update();
            grid.update(width, height);
            barChart.updateSeries(width, height);
            core.transform("t" + yAxisWidth + ",0");
        };


        var createChartByType = function (type) {
            if(type === 'column') {
                return new ColumnChart();
            }

            throw new Error("Chart type `" + type + "` is not found!");
        };
    };

    return BarChart;
});