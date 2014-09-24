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
            $ticks[i].attr ({
                'transform': 'translate(-10,' + y +')',
                'text-anchor': 'end'
            });
        }

        self.line.attr({x1: 0, y1: 0, x2: 0, y2: height});
    };

    function LeftAxisUpdateTransformer (self) {

    };

    return LeftAxis;
});