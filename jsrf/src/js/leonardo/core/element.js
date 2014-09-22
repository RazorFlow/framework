define([], function () {
    var attrs = {},
        css = {},
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

    Element.prototype.css = function (key, value) {
        if(typeof value === 'undefined') {
            if(typeof css[key] === 'undefined') {
                css[key] = this.__elem.css (key);
            }
            return css[key];
        } else {
            css[key] = value;
            this.__elem.css (key, value);
        }
    };

    Element.prototype.transform = function (transformString) {
        
    };

    Element.prototype.getBBox = function () {
        return this.__elem.getBBox();
    };

    return Element;
});