define(['leonardo/core/element'], function(Element) {
    var renderer = null;

    var Circle = function (cx, cy, r) {
        this.init();
        init (this, cx, cy, r);
    };

    Circle.id = 'circle';

    Circle.setRenderer = function (_renderer) {
        renderer = _renderer
    };

    Circle.prototype = new Element ();
    Circle.prototype.constructor = Circle;

    function init (self, cx, cy, r) {
        self.__elem = new renderer(cx, cy, r);
    }

    return Circle;
});