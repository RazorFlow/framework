define(['leonardo/renderers/svg/elementrenderer'], function (ElementRenderer) {
    var PaperRenderer = function (node, width, height) {
        var $elem = null;
        $elem = this.createElement ('svg');
        this.__elem = $elem;

        if(typeof node !== 'undefined') {
            if(typeof node === 'object' && typeof node.appendChild !== 'undefined') {
                node.appendChild ($elem);
            } else if(typeof node === 'string') {
                node.appendChild (document.getElementById(node));
            }
        }

        this.width (width);
        this.height (height);
    }

    PaperRenderer.prototype = new ElementRenderer  ();
    PaperRenderer.prototype.constructor = PaperRenderer;

    return PaperRenderer;
});