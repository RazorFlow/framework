define([], function () {
    var paper = null,
        core = null,
        transformers = [],
        scale = null,
        type = null,
        ticks = null,
        $ticks = [];

    var Axis = function () {

    };

    Axis.prototype.config = function (_options) {
        options = _options;
        type = options.type;
        scale = options.scale;
        ticks = options.ticks;
    };

    Axis.prototype.renderTo = function (_paper, _core, w, h) {
        paper = _paper;
        core = _core;

        createTicks ();
        this.transform ();
    };

    Axis.prototype.resizeTo = function () {

    };

    Axis.prototype.transform = function () {
        for(var i=0; i<transformers.length; ++i) {
            (transformers[i])();
        }
    };

    Axis.prototype.registerTransformer = function (transformer) {
        transformers.push (transformer);
    };

    function createTicks () {
        for(var i=0; i<ticks.length; ++i) {
            var $tick = paper.g ();
            $tick.attr('id', 'tick-' + (i+1));
            var $text = paper.text (0, 0, '' + ticks[i]);
            $tick.append ($text);
        }
    };


    return Axis;
});