define(['vendor/lodash'], function (_) {
    var svgNS = "http://www.w3.org/2000/svg";
    var ElementRenderer = function () {

    };

    ElementRenderer.prototype.createElement = function (type) {
        var elem = document.createElementNS (svgNS, type);
        elem.setAttribute('stroke', '#000');
        return elem;
    }

    ElementRenderer.prototype.attr = function (obj, value) {
        if(typeof value === 'undefined' && typeof obj === 'string') {
            return this.__elem.getAttribute (obj);
        }
        if(typeof obj === 'string') {
            this.__elem.setAttribute (obj, value);
        } else if (typeof obj === 'object') {
            for(var key in obj) {
                this.__elem.setAttribute (key, obj[key]);
            }
        }
    };

    ElementRenderer.prototype.css = function (obj, value) {
        if(typeof value === 'undefined' && typeof obj === 'string') {
            return  this.__elem.style[obj];
        }
        if(typeof obj === 'string') {
            this.__elem.style[obj] = value;
        } else if (typeof obj === 'object') {
            this.__elem.style = _.extend (this.__elem.style, obj);
        }
    };

    ElementRenderer.prototype.width = function (value) {
        this.attr ('width', value);
    };

    ElementRenderer.prototype.height = function (value) {
        this.attr ('height', value);
    };    

    ElementRenderer.prototype.append = function (elem) {
        this.__elem.appendChild(elem.__elem);
    }

    ElementRenderer.prototype.text = function (text) {
        this.__elem.innerHTML = text;
    };

    ElementRenderer.prototype.getBBox = function () {
        return this.__elem.getBBox();
    };

    return ElementRenderer;
});