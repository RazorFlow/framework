define(['razorcharts2/axes/grid'], function (Grid) {
    var XGrid = function () {
        this.init ();
        this.registerTransformer ({key: 'render', transform: XGridTransformer});
        this.registerTransformer ({key: 'resize', transform: XGridTransformer});
        this.registerTransformer ({key: 'update', transform: XGridUpdateTransformer});
    };

    XGrid.prototype = new Grid ();
    XGrid.prototype.constructor = XGrid;

    function XGridTransformer (self) {
        var scale = self.scale,
            ticks = self.ticks,
            $ticks = self.$ticks,
            coreWidth = self.width,
            coreHeight = self.height;

        for(var i=0; i<$ticks.length; i++) {
            $ticks[i].attr ({
                x1: scale.calc (ticks[i]),
                y1: 0,
                x2: scale.calc (ticks[i]),
                y2: coreHeight
            });

            $ticks[i].css({
                "stroke": "#ccc",
                "stroke-dasharray": "2,2"
            });
        }
    };

    function XGridUpdateTransformer (self) {
        var scale = self.scale,
            cachedScale = self.cachedScale,
            ticks = self.ticks,
            cachedTicks = self.cachedTicks,
            $ticks = self.$ticks,
            $cachedTicks = self.$cachedTicks,
            coreWidth = self.width,
            coreHeight = self.height;

        cachedScale.range ([0, coreWidth]);
        
        for(var i=0; i<$ticks.length; i++) {
            var oldX = cachedScale.calc (ticks[i]),
                x = Math.floor(scale.calc (ticks[i]));
            if($ticks[i].__newTick) {
                $ticks[i].attr ({
                    x1: oldX,
                    y1: 0,
                    x2: oldX,
                    y2: coreHeight,
                    opacity: 0
                });
                $ticks[i].__newTick = false;
            }

            $ticks[i].animate ({
                x1: x,
                x2: x,
                opacity: 1
            });
        }

        for(var i=0; i<cachedTicks.length; i++) {
            var x = Math.floor(scale.calc(cachedTicks[i]));
            (function(_i) {
                $cachedTicks[_i].animate({
                    x1: x,
                    x2: x,
                    opacity: 0
                }, 500, function () {
                    $cachedTicks[_i].remove();
                });
            })(i);
        }

        self.cache ();
    };

    return XGrid;
});