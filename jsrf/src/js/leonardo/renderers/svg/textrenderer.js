define(['leonardo/renderers/svg/elementrenderer'], function (ElementRenderer) {
    var TextRenderer = function (x, y, text) {
        var $elem,
            $tpsan;

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