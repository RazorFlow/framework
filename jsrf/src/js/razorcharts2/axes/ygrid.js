define(['razorcharts2/axes/grid'], function (Grid) {
    var YGrid = function () {
        this.init ();
        this.registerTransformer ({key: 'render', transform: YGridTransformer});
        this.registerTransformer ({key: 'resize', transform: YGridTransformer});
        this.registerTransformer ({key: 'update', transform: YGridUpdateTransformer});
    };

    YGrid.prototype = new Grid ();
    YGrid.prototype.constructor = YGrid;

    function YGridTransformer (self) {
        var scale = self.scale,
            ticks = self.ticks,
            $ticks = self.$ticks,
            coreWidth = self.width,
            coreHeight = self.height;

        for(var i=0; i<$ticks.length; i++) {
            $ticks[i].attr ({
                x1: 0,
                y1: coreHeight - scale.calc (ticks[i]),
                x2: coreWidth,
                y2: coreHeight - scale.calc (ticks[i])
            });
        }
    };

    function YGridUpdateTransformer (self) {
        var scale = self.scale,
            cachedScale = self.cachedScale,
            ticks = self.ticks,
            cachedTicks = self.cachedTicks,
            $ticks = self.$ticks,
            $cachedTicks = self.$cachedTicks,
            coreWidth = self.width,
            coreHeight = self.height;

        cachedScale.range ([0, coreHeight]);
        
        for(var i=0; i<$ticks.length; i++) {
            var oldY = coreHeight - cachedScale.calc (ticks[i]),
                y = Math.floor(coreHeight - scale.calc (ticks[i]));
            if($ticks[i].__newTick) {
                $ticks[i].attr ({
                    x1: 0,
                    y1: oldY,
                    x2: coreWidth,
                    y2: oldY,
                    opacity: 0
                });
                $ticks[i].__newTick = false;
            }

            $ticks[i].animate ({
                y1: y,
                y2: y,
                opacity: 1
            });
        }

        for(var i=0; i<cachedTicks.length; i++) {
            var y = Math.floor(coreHeight - scale.calc(cachedTicks[i]));
            (function(_i) {
                $cachedTicks[_i].animate({
                    y1: y,
                    y2: y,
                    opacity: 0
                }, 500, function () {
                    $cachedTicks[_i].remove();
                });
            })(i);
        }

        self.cache ();
    };

    return YGrid;
});