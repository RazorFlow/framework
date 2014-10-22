define(['razorcharts/scales/linearscale', 'razorcharts/scales/ordinalscale', 'vendor/lodash'], function(LinearScale, OrdinalScale, _) {
    var Scale = {
        linear: LinearScale,
        ordinal: OrdinalScale
    };

    return Scale;
});