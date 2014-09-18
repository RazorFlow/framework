define([], function () {
    var Leonardo = {},
        renderer = null;


    Leonardo.registerElement = function (constructor) {
        constructor.setRenderer (renderer[constructor.id]);
        Leonardo[constructor.id] = createElement(constructor);
    };

    Leonardo.setRenderer = function (_renderer) {
        renderer = _renderer;
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

    return Leonardo;
});