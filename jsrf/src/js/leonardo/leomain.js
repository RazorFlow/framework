define([
    'leonardo/core/leonardo',
     'leonardo/core/paper',
     'leonardo/renderers/svg/svgmain'], function(Leonardo, Paper, SVGRenderer) {
        Leonardo.setRenderer (SVGRenderer);
        Leonardo.registerElement (Paper);

        return Leonardo;
});