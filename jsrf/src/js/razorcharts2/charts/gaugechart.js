define(['vendor/lodash', 'razorcharts2/core/constants'], function (_, Constants) {
    var GaugeChart = function () {
        this.options = {};
        this.cachedOptions = {
            min: 0,
            max: 100,
            value: 0
        };
    };

    GaugeChart.prototype.config = function (_options) {
        this.options = _.extend (this.options, _options);
    };

    GaugeChart.prototype.renderTo = function (paper, core, w, h) {
        // debugger
        this.paper = paper;
        this.width = w;
        this.height = h;
        this.core = paper.g ();
        this.back = paper.path ();
        this.core.append (this.back);
        this.filler = paper.path ();
        this.core.append (this.filler)
        this.arrow = paper.path ();
        this.core.append (this.arrow);
        this.minText = paper.text (0, 0);
        this.core.append (this.minText);
        this.maxText = paper.text (0, 0);
        this.core.append (this.maxText);
        this.valueText = paper.text (0, 0);
        this.core.append (this.valueText);
        paper.append (this.core);

        this.back.attr ({
            fill: '#EEE',
            stroke: 'none'
        });
        this.filler.attr ({
            fill: '#67ADDA',
            stroke: 'none'
        });
        this.arrow.attr({
            fill: '#F9F9F9',
            stroke: '#67ADDA'
        });

        draw (this);
    };

    function draw (self, animate) {
        var paper = self.paper,
            w = self.width,
            h = self.height,
            cx = w / 2,
            cy = h / 2,
            r = _.min ([cx, cy]),
            back = self.back,
            filler = self.filler,
            core = self.core,
            arrow = self.arrow,
            value = self.options.value,
            oldValue = self.cachedOptions.value,
            oldMin = self.cachedOptions.min,
            oldMax = self.cachedOptions.max,
            min = self.options.min,
            max = self.options.max,
            valP = (value - min) / (max - min),
            oldValP = (oldValue - oldMin) / (oldMax - oldMin),
            minText = self.minText,
            maxText = self.maxText,
            valueText = self.valueText,
            gaugeStartAngle = Constants.gauge.startAngle,
            gaugeEndAngle = Constants.gauge.endAngle,
            arrowStartAngle = Constants.gauge.arrowStartAngle,
            arrowEndAngle = Constants.gauge.arrowEndAngle,
            MAX_FONT_SIZE = Constants.gauge.max_font_size,
            formattedValueText = self.options.format(self.options.value);
            formattedMinValueText = self.options.format(self.options.min);
            formattedMaxValueText = self.options.format(self.options.max);

        r = r*Constants.gauge.padding;
        var backPath = slicePath (cx, cy, gaugeStartAngle, gaugeEndAngle, r * 0.9, r * 0.95);

        back.setPath (backPath);
        

        var fillerPath = slicePath (cx, cy, gaugeStartAngle, 300 * valP - 240, r * 0.9, r * 0.95);
        var arrowPath = slicePath (cx, cy, arrowStartAngle, arrowEndAngle, r * 0.5, r * 0.5, true, r * 0.6, 10);
        var endAngle = 300  * valP;
        var startAngle = 300 * oldValP; 
        var minTextPos = calculateTextPos(cx, cy, gaugeStartAngle, r);
        var maxTextPos = calculateTextPos(cx, cy, gaugeEndAngle, r);
        var innerRadius = r - r * 0.5;


        minText.text(formattedMinValueText);
        minText.attr({
            x: minTextPos.x,
            y: minTextPos.y + minText.getBBox().height,
            'text-anchor': 'middle',
            "stroke" : "none"
        });

        maxText.text(formattedMaxValueText);
        maxText.attr({
            x: maxTextPos.x,
            y: maxTextPos.y + maxText.getBBox().height,
            'text-anchor': 'middle',
            "stroke" : "none"
        });

        valueText.text(formattedValueText);
        valueText.attr({
            x: cx,
            'text-anchor': 'middle',
            'font-size': MAX_FONT_SIZE,
            "stroke": "none",
            "fill" : "#333"
        });

        var valueTextWidth = valueText.getBBox().width;

        if(innerRadius < valueTextWidth) {
            var newFontSize = innerRadius / valueTextWidth * MAX_FONT_SIZE;
            self.options.maxFontSize = newFontSize;
            valueText.attr({
                'font-size': newFontSize,
            });
            minText.attr({
                'font-size': newFontSize * 0.8,
                 x: minTextPos.x,
            });
            minText.attr({
                 y: minTextPos.y + minText.getBBox().height,
            });
            maxText.attr({
                'font-size': newFontSize * 0.8,
                 x: maxTextPos.x,
            });
            maxText.attr({
                 y: maxTextPos.y + maxText.getBBox().height,
            });
        }

        valueText.attr({
            y: cy + (valueText.getBBox().height / 4)
        });

        if(animate) {
            filler.animateWith (function (el, dt) {
                var currAngle = (endAngle - startAngle) * dt;
                var fillerPath = slicePath (cx, cy, gaugeStartAngle, gaugeStartAngle + startAngle + currAngle, r * 0.9, r * 0.95);
                filler.setPath (fillerPath);    

            }, 500);

            var previousValue = self.cachedOptions.value;

            valueText.animateWith(function(el, dt) {
                if(self.options.value > previousValue) {
                    el.text(self.options.format(Math.floor((self.options.value - previousValue) * dt) + previousValue));
                }
                else {
                    el.text(self.options.format(Math.floor(previousValue - (previousValue - self.options.value ) * dt)));
                }
            }, 500);


            arrow.animate({
                transform: {
                    rotate: [endAngle, cx, cy]
                }
            }, 500);

        } else {
            filler.setPath (fillerPath);
            arrow.setPath (arrowPath);
            arrow.rotate (endAngle, cx, cy);
        }
        


        self.cachedOptions = _.cloneDeep (self.options);
    };

    GaugeChart.prototype.resizeTo = function (w, h) {
        this.width = w;
        this.height = h;
        draw (this);
    };

    GaugeChart.prototype.update = function (_options) {
        this.options = _.extend (this.options, _options);
        draw (this, true);
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

    var calculateTextPos = function(cx, cy, angle, radius) {
        var x = cx + radius * Math.cos(Math.PI * angle / 180);
        var y = cy + radius * Math.sin(Math.PI * angle / 180);

        return {
            x: x,
            y: y
        };
    };

    return GaugeChart;
})