define(['leonardo/renderers/svg/paperrenderer',
        'leonardo/renderers/svg/grenderer',
        'leonardo/renderers/svg/textrenderer',
        'leonardo/renderers/svg/linerenderer',
        'leonardo/renderers/svg/rectrenderer'], function (PaperRenderer, GRenderer, TextRenderer, LineRenderer, RectRenderer) {
    return  {
        paper: PaperRenderer,
        g: GRenderer,
        text: TextRenderer,
        line: LineRenderer,
        rect: RectRenderer
    };
});