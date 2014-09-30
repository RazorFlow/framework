define(['leonardo/renderers/svg/paperrenderer',
        'leonardo/renderers/svg/grenderer',
        'leonardo/renderers/svg/textrenderer',
        'leonardo/renderers/svg/linerenderer',
        'leonardo/renderers/svg/rectrenderer',
        'leonardo/renderers/svg/pathrenderer',
        'leonardo/renderers/svg/circlerenderer'], function (PaperRenderer, GRenderer, TextRenderer, LineRenderer, RectRenderer, PathRenderer, CircleRenderer) {
    return  {
        paper: PaperRenderer,
        g: GRenderer,
        text: TextRenderer,
        line: LineRenderer,
        rect: RectRenderer,
        path: PathRenderer,
        circle: CircleRenderer
    };
});