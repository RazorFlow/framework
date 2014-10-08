define(['vendor/lodash'], function (_) {
    var LABEL_FONT_SIZE = 14,
        MIN_LABEL_RADIUS = 60,
        ARROW_WIDTH = 30,
        MIN_PIE_RADIUS = 30,
        T_ANGLE = 0;
    var Pie = function () {
        this.options = {};
        this.slices = [];
        this.cachedData = [];
        this.labelSizes = [];
        this.labelParts = [];
        this.showLabels = true;
    };

    Pie.prototype.config = function (_options) {
        this.options = _.extend (this.options, _options);
        this.cachedData = _options.series.data;
    };

    Pie.prototype.renderTo = function (paper, core, w, h) {
        this.paper = paper;
        this.core = core;
        this.width = w;
        this.height = h;
        this.r = getRadius (this);
        createSlices (this);
        drawLabels (this);
        setSlicePaths (this);
    };

    Pie.prototype.hasLabels = function () {
        return this.showLabels;
    };

    function getRadius (self) {
        var radiusObj = {};
        var iterations = 8;
        while (iterations--) {
            radiusObj[T_ANGLE] = calcRadius(self);
            T_ANGLE +=45;
        }
        var maxRadius = _.max(_.values(radiusObj));
        for (var key in radiusObj) {
            if (radiusObj[key] === maxRadius) {
                T_ANGLE = +key;
                break;
            }
        }
        return maxRadius;
    }

    function createSlices (self) {
        var paper = self.paper,
            core = self.core,
            series = self.options.series,
            data = series.data;
        for(var i=0; i<data.length; i++) {
            var slice = paper.path ();
            slice.attr ('fill', series.colors[i]);
            self.slices[i] = slice;
            core.append (slice);
        }
    };

    function setSlicePaths (self, animate) {
         var series = self.options.series,
            data = series.data,
            w = self.width,
            h = self.height,
            cx = w / 2,
            cy = h / 2,
            r = self.r,
            total = _.reduce (data, function(mem, num) { return mem + num; }, 0),
            tAngle = T_ANGLE;

        for(var i=0; i<self.slices.length; i++) {
            var currAngle = data[i] / total * 360;
            var pathString = slicePath (cx, cy, tAngle, tAngle + currAngle, 0, r);
            if(animate) {
                self.slices[i].animatePath (pathString);
            } else {
                self.slices[i].setPath (pathString);
            }
            self.slices[i].attr({
                "stroke" : "none"
            });
            tAngle += currAngle;
        }
    };

    Pie.prototype.resizeTo = function (w, h) {
        this.width = w;
        this.height = h;
        this.r = calcRadius (this);
        updateLabels (this);
        setSlicePaths (this);
    };

    Pie.prototype.update = function (_options) {
        var slices = this.slices;
        var series = this.options.series,
            data = _options.series.data,
            w = this.width,
            h = this.height,
            cx = w / 2,
            cy = h / 2,
            r = this.r = calcRadius (this),
            total = _.reduce (data, function(mem, num) { return mem + num; }, 0),
            tAngle = T_ANGLE,
            oldData = this.cachedData,
            oldTotal = _.reduce (oldData, function(mem, num) { return mem + num; }, 0),
            oldTAngle = T_ANGLE;

        this.options = _.extend(this.options, _options);
        for(var i=0; i<slices.length; i++) {
            var currAngle = data[i] / total * 360;
            var oldCurrAngle = oldData[i] / oldTotal * 360;

            !function(startAngle, endAngle, oStartAngle, oEndAngle) {
                slices[i].animateWith(function (el, d) {
                    var pathString = slicePath (cx, cy, 
                                        oStartAngle + (startAngle - oStartAngle) * d, 
                                        oEndAngle + (endAngle - oEndAngle) * d, 0, r);
                    el.setPath (pathString);
                }, 500);
            }(tAngle, tAngle + currAngle, oldTAngle, oldTAngle + oldCurrAngle);
            tAngle += currAngle;
            oldTAngle += oldCurrAngle
        }
        this.cachedData = data;
        updateLabels (this);
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

    var angleToPoint = function(cx, cy, r, angle) {
        var point = {};

        point.x = cx + r * Math.cos(Math.PI * angle / 180);
        point.y = cy + r * Math.sin(Math.PI * angle / 180);

        return point;
    };

    function findWidths (self) {
        var paper = self.paper,
            data = self.options.series.data,
            labels = self.options.labels;

        for(var i=0; i<data.length; i++) {
            var labelText = data[i] + '##' + labels[i];
            var label = paper.text (0, 0, labelText);
            label.attr ('font-size', LABEL_FONT_SIZE);
            paper.append (label);
            var bbox = label.getBBox ();
            self.labelSizes[i] = {
                width: bbox.width,
                height: bbox.height
            };
            label.remove ();
        }
    }

    function calcRadius (self) {
        var paper = self.paper,
            w = self.width,
            h = self.height,
            labels = self.options.labels,
            data = self.options.series.data,
            maxR = _.min([w/2, h/2]),
            cx = w / 2,
            cy = h / 2,
            total = _.reduce (data, function(mem, num) { return mem + num; }, 0),
            tAngle = T_ANGLE;

        findWidths (self);
        var labelBBoxes = _.cloneDeep (self.labelSizes);
        for(var i=0; i<labels.length; i++) {
            var startAngle = tAngle;
            var endAngle = tAngle + data[i] / total * 360;
            var pos = angleToPoint (cx, cy, maxR, (startAngle + endAngle) / 2);
            if(pos.x < cx) {
                labelBBoxes[i].x = pos.x - labelBBoxes[i].width - ARROW_WIDTH;
            } else {
                labelBBoxes[i].x = pos.x + ARROW_WIDTH;
            }
            
            labelBBoxes[i].y = pos.y - labelBBoxes[i].height / 2;
            tAngle = endAngle;
            var rect = paper.rect (labelBBoxes[i].x, labelBBoxes[i].y, labelBBoxes[i].width, labelBBoxes[i].height);
            self.core.append (rect);
            rect.remove ();
        }   
        var xs = _.pluck(labelBBoxes, 'x');
        var ys = _.pluck(labelBBoxes, 'y');
        var xDiffs = _.map(xs, function(num, idx) {
            if(num + labelBBoxes[idx].width > w) {
                return Math.abs(num - w + labelBBoxes[idx].width);
            } else if(num < 0) {
                return Math.abs(num);
            }
            return 0;
        });
        var yDiffs = _.map(ys, function(num, idx) {
            if(num + labelBBoxes[idx].height > h) {
                return Math.abs(num - h + labelBBoxes[idx].height);
            } else if(num < 0) {
                return Math.abs(num);
            }
            return 0;
        });
        var xMax = _.max (xDiffs);
        var yMax = _.max (yDiffs);
        var r = _.max([xMax, yMax]);

        optimizeLabel(maxR);

        var pieRadius = maxR - r - MIN_LABEL_RADIUS;

        if (pieRadius <= MIN_PIE_RADIUS) {
            pieRadius = maxR;
            self.showLabels = false;
        } else {
            self.showLabels = true;
        }
        return pieRadius;
    };

    function optimizeLabel(maxR) {
        MIN_LABEL_RADIUS = maxR * 0.2;
    }

    function drawLabels (self) {
        var paper = self.paper,
            w = self.width,
            h = self.height,
            labels = self.options.labels,
            data = self.options.series.data,
            cx = w / 2,
            cy = h / 2,
            r = self.r,
            total = _.reduce (data, function(mem, num) { return mem + num; }, 0),
            tAngle = T_ANGLE;
        for(var i=0; i<labels.length; i++) {
            var startAngle = tAngle;
            var endAngle = tAngle + data[i] / total * 360;
            var pos = angleToPoint (cx, cy, r + MIN_LABEL_RADIUS, (startAngle + endAngle) / 2);
            var circlePos = angleToPoint (cx, cy, r, (startAngle + endAngle) / 2);
            var label = paper.text (pos.x < cx ? 10 : -10, 5, data[i] + ' ' + labels[i]);
            label.attr('font-size', LABEL_FONT_SIZE);
            var x, y;
            if(pos.x < cx) {
                x = pos.x - ARROW_WIDTH;
                label.attr ({'text-anchor': 'end'});
            } else {
                x = pos.x + ARROW_WIDTH;
                label.attr ({'text-anchor': 'start'});
            }
            y = pos.y;
            var line1 = paper.line (circlePos.x, circlePos.y, pos.x, pos.y);
            var line2 = paper.line (pos.x, pos.y, x + (pos.x < cx ? 15: -15), y);
            self.labelParts[i] = {
                label: label,
                line1: line1,
                line2: line2
            };
            line1.css({
                "stroke" : "#666",
                "stroke-width" : 1
            });
            line2.css({
                "stroke" : "#666",
                "stroke-width" : 1
            });
            label.css({
                "fill" : "#666",
                "font-size" : "10px"
            });
            tAngle = endAngle;
            label.translate (x, y);
            self.core.append (label);
            self.core.append (line1);
            self.core.append (line2);
        }
        if(!self.showLabels) {
            hideLabels(self);
        } else {
            showLabels(self);
        }
    };

    function hideLabels (self) {
        var labelParts = self.labelParts;
        for (var i=0; i< labelParts.length; i++) {
            labelParts[i].line1.css({
                "display" : "none"
            });
            labelParts[i].line2.css({
                "display" : "none"
            });
            labelParts[i].label.css({
                "display" : "none"
            });
        }
    };

    function showLabels (self) {
        var labelParts = self.labelParts;
        for (var i=0; i< labelParts.length; i++) {
            labelParts[i].line1.css({
                "display" : "initial"
            });
            labelParts[i].line2.css({
                "display" : "initial"
            });
            labelParts[i].label.css({
                "display" : "initial"
            });
        }
    };

    function updateLabels (self) {
        var paper = self.paper,
            w = self.width,
            h = self.height,
            labels = self.options.labels,
            data = self.options.series.data,
            cx = w / 2,
            cy = h / 2,
            r = self.r,
            total = _.reduce (data, function(mem, num) { return mem + num; }, 0),
            tAngle = T_ANGLE;
        for(var i=0; i<labels.length; i++) {
            var startAngle = tAngle;
            var endAngle = tAngle + data[i] / total * 360;
            var pos = angleToPoint (cx, cy, r + MIN_LABEL_RADIUS, (startAngle + endAngle) / 2);
            var circlePos = angleToPoint (cx, cy, r, (startAngle + endAngle) / 2);
            var label = self.labelParts[i].label;
            label.text(data[i] + ' ' + labels[i]);
            label.attr ({
                x: pos.x < cx ? 10 : -10
            });

            var x, y;
            if(pos.x < cx) {
                x = pos.x - ARROW_WIDTH;
                label.attr ({'text-anchor': 'end'});
            } else {
                x = pos.x + ARROW_WIDTH;
                label.attr ({'text-anchor': 'start'});
            }
            y = pos.y;
            var line1 = self.labelParts[i].line1;
            var line2 = self.labelParts[i].line2;
            line1.attr({
                x1: circlePos.x,
                y1: circlePos.y,
                x2: pos.x,
                y2: pos.y
            });
            line2.attr ({
                x1: pos.x,
                y1: pos.y,
                x2: x + (pos.x < cx ? 15: -15),
                y2: y
            });
            tAngle = endAngle;
            label.translate (x, y);
        }
        if(!self.showLabels) {
            hideLabels(self);
        } else {
            showLabels(self);
        }
    };

    return Pie;
});