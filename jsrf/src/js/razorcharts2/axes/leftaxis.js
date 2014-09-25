define(['razorcharts2/axes/axis'], function (Axis) {
    var LeftAxis = function () {
        this.init ();
        this.registerTransformer ({key: 'render', transform: LeftAxisTransformer});
        this.registerTransformer ({key: 'resize', transform: LeftAxisTransformer});
        this.registerTransformer ({key: 'update', transform: LeftAxisUpdateTransformer});
    };

    LeftAxis.prototype = new Axis ();
    LeftAxis.prototype.constructor = LeftAxis;

    function LeftAxisTransformer (self) {
        console.log ('Transformer called!');
        var $ticks = self.$ticks,
            ticks = self.ticks,
            scale = self.scale,
            height = self.coreHeight;

        for(var i=0; i<ticks.length; ++i) {
            var y = height - scale.calc(ticks[i]) + 8;
            $ticks[i].translate (-10, y);
            $ticks[i].attr ({
                'text-anchor': 'end'
            });
        }

        self.line.attr({x1: 0, y1: 0, x2: 0, y2: height});
    };

    function LeftAxisUpdateTransformer (self) {
        console.log('LeftAxisUpdateTransformer called!');
        var $ticks = self.$ticks,
            $cachedTicks = self.$cachedTicks,
            ticks = self.ticks,
            cachedTicks = self.cachedTicks;
            scale = self.scale,
            cachedScale = self.cachedScale,
            height = self.coreHeight;
        cachedScale.range([0, height]);
        for(var i=0; i<ticks.length; ++i) {
            var y = height - scale.calc(ticks[i]) + 8;
            var oldY = height - cachedScale.calc(ticks[i]) + 8;
            if($ticks[i].__newTick) {
                $ticks[i].attr('opacity', 0);
            }
            $ticks[i].translate(-10, oldY);
            $ticks[i].animate({
                transform: {
                    translate: [-10, y]
                },
                opacity: 1
            });
            $ticks[i].attr ({
                'text-anchor': 'end'
            });
        }

        for(var i=0; i<cachedTicks.length; i++) {
            var y = height - scale.calc(cachedTicks[i]) + 8;
            $cachedTicks[i].animate({
                transform: {
                    translate: [-10, y]
                },
                opacity: 0
            });
        }
    };

    return LeftAxis;
});