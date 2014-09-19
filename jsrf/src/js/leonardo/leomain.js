define([
    'leonardo/core/leonardo',
     'leonardo/core/paper',
     'leonardo/renderers/svg/svgmain',
     'leonardo/elements/g',
     'leonardo/elements/text'], function(Leonardo, Paper, SVGRenderer, G, Text) {
        Leonardo.setRenderer (SVGRenderer);
        Paper.registerElement (G);
        Paper.registerElement (Text);
        return Leonardo;
});