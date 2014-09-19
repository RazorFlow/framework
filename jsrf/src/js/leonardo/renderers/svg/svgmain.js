define(['leonardo/renderers/svg/paperrenderer',
        'leonardo/renderers/svg/grenderer',
        'leonardo/renderers/svg/textrenderer'], function (PaperRenderer, GRenderer, TextRenderer) {
    return  {
        paper: PaperRenderer,
        g: GRenderer,
        text: TextRenderer
    };
});