define(['leonardo/renderers/svg/elementrenderer'], function (ElementRenderer) {
    var TextRenderer = function (x, y, text) {
        var $elem,
            $tpsan;

        $elem = this.createElement ('text');
        $tspan = this.createElement ('tspan');
        $tspan.setAttribute ("stroke", "none");
        $elem.appendChild ($tspan);
        $elem.setAttribute ('x', x);
        $elem.setAttribute ('y', y);
        $tspan.textContent = text;

        this.__elem = $elem;
        this.__tspan = $tspan;
    }

    TextRenderer.prototype = new ElementRenderer  ();
    TextRenderer.prototype.constructor = TextRenderer;

    TextRenderer.prototype.text = function (text) {
        this.__tspan.textContent = text;
    };

    TextRenderer.prototype.addLine = function (dx, dy, text) {
        var $tspan = this.createElement ('tspan');
        $tspan.innerHTML = text;
        $tspan.setAttribute ('dx', dx);
        $tspan.setAttribute ('dy', dy);
        this.__elem.appendChild ($tspan);
    }

    return TextRenderer;
});