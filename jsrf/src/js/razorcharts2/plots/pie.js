define(['vendor/lodash'], function (_) {
    var Pie = function () {
        this.options = {};
        this.slices = [];
        this.cachedData = [];
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

        createSlices (this);
        setSlicePaths (this);
    };

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
            r = _.min([cx, cy]),
            total = _.reduce (data, function(mem, num) { return mem + num; }, 0),
            tAngle = 0;

        for(var i=0; i<self.slices.length; i++) {
            var currAngle = data[i] / total * 360;
            var pathString = slicePath (cx, cy, tAngle, tAngle + currAngle, 0, r);
            if(animate) {
                self.slices[i].animatePath (pathString);
            } else {
                self.slices[i].setPath (pathString);
                
            }
            tAngle += currAngle;
        }
    };

    Pie.prototype.resizeTo = function (w, h) {
        this.width = w;
        this.height = h;
        setSlicePaths (this);
    };

    Pie.prototype.update = function (_series) {
        var slices = this.slices;
        var series = this.options.series,
            data = _series.data,
            w = this.width,
            h = this.height,
            cx = w / 2,
            cy = h / 2,
            r = _.min([cx, cy]),
            total = _.reduce (data, function(mem, num) { return mem + num; }, 0),
            tAngle = 0,
            oldData = this.cachedData,
            oldTotal = _.reduce (oldData, function(mem, num) { return mem + num; }, 0),
            oldTAngle = 0;

        this.options.series = _.extend(this.options.series, _series);
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

    return Pie;
});