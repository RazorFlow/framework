define(['leonardo/core/element'], function(Element) {
    var renderer = null,    
        elem = null;

    var Text = function (x, y, text) {
        init (this, x, y, text);
    };

    Text.id = 'text';

    Text.setRenderer = function (_renderer) {
        renderer = _renderer
    };

    Text.prototype = new Element ();
    Text.prototype.constructor = Text;

    function init (self, x, y, text) {
        self.__elem = elem = new renderer(x, y, text);
        self.paper.append (self);
    }

    return Text;
});