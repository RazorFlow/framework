define(['vendor/lodash', 'razorcharts2/scales/scale', 'razorcharts2/utils/optimizeticks'], function (_, Scale, OptimizeTicks) {
    var Grid = function () {
        
    };

    Grid.prototype.init = function () {
        this.options = {};
        this.$ticks = [];
        this.transformers = [];
    };

    Grid.prototype.transform = function (key) {
        var t = _.where (this.transformers, {key: key});
        for(var i=0; i<t.length; ++i) {
            (t[i].transform)(this);
        }
    };

    Grid.prototype.registerTransformer = function (transformer) {
        this.transformers.push (transformer);
    };

    Grid.prototype.config = function (_options) {
        this.options = _.extend(this.options, _options);
        this.scale = _options.scale;
        this.ticks = _options.ticks;
        this.cache ();
    };

    Grid.prototype.cache = function () {
        this.cachedScale = new Scale[this.scale.type()]();
        this.cachedScale.domain(this.scale.domain());
        this.cachedTicks = _.cloneDeep (this.ticks);
    };

    Grid.prototype.setTicks = function (ticks) {
        this.ticks = ticks;
    }

    Grid.prototype.renderTo = function (paper, core, w, h) {
        this.paper = paper;
        this.core = core;
        this.width = w;
        this.height = h;

        createTicks (this);
        this.transform ('render');
    };

    Grid.prototype.resizeTo = function (w, h) {
        this.width = w;
        this.height = h;
        resizeTicks(this);
        this.transform ('resize');
    };

    Grid.prototype.update = function () {
        this.$cachedTicks = this.$ticks;
        this.$ticks = [];
        this.updateTicks ();
        this.transform('update');
    };

    function createTicks (self) {
        var paper = self.paper;
        for(var i=0; i<self.ticks.length; i++) {
            self.$ticks[i] = paper.line (0,0,0,0);
            self.$ticks[i].attr({
                stroke: "#ccc",
                "stroke-dasharray": "2,2"
            });
            self.core.append (self.$ticks[i]);
        }
    };

    function resizeTicks (self) {
        if(OptimizeTicks.grid(self)) {
            createTicks(self);
            self.transform ('render');
        }
    };

    Grid.prototype.updateTicks = function () {
        var sameTicks = [];

        for(var i=0; i<this.ticks.length; i++) {
            var idx = _.indexOf(this.cachedTicks, this.ticks[i]);
            if(idx !== -1) {
                sameTicks[i] = this.$cachedTicks[idx];
                this.cachedTicks[idx] = undefined;
                this.$cachedTicks[idx] = undefined;
            }
        }

        this.cachedTicks = _.compact(this.cachedTicks);
        this.$cachedTicks = _.compact(this.$cachedTicks);
        this.$ticks = sameTicks;
        
        for(var i=0; i<this.ticks.length; i++) {
            if(typeof this.$ticks[i] === 'undefined') {
                var $tick = this.paper.line (0,0,0,0);
                $tick.attr({
                    stroke: "#ccc",
                    "stroke-dasharray": "2,2"
                });
                this.$ticks[i] = $tick;
                this.core.append ($tick);
                $tick.__newTick = true;
            }
        }
    };

    return Grid;
});