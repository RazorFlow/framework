define(['razorcharts2/axes/axis'], function (Axis) {
    var BottomAxis = function () {
        this.registerTransformer (BottomAxisTransformer);
    };

    BottomAxis.prototype = new Axis ();
    BottomAxis.prototype.constructor = BottomAxis;

    function BottomAxisTransformer (self) {
        console.log ('Transformer called!');
        var $ticks = self.$ticks,
            ticks = self.ticks,
            scale = self.scale,
            tickWidth = self.width / ticks.length;
            
        for(var i=0; i<ticks.length; ++i) {
            var x = scale.calc(ticks[i]) + tickWidth /;
            $ticks[i].attr ('style', 'transform: translate(' + x + 'px,0);');
        }
    };

    return BottomAxis;
});