define(['leonardo/core/element'], function(Element) {
    var renderer = null;

    var Line = function (x1, y1, x2, y2) {
        init (this, x1, y1, x2, y2);
    };

    Line.id = 'line';

    Line.setRenderer = function (_renderer) {
        renderer = _renderer
    };

    Line.prototype = new Element ();
    Line.prototype.constructor = Line;

    function init (self, x1, y1, x2, y2) {
        self.__elem = new renderer(x1, y1, x2, y2);
    }

    return Line;
});