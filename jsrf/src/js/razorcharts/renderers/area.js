define(['razorcharts/renderers/line', 'vendor/lodash'], function(Line, _) {
    var AreaChart = function() {

        var self = this,
            paper = null,
            core = null,
            areaCore = null,
            options = null,
            width = null,
            height = null,
            plotItemsLine = [],
            seriesGroups = [],
            styles = [
                {
                    fill: '#ff0',
                    opacity: 0.5
                },
                {
                    fill: '#f0f',
                    opacity: 0.5
                },
                {
                    fill: '#0ff',
                    opacity: 0.5
                }
            ], subLineCharts = [];


        self.config = function(_options) {
            options = _options;
            var opts = _.cloneDeep(options);
            if(options.stacked) {
                var series = opts.series;

                for(var i=0; ++i<series.length;) {
                    var data = series[i].data;

                    for(var j=-1; ++j<data.length;) {
                        data[j] = prevIndexTotal(i+1, j);
                    }
                    opts.series[i].data = data;
                }

            }
            eventManager = options.eventManager;
            eventManager.register('plotItemClick');
            eventManager.register('plotItemMouseOver');
            eventManager.register('plotItemMouseOut');
            eventManager.register('plotItemActivate');
        };

        self.renderTo = function(_paper, _core, w, h) {
            paper = _paper;
            core = _core;
            width = w;
            height = h;
            draw(true, true && options.animateOnRender);
        };

        self.resizeTo = function(w, h) {
            width = w;
            height = h;
            draw(false, false);
            for(var i=-1; ++i<subLineCharts.length;) {
                subLineCharts[i].resizeTo(w, h);
            }
        };

        self.updateSeries = function(w, h) {
            width = w;
            height = h;
            draw(false, true);
            for(var i=-1; ++i<subLineCharts.length;) {
                subLineCharts[i].updateSeries(w, h);
            }
        };

        var draw = function(create, animate) {
            var series = options.series,
                yScale = options.yScale,
                dataLength = _.max(_.pluck(_.pluck(series, 'data'), 'length')),
                seriesWidth = (width / dataLength),
                j;
            if(create) {
                areaCore = paper.group('rc-area-chart', core);
                areaCore.node.setAttribute('class', 'rc-area-chart');
            }
            for(var i=-1; ++i<series.length;) {
                var data = series[i].data;
                var pathObj = null;
                var path, animPath;
                var classes = series[i].color === 'auto' ? ' rc-series-' + series[i].seriesIndex + ' rc-plot-item area-path' : '';
                if(create) {
                    seriesGroups[i] = paper.group('area-series-' + (i+1), areaCore);
                    seriesGroups[i].node.setAttribute('class', 'rc-series-' + series[i].seriesIndex);
                }
                if(options.dualAxis) {
                    yScale = options.yScale[series[i].yAxis || 'left'];
                }
                var _x, _y;
                _y = options.stacked ? (height - yScale.calc(prevIndexTotal(i, 0))) : (height - yScale.calc(0));
                path = 'M' + seriesWidth / 2 + ',' + (height - yScale.calc(0));
                animPath = 'M' + seriesWidth / 2 + ',' + _y;
                for(j=-1; ++j<data.length;) {
                    var circle, line;

                    path += ' L' +  ((seriesWidth * j) + seriesWidth / 2) + ',' + (height - yScale.calc(0));
                    _y = options.stacked ? (height - yScale.calc(prevIndexTotal(i, j) + data[j])) : (height - yScale.calc(data[j]));
                    if(typeof data[j] === 'number' && data[j].toString() !== 'NaN') {
                        animPath += ' L' +  ((seriesWidth * j) + seriesWidth / 2) + ',' + _y;
                    } else {
                        if(j - 1 >= 0) {
                            animPath += ' L' +  ((seriesWidth * (j - 1)) + seriesWidth / 2) + ',' + height;
                        }
                        if(j + 1 < data.length) {
                            animPath += ' M' +  ((seriesWidth * (j + 1)) + seriesWidth / 2) + ',' + height;
                        }
                    }            
                }
                if(options.stacked) {
                    for(j=data.length-1; j>=0; j--) {
                        _x = ((seriesWidth * j) + seriesWidth / 2);
                        _y = options.stacked ? (height - yScale.calc(prevIndexTotal(i, j))) : (height - yScale.calc(0));

                        path += 'L' + _x + ',' + (height - yScale.calc(0));
                        animPath += 'L' + _x + ',' + _y;
                    }
                } else {
                    path += 'L' + (seriesWidth * (dataLength -1) + seriesWidth / 2) + ',' + (height - yScale.calc(0));
                    animPath += 'L' + (seriesWidth * (dataLength -1) + seriesWidth / 2) + ',' + (height - yScale.calc(0));    
                }

                if(create) {
                    pathObj = plotItemsLine[i] = paper.path(path, seriesGroups[i]);
                    pathObj.node.setAttribute('class', (series[i].classed || '') + classes);
                    var opts = _.cloneDeep(options);
                    delete opts.eventManager;
                    opts.series = [];
                    opts.series[0] = _.cloneDeep(options.series[i]);
                    if(!classes) {
                        pathObj.attr({
                            fill: series[i].color,
                            stroke: series[i].color,
                            opacity: 0.8
                        });
                    }
                    if(options.stacked && i !== 0) {
                        for(j=-1; ++j<options.series[i].data.length;) {
                            opts.series[0].data[j] = prevIndexTotal(i+1, j);
                        }
                    }
                    subLineCharts[i] = new Line();
                    subLineCharts[i].config(opts);
                    subLineCharts[i].setEventManager (options.eventManager);
                    subLineCharts[i].renderTo(paper, seriesGroups[i], width, height);
                } else {
                    pathObj = plotItemsLine[i];
                }
                // pathObj.attr(styles[i]);

                
                pathObj.animate({
                    path: animPath
                }, animate ? 500 : 0);
            }
        };

        var prevIndexTotal = function(currentSeriesIndex, dataIndex) {
            var series = options.series;
            var num = 0;
            for(var i=currentSeriesIndex - 1; i >= 0; --i) {
                num += series[i].data[dataIndex];
            }
            return num;
        };

    };

    return AreaChart; 
});