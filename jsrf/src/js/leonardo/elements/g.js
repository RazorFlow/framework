define(['leonardo/core/element'], function(Element) {
    var renderer = null,    
        elem = null;

    var G = function () {
        this.init.apply (this, arguments);
        init (this);
    };

    G.id = 'g';

    G.setRenderer = function (_renderer) {
        renderer = _renderer
    };

    G.prototype = new Element ();
    G.prototype.constructor = G;

    function init (self) {
        self.__elem = elem = new renderer();
        self.paper.append (self);
    }

    return G;
});