define(['leonardo/core/element'], function(Element) {
    var renderer = null;

    var G = function () {
        init (this);
    };

    G.id = 'g';

    G.setRenderer = function (_renderer) {
        renderer = _renderer
    };

    G.prototype = new Element ();
    G.prototype.constructor = G;

    function init (self) {
        self.__elem = new renderer();
    }

    return G;
});