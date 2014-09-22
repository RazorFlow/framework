define([], function () {
    var paper = null,
        core = null,
        width = null,
        height = null,
        transformers = [],
        scale = null,
        type = null,
        ticks = null,
        $ticks = [];

    var Axis = function () {

    };

    Axis.prototype.width = width;
    Axis.prototype.width = height;
    Axis.prototype.$ticks = $ticks;
    Axis.prototype.ticks = ticks;
    Axis.prototype.scale = scale;

    Axis.prototype.config = function (_options) {
        options = _options;
        type = options.type;
        this.scale = scale = options.scale;
        this.ticks = ticks = options.ticks;
    };

    Axis.prototype.renderTo = function (_paper, _core, w, h) {
        paper = _paper;
        core = _core;
        this.width = width = w;
        this.height = height = h;

        createTicks ();
        this.transform ();
    };

    Axis.prototype.resizeTo = function () {

    };

    Axis.prototype.transform = function () {
        for(var i=0; i<transformers.length; ++i) {
            (transformers[i])(this);
        }
    };

    Axis.prototype.registerTransformer = function (transformer) {
        transformers.push (transformer);
    };

    function createTicks () {
        for(var i=0; i<ticks.length; ++i) {
            var $tick = paper.g ();
            $tick.attr('id', 'tick-' + (i+1));
            var $text = paper.text (0, 14, '' + ticks[i]);
            $tick.append ($text);

            $ticks.push ($tick);
            core.append ($tick);
        }
    };


    return Axis;
});