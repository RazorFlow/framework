define(['vendor/lodash', 'razorcharts2/utils/graphutils'], function (_, graphUtils) {
    var MIN_TICK_HEIGHT = 15;
    var OptimizeTicks = {
        ticks : [],
        axis: function (self) {
            if(self.options.type === "linear") {
                var height = _.isNumber(self.coreHeight) ? self.coreHeight : self.height;
                var tickHeight = height / self.ticks.length;
                OptimizeTicks.ticks = self.ticks.slice(0);
                if (tickHeight <= MIN_TICK_HEIGHT) {
                    self.ticks = OptimizeTicks.getTicks(self.originalTicks.slice(0), height);
                    self.scale.domain([self.ticks[0], self.ticks[self.ticks.length-1]]);
                    _.each(self.$ticks, function (obj) {
                        obj.remove();
                    });
                    self.$ticks = [];
                    _.each(self.$tickTexts, function (obj) {
                        obj.remove();
                    });
                    self.$tickTexts = [];
                    return true;
                }
                return false;
            }
        },

        grid: function (self) {
            if(OptimizeTicks.ticks.length > 0 && OptimizeTicks.ticks.length !== self.ticks) {
                _.each(self.$ticks, function (obj) {
                    obj.remove();
                });
                self.$ticks = [];
                self.ticks = OptimizeTicks.ticks;
                return true;
            }
            return false;
        },

        getTicks: function (ticks, height) {
            var ticksToBeKeep = Math.round(height/MIN_TICK_HEIGHT);
            if (ticksToBeKeep < 2) ticksToBeKeep=2;
            var unit = (ticks[ticks.length-1] - ticks[0]) / (ticksToBeKeep - 1);
            var prettyDomain = graphUtils.prettyDomain(0, unit, true);
            var value = ticks[0];
            OptimizeTicks.ticks = [value];
            for(var i = 1; i < ticksToBeKeep; i++) {
                value += prettyDomain.max;
                OptimizeTicks.ticks[i] = value;
            }
            return OptimizeTicks.ticks;
        },

        setTicks: function (ticks) {
            OptimizeTicks.ticks = ticks;
        }
    };

    return OptimizeTicks;
});