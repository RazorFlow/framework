define(['leonardo/renderers/svg/elementrenderer'], function (ElementRenderer) {
    var $elem = null,
        $tspan = null;

    var TextRenderer = function (x, y, text) {
        $elem = this.createElement ('text');
        $tspan = this.createElement ('tspan');
        $elem.appendChild ($tspan);
        $elem.setAttribute ('x', x);
        $elem.setAttribute ('y', y);
        $tspan.innerHTML = text;

        this.__elem = $elem;
    }

    TextRenderer.prototype = new ElementRenderer  ();
    TextRenderer.prototype.constructor = TextRenderer;

    return TextRenderer;
});