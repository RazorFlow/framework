define(['leonardo/core/element'], function(Element) {
    var renderer = null;

    var Tspan = function (text) {
        this.init ();
        init (this, text);
    };

    Tspan.id = 'tspan';

    Tspan.setRenderer = function (_renderer) {
        renderer = _renderer
    };

    Tspan.prototype = new Element ();
    Tspan.prototype.constructor = Tspan;

    function init (self, text) {
        self.__elem = new renderer(text);
    }

    return Tspan;
});