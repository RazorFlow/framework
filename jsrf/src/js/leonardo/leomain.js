define([
    'leonardo/core/leonardo',
     'leonardo/core/paper',
     'leonardo/renderers/svg/svgmain',
     'leonardo/elements/g'], function(Leonardo, Paper, SVGRenderer, G) {
        Leonardo.setRenderer (SVGRenderer);
        Paper.registerElement (G);

        return Leonardo;
});