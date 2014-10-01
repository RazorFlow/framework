define(['razorcharts2/axes/axis'], function (Axis) {
    var BottomAxis = function () {
        this.init ();
        this.registerTransformer ({key: 'render', transform: BottomAxisTransformer});
        this.registerTransformer ({key: 'resize', transform: BottomAxisTransformer});
        this.registerTransformer ({key: 'update', transform: BottomAxisUpdateTransformer});
    };

    BottomAxis.prototype = new Axis ();
    BottomAxis.prototype.constructor = BottomAxis;

    function BottomAxisTransformer (self) {
        console.log ('Transformer called!');
        var width = self.coreWidth,
            $ticks = self.$ticks,
            ticks = self.ticks,
            scale = self.scale,
            tickWidth = width / ticks.length;
        
        for(var i=0; i<ticks.length; ++i) {
            var x;
            if(self.options.type === 'ordinal') {
                x = scale.calc(ticks[i]) + tickWidth / 2;
            } else {
                x = scale.calc (ticks[i]);
            }
            
            $ticks[i].attr ({
                'transform': 'translate(' + x + ',14)',
                'text-anchor': 'middle'
            });
        }

        self.line.attr ({
            x1: 0,
            y1: 0,
            x2: width,
            y2: 0
        });
    };

    function BottomAxisUpdateTransformer (self) {
        console.log('BottomAxisUpdateTransformer called!');
        var $ticks = self.$ticks,
            $cachedTicks = self.$cachedTicks,
            ticks = self.ticks,
            cachedTicks = self.cachedTicks;
            scale = self.scale,
            cachedScale = self.cachedScale,
            width = self.coreWidth;
        cachedScale.range([0, width]);
        for(var i=0; i<ticks.length; ++i) {
            var x = scale.calc (ticks[i]);
            var oldX = cachedScale.calc(ticks[i]);
            if($ticks[i].__newTick) {
                $ticks[i].attr('opacity', 0);
                $ticks[i].__newTick = false;
            }
            $ticks[i].translate(oldX, 14);
            $ticks[i].attr ({
                'text-anchor': 'middle'
            });
            $ticks[i].animate({
                transform: {
                    translate: [x, 14]
                },
                opacity: 1
            });
        }

        for(var i=0; i<cachedTicks.length; i++) {
            var x =scale.calc(cachedTicks[i]);
            (function(_i) {
                $cachedTicks[_i].animate({
                    transform: {
                        translate: [x, 14]
                    },
                    opacity: 0
                }, 500, function () {
                    $cachedTicks[_i].remove();
                });
            })(i);
        }

        self.cache ();
    };

    return BottomAxis;
});