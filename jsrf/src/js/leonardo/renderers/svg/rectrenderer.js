define(['leonardo/renderers/svg/elementrenderer'], function (ElementRenderer) {
    var RectRenderer = function (x, y, width, height) {
        var $elem = this.createElement ('rect');
        this.__elem = $elem;

        this.attr ({
            x: x,
            y: y,
            width: width,
            height: height
        });
    }

    RectRenderer.prototype = new ElementRenderer  ();
    RectRenderer.prototype.constructor = RectRenderer;

    return RectRenderer;
});