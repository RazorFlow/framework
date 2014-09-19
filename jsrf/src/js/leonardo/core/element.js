define([], function () {
    var attrs = {},
        renderer = {};

    var Element = function () {
        this.init.apply(this, arguments);
    };

    Element.prototype.init = function (paper) {
        if(paper) {
            this.setPaper (paper);
        }
    };

    Element.prototype.attr = function (key, value) {
        console.log('attr function called!!');
        attrs[key] = value;
        this.__elem.attr (key, value);
    };

    Element.prototype.append = function (element) {
        this.__elem.append (element.__elem);
    };

    Element.prototype.setPaper = function(_paper) {
        this.paper = _paper;
    };

    return Element;
});