define(['leonardo/core/element'], function(Element) {
    var renderer = null;

    var Rect = function (x, y, width, height) {
        init (this, x, y, width, height);
    };

    Rect.id = 'rect';

    Rect.setRenderer = function (_renderer) {
        renderer = _renderer
    };

    Rect.prototype = new Element ();
    Rect.prototype.constructor = Rect;

    function init (self, x, y, width, height) {
        self.__elem = new renderer(x, y, width, height);
    }

    return Rect;
});