define(['razorcharts2/axes/axis'], function (Axis) {
    var BottomAxis = function () {
        this.registerTransformer (BottomAxisTransformer);
    };

    BottomAxis.prototype = new Axis ();
    BottomAxis.prototype.constructor = BottomAxis;

    function BottomAxisTransformer () {
        console.log ('Transformer called!');
    };

    return BottomAxis;
});