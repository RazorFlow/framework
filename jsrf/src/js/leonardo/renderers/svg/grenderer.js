define(['leonardo/renderers/svg/elementrenderer'], function (ElementRenderer) {
    var $elem = null;

    var GRenderer = function (paper) {
        $elem = this.createElement ('g');
        this.__elem = $elem;
    }

    GRenderer.prototype = new ElementRenderer  ();
    GRenderer.prototype.constructor = GRenderer;

    return GRenderer;
});