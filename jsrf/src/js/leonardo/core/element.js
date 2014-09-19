define([], function () {
    var attrs = {},
        renderer = {};

    var Element = function () {
    };

    Element.prototype.attr = function (key, value) {
        if(typeof value === 'undefined') {
            if(typeof attrs[key] === 'undefined') {
                attrs[key] = this.__elem.attr (key);
            }
            return attrs[key];    
        } else {
            attrs[key] = value;
            this.__elem.attr (key, value);
        }
    };

    Element.prototype.append = function (element) {
        this.__elem.append (element.__elem);
    };

    Element.prototype.setPaper = function(_paper) {
        this.paper = _paper;
    };

    return Element;
});