define(['leonardo/renderers/svg/elementrenderer'], function (ElementRenderer) {
    var TspanRenderer = function (text) {
        var $tpsan;

        $tspan = this.createElement ('tspan');

        $tspan.setAttribute ('stroke', 'none');
        $tspan.textContent = text;

        this.__elem = $tspan;
    }

    TspanRenderer.prototype = new ElementRenderer  ();
    TspanRenderer.prototype.constructor = TspanRenderer;

    TspanRenderer.prototype.text = function (text) {
        this.__elem.textContent = text;
    };

    return TspanRenderer;
});