define(['razorcharts/utils/pathgen', 'vendor/lodash'], function(pathGen, _) {
    var Modernizr = {touch: false};
    var TOOLTIP_HIDE_TIMEOUT = 1000;
    var Tooltip = function () {
        var self = this,
            options = null,
            paper = null,
            core = null,
            container = null,
            width = null,
            height = null,
            xOffset =  null,
            yOffset = null,
            parts = [],
            currentPart = -1,
            tooltip = null,
            tooltipWidth = 100,
            tooltipHeight = 80,
            tooltipPath = null,
            tooltipStruct = {
            },
            tooltipValues = {

            },
            partWidth,
            partHeight,
            items = [];
        
        self.config = function(_options) {
            options = _options;
        };

        self.renderTo = function(_paper, _core, w, h, xoff, yoff) {
            paper = _paper;
            core = _core;
            width = w;
            height = h;
            container = paper.group('rc-tooltip-container', core);
            container.toBack();
            xOffset = xoff || 0;
            yOffset = yoff || 0;
            init(true);
            if(options.display !== 'custom') {
                draw(true);    
            }
        };

        var draw = function(create) {
            var xPadding = 6, yPadding = 10, labelYPadding = 8;
            var mainLabel, line, paddingTop, pathgen, pathString;
            if(create) {
                tooltip = paper.group('tooltip', core);
                tooltip.node.setAttribute('class', 'rc-tooltip');
                var rect = paper.rect(0,0, tooltipWidth, tooltipHeight, tooltip);
                rect.node.setAttribute('class', 'rect');
                if(options.popup) {
                    pathgen = new pathGen();
                    pathString;
                    if(options.popupType === 'top') {
                        pathString = pathgen.moveTo(0, 0).lineTo(tooltipWidth, 0).lineTo(tooltipWidth, tooltipHeight).lineTo((tooltipWidth / 2) + 10, tooltipHeight)
                                    .lineTo(tooltipWidth / 2, tooltipHeight + 10).lineTo(tooltipWidth/2 - 10, tooltipHeight).lineTo(0, tooltipHeight).path();    
                        // pathString = pathgen.moveTo(5, 0).lineTo(tooltipWidth - 5, 0).qTo(tooltipWidth, 0, tooltipWidth, 5).lineTo(tooltipWidth, tooltipHeight - 5).qTo(tooltipWidth, tooltipHeight, tooltipWidth-5, tooltipHeight).lineTo((tooltipWidth / 2) + 5, tooltipHeight)
                        //             .lineTo(tooltipWidth / 2, tooltipHeight + 5).lineTo(tooltipWidth/2 - 5, tooltipHeight).lineTo(5, tooltipHeight).qTo(0, tooltipHeight, 0, tooltipHeight - 5). lineTo(0, 5).qTo(0, 0, 5, 0).path();
                    } else if(options.popupType === 'left') {
                        pathString = pathgen.moveTo(0, tooltipHeight / 2).lineTo(10, tooltipHeight / 2 - 10).lineTo(10, 0).lineTo(tooltipWidth, 0).lineTo(tooltipWidth, tooltipHeight)
                                        .lineTo(10, tooltipHeight).lineTo(10, tooltipHeight / 2 + 10).lineTo(0, tooltipHeight / 2).path();
                    }
                    
                    pathString += ' z';
                    tooltipPath = paper.path(pathString, tooltip);
                    tooltipPath.node.setAttribute('class', 'rect');    
                }

                mainLabel = paper.text(0,0, 'placeholder-main-label', tooltip);
                mainLabel.attr({
                    x: xPadding,
                    y: mainLabel.getBBox().height / 2 + labelYPadding,
                    'text-anchor': 'start'
                });
                mainLabel.node.setAttribute('class', 'mainLabel');
                var _y = mainLabel.getBBox().height + mainLabel.getBBox().height / 2 + labelYPadding;
                line = paper.path('M' + xPadding + ',' + _y + ' L' + (tooltipWidth - xPadding) + ',' + _y, tooltip);
                line.node.setAttribute('class', 'rc-tooltip-dash');
                tooltipStruct['line'] = line;
                tooltipStruct['mainLabel'] = mainLabel;
                tooltipStruct['rect'] = rect;
                paddingTop = mainLabel.getBBox().height;
                tooltipStruct['parts'] = [];
                // debugger
                rect.attr({
                    height: paddingTop * options.numLabels + paddingTop + yPadding * 2 + labelYPadding * options.numLabels
                });
            } else {
                mainLabel = tooltipStruct.mainLabel;
                mainLabel.attr({
                    text: tooltipValues.label
                });
            }
            var maxWidth = 0, i;
            for(i=-1; ++i<options.numLabels;) {
                var label, value;
                if(create) {
                    label = paper.text(0,0, 'pl-1', tooltip);
                    value = paper.text(0,0, 'pv-1', tooltip);
                    tooltipStruct['parts'][i] = {
                        'label': label,
                        'value': value
                    };
                    label.attr({
                        x: 0 + xPadding,
                        y: i * label.getBBox().height + paddingTop + mainLabel.getBBox().height / 2 + yPadding * 2 + labelYPadding * i,
                        'text-anchor': 'start'
                    });
                    value.attr({
                        x: label.getBBox().width + xPadding,
                        y: i * label.getBBox().height + paddingTop + mainLabel.getBBox().height / 2 + yPadding * 2 + labelYPadding * i,
                        'text-anchor': 'end'
                    });
                    label.node.setAttribute('class', 'rf-tooltip-label');
                    
                    value.node.setAttribute('class', 'rf-tooltip-value');
                } else {
                    label = tooltipStruct.parts[i].label;
                    value = tooltipStruct.parts[i].value;
                    label.attr({
                        text: tooltipValues.seriesLabels[i]
                    });
                    value.attr({
                        text: tooltipValues.data[i]
                    });
                    value.attr({
                        x: tooltipWidth - xPadding
                    });
                    var totalWidth = label.getBBox().width + value.getBBox().width;
                    maxWidth = maxWidth < totalWidth ? totalWidth : maxWidth;
                    if(!tooltipValues.label) {
                        label.attr({
                            y: yPadding
                        });
                        value.attr({
                           y: yPadding
                        });
                        tooltipStruct['line'].attr({opacity: 0});
                        tooltipStruct['rect'].attr({height: yPadding * 2});
                    }
                }
            }
            tooltip.attr({
                'opacity': 0
            });
            if(maxWidth > tooltipWidth) {
                tooltipWidth = maxWidth + xPadding * 2 + 10;
                tooltipStruct.rect.attr({
                    width: tooltipWidth
                });
                for(i=-1; ++i<options.numLabels;) {
                    tooltipStruct.parts[i].value.attr({
                        x: maxWidth + 10
                    });
                }
            }
            tooltipHeight = tooltipStruct.rect.getBBox().height;

            if(options.popup) {
                tooltipStruct.rect.attr({'opacity': 0});
                pathgen = new pathGen();
                pathString;
                if(options.popupType === 'top') {
                    pathString = pathgen.moveTo(0, 0).lineTo(tooltipWidth, 0).lineTo(tooltipWidth, tooltipHeight).lineTo((tooltipWidth / 2) + 5, tooltipHeight)
                                .lineTo(tooltipWidth / 2, tooltipHeight + 5).lineTo(tooltipWidth/2 - 5, tooltipHeight).lineTo(0, tooltipHeight).path();    
                    // pathString = pathgen.moveTo(5, 0).lineTo(tooltipWidth - 5, 0).qTo(tooltipWidth, 0, tooltipWidth, 5).lineTo(tooltipWidth, tooltipHeight - 5).qTo(tooltipWidth, tooltipHeight, tooltipWidth-5, tooltipHeight).lineTo((tooltipWidth / 2) + 5, tooltipHeight)
                    //                 .lineTo(tooltipWidth / 2, tooltipHeight + 5).lineTo(tooltipWidth/2 - 5, tooltipHeight).lineTo(5, tooltipHeight).qTo(0, tooltipHeight, 0, tooltipHeight - 5). lineTo(0, 5).qTo(0, 0, 5, 0).path();
                } else if(options.popupType === 'left') {
                    pathString = pathgen.moveTo(0, tooltipHeight / 2).lineTo(10, tooltipHeight / 2 - 10).lineTo(10, 0).lineTo(tooltipWidth, 0).lineTo(tooltipWidth, tooltipHeight)
                                    .lineTo(10, tooltipHeight).lineTo(10, tooltipHeight / 2 + 10).lineTo(0, tooltipHeight / 2).path();
                }
                pathString += ' z';
                tooltipPath.attr({path: pathString});
            } 
        };

        self.resizeTo = function(w, h, xoff, yoff) {
            width = w;
            height = h;
            xOffset = xoff || 0;
            yOffset = yoff || 0;
            var numParts = options.numParts || 1;
            partWidth = width / numParts;
            partHeight = height / numParts;
            init(false);
        };

        self.addItems = function(_items) {
            items[0] = _items;
        };

        self.addSeriesItems = function(seriesIndex, _items) {
            items[seriesIndex-1] = _items;
        };

        self._init = function() {
            init(true);
        };

        var init = function(create) {
            if(options.type === 'area') {
                initializeAreaTooltip(create);
            } else if(options.type === 'item') {
                initializeItemTooltip(create);
            }
        };

        var initializeItemTooltip = function(create) {
            var timeout;
            if(create) {
                for(var i=-1; ++i<items.length;) {
                    if(!items[i]) { continue; }
                    for(var j=-1; ++j<items[i].length;) {
                         !function(seriesIndex, num) {
                            if(options.display === 'custom') {
                                if(options.popup) {
                                    var popupType = options.popupType || 'top';
                                    if(Modernizr.touch) {
                                        items[seriesIndex][num].touchstart(function(ev, x, y) {
                                            var item = items[seriesIndex][num].node.getBoundingClientRect();
                                            var data = options.data(seriesIndex, num);
                                            x = popupType === 'top' ? item.left + item.width / 2 : item.left + item.width;
                                            y = popupType === 'top' ? item.top : item.top + item.height / 2;
                                            options.onShow(x, y, data);
                                            clearTimeout(timeout);
                                        });
                                    } else {
                                        items[seriesIndex][num].mouseover(function(ev, x, y) {
                                            var item = items[seriesIndex][num].node.getBoundingClientRect();
                                            var data = options.data(seriesIndex, num);
                                            x = popupType === 'top' ? item.left + item.width / 2 : item.left + item.width;
                                            y = popupType === 'top' ? item.top : item.top + item.height / 2;
                                            options.onShow(x, y, data);
                                            clearTimeout(timeout);
                                        });
                                    }
                                        
                                } else {
                                    if(Modernizr.touch) {
                                        items[seriesIndex][num].touchstart(function(ev, x, y) {
                                            var newX = ev.touches[0].pageX;
                                            var newY = ev.touches[0].pageY;
                                            var data = options.data(seriesIndex, num);
                                            options.onShow(newX, newY, data);
                                            clearTimeout(timeout);
                                        });
                                    } else {
                                        items[seriesIndex][num].mousemove(function(ev, x, y) {
                                            var data = options.data(seriesIndex, num);
                                            options.onShow(x, y, data);
                                            clearTimeout(timeout);
                                        });
                                    } 
                                        
                                }
                                items[seriesIndex][num].mouseout(function(ev, x, y) {
                                    timeout = setTimeout(function() {
                                        options.onHide();    
                                    }, TOOLTIP_HIDE_TIMEOUT);
                                });
                            } else {
                                if(options.popup) {
                                    var tooltipEvent = function(ev, x, y) {
                                        // var newX = (ev.offsetX ? ev.offsetX : ev.layerX) - xOffset;
                                        // var newY = (ev.offsetY ? ev.offsetY : ev.layerY) - yOffset;
                                        var newX, newY;
                                        if(options.popupType === 'top') {
                                            if(_.isNumber(items[seriesIndex][num].attrs.x)) {
                                                newX = items[seriesIndex][num].attrs.x + (items[seriesIndex][num].getBBox().width / 2 - tooltip.node.getBBox().width / 2);
                                                newY = items[seriesIndex][num].attrs.y - tooltip.node.getBBox().height;    

                                            } else {
                                                newX = items[seriesIndex][num].attrs.cx - tooltip.node.getBBox().width / 2;
                                                newY = items[seriesIndex][num].attrs.cy - tooltip.node.getBBox().height - 10;    
                                            }    
                                        } else if(options.popupType === 'left') {
                                            if(_.isNumber(items[seriesIndex][num].attrs.x)) {
                                                newX = items[seriesIndex][num].attrs.x + items[seriesIndex][num].attrs.width;
                                                newY = items[seriesIndex][num].attrs.y + (items[seriesIndex][num].getBBox().height / 2 - tooltip.node.getBBox().height / 2);

                                            } else {
                                                newX = items[seriesIndex][num].attrs.cx - tooltip.node.getBBox().width / 2;
                                                newY = items[seriesIndex][num].attrs.cy - tooltip.node.getBBox().height - 10;    
                                            }
                                        }
                                        
                                        
                                        var data = options.data(seriesIndex, num);
                                        tooltipValues = data;
                                        draw(false);
                                        var rotation = false;
                                        if(options.popupType === 'top') {
                                            if(newY < 0) {
                                                newY = (items[seriesIndex][num].attrs.y || items[seriesIndex][num].attrs.cy)  + 10;
                                                tooltipPath.transform('r180 t0,10');
                                                rotation = true;
                                            } else {
                                                tooltipPath.transform('r0');
                                            }
                                            if(newX + tooltipWidth > width) {
                                                var nx = newX;
                                                newX = width - tooltipWidth;
                                                var diff = rotation ? tooltipWidth / 2 - (nx - newX) : tooltipWidth / 2 + (nx - newX);
                                                var pathgen = new pathGen();
                                                var pathString = pathgen.moveTo(5, 0).lineTo(tooltipWidth - 5, 0).qTo(tooltipWidth, 0, tooltipWidth, 5).lineTo(tooltipWidth, tooltipHeight - 5).qTo(tooltipWidth, tooltipHeight, tooltipWidth-5, tooltipHeight).lineTo(diff + 5, tooltipHeight)
                                                                .lineTo(diff, tooltipHeight + 5).lineTo(diff - 5, tooltipHeight).lineTo(5, tooltipHeight).qTo(0, tooltipHeight, 0, tooltipHeight - 5). lineTo(0, 5).qTo(0, 0, 5, 0).path();
                                                pathString += ' z';
                                                tooltipPath.attr({path: pathString});
                                                
                                            }
                                        }
                                        tooltip.animate({
                                            transform: 't' + newX + ',' + newY,
                                            opacity: 1
                                        }, 100);
                                        clearTimeout(timeout);
                                    };
                                    if(Modernizr.touch) {
                                        items[seriesIndex][num].touchstart(tooltipEvent);
                                    } else {
                                        items[seriesIndex][num].mouseover(tooltipEvent);
                                    }
                                    
                                } else {
                                    if(Modernizr.touch) {
                                        items[seriesIndex][num].touchstart(function(ev, x, y) {
                                            var newX = (ev.offsetX ? ev.offsetX : ev.layerX) - xOffset;
                                            var newY = (ev.offsetY ? ev.offsetY : ev.layerY) - yOffset - tooltipHeight * 2;
                                            
                                            var data = options.data(seriesIndex, num);
                                            tooltipValues = data;
                                            draw(false);
                                            if(newY < 0) { newY = 0; }
                                            if(newX + tooltipWidth > width) { newX = width - tooltipWidth - 10; }
                                            if(newY + tooltipHeight > height) { newY = height - tooltipHeight - 10; }
                                            tooltip.attr({
                                                transform: 't' + newX + ',' + newY,
                                                opacity: 1
                                            });
                                            clearTimeout(timeout);
                                        });
                                    } else {
                                           items[seriesIndex][num].mousemove(function(ev, x, y) {
                                            var newX = (ev.offsetX ? ev.offsetX : ev.layerX) - xOffset;
                                            var newY = (ev.offsetY ? ev.offsetY : ev.layerY) - yOffset - tooltipHeight * 2;
                                            // var newX = items[seriesIndex][num].node.getBoundingClientRect().left;
                                            // var newY = items[seriesIndex][num].node.getBoundingClientRect().top;
                                            var data = options.data(seriesIndex, num);
                                            tooltipValues = data;
                                            draw(false);
                                            if(newY < 0) { newY = 0; }
                                            if(newX + tooltipWidth > width) { newX = width - tooltipWidth - 10; }
                                            if(newY + tooltipHeight > height) { newY = height - tooltipHeight - 10; }
                                            tooltip.attr({
                                                transform: 't' + newX + ',' + newY,
                                                opacity: 1
                                            });
                                            clearTimeout(timeout);
                                        });
                                    }
                                }

                                items[seriesIndex][num].mouseout(function(ev, x, y) {
                                    timeout = _.delay(function() {
                                        tooltip.animate({
                                            opacity: 0
                                        }, 100);
                                    }, 1000);
                                });
                            }
                        }(i, j);
                    }
                }
            }
        };

        var initializeAreaTooltip = function(create) {
            var surfaceType = options.surfaceType || 'column',
                timeout,
                numParts = options.numParts || 1;
            partWidth = width / numParts;
            partHeight = height / numParts;
            if(create) {
                cover = paper.rect(0, 0, width, height, container);
                cover.attr({
                    fill: '#000',
                    opacity: 0
                });
                if(surfaceType === 'column') {
                    core.mousemove(_.throttle(function(ev, x, y) {
                        // TODO: Simple IE detection here avoid this
                        var newX = (ev.offsetX ? ev.offsetX : ev.layerX) - (!!window.ActiveXObject ? 0 : xOffset);
                        var newY = (ev.offsetY ? ev.offsetY : ev.layerY) - (!!window.ActiveXObject ? 0 : yOffset);
                        var newPart = Math.floor(newX / partWidth);
                        if(newPart !== currentPart && newPart >= 0 && newPart <= numParts) {
                            var data = options.data(newPart);
                            tooltipValues = data;
                            draw(false);
                            if(newX + tooltipWidth > width) { newX = width - tooltipWidth; }
                            if(newY + tooltipHeight > height) { newY = height - tooltipHeight; }
                            tooltip.animate({
                                transform: 't' + newX + ',' + newY,
                                opacity: 1
                            }, 100);
                            if(timeout) { clearTimeout(timeout); }
                            timeout = setTimeout(function() {
                                tooltip.attr({opacity: 0});
                                currentPart = -1;
                            }, 1000);
                        }
                        currentPart = newPart;
                    }, 100));
                } else if(surfaceType === 'row') {
                    core.mousemove(_.throttle(function(ev, x, y) {
                        var newX = (ev.offsetX ? ev.offsetX : ev.layerX) - xOffset;
                        var newY = (ev.offsetY ? ev.offsetY : ev.layerY) - yOffset;
                        var newPart = Math.floor(newY / partHeight);
                        if(newPart !== currentPart && newPart >= 0 && newPart <= numParts) {
                            var data = options.data(newPart);
                            tooltipValues = data;
                            draw(false);
                            if(newX + tooltipWidth > width) { newX = width - tooltipWidth - 10; }
                            if(newY + tooltipHeight > height) { newY = height - tooltipHeight - 10; }
                            tooltip.animate({
                                transform: 't' + newX + ',' + newY,
                                opacity: 1
                            }, 100);
                            if(timeout) { clearTimeout(timeout); }
                            timeout = setTimeout(function() {
                                tooltip.attr({opacity: 0});
                                currentPart = -1;
                            }, 1000);
                        }
                        currentPart = newPart;
                    }, 100));
                }
            } else {
                cover.attr({
                    x: 0,
                    y: 0,
                    width: width,
                    height: height
                });
            }
                
        };
    };

    return Tooltip;
});