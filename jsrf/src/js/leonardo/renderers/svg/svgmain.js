define(['leonardo/renderers/svg/paperrenderer',
        'leonardo/renderers/svg/grenderer',
        'leonardo/renderers/svg/textrenderer',
        'leonardo/renderers/svg/linerenderer'], function (PaperRenderer, GRenderer, TextRenderer, LineRenderer) {
    return  {
        paper: PaperRenderer,
        g: GRenderer,
        text: TextRenderer,
        line: LineRenderer
    };
});