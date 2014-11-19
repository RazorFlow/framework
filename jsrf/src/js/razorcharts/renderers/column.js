define(['razorcharts/utils/colorutils', 'vendor/lodash'], function(colorUtils, _) {
    var ColumnChart = function() {
        // Constants
        var SERIES_PADDING = 0.4,
            COLUMN_PADDING = 0.0,
            paper = null,
            core = null;

        var self = this,    
            options = null,
            columnCore = null,
            seriesGroups = [],
            styles = [
                {
                    fill: '#ff0'
                },
                {
                    fill: '#f0f'
                },
                {
                    fill: '#0ff'
                }
            ],
            seriesPlotItems = [],
            totalLabels = [],
            width = null,
            height = null,
            eventManager = null;

        self.config = function(_options) {
            options = _options;
            eventManager = options.eventManager;

            eventManager.register('plotItemClick');
            eventManager.register('plotItemMouseOver');
            eventManager.register('plotItemMouseOut');
            eventManager.register('plotItemActivate');
        };

        self.renderTo = function (_paper, _core, w, h) {
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

        var draw = function (create, animate) {
             var series = options.series,
                dataLength = _.max(_.pluck(_.pluck(series, 'data'), 'length')),
                seriesWidth = (width / dataLength),
                actualSeriesWidth = seriesWidth - seriesWidth * SERIES_PADDING,
                columnWidth = options.stacked ? actualSeriesWidth : (actualSeriesWidth / series.length),
                yScale = options.yScale,
                labels = options.labels,
                padding = columnWidth * COLUMN_PADDING;
            if(create) {
                columnCore = paper.group('rc-column-chart', core);
                columnCore.node.setAttribute('class', 'rc-column-chart');
            }
            for(var i=-1; ++i<series.length;) {
                var data = series[i].data;
                if(create) {
                    seriesGroups[i] = paper.group('column-series-' + (i+1), columnCore);
                    seriesGroups[i].node.setAttribute('class', 'rc-series-' + (series[i].seriesIndex));
                    if(!seriesPlotItems[i]) {
                        seriesPlotItems[i] = [];
                    }
                }
                for(var j=-1; ++j<data.length;) {
                    if(options.dualAxis) {
                        yScale = options.yScale[series[i].yAxis || 'left'];
                    }
                    var _x, _y, _w, _h;
                    _x = (options.stacked) ? (seriesWidth * j) + (seriesWidth / 2) - (columnWidth / 2) + padding  : seriesWidth * j + columnWidth * i + ((seriesWidth * SERIES_PADDING / 2) + padding);
                    if(data[j] > 0) {
                        if(options.stacked) {
                            if(i!==0 && prevIndexTotal(i, j) !== yScale.min()) {
                                _y = ((i - 1 < 0 ) ? height - yScale.calc(data[j] + yScale.min()) : height - yScale.calc(prevIndexTotal(i, j)) - Math.abs(yScale.calc(data[j] + yScale.min()) - yScale.calc(yScale.min())));
                            } else {
                                _y = ((i - 1 < 0 ) ? height - yScale.calc(data[j]) : height - yScale.calc(prevIndexTotal(i, j)) - Math.abs(yScale.calc(data[j]) - yScale.calc(yScale.min())));
                            }
                            
                        } else {
                            _y = height - yScale.calc(data[j]);    
                        }
                        
                    } else {
                        _y = height - yScale.calc(0) + (options.stacked ? Math.abs(yScale.calc(prevIndexTotal(i, j)) - yScale.calc(0)) : 0);
                    }
                    
                    _w = columnWidth - padding * 2;
                    var minTick = yScale.min() < 0 ? yScale.calc(0) : yScale.calc(yScale.min());
                    _h = Math.abs(yScale.calc(data[j]) - minTick);
                    if(options.stacked) {
                        if(i!==0 && prevIndexTotal(i, j) !== yScale.min()) {
                            _h = Math.abs(yScale.calc(data[j] + yScale.min()));
                        }
                    }
                    
                    // if(options.stacked && i !== 0 && data[j] === 59) debugger;
                    var rect = null,
                        classes = (series[i].color === 'auto' ? ' rc-series-' + series[i].seriesIndex + ' rc-plot-item' : '') + ' ' + (options.plotItemClasses || '');

                    if(create) {
                        rect = paper.rect(_x, height - yScale.calc(yScale.min()), _w, 0, seriesGroups[i]);
                        seriesPlotItems[i][j] = rect;
                        rect.node.setAttribute('class', (series[i].classed || '') + classes);
                        var params = {
                            seriesIndex: series[i].seriesIndex,
                            labelIndex: j,
                            value: data[j],
                            label: labels[j]
                        }, extraParams = {
                            color: series[i].color
                        };

                        if(series[i].color !== 'auto') {
                            rect.attr({
                                fill: series[i].color,
                                stroke: 'none'
                            });
                        }
                        rect.click(createClickCallback(params, rect));
                        rect.mouseover(createOverCallback(params, rect, extraParams));
                        rect.mouseout(createOutCallback(params, rect, extraParams));
                    } else {
                        rect = seriesPlotItems[i][j];
                    }

                    // rect.attr(styles[i]);
                    
                    rect.animate({
                        x: _x,
                        y: _y,
                        width: _w,
                        height: _h
                    }, animate ? 500 : 0);
                }
            }
            if(options.stacked && options.stackedTotalDisplay) {
                for(i=0; i<dataLength; i++) {
                    var totalData = indexTotal(i);
                    var labelPadding = totalData.value > 0 ? -10 : 10;
                    var label;
                    _x = (seriesWidth * i) + (seriesWidth / 2);
                    _y = height - yScale.calc(totalData.value) + labelPadding;
                    if(create) {
                        label = paper.text (_x, height, totalData.label, columnCore);
                        totalLabels[i] = label;
                    } else {
                        label = totalLabels[i];
                    }
                    label.animate({
                        x: _x,
                        y: _y
                    }, animate ? 500 : 0);
                }
            }
        };

        var createClickCallback = function (params, $el) {
            return function() {
                eventManager.trigger('plotItemClick', params);
                eventManager.trigger('plotItemActivate', params);
            };
        };
        var createOverCallback = function (params, $el, extraParams) {
            return function() {
                if(params.seriesIndex <= 9 && extraParams.color === 'auto') {
                    var attr = $el.node.getAttribute('class');
                    $el.node.setAttribute('class', attr + ' highlight');    
                } else {
                    var newColor = colorUtils.darken(extraParams.color, 20);
                    $el.attr({
                        fill: newColor
                    });
                }
                eventManager.trigger('plotItemMouseOver', params);
            };
        };
        var createOutCallback = function (params, $el, extraParams) {
            return function() {
                if(params.seriesIndex <= 9 && extraParams.color === 'auto') {
                    var attr = $el.node.getAttribute('class');
                    attr = attr.replace(' highlight', '');
                    $el.node.setAttribute('class', attr);
                } else {
                    $el.attr({
                        fill: extraParams.color
                    });
                }
                    
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

        var indexTotal = function (dataIndex) {
            var series = options.series;
            var sum = 0, neg = 0, pos = 0;
            for(var i=0; i<series.length; i++) {
                var data = series[i].data[dataIndex];
                sum += data;
                if(data >= 0) {
                    pos += data;
                } else {
                    neg += data; 
                }
            }
            if(pos === 0) {
                return { 
                    value: neg,
                    label: neg
                };
            } else {
                return {
                    value: pos,
                    label: sum
                }
            }
        };
    };

    return ColumnChart;
});