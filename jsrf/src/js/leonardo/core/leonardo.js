define(['leonardo/core/paper'], function (Paper) {
    var Leonardo = {},
        renderer = null;

    Leonardo.setRenderer = function (_renderer) {
        renderer = _renderer;
        Paper.setRenderer (renderer);
    };

    Leonardo.paper = function (node, width, height) {
        return new Paper (node, width, height);
    };

    return Leonardo;
});