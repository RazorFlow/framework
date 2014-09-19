define(['leonardo/renderers/svg/paperrenderer',
        'leonardo/renderers/svg/grenderer'], function (PaperRenderer, GRenderer) {
    return  {
        paper: PaperRenderer,
        g: GRenderer
    };
});