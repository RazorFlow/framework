define(['vendor/lodash'], function(_) {
    var LineChart = function() {
        var CIRCLE_RADIUS = 4,
            CIRCLE_ANIMATE_RADIUS = 6,
            CIRCLE_EVENT_RADIUS = 12;
        var self = this,
            paper = null,
            core = null,
            lineCore = null,
            options = null,
            width = null,
            height = null,
            plotItemsCircle = [],
            plotItemsEventCircle = [],
            plotItemsLine = [],
            seriesGroups = [],
            eventManager;


        self.config = function(_options) {
            options = _options;
            eventManager = options.eventManager;
            if(eventManager) {
                eventManager.register('plotItemClick');
                eventManager.register('plotItemMouseOver');
                eventManager.register('plotItemMouseOut');
                eventManager.register('plotItemActivate');
            }
        };

        self.setEventManager = function (_eventManager) {
            eventManager = _eventManager;
        };

        self.renderTo = function(_paper, _core, w, h) {
            paper = _paper;
            core = _core;
            width = w;
            height = h;
            draw(true, true && options.animateOnRender);
            for(var i=-1; ++i<plotItemsCircle.length;) {
                options.tooltip.addSeriesItems(options.series[i].seriesIndex, plotItemsEventCircle[i]);
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
            var series = options.series,
                yScale = options.yScale,
                dataLength = _.max(_.pluck(_.pluck(series, 'data'), 'length')),
                seriesWidth = (width / dataLength);
            if(create) {
                lineCore = paper.group('rc-line-chart', core);
                lineCore.node.setAttribute('class', 'rc-line-chart');
            }
            for(var i=-1; ++i<series.length;) {
                var data = series[i].data,
                    classes = series[i].color === 'auto' ? ' rc-series-' + series[i].seriesIndex + ' rc-plot-item' : '';
                if(create) {
                    seriesGroups[i] = paper.group('line-series-' + (i+1), lineCore);
                    seriesGroups[i].node.setAttribute('class', 'rc-series-' + series[i].seriesIndex);
                    plotItemsCircle[i] = [];
                    plotItemsLine[i] = [];
                    plotItemsEventCircle[i] = [];
                }
                for(var j=-1; ++j<data.length;) {
                    var circle = null,
                        line = null,
                        eventCircle = null;
                    if(options.dualAxis) {
                        yScale = options.yScale[series[i].yAxis || 'left'];
                    }
                    if(j !== data.length - 1) {
                        if(create) {
                            line = plotItemsLine[i][j] = paper.path('M' + ((seriesWidth * j) + seriesWidth / 2) + ',' + height + 
                                                        'L' +  ((seriesWidth * (j+1)) + seriesWidth / 2) + ',' + height, seriesGroups[i]);    
                            line.node.setAttribute('class', (series[i].classed || '') + classes);
                            if(!classes) {
                                line.attr({
                                    stroke: series[i].color,
                                    fill: 'none'
                                });
                            }
                        } else {
                            line = plotItemsLine[i][j];
                        }
                        if(typeof(data[j] === "number")  && typeof(data[j+1] === "number")) {
                            line.attr('opacity', 1);
                        } else {
                            line.attr('opacity', 0);
                        }
                        line.animate({
                            path: 'M' + ((seriesWidth * j) + seriesWidth / 2) + ',' + (height - yScale.calc(data[j])) + 
                                                        'L' +  ((seriesWidth * (j+1)) + seriesWidth / 2) + ',' + (height - yScale.calc(data[j+1]))
                        }, animate ? 500 : 0);
                    }
                    if(create) {
                        circle = plotItemsCircle[i][j] = paper.circle((seriesWidth * j) + seriesWidth / 2, height, CIRCLE_RADIUS, seriesGroups[i]);
                        circle.node.setAttribute('class', (series[i].classed || '') + classes);
                        var params = {
                            seriesIndex: series[i].seriesIndex,
                            labelIndex: j,
                            value: data[j],
                            label: labels[j]
                        };
                        circle.click(createClickCallback(params));
                        circle.mouseover(createOverCallback(params, circle));
                        circle.mouseout(createOutCallback(params, circle));
                        if(!classes) {
                            circle.attr({
                                stroke: series[i].color,
                                fill: '#FFF'
                            });
                        }
                        eventCircle = plotItemsEventCircle[i][j] = paper.circle((seriesWidth * j) + seriesWidth / 2, height, CIRCLE_EVENT_RADIUS, seriesGroups[i]);
                        eventCircle.node.setAttribute('class', (series[i].classed || '') + ' rc-series-' + i + ' rc-plot-item' + ' ' + (options.plotItemClasses || ''));
                        eventCircle.attr({opacity: 0});
                        eventCircle.click(createClickCallback(params));
                        eventCircle.mouseover(createOverCallback(params, circle));
                        eventCircle.mouseout(createOutCallback(params, circle));
                        !function(circle) {
                            eventCircle.mouseover(function() {
                                circle.animate({
                                    r: CIRCLE_ANIMATE_RADIUS
                                }, 100);
                            });
                            eventCircle.mouseout(function() {
                                circle.animate({
                                    r: CIRCLE_RADIUS
                                }, 100);
                            });
                        }(circle);
                            
                    } else {
                        circle = plotItemsCircle[i][j];
                        eventCircle = plotItemsEventCircle[i][j];
                    }
                    if(typeof(data[j]) === "number") {
                        circle.attr('opacity', 1);
                    } else {
                        circle.attr('opacity', 0);
                    }
                    circle.animate({
                        cx: (seriesWidth * j) + seriesWidth / 2,
                        cy: height - yScale.calc(data[j])
                    }, animate ? 500 : 0);

                    eventCircle.attr({
                        cx: (seriesWidth * j) + seriesWidth / 2,
                        cy: height - yScale.calc(data[j])
                    });
                }
            }
        };

        var createClickCallback = function (params) {
            return function() {
                eventManager.trigger('plotItemClick', params);
                eventManager.trigger('plotItemActivate', params);
            };
        };
        var createOverCallback = function (params, $el) {
            return function() {
                var attr = $el.node.getAttribute('class');
                $el.node.setAttribute('class', attr + ' highlight');
                eventManager.trigger('plotItemMouseOver', params);
            };
        };
        var createOutCallback = function (params, $el) {
            return function() {
                var attr = $el.node.getAttribute('class');
                attr = attr.replace(' highlight', '');
                $el.node.setAttribute('class', attr);
                eventManager.trigger('plotItemMouseOut', params);
            };
        };
    };

    return LineChart; 
});