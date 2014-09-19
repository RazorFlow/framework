define(['leonardo/renderers/svg/elementrenderer'], function (ElementRenderer) {
    var $elem = null;

    var PaperRenderer = function (node, width, height) {
        $elem = this.createElement ('svg');

        if(typeof node !== 'undefined') {
            if(typeof node === 'object' && typeof node.appendChild !== 'undefined') {
                node.appendChild ($elem);
            } else if(typeof node === 'string') {
                node.appendChild (document.getElementById(node));
            }
        }

        this.width (width);
        this.height (height);

        this.__elem = $elem;
    }

    PaperRenderer.prototype = new ElementRenderer  ();
    PaperRenderer.prototype.constructor = PaperRenderer;

    return PaperRenderer;
});