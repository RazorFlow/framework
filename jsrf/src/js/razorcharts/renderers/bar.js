define(['vendor/lodash'], function(_) {
    var BarChart = function() {
        var  SERIES_PADDING = 0.2;
        var self = this,
            options = null,
            paper = null,
            core = null,
            barCore = null,
            width = null,
            height = null,
            seriesGroups = [],
            seriesPlotItems = [];

        self.config = function(_options) {
            options = _options;
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
            for(var i=-1; ++i<seriesPlotItems.length;) {
                options.tooltip.addSeriesItems(options.series[i].seriesIndex, seriesPlotItems[i]);
            }
        };

        self.resizeTo = function(w, h) {
            width = w;
            height = h;
            draw(false, false);
        };

        self.updateSeries = function(w, h) {
            width = w;
            height = h;
            draw(false, true);
        };

        var draw = function(create, animate) {
             var xScale = options.xScale,
                series = options.series,
                dataLength = _.max(_.pluck(_.pluck(series, 'data'), 'length')),
                seriesFullHeight =  (height / dataLength),
                seriesHeight = seriesFullHeight * (1 - SERIES_PADDING),
                columnHeight = options.stacked ? seriesHeight : (seriesHeight / series.length),
                padding = seriesFullHeight * SERIES_PADDING;
            if(create) {
                barCore = paper.group('rc-bar-chart', core);
                barCore.node.setAttribute('class', 'rc-bar-chart');
            }
            for(var i=-1; ++i<series.length;) {
                var data = series[i].data,
                    classes = ' rc-series-' + series[i].seriesIndex + ' rc-plot-item' + ' ' + (options.plotItemClasses || '');
                if(create) {
                    seriesGroups[i] = paper.group('column-series' + (i+1), barCore);
                    seriesGroups[i].node.setAttribute('class', 'rc-series-' + series[i].seriesIndex);
                    if(!seriesPlotItems[i]) {
                        seriesPlotItems[i] = [];
                    }
                }
                
                for(var j=-1; ++j<data.length;) {
                    var rect;
                    var _x, _y, _w, _h;
                    var minTick = xScale.min () > 0 ? xScale.calc(xScale.min()) : xScale.calc(0);
                    if(options.stacked) {
                        if(xScale.min() < 0) {
                            if(data[j] < 0) {
                                _x = i > 0 ? xScale.calc(prevIndexTotal(i, j) + data[j]) : xScale.calc(data[j]);
                            } else {
                                _x = i > 0 ? xScale.calc(prevIndexTotal(i, j)) : xScale.calc(prevIndexTotal(i, j));
                            }
                        } else {
                            if(data[j] < 0) {
                                _x = i > 0 ? xScale.calc(prevIndexTotal(i, j) + data[j]) : xScale.calc(data[j]);
                            } else {
                                _x = i > 0 ? xScale.calc(prevIndexTotal(i, j)) : xScale.calc(prevIndexTotal(i, j) + xScale.min());
                            }
                        }
                            
                    } else {
                        _x = data[j] < 0 ? xScale.calc(data[j]) : minTick;    
                    }
                    _y = seriesFullHeight * j + padding / 2;
                    
                    
                    _w = xScale.calc(Math.abs(data[j])) - minTick;
                    if(xScale.min () > 0 && options.stacked && i > 0 && prevIndexTotal(i, j) !== xScale.min()) {
                        _w = xScale.calc(Math.abs(data[j] + xScale.min())) - minTick;
                    }
                    _h = columnHeight;
                    // _h = seriesHeight;
                    

                    if(create) {
                        rect = seriesPlotItems[i][j] = paper.rect(xScale.calc(0), _y, 0, _h, seriesGroups[i]);
                        rect.node.setAttribute('class', series[i].color !== 'auto' ? '' : (series[i].classed || '') + classes);
                        var params = {
                            seriesIndex: series[i].seriesIndex,
                            labelIndex: j,
                            value: data[j],
                            label: options.labels[j]
                        };
                        rect.click(createClickCallback(params));
                        rect.mouseover(createOverCallback(params));
                        rect.mouseout(createOutCallback(params));
                        if(series[i].color !== 'auto') {
                            rect.attr({
                                fill: series[i].color,
                                stroke: 'none'
                            });
                        }
                    } else{
                        rect = seriesPlotItems[i][j];
                    }
                    rect.animate({
                        x: _x,
                        y: _y,
                        width: _w,
                        height: _h
                    }, animate ? 500 : 0);
                }
                if(!options.stacked) {
                    seriesGroups[i].transform("t0," + (columnHeight * i));    
                }
            }
        };
        var createClickCallback = function (params) {
            return function() {
                eventManager.trigger('plotItemClick', params);
                eventManager.trigger('plotItemActivate', params);
            };
        };
        var createOverCallback = function (params) {
            return function() {
                eventManager.trigger('plotItemMouseOver', params);
            };
        };
        var createOutCallback = function (params) {
            return function() {
                eventManager.trigger('plotItemMouseOut', params);
            };
        };

         var prevIndexTotal = function(currentSeriesIndex, dataIndex) {
            var series = options.series;
            var num = 0, negative = series[currentSeriesIndex].data[dataIndex] < 0;
            for(var i=currentSeriesIndex - 1; i >= 0; --i) {
                var val = series[i].data[dataIndex];
                num += negative ? (val < 0) ? val : 0 : (val > 0) ? val : 0;
            }
            return num;
        };
    };

    return BarChart;
});