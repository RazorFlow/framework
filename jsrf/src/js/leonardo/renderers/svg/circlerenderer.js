define(['leonardo/renderers/svg/elementrenderer'], function (ElementRenderer) {
    

    var CircleRenderer = function (cx, cy, r) {
        var $elem = null;
        $elem = this.createElement ('circle');
        this.__elem = $elem;
        this.attr({
            cx: cx,
            cy: cy,
            r: r
        });
    }

    CircleRenderer.prototype = new ElementRenderer  ();
    CircleRenderer.prototype.constructor = CircleRenderer;

    return CircleRenderer;
});