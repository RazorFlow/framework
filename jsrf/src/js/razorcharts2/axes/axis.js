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
        this.paper = _paper;
        this.core = _core;
        this.coreWidth = w;
        this.coreHeight = h;

        this.createTicks (this);
        this.line = this.paper.line (0, 0, 0, 0);
        this.core.append (this.line);
        this.transform ();
    };

    Axis.prototype.height = function () {
        return this.core.getBBox().height;
    };

    Axis.prototype.width = function () {
        return this.core.getBBox().width;
    };

    Axis.prototype.resizeTo = function (w, h) {
        this.coreWidth = w;
        this.coreHeight = h;
        this.transform();
    };

    Axis.prototype.transform = function () {
        for(var i=0; i<this.transformers.length; ++i) {
            (this.transformers[i])(this);
        }
    };

    Axis.prototype.registerTransformer = function (transformer) {
        this.transformers.push (transformer);
    };

    Axis.prototype.createTicks = function() {
        var paper = this.paper;
        for(var i=0; i<this.ticks.length; ++i) {
            var $tick = paper.g ();
            $tick.attr('id', 'tick-' + (i+1));
            var $text = paper.text (0, 0, '' + this.ticks[i]);
            $tick.append ($text);
            this.$ticks.push ($tick);
            this.core.append ($tick);
        }
    };


    return Axis;
});