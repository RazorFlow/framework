define(['razorcharts/utils/timer', 'vendor/lodash'], function(Timer, _) {
    var Gauge = function() {
        var PADDING = 0.7,
            VALUE_LABEL_FONT_SIZE = 24,
            INNERCIRCLE_USABLE_SPACE = 0.5;
        var self = this,
            options = null,
            paper = null,
            core = null,
            width = null,
            height = null,
            background = null,
            main = null,
            innerCircle = null,
            valueLabel = null,
            valueText = null,
            value = null,
            labels = {
            };

        self.config = function(_options) {
            options = _options;
        };

        self.renderTo = function(_paper, _core, w, h) {
            paper = _paper;
            core = _core;
            width = w;
            height = h;

            draw(true, false);
        };

        self.resizeTo = function(w, h) {
            width = w;
            height = h;
            draw(false, false);
        };

        self.updateSeries = function(_series) {
            options.value = _series.value;
            draw(false, true);
        };

        var draw = function(create, animate) {
            var cx = width / 2,
                cy = height / 2,
                t,
                r = (_.min([width, height]) / 2),
                oldValue = value || null,
                formatFunc = options.format || function(item) {return item;};
            r *= PADDING;
            value = options.value;
            valueText = formatFunc(value);
            if(value < options.min) {
                console.error('Value below minimum');
            } else if(value > options.max) {
                console.error('Value above maximum');
            }
            var oldValuePercent = oldValue ? Math.abs(oldValue / (options.max - options.min)) : 0,
                valPercent = value > options.min ? value < options.max ? Math.abs((value - options.min) / (options.max - options.min)) : 1 : 0,
                innerRadius = r - r*0.05,
                innerCircleRadius = r - r*0.5,
                arrowPointRadius = r - r*0.4;
            
            backgroundPath = slicePath(cx, cy, -240, 60, innerRadius, r);
            valuePath = slicePath(cx, cy, -240, -240 + (oldValuePercent * 300), innerRadius, r);
            innerCirclePath = slicePath(cx, cy, -230, 110, innerCircleRadius, 0, true, arrowPointRadius, 10);
            if(create) {
                background = paper.path(backgroundPath, core);
                background.node.setAttribute('class', 'background');
                main = paper.path(valuePath, core);
                main.node.setAttribute('class', 'main');
                innerCircle = paper.path(innerCirclePath, core);
                innerCircle.node.setAttribute('class', 'inner-circle');
                valueLabel = paper.text(cx, cy, valueText, core);
                valueLabel.node.setAttribute('class', 'value-label');
                background.attr({
                    fill: '#888'
                });

                main.attr({
                    fill: '#080'
                });

                t = angleToPoint(cx, cy, r, -240);
                labels['min'] = paper.text(t.x, t.y, "" + formatFunc(options.min), core);
                labels['min'].attr({x: t.x, y: t.y + labels['min'].getBBox().height});
                t = angleToPoint(cx, cy, r, 60);
                labels['max'] = paper.text(t.x, t.y, "" + formatFunc(options.max), core);
                labels['max'].attr({x: t.x, y: t.y + labels['max'].getBBox().height});
                labels['min'].node.setAttribute('class', 'label');
                labels['max'].node.setAttribute('class', 'label');

            } else {
                background.attr({
                    path: backgroundPath
                });
                main.attr({
                    path: valuePath
                });
                innerCircle.attr({
                    path: innerCirclePath
                });
                valueLabel.attr({
                    text: valueText,
                    x: cx,
                    y: cy
                });
                t = angleToPoint(cx, cy, r, -240);
                labels['min'].attr({x: t.x, y: t.y + labels['min'].getBBox().height});
                t = angleToPoint(cx, cy, r, 60);
                labels['max'].attr({x: t.x, y: t.y + labels['min'].getBBox().height});
            }
            valueLabel.attr({
                'font-size': VALUE_LABEL_FONT_SIZE
            });
            var valueLabelWidth = valueLabel.getBBox().width,
                innerCircleDiameter = (innerCircleRadius * 2) * INNERCIRCLE_USABLE_SPACE;
            
            if(innerCircleDiameter < valueLabelWidth) {
                var newFontSize = (innerCircleDiameter / valueLabelWidth) * VALUE_LABEL_FONT_SIZE;
                valueLabel.attr({
                    'font-size': newFontSize
                });
                labels['min'].attr({'font-size': newFontSize * 0.8});
                labels['max'].attr({'font-size': newFontSize * 0.8});
                t = angleToPoint(cx, cy, r, -240);
                labels['min'].attr({x: t.x, y: t.y + labels['min'].getBBox().height});
                t = angleToPoint(cx, cy, r, 60);
                labels['max'].attr({x: t.x, y: t.y + labels['max'].getBBox().height});
            }
            if(animate) {
                innerCircle.animate({
                    transform: 'r' + (valPercent * 300)
                }, 500);
            } else {
                innerCircle.transform('r' + (valPercent * 300));
            }
                

            if(animate) {
                !function(main) {
                    Timer(function(d) {
                        d /= 500;
                        main.attr({
                            path: slicePath(cx, cy, -240, -240 + (oldValuePercent * 300) + ((valPercent - oldValuePercent) * 300) * d, innerRadius, r)
                        });
                    }, 500);    
                }(main);
            } else {
                main.attr({
                    path: slicePath(cx, cy, -240, -240 + (valPercent * 300), innerRadius, r)
                });
            }
        };

         var angleToPoint = function(cx, cy, r, angle) {
            var point = {};

            point.x = cx + r * Math.cos(Math.PI * angle / 180);
            point.y = cy + r * Math.sin(Math.PI * angle / 180);

            return point;
        };

        var slicePath = function(cx, cy, startAngle, endAngle, innerRadius, outerRadius, arrow, arrowRadius, distance){
            var cut = Math.abs(startAngle - endAngle) > 180 ? 1 : 0;

            var startX  = cx + innerRadius * Math.cos(Math.PI * startAngle / 180),
                startY = cy + innerRadius * Math.sin(Math.PI * startAngle / 180),
                endX  = cx + innerRadius * Math.cos(Math.PI * endAngle / 180),
                endY = cy + innerRadius * Math.sin(Math.PI * endAngle / 180);

            var x1 = cx + outerRadius * Math.cos(Math.PI * startAngle/180),
                y1 = cy + outerRadius * Math.sin(Math.PI * startAngle/180),
                x2 = cx + outerRadius * Math.cos(Math.PI * endAngle/180),
                y2 = cy + outerRadius * Math.sin(Math.PI * endAngle/180);

            var lastPath = "";

            if(arrow) {
                var arrowX = cx + arrowRadius * Math.cos(Math.PI * (endAngle + distance) / 180);
                var arrowY = cy + arrowRadius * Math.sin(Math.PI * (endAngle + distance) / 180);

                lastPath = arrow ? " L" + arrowX + "," + arrowY + " L" + endX + "," + endY : "";
            }
            
            var pathString = "M"+ startX + " " + startY + " L" + x1 + " " + y1 + " A" + outerRadius + " " + outerRadius + " 0 " + cut + " 1 " + x2 + " " + y2 + 
                                " L"+ endX + " " + endY +" A" + innerRadius + " " + innerRadius + " 0 " + cut + " 0 " + startX + " " + startY + lastPath + " z";
            if(arrow) {
                pathString = " M"+ endX + " " + endY +" A" + innerRadius + " " + innerRadius + " 0 " + cut + " 0 " + startX + " " + startY + lastPath + " z";
            }

            return pathString;
        };
    };

    return Gauge;
});