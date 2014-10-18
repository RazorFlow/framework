define(['razorcharts2/scales/linearscale', 'razorcharts2/scales/ordinalscale', 'vendor/lodash'], function(LinearScale, OrdinalScale, _) {
    var Scale = {
        linear: LinearScale,
        ordinal: OrdinalScale
    };

    return Scale;
});