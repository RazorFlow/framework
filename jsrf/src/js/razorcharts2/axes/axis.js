define([], function () {
    var Axis = function () {
        this.transformers = [];
        this.$ticks = [];
    };

    Axis.prototype.config = function (_options) {
        var options = this.options = _options;
        this.type = options.type;
        this.scale = options.scale;
        this.ticks = options.ticks;
    };

    Axis.prototype.renderTo = function (_paper, _core, w, h) {
        this.paper = paper = _paper;
        this.core = core = _core;
        this.width = width = w;
        this.height = height = h;

        this.createTicks (this);
        this.transform ();

        this.height = core.getBBox().width;
    };

    Axis.prototype.resizeTo = function () {

    };

    Axis.prototype.transform = function () {
        for(var i=0; i<this.transformers.length; ++i) {
            (this.transformers[i])(this);
        }
    };

    Axis.prototype.registerTransformer = function (transformer) {
        this.transformers.push (transformer);
    };

    Axis.prototype.createTicks = function(self) {
        for(var i=0; i<this.ticks.length; ++i) {
            var $tick = paper.g ();
            $tick.attr('id', 'tick-' + (i+1));
            var $text = paper.text (0, 14, '' + this.ticks[i]);
            $tick.append ($text);
            this.$ticks.push ($tick);
            this.core.append ($tick);
        }
    };


    return Axis;
});