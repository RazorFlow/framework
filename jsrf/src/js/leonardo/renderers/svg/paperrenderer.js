define(['leonardo/renderers/svg/elementrenderer'], function (ElementRenderer) {
    var svgNS = "http://www.w3.org/2000/svg";
    var $elem = null;

    var PaperRenderer = function (node) {
        $elem = document.createElementNS (svgNS, 'svg');
        if(typeof node !== 'undefined') {
            if(typeof node === 'object' && typeof node.appendChild !== 'undefined') {
                node.appendChild ($elem);
            }
        }
    }

    PaperRenderer.prototype = new ElementRenderer  ();
    PaperRenderer.prototype.constructor = PaperRenderer;

    return PaperRenderer;
});