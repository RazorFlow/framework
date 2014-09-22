define(['leonardo/renderers/svg/elementrenderer'], function (ElementRenderer) {
    var GRenderer = function (paper) {
        var $elem = null;
        $elem = this.createElement ('g');
        this.__elem = $elem;
    }

    GRenderer.prototype = new ElementRenderer  ();
    GRenderer.prototype.constructor = GRenderer;

    return GRenderer;
});