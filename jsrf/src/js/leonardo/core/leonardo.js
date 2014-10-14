define(['leonardo/core/paper', 'leonardo/core/color'], function (Paper, Color) {
    var Leonardo = {},
        renderer = null;

    /**
     * Sets the renderer
     * @param  {Renderer} _renderer The render object
     */
    Leonardo.setRenderer = function (_renderer) {
        renderer = _renderer;
        Paper.setRenderer (renderer);
    };

    /**
     * Creates and returns an instance of the paper object
     * @param  {HTMLDOMNode} node  The DOM Node or the ID of the dom node in which the svg is to be appended
     * @param  {Number} width  width of the svg
     * @param  {[type]} height height of the svg
     * @return {Paper}  Instance of the paper object
     */
    Leonardo.paper = function (node, width, height) {
        return new Paper (node, width, height);
    };

    Leonardo.color = function (color) {
        return new Color (color);
    }

    return Leonardo;
});