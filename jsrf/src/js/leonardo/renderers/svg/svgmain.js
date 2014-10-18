define(['leonardo/renderers/svg/paperrenderer',
        'leonardo/renderers/svg/grenderer',
        'leonardo/renderers/svg/textrenderer',
        'leonardo/renderers/svg/linerenderer',
        'leonardo/renderers/svg/rectrenderer',
        'leonardo/renderers/svg/pathrenderer',
        'leonardo/renderers/svg/circlerenderer',
        'leonardo/renderers/svg/tspanrenderer'], function (PaperRenderer, GRenderer, TextRenderer, LineRenderer, RectRenderer, PathRenderer, CircleRenderer, TspanRenderer) {
    return  {
        paper: PaperRenderer,
        g: GRenderer,
        text: TextRenderer,
        line: LineRenderer,
        rect: RectRenderer,
        path: PathRenderer,
        circle: CircleRenderer,
        tspan: TspanRenderer
    };
});