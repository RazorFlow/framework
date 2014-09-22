define([
    'leonardo/core/leonardo',
     'leonardo/core/paper',
     'leonardo/renderers/svg/svgmain',
     'leonardo/elements/g',
     'leonardo/elements/text',
     'leonardo/elements/line'], function(Leonardo, Paper, SVGRenderer, G, Text, Line) {
        Leonardo.setRenderer (SVGRenderer);
        Paper.registerElement (G);
        Paper.registerElement (Text);
        Paper.registerElement (Line);
        return Leonardo;
});