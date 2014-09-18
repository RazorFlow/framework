define([], function () {
    var attrs = {},
        renderer = {};

    var Element = function () {
        console.log('Element constructor called!!');
    };

    Element.prototype.attr = function (key, value) {
        console.log('attr function called!!');
        attrs[key] = value;
    };

    return Element;
});