define(['leonardo/renderers/svg/elementrenderer'], function (ElementRenderer) {
    var $elem = null;

    var TextRenderer = function (x, y, text) {
        $elem = this.createElement ('text');
        this.__elem = $elem;
        this.attr ('x', x);
        this.attr ('y', y);
        this.text (text);
    }

    TextRenderer.prototype = new ElementRenderer  ();
    TextRenderer.prototype.constructor = TextRenderer;

    return TextRenderer;
});