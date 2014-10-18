define(['leonardo/renderers/svg/elementrenderer'], function (ElementRenderer) {
    

    var LineRenderer = function (x1, y1, x2, y2) {
        var $elem = null;
        $elem = this.createElement ('line');
        this.__elem = $elem;
        this.attr({
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        });
    }

    LineRenderer.prototype = new ElementRenderer  ();
    LineRenderer.prototype.constructor = LineRenderer;

    return LineRenderer;
});