define(['leonardo/renderers/svg/elementrenderer'], function (ElementRenderer) {
    

    var PathRenderer = function (pathString) {
        var $elem = null;
        $elem = this.createElement ('path');
        this.__elem = $elem;
        this.attr('d', pathString || 'M0,0');
    }

    PathRenderer.prototype = new ElementRenderer  ();
    PathRenderer.prototype.constructor = PathRenderer;

    return PathRenderer;
});