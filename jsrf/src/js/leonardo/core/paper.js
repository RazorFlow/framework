define(['leonardo/core/element'], function (Element) {

    // Static properties
    var elements = {};
    var elemID = 'paper';
    var renderers = null;
    var renderer = null;
    var attrs = {

    };

    /**
     * Paper constructor
     * @param  {HTMLDOMNode} node  The DOM node where the svg is appended
     * @param  {Number} width  The width of the svg
     * @param  {Number} height The height of the svg
     */
    var Paper = function (node, width, height) {
        Paper.id = elemID;

        init (this, node, width, height);

        for(var key in elements) {
            this[key] = createElement(this, elements[key]);
        }
    };

    /**
     * Static method which registers an element with the paper object. When an element is registered paper can use the 
     * method with the element's id and create an instance of that particular element
     * @param  {Function} constructor The constructor of the element which is being registered
     */
    Paper.registerElement = function (constructor) {
        constructor.setRenderer (renderers[constructor.id]);
        elements[constructor.id] = constructor;
    };

    /**
     * Sets the renderer class for paper
     * @param  {Function} _renderer The paper renderer constructor
     */
    Paper.setRenderer = function (_renderer) {
        renderers = _renderer;
        renderer = renderers[elemID];
    };

    Paper.prototype = new Element ();
    Paper.prototype.constructor = Paper;

    /**
     * Private function which is called when the paper instance is created
     * @param  {HTMLDOMNode} node  The DOM node where the svg is appended
     * @param  {Number} width  The width of the svg
     * @param  {Number} height The height of the svg
     */
    function init (self, node, width, height) {
        self.__elem = new renderer(node, width, height);
    };

    /**
     * Private function which creates the element and sets the paper property of that element
     * @param  {Object} self        Pointer to the paper object
     * @param  {Function} constructor The constructor of the element
     * @return {Function} returns the encapsulated constructor function
     */
    function createElement (self, constructor) {
        function F (args) {
            return constructor.apply(this, args);
        }
        F.prototype = constructor.prototype;
        F.prototype.paper = self;
        return function () {
            var f = (new F(arguments)); 
            f.setPaper (self);
            return f;
        };
    };

    return Paper;
});