define(['leonardo/core/element'], function (Element) {

    var elements = {};
    var elemID = 'paper';
    var renderers = null;
    var renderer = null;
    var elem = null;
    var attrs = {

    };

    var Paper = function (node, width, height) {
        Paper.id = elemID;

        init (node, width, height);

        for(var key in elements) {
            this[key] = setPaper (elements[key], this);
        }

        this.__elem = elem;
    };

    Paper.registerElement = function (constructor) {
        constructor.setRenderer (renderers[constructor.id]);
        elements[constructor.id] = createElement(constructor);
    };

    Paper.setRenderer = function (_renderer) {
        renderers = _renderer;
        renderer = renderers[elemID];
    };

    Paper.prototype = new Element ();
    Paper.prototype.constructor = Paper;

    function init (node, width, height) {
        elem = new renderer(node, width, height);
    };

    function createElement (constructor) {
        function F (args) {
            return constructor.apply(this, args);
        }
        F.prototype = constructor.prototype;
        return function () {
            return (new F(arguments));
        };
    };

    function setPaper (func, paper) {
        return  function () {
            var o = func(paper);
            return o;    
        }
    }

    return Paper;
});