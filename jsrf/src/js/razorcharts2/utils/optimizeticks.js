define(['vendor/lodash', 'razorcharts2/utils/graphutils'], function (_, graphUtils) {
    var MIN_TICK_HEIGHT = 20;
    var OptimizeTicks = {
        getTicks: function (ticks, height) {
            var ticksToBeKeep = Math.round(height/MIN_TICK_HEIGHT);
            if (ticksToBeKeep < 2) ticksToBeKeep=2;
            var unit = (ticks[ticks.length-1] - ticks[0]) / (ticksToBeKeep - 1);
            var prettyDomain = graphUtils.prettyDomain(0, unit, true);
            var value = ticks[0];
            var newTicks = [value];
            for(var i = 1; i < ticksToBeKeep; i++) {
                value += prettyDomain.max;
                newTicks[i] = value;
            }
            return newTicks;
        },
        optimizeTicks: function (ticks, height) {
            var tickHeight = height / ticks.length,
                opFlag = false;

            if(tickHeight < MIN_TICK_HEIGHT) {
                ticks = OptimizeTicks.getTicks (ticks, height);
                opFlag = true;
            }

            return {
                optimized: opFlag,
                ticks: ticks
            };
        }
    };

    return OptimizeTicks;
});