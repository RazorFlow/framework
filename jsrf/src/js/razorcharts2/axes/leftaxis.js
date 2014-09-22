define(['razorcharts2/axes/axis'], function (Axis) {
    var LeftAxis = function () {
        this.registerTransformer (LeftAxisTransformer);
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
            $ticks[i].css ({
                'transform': 'translate(-10px,' + y +'px)',
                'text-anchor': 'end'
            });
        }

        self.line.attr({x1: 0, y1: 0, x2: 0, y2: height});
    };

    return LeftAxis;
});