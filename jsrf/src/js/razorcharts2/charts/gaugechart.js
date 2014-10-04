define(['vendor/lodash'], function (_) {
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

    GaugeChart.prototype.renderTo = function (paper, w, h) {
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
        this.minText = paper.text (0, 0, this.options.min);
        this.core.append (this.minText);
        this.maxText = paper.text (0, 0, this.options.max);
        this.core.append (this.maxText);
        this.valueText = paper.text (0, 0, this.options.value);
        this.core.append (this.valueText);
        paper.append (this.core);

        this.back.attr ({
            fill: '#888',
            stroke: 'none'
        });
        this.filler.attr ({
            fill: 'green',
            stroke: 'none'
        });
        this.arrow.attr({
            fill: 'none',
            stroke: '#33A'
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
            MAX_FONT_SIZE = 28;

        var backPath = slicePath (cx, cy, -240, 60, r * 0.8, r);

        back.setPath (backPath);
        

        var fillerPath = slicePath (cx, cy, -240, 300 * valP - 240, r * 0.8, r);
        var arrowPath = slicePath (cx, cy, -230, 110, r * 0.6, r * 0.6, true, r * 0.7, 10);
        var endAngle = 300  * valP;
        var startAngle = 300 * oldValP; 
        var minTextPos = calculateTextPos(cx, cy, -240, r);
        var maxTextPos = calculateTextPos(cx, cy, 60, r);
        minText.attr({
            x: minTextPos.x,
            y: minTextPos.y + minText.getBBox().height,
            'text-anchor': 'middle'
        });
        maxText.attr({
            x: maxTextPos.x,
            y: maxTextPos.y + maxText.getBBox().height,
            'text-anchor': 'middle'
        });
        valueText.attr({
            x: cx,
            y: cy,
            'text-anchor': 'middle',
            'font-size': MAX_FONT_SIZE
        });
        if(animate) {
            filler.animateWith (function (el, dt) {
                var currAngle = (endAngle - startAngle) * dt;
                var fillerPath = slicePath (cx, cy, -240, -240 + startAngle + currAngle, r * 0.8, r);
                filler.setPath (fillerPath);    
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