define(['razorcharts/utils/timer', 'razorcharts/utils/pathgen', 'razorcharts/utils/tooltip', 'vendor/lodash'], function(Timer, PathGen, Tooltip, _) {
    var Pie = function() {
        var PADDING = 0.2;
        var ARROW_RADIUS_PADDING = 90;
        var MIN_CHART_WIDTH = 30;
        var self = this,
            options = null,
            paper = null,
            core = null,
            pieCore = null,
            width = null,
            height = null,
            pieGroup = null,
            pieSlices = [],
            labelSizes = [], pieRadius = null,
            registeredLabelPos = [],
            labelObjects = [],
            tooltip = new Tooltip(),
            sliceBBoxes = [],
            noLabels = false;

        var extraFuncs = {
            hasLabels: function() {
                findPieRadius((_.min([width, height]) / 2), labelSizes, options.series.data);
                return !noLabels;
            }
        };

        self.config = function(_options) {
            options = _options;
            options.series.format = options.series.format || function(item) {return item;};
            eventManager = options.eventManager;

            eventManager.register('plotItemClick');
            eventManager.register('plotItemMouseOver');
            eventManager.register('plotItemMouseOut');
            eventManager.register('plotItemActivate');
            if(options.tooltip) {
                tooltip.config({
                    type: 'item',
                    display: 'custom',
                    onShow: options.tooltip.onShow,
                    onHide: options.tooltip.onHide,
                    data: function(seriesIndex, num) {
                        return {
                            label: '',
                            seriesLabels: [options.labels[num]],
                            data: [options.series.data[num]],
                            seriesIndex: num + 1
                        };
                    }
                });
            } else {
                tooltip.config({
                    type: 'item',
                    numLabels: 1,
                    data: function(seriesIndex, num) {
                        return {
                            label: '',
                            seriesLabels: [options.labels[num]],
                            data: [options.series.data[num]],
                            seriesIndex: num + 1
                        };
                    }
                });
            }
        };

        self.renderTo = function(_paper, _core, w, h) {
            noLabels = false;
            paper = _paper;
            core = _core;
            width = w;
            height = h;
            findWidths(options.labels,options.series.data);
            pieRadius = findPieRadius((_.min([width, height]) / 2), labelSizes, options.series.data);
            draw(true, true && options.animateOnRender);
            tooltip.addItems(pieSlices);
            tooltip.renderTo(paper, core, width, height, 0, 0);
        };

        self.callFunction = function(func) {
            if(extraFuncs[func]) {
                return extraFuncs[func]();
            }
        };

        self.resizeTo = function(w, h) {
            noLabels = false;
            width = w;
            height = h;
            findWidths(options.labels,options.series.data);
            pieRadius = findPieRadius((_.min([width, height]) / 2), labelSizes, options.series.data);
            if(noLabels || !options.showPieLabels) {
                hideAllLabels();
            } else {
                showAllLabels();
            }
            draw(false, false);
            tooltip.resizeTo(width, height, 0, 0);
        };

        self.updateSeries = function() {
            draw(false, true);
        };

        var hideAllLabels = function() {
            for(var i=-1; ++i<labelObjects.length;) {
                labelObjects[i].line.node.style.display = 'none';
                labelObjects[i].label.node.style.display = 'none';
                labelObjects[i].text.node.style.display = 'none';
            }
        };

        var showAllLabels = function(){
            for(var i=-1; ++i<labelObjects.length;) {
                labelObjects[i].line.node.style.display = 'block';
                labelObjects[i].label.node.style.display = 'block';
                labelObjects[i].text.node.style.display = 'block';
            }
        };

        var draw = function(create, animate) {
            var series = options.series,
                data = series.data,
                total = _.reduce(data, function(mem, item) {return mem + item;}),
                cx = width / 2,
                cy = height / 2, 
                r = pieRadius,
                ir = r;

            r = r - r * PADDING;

            // Temp fix
            if(noLabels || !options.showPieLabels) {
                r = _.min([width, height]) / 2;
                r *= 0.8;    
            }
            

            ir = options.donut ? r * 0.7 : 0;
            if(create) {
                pieCore = paper.group('pie-chart', core);
                pieCore.node.setAttribute('class', 'rc-pie-chart');
                pieGroup = paper.group('pie-series', pieCore);
                pieGroup.node.setAttribute('class', 'rc-pie-series');
            }
            registeredLabelPos = [];
            var startAngle = 0,
                endAngle = 0;

                for(var i=-1; ++i<data.length;) {
                    var datum = data[i],
                        slice = null,
                        path = '';
                    endAngle = startAngle + (datum / total) * 360;
                    if(!noLabels || !options.showPieLabels) {
                        drawLabel(create, animate, cx, cy, (startAngle + endAngle) / 2, r, r + ARROW_RADIUS_PADDING, options.labels[i], i);    
                    }
                    if(create) {
                        var customColor = options.series.colors ? options.series.colors[i] === 'auto' ? '' : options.series.colors[i] : '';
                        slice = pieSlices[i] = paper.path(path, pieGroup);
                        slice.node.setAttribute('class', (series.classed || '') + customColor ? '' : (' rc-plot-item-' + (i+1)));
                        var params = {
                            seriesIndex: i,
                            dataIndex: i,
                            value: datum,
                            label: options.labels[i]
                        };
                        if(customColor) {
                            slice.attr({'fill': customColor, "stroke": 'none'});
                        }
                        slice.click(createClickCallback(params));
                        slice.mouseover(createOverCallback(params));
                        slice.mouseout(createOutCallback(params));
                    } else {
                        slice = pieSlices[i];
                    }
                    if(animate) {
                        !function(slice, startAngle, endAngle) {
                            Timer(function(d) {
                                d /= 500;
                                slice.attr({
                                    path: slicePath(cx, cy, startAngle * d, endAngle * d, ir, r)
                                });
                            }, 500);    
                        }(slice, startAngle, endAngle);
                    } else {
                        slice.attr({
                            path: slicePath(cx, cy, startAngle, endAngle, ir, r)
                        });
                    }
                    
                    sliceBBoxes[i] = slicePath(cx, cy, startAngle, endAngle, ir, r);
                    startAngle = endAngle;                        
                }
        };

        var drawLabel = function(create, animate, cx, cy, angle, sr, er, label, idx) {
            var path = new PathGen();
            var spoint = angleToPoint(cx, cy, sr, angle);
            var epoint = angleToPoint(cx, cy, er, angle);
            
            var x = epoint.x + (epoint.x < cx ? -labelSizes[idx].width : 0),
                y = epoint.y - labelSizes[idx].height / 2,
                w = labelSizes[idx].width,
                h = labelSizes[idx].height;
            


            var newBox = getCorrectedBoundingBox({
                x: x,
                y: y,
                width: w,
                height: h,
                cx: cx,
                cy: cy,
                angle: angle,
                r: er
            });
            var pathString = path.moveTo(spoint.x, spoint.y).lineTo(newBox.x + (newBox.x < cx ? w : 0), newBox.y + h / 2).lineTo(newBox.x + (newBox.x < cx ? -10 + w : 10), newBox.y + h/2).path();
            var line, text, circle;
            if(create) {
                line = paper.path(Raphael.path2curve(pathString), pieCore);
                line.node.setAttribute('class', 'pie-label-line');
                text = paper.text(newBox.x + (newBox.x < cx ? -20 + w : 20) , newBox.y + h/2 , options.series.format(options.series.data[idx]), pieCore);
                text.node.setAttribute('class', 'pie-label-text');
                label = paper.text(newBox.x + (newBox.x < cx ? -28 - text.getBBox().width + w : 28 + text.getBBox().width) , newBox.y + h/2 , label, pieCore);
                label.node.setAttribute('class', 'pie-label-label');
                text.attr({
                    'text-anchor':newBox.x < cx ? 'end' : 'start'
                });
                label.attr({
                    'text-anchor':newBox.x < cx ? 'end' : 'start'
                });
                labelObjects[idx] = {
                    line: line,
                    text: text,
                    label: label
                };
            } else {
                line = labelObjects[idx].line;
                text = labelObjects[idx].text;
                label = labelObjects[idx].label;

                line.animate({
                    path: pathString
                }, animate ? 500 : 0);
                text.attr({
                    'text-anchor':newBox.x < cx ? 'end' : 'start',
                    text: options.series.format(options.series.data[idx])
                });

                label.attr({
                    'text-anchor':newBox.x < cx ? 'end' : 'start'
                });
                text.animate({
                    x: newBox.x + (newBox.x < cx ? -20 + w : 20),
                    y: newBox.y + h/2
                }, animate ? 500 : 0);

                label.animate({
                    x: newBox.x + (newBox.x < cx ? -28 - text.getBBox().width + w : 28 + text.getBBox().width),
                    y: newBox.y + h/2
                }, animate ? 500 : 0);
            }
        };

        var getLabelCoords = function(cx, cy, ex, ey, w, h) {
            return {
                x: ex + (ex < cx ? -w : 0),
                y: ey - h / 2,
                w: w,
                h: h
            };
        };

        function correctPlacement(box) {
            if (box.x < width / 2) {
              box.x -= box.width;
            }
            return box;
        }

        var detectCollision = function(box1, box2) {
            var temp1 = correctPlacement(_.clone(box1)),
                temp2 = correctPlacement(_.clone(box2));

            if (temp1.x < temp2.x + temp2.width && temp1.x + temp1.width > temp2.x &&
                temp1.y < temp2.y + temp2.height && temp1.y + temp1.height > temp2.y) {
              return true;
            }

            return false;
        };

        var getCorrectedBoundingBox = function(bbox) {
            var tBox = _.cloneDeep(bbox);

            for(var i=-1; ++i<registeredLabelPos.length;) {
                var bbox2 = registeredLabelPos[i];
                var angle = bbox.angle;
                var startAngle = angle;
                // debugger
                while(detectCollision(tBox, bbox2) && angle - startAngle < 22.5) {
                    var tr = paper.rect(tBox.x, tBox.y, bbox.width, bbox.height, core);
                    // console.log(angle);
                    // debugger
                    tr.remove();
                    
                    var newEpoint = angleToPoint(bbox.cx, bbox.cy, bbox.r, ++angle);
                    newEpoint.x = newEpoint.x + (newEpoint.x < bbox.cx ? -bbox.width : 0);
                    newEpoint.y = newEpoint.y - bbox.height / 2;
                    _.extend(tBox, newEpoint);
                }
            }
            registeredLabelPos.push(tBox);
            return tBox;
        };

        var angleToPoint = function(cx, cy, r, angle) {
            var point = {};

            point.x = cx + r * Math.cos(Math.PI * angle / 180);
            point.y = cy + r * Math.sin(Math.PI * angle / 180);

            return point;
        };

        var findWidths = function (labels, values) {
            for(var i=-1; ++i<labels.length;) {
                var text = paper.text(0, 0, labels[i] + '##' + options.series.format(values[i]), core);
                text.node.style.fontSize = 12;
                labelSizes[i] = {
                    width: text.node.getBBox().width,
                    height: text.node.getBBox().height
                };
                text.remove();
            }
        };

        var findPieRadius = function(maxRadius, sizes, data) {
            findArrowRadius(maxRadius);
            var startAngle = 0,
                endAngle = 0,
                total = _.reduce(data, function(mem, item) {return mem + item; });

            var placements = [];
            for(var i=-1; ++i<sizes.length;) {
                var datum = data[i];
                endAngle = startAngle + (datum / total) * 360;
                var pt = angleToPoint(maxRadius, maxRadius, maxRadius, (startAngle + endAngle) / 2);
                var placement = {};
                placement.width = sizes[i].width;
                placement.height = sizes[i].height;
                if(pt.x < maxRadius) {
                    placement.x = pt.x - sizes[i].width;
                    placement.y = pt.y - sizes[i].height / 2;
                    placement.xtra = placement.x < 0 ? -placement.x : 0;
                } else {
                    placement.x = pt.x;
                    placement.y = pt.y;
                    placement.xtra = (placement.x + placement.width - maxRadius * 2) > 0 ? (placement.x + placement.width - maxRadius * 2) : 0;
                }
                
                placements[i] = placement;
                startAngle = endAngle;
                // paper.rect(placement.x, placement.y, placement.width, placement.height, core);
            }
            var maxWidth = _.max(_.pluck(placements, 'xtra'));
            return adjustEverything(maxRadius, maxWidth);
            // return maxRadius - maxWidth - ARROW_RADIUS_PADDING;
        };

        var findArrowRadius = function(maxRadius) {
            ARROW_RADIUS_PADDING = maxRadius * 0.1;
        };

        var adjustEverything = function(maxRadius, maxLabelWidth) {
            var actualRadius = maxRadius - maxLabelWidth - ARROW_RADIUS_PADDING;
            if(actualRadius < MIN_CHART_WIDTH) {
                findArrowRadius(MIN_CHART_WIDTH);
                if(MIN_CHART_WIDTH / 2 + ARROW_RADIUS_PADDING + maxLabelWidth > width / 2) {
                    noLabels = true;
                    // console.log(!noLabels);
                }
                return MIN_CHART_WIDTH;
            } else {
                return actualRadius;
            }
        };

        var slicePath = function(cx, cy, startAngle, endAngle, innerRadius, outerRadius){
            var cut = Math.abs(startAngle - endAngle) > 180 ? 1 : 0;
            var startX  = cx + innerRadius * Math.cos(Math.PI * startAngle / 180),
                startY = cy + innerRadius * Math.sin(Math.PI * startAngle / 180),
                endX  = cx + innerRadius * Math.cos(Math.PI * endAngle / 180),
                endY = cy + innerRadius * Math.sin(Math.PI * endAngle / 180);

            var x1 = cx + outerRadius * Math.cos(Math.PI * startAngle/180),
                y1 = cy + outerRadius * Math.sin(Math.PI * startAngle/180),
                x2 = cx + outerRadius * Math.cos(Math.PI * endAngle/180),
                y2 = cy + outerRadius * Math.sin(Math.PI * endAngle/180);

            var pathString = "M"+ startX + " " + startY + " L" + x1 + " " + y1 + " A" + outerRadius + " " + outerRadius + " 0 " + cut + " 1 " + x2 + " " + y2 + 
                                " L"+ endX + " " + endY +" A" + innerRadius + " " + innerRadius + " 0 " + cut + " 0 " + startX + " " + startY + " z";

            return pathString;
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
    };

    return Pie;
});