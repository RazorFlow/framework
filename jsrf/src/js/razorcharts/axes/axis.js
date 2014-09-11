define(['razorcharts/scales/scale', 'razorcharts/utils/graphutils', 'razorcharts/utils/tooltip', 'vendor/lodash'], function(Scale, graphUtils, Tooltip, _) {
    var MAX_AXIS_PERCENT = 0.25;
    var TILTED_TICK_TOP_PADDING = 10;
    var MIN_TICK_THRESHOLD = 20;
    var Axis = function () {
        var self = this,
            options = {},
            tickValues = [],
            tickLabels = [],
            numTicks = 6,
            paper = null,
            core = null,
            tickContainer = null,
            ticks = [],
            axisLine = null,
            width = null,
            height = null,
            cachedScaleDomain = null,
            cachedScaleRange = null,
            wordWidths = {},
            labelWidths = {},
            format = null,
            axisLabel = null,
            eventManager = null,
            tooltip = null,
            xOffset = 0,
            yOffset = 0;

        self.config = function(_options) {
            options = _options;
            eventManager = options.eventManager;
            if (eventManager) {
              eventManager.register('labelActivate');
            }
            format = options.format || nullFormat;
            createTickValues();
        };

        self.setConfigValue = function(key, value) {
            options[key] = value;
        };

        self.renderTo = function(_paper, _core, w, h) {
            var scale = options.scale;
            paper = _paper;
            core = _core;
            width = w;
            height = h;
            readjustNumTicks ();
            cachedScaleDomain = scale.domain();
            cachedScaleRange = scale.range();
            core.node.setAttribute('class', 'rc-axis');
            if(options.scale.type === 'ordinal') {
                findLabelWidths(tickValues);
                findWordWidths(tickValues);
            }
            tickContainer = paper.group('tickContainer', core);
            ticks = createTicks(tickValues, options.type);
            if(options.axisLine) {
                if(options.type === 'left') {
                    axisLine = paper.path('m0,0 l0' + ',' + h, tickContainer);
                } else if(options.type === 'bottom') {
                    axisLine = paper.path('m0,0l' + w + ',0', tickContainer);
                } else if(options.type === 'right') {
                    axisLine = paper.path('m0,0 l0' + ',' + h, tickContainer);
                }
            }
            if(options.label) {
                axisLabel = paper.text(0,0, options.label, core);
                axisLabel.node.setAttribute('class', 'rc-axis-label');
            }
            
            self.resizeTo(w, h);
            // if(options.type === 'left') {
            //     // debugger
            //     core.transform('t' + (core.node.getBBox().width) + ',0');
            // }
        };

        self.resizeTo = function(w, h) {
            var showLabel = shouldLabelBeShown();
            var scale = options.scale,  
                rangeUnit = null, i, g;
            width = w;
            height = h;
            readjustNumTicks ();
            cachedScaleDomain = scale.domain();
            cachedScaleRange = scale.range();
            var tilt = false;
            if(options.type === 'left') {
                // paper.path('m0,0 l0,' + h, tickContainer);
                rangeUnit = h / (tickValues.length);
                if(scale.type === 'ordinal') {
                    tilt = shouldWeTilt(tickValues, rangeUnit);    
                }
                for(i=-1; ++i<ticks.length;) {
                    g = ticks[i];
                    if(scale.type === 'ordinal') {
                        // g.transform('t0,' + ((h - rangeUnit * i) - rangeUnit / 2));    
                        g.transform('t0,' + (rangeUnit * i + rangeUnit / 2));    
                    } else if(scale.type === 'linear') {
                        g.transform('t0,' + (h - scale.calc(tickValues[i])));
                    }
                }
                if(options.axisLine) {
                    axisLine.attr('path', 'm0,0 l0' + ',' + h);
                }
                var axisLabelHeight = 0;
                if(options.label) {
                    axisLabelHeight = axisLabel.getBBox().width;
                    axisLabel.attr({
                        'text-anchor': 'middle',
                        transform: 't' + (axisLabelHeight/2)  + ',' + (h/2)+' r-90'
                    });
                    axisLabelHeight += 14;
                }
                tickContainer.transform('t' + (tickContainer.node.getBBox().width + axisLabelHeight) + ',0');             
            } else if(options.type === 'right') {
                rangeUnit = h / (tickValues.length);
                if(scale.type === 'ordinal') {
                    tilt = shouldWeTilt(tickValues, rangeUnit);    
                }
                
                for(i=-1; ++i<ticks.length;) {
                    g = ticks[i];
                    if(scale.type === 'ordinal') {
                        g.transform('t0,' + ((h - rangeUnit * i) - rangeUnit / 2));    
                    } else if(scale.type === 'linear') {
                        g.transform('t0,' + (h - scale.calc(tickValues[i])));
                    }
                }
                if(options.axisLine) {
                    axisLine.attr('path', 'm0,0 l0' + ',' + h);    
                }
                
                if(options.label) {
                    axisLabel.attr({
                        'text-anchor': 'middle',
                        transform: 't' + (tickContainer.node.getBBox().width + 14) + ',' + (h/2)+' r-90'
                    });
                }
                tickContainer.transform('t0,0');
                
            } else if(options.type === 'bottom') {
                if(showLabel) {
                    rangeUnit = w / tickValues.length;
                    if(scale.type === 'ordinal') {
                        tilt = shouldWeTilt(tickValues, rangeUnit);    
                    }
                    for(i=-1; ++i<ticks.length;) {
                        if(ticks[i]) {
                            ticks[i].remove();
                            ticks[i] = null;
                        }
                    }
                    ticks = createTicks(tickValues, options.type);
                    for(i=-1; ++i<tickValues.length;) {
                        g = ticks[i];
                        if(!g) continue;
                        if(scale.type === 'ordinal') {
                            // Check if label needs breaking
                            if(tilt) {
                                    g.remove();
                                    g = ticks[i] = createTiltedTick(tickValues[i], i, rangeUnit, 'bottom');
                            } else {
                                if(labelWidths[tickValues[i]] > rangeUnit) {
                                    var lines = getLines(tickValues[i], rangeUnit);
                                    g.remove();
                                    g = ticks[i] = createMultilineTick(lines.words, i, 'bottom');
                                } 
                            }
                            g.transform('t'+(scale.calc(tickValues[i]) + rangeUnit / 2)  +',0');
                        } else if(scale.type === 'linear') {
                            g.transform('t'+ scale.calc(tickValues[i]) +',0');
                        }
                    }
                    if(options.label) {
                        axisLabel.attr({
                            'text-anchor': 'middle',
                            transform: 't' + (w/2) + ',' + (tickContainer.node.getBBox().height + axisLabel.getBBox().height)
                        });
                    }

                    if(options.axisLine) {
                        axisLine.attr('path', 'm0,0l' + w + ',0');
                    }
            }
            }
            if(tilt && options.type === 'bottom') {
                if(!tooltip) {
                    var tooltipConfig = {};
                    if(options.tooltip) {
                        tooltipConfig = {
                            type: 'item',
                            display: 'custom',
                            onShow: options.tooltip.onShow,
                            onHide: options.tooltip.onHide,    
                            data: function(seriesIndex, num) {
                                return {
                                    seriesLabels: [tickValues[num]],
                                    data: []
                                };
                            }
                        };
                    } else {
                        tooltipConfig = {
                            type: 'area',
                            surfaceType: 'column',
                            numLabels: 0,
                            numParts: tickValues.length,
                            data: function(part) {
                                return {
                                    label: tickValues[part]
                                    // data: [options.series[seriesIndex].data[num]],
                                    // seriesIndex: [_.pluck(options.series, 'seriesIndex')[seriesIndex]],
                                    // seriesLabels: [_.pluck(options.series, 'caption')[seriesIndex]]
                                };
                            }
                        };
                    }
                    tooltip = new Tooltip();
                    tooltip.config(tooltipConfig);

                    tooltip.addSeriesItems(1, _.compact(ticks));
                    tooltip.renderTo(paper, core, width, core.node.getBBox().height, xOffset, yOffset - core.node.getBBox().height);
                } else {
                    tooltip.addSeriesItems(1, _.compact(ticks));
                    tooltip._init();
                    tooltip.resizeTo(width, core.node.getBBox().height, xOffset, yOffset - core.node.getBBox().height);
                }
                    
            }
        };

        self.update = function() {
            var scale = options.scale,
                h = height,
                w = width,
                oldScale = null,
                oldTicks = null, i, g;

            if(scale.type !== 'linear') {
                return;
            }

            oldScale = new Scale.linear();
            oldScale.domain(cachedScaleDomain);
            oldScale.range(cachedScaleRange);
            oldTickValues = tickValues;
            tickValues = [];
            cachedScaleRange = scale.range();
            cachedScaleDomain = scale.domain();

            createTickValues();
            
            oldTicks = ticks;
            ticks = [];
            ticks = createTicks(tickValues, options.type);
            if(options.type === 'left') {
                for(i=-1; ++i<ticks.length;) {
                    g = ticks[i];
                    g.transform('t0,' + (h - oldScale.calc(tickValues[i])));
                    g.attr('opacity', 0);
                    g.animate({
                        'transform': 't0,' + (h - scale.calc(tickValues[i])),
                        'opacity': 1
                    }, 500);
                }
                for(i=-1; ++i<oldTicks.length;) {
                    g = oldTicks[i];
                    g.animate({
                        'transform': 't0,' + (h - scale.calc(oldTickValues[i])),
                        'opacity': 0
                    }, 500);
                }
                // core.transform('t' + (core.node.getBBox().width - 30) + ',0');
            } else if(options.type === 'bottom') {
                for(i=-1; ++i<ticks.length;) {
                    g = ticks[i];
                    g.transform('t'+ oldScale.calc(tickValues[i]) +',0');
                    g.attr('opacity', 0);
                    g.animate({
                        'transform': 't'+ scale.calc(tickValues[i]) +',0',
                        'opacity': 1
                    }, 500);
                }
                for(i=-1; ++i<oldTicks.length;) {
                    g = oldTicks[i];
                    g.animate({
                        'transform': 't' + scale.calc(oldTickValues[i]) + ',0' ,
                        'opacity': 0
                    }, 500);
                }
            } else if(options.type === 'right') {
                for(i=-1; ++i<ticks.length;) {
                    g = ticks[i];
                    g.transform('t0,' + (h - oldScale.calc(tickValues[i])));
                    g.attr('opacity', 0);
                    g.animate({
                        'transform': 't0,' + (h - scale.calc(tickValues[i])),
                        'opacity': 1
                    }, 500);
                }
                for(i=-1; ++i<oldTicks.length;) {
                    g = oldTicks[i];
                    g.animate({
                        'transform': 't0,' + (h - scale.calc(oldTickValues[i])),
                        'opacity': 0
                    }, 500);
                }
            }
            setTimeout(function() {
                for(i=-1; ++i<oldTicks.length;) {
                    oldTicks[i].remove();
                    oldTicks[i] = null;
                }
            }, 500);
            cachedScaleDomain = scale.domain();
            cachedScaleRange = scale.range();
        };

        self.ticks = function() {
            return tickValues;
        };

        self.setOffsets = function(xoff, yoff) {
            xOffset = xoff;
            yOffset = yoff;
        };

        var nullFormat = function(tick) {
            return tick;
        };

        var createLabelActivateCallback = function (params) {
          return function () {
            eventManager.trigger('labelActivate', params);
          };
        };

        var createTicks = function(_tickValues, orientation) {

            var tempHolder = [];
            var showLabelFlag = shouldLabelBeShown();
            if(showLabelFlag) {
            for(var i=-1; ++i<_tickValues.length;) {
                if(options.labelStep && options.labelStep.interval) {
                    var interval = options.labelStep.interval + 1,
                        startIndex = options.labelStep.startIndex;
                    if(i >= startIndex && ((i - startIndex) % interval !== 0)) {
                        continue;
                    }
                }
                var tickLabel = showLabelFlag ? tickLabels[i] : '';
                var g = paper.group('tick-' + (i+1), tickContainer),
                    _ticks = paper.text(0 , 0, '' + tickLabel, g),
                    line = null;

                if(orientation === 'left') {
                    _ticks.attr({
                        x: -14,
                        'text-anchor': 'end'
                    });
                    
                    line = paper.path('m0,0 l-10,0', g);
                    line.node.setAttribute('class', 'rc-grid-line');

                    if(!options.tickLine) {
                        line.attr('opacity', 0);
                    }
                    
                } else if(orientation === 'bottom') {
                    _ticks.attr({
                        'text-anchor': 'middle',
                        'y': 14
                    });
                    
                    line = paper.path('m0,0 l0,10', g);
                    line.node.setAttribute('class', 'rc-grid-line');    

                    if(!options.tickLine) {
                        line.attr('opacity', 0);
                    }
                } else if(orientation === 'right') {
                    _ticks.attr({
                        x: 14,
                        'text-anchor': 'start'
                    });
                    
                    line = paper.path('m0,0 l10,0', g);
                    line.node.setAttribute('class', 'rc-grid-line');
                    if(!options.tickLine) {
                        line.attr('opacity', 0);
                    }
                } else if(orientation === 'top') {
                    _ticks.attr({
                        'text-anchor': 'middle',
                        'y': -14
                    });
                }
                tempHolder[i] = g;
                if(eventManager) {
                  _ticks.click(createLabelActivateCallback({
                    label: tickLabels[i]
                  }));
                }
            }
        }

            return tempHolder;
        };

        var createMultilineTick = function(words, idx, orientation) {
            var g = paper.group('tick-' + (idx + 1), tickContainer),
                // _ticks = [],
                line = null;
            for(var i=-1; ++i<words.length;) {

                var _ticks = paper.text(0, 0, '' + words[i], g);

                if(orientation === 'left') {
                    _ticks.attr({
                        'text-anchor': 'end',
                        'y': i * 14
                    });
                    if(options.tickLine) {
                        line = paper.path('m5,0 l10,0', g);
                        line.node.setAttribute('class', 'rc-grid-line');    
                    }
                } else if(orientation === 'bottom') {
                    _ticks.attr({
                        'text-anchor': 'middle',
                        'y': 14 + i * 14
                    });
                    if(options.tickLine) {
                        line = paper.path('m5,0 l0,10', g);
                        line.node.setAttribute('class', 'rc-grid-line');    
                    }
                } else if(orientation === 'right') {
                    _ticks.attr({
                        'text-anchor': 'start',
                        'y': i * 14
                    });
                } else if(orientation === 'top') {
                    _ticks.attr({
                        'text-anchor': 'middle',
                        'y': -14 + i * 14
                    });
                }
            }
            return g;
        };

        var createTiltedTick = function(label, idx, width, orientation) {
            var labelWidth = labelWidths[label];
            var maxWidth = height * MAX_AXIS_PERCENT * 2;
            // var correctLength = labelWidth < width ? labelWidth : label.length * (width / labelWidth),
            //     correctWidth = labelWidth < width ? labelWidth  : labelWidth * (width / labelWidth);
            var correctLength = label.length + 1;
            var correctWidth = labelWidth;
            var topPadding = TILTED_TICK_TOP_PADDING;
            if(labelWidth > maxWidth) {
                correctLength = Math.floor(label.length * (maxWidth / labelWidth));
                correctWidth = maxWidth;
                topPadding -= 5;
                label = label.slice(0, correctLength - 3) + (correctLength - 3 < label.length ? '...' : '');
            }
            
             var g = paper.group('tick-' + (idx + 1), tickContainer),
                _ticks = paper.text(0, 0, '' + label, g),
                line = null;

            if(orientation === 'left') {
                _ticks.attr({
                    'text-anchor': 'end'
                });
                if(options.tickLine) {
                    paper.path('m5,0 l10,0', g);
                }
            } else if(orientation === 'bottom') {
                _ticks.attr({
                    'text-anchor': 'middle',
                    y: topPadding
                });
                if(options.tickLine) {
                    line = paper.path('m0,0 l0,8', g);    
                }
            } else if(orientation === 'right') {
                _ticks.attr({
                    'text-anchor': 'start'
                });
            } else if(orientation === 'top') {
                _ticks.attr({
                    'text-anchor': 'middle',
                    'y': -14
                });
            }
            // No matter the size of the label the parent g element stays in place, to counter this we need to change the x from the width after it is tilted
            // The 6 in the end is half height of the text
            _ticks.transform('r-45t-' + (correctWidth / 2) + ',0');

            return g;
        };

        var precise = function(num, precision) {
            var n = num.toString().split('.');
            if(n[1] && n[1].length > precision) {
                n[1] = n[1].slice(0, precision);
            }

            return parseFloat(n[0] + '.' + n[1]);
        };

        var sanitizePrecision = function(obj) {
            if(_.isNumber(obj)) {
                return precise(obj, 1);
            } else if(_.isArray(obj)) {
                for(var i=-1; ++i<obj.length;) {
                    obj[i] = precise(obj[i], 2);
                }
            }
            return obj;
        };

        var createTickValues = function() {
            var scale = options.scale,
                unit = Math.floor(scale.max() / numTicks);

            if(scale.type === 'linear') {
                var domain = graphUtils.prettyDomain(scale.min(), scale.max()),
                    newMin = domain.min,
                    newMax = domain.max;
                if(options.forceNumTicks) {
                    unit = graphUtils.prettyDomain(0, (domain.max - domain.min) / options.forceNumTicks).max;
                    if(domain.min < 0) {
                        var minPercent = Math.abs(domain.min) / (domain.max - domain.min),
                            numTicksForMin = Math.floor(options.forceNumTicks * minPercent),
                            numTicksForMax = Math.floor(options.forceNumTicks * (1 - minPercent));

                        newMin = domain.min;
                        newMax = domain.max;
                        
                        if(numTicksForMin <= 0) {
                            numTicksForMin ++;
                            numTicksForMax --;
                        }
                        if(numTicksForMax <= 0) {
                            numTicksForMin --;
                            numTicksForMax ++;
                        }
                        if((numTicksForMin + numTicksForMax) === options.forceNumTicks) {
                            if(numTicksForMin > numTicksForMax) {
                                numTicksForMin--;
                            } else {
                                numTicksForMax--;
                            }
                        }
                        unit = Math.round(Math.abs(newMin / numTicksForMin) - 1);
                        unit = graphUtils.prettyDomain(0, unit).max;
                        newMin = -Math.round(unit * numTicksForMin);    
                        newMax = Math.round(unit * numTicksForMax);
                        while(newMin >= domain.min && newMax <= domain.max) {
                            newMin = -Math.round(unit * numTicksForMin);    
                            newMax = Math.round(unit * numTicksForMax);
                            unit ++;
                            unit = graphUtils.prettyDomain(0, unit).max;
                        }
                    }
                    for(var i=-1; ++i<options.forceNumTicks;) {
                        tickValues.push(sanitizePrecision(newMin + unit * i));
                    }
                        
                } else if(options.forceDomain) {
                    domain = options.domain;
                    tickValues = sanitizePrecision(domain.ticks);
                } else {
                    tickValues = sanitizePrecision(domain.ticks);
                }

                scale.domain([_.min(tickValues), _.max(tickValues)]);
                // for(var i=-1; ++i<numTicks+1;) {
                //     tickValues.push(unit * i);
                // }
            } else if(scale.type === 'ordinal') {
                tickValues = scale.domain();
            }

            tickLabels = _.map(tickValues, format);
        };

        var findLabelWidths = function(labels) {
            for(var i=-1;++i<labels.length;) {
                var temp = paper.text(0,0, labels[i], core);
                labelWidths[labels[i]] = temp.getBBox().width;
                temp.remove();
            }
        };

        var findWordWidths = function(labels) {
            var words = extractWords(labels);
            for(var i=-1; ++i<words.length;) {
                var temp = paper.text(0,0, words[i], core);
                wordWidths[words[i]] = temp.getBBox().width;
                temp.remove();
            }
        };

        var extractWords = function(labels) {
            var list = [];
            for(var i=-1; ++i<labels.length;) {
                var label = labels[i];
                list = list.concat(label.split(' '));
            }

            return list;
        };

        var getLines = function(label, width) {
            // TODO: Fix a bug with the line becoming one worded later
            var words = label.split(' ');

            var lengths = _.values(_.pick(wordWidths, words));
            var lines = 1;
            var wordsLine = [''];
            var sum = 0;
            for (var i = 0; i < words.length; i++) {
                if (sum + lengths[i] < width) {
                  sum += lengths[i];
                  wordsLine[lines - 1] += (' ' + words[i]);
                } else {
                  lines++;
                  wordsLine[lines - 1] = ' ' + words[i];
                  sum = lengths[i];
                }
            }

            return {
                numLines: lines,
                words: wordsLine
            };
        };

        var shouldWeTilt = function(labels, width) {
            var tilt = false;
            for(var i=-1;++i<labels.length;) {
                var words = labels[i].split(' '),
                    lengths = _.values(_.pick(wordWidths, words)),
                    maxLength = _.max(lengths);
                if(maxLength > width) {
                    tilt = true;
                    break;
                }
            }
            
            return tilt;
        };

        var shouldLabelBeShown = function() {

            if(typeof options.showLabelFlag === 'undefined'){
                return true;
            }
            else {
                return options.showLabelFlag;
            }
        }

        var readjustNumTicks = function () {
            var unit = (options.type === 'left' || options.type === 'right') ? height : width;

            if(options.scale.type === 'linear' && unit) {
                var threshold = unit / tickValues.length;
                if(threshold < MIN_TICK_THRESHOLD) {
                    var hasNegative = _.min(tickValues) < 0;
                    tickValues = [];
                    options.forceNumTicks = Math.floor(height / MIN_TICK_THRESHOLD) + 1;
                    options.forceNumTicks = hasNegative ? options.forceNumTicks < 3 ? 3 : options.forceNumTicks : options.forceNumTicks < 2 ? 2 : options.forceNumTicks;
                    createTickValues ();
                    for(i=-1; ++i<ticks.length;) {
                        ticks[i].remove();
                        ticks[i] = null;
                    }
                    ticks = createTicks(tickValues, options.type);
                }
            }
        }
    };

    return Axis;
});