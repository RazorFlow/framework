define([], function () {
    var svgNS = "http://www.w3.org/2000/svg";
    var $elem = null;
    var ElementRenderer = function () {

    };

    ElementRenderer.prototype.createElement = function (type) {
        return ($elem = document.createElementNS (svgNS, type));
    }

    ElementRenderer.prototype.attr = function (obj, value) {
        if(typeof obj === 'string') {
            $elem.setAttribute (obj, value);
        } else if (typeof obj === 'object') {
            for(var key in obj) {
                $elem.setAttribute (key, obj[key]);
            }
        }
    }

    ElementRenderer.prototype.width = function (value) {
        this.attr ('width', value);
    };

    ElementRenderer.prototype.height = function (value) {
        this.attr ('height', value);
    };    

    ElementRenderer.prototype.append = function (elem) {
        this.__elem.appendChild(elem.__elem);
    }

    return ElementRenderer;
});