define(['vendor/lodash', 
        'leonardo/utils/timer', 
        'leonardo/utils/propertyinterpolators',
        'leonardo/utils/transformutils'], function (_, Timer, PropertyInterpolators, TransformUtils) {
    var DEFAULT_ANIMATION_DURATION = 500;
    var renderer = {};
    var Element = function () {
        
    };

    var propDefaults = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        transform: '',
        opacity: 1
    };

    Element.prototype.init = function () {
        this.__attrs = {};
        this.__css = {};
    };

    Element.prototype.attr = function (key, value) {
        if(typeof value === 'undefined') {
            if(typeof key === 'string') {
                if(typeof this.__attrs[key] === 'undefined') {
                    this.__attrs[key] = this.__elem.attr (key);
                }
                return this.__attrs[key];
            } else if(typeof key === 'object') {
                this.__attr = _.extend(this.__attrs, key);
                this.__elem.attr (key, value);
            }
            
        } else {
            this.__attrs[key] = value;
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
            if(typeof key === 'string') {
                if(typeof this.__css[key] === 'undefined') {
                    this.__css[key] = this.__elem.css (key);
                }
                return this.__css[key];
            } else if(typeof key === 'object') {
                this.__css = _.extend (this.__css, key);
                this.__elem.css (key, value);
            }
                
        } else {
            this.csss[key] = value;
            this.__elem.css (key, value);
        }
    };

    Element.prototype.transform = function (obj) {
        var tStr = this.attr ('transform') || '';
        var transformObject = TransformUtils.parseTransformString (tStr);
        if(typeof obj === 'object') {
            transformObject = _.extend (transformObject, obj);
        }
        this.attr ('transform', TransformUtils.transformObjectToString (transformObject));
    };

    Element.prototype.translate = function (x, y) {        
        this.transform ({
            translate: [x, y]
        });
    };

    Element.prototype.animate = function (attrs, duration, fin) {
        var self = this;
        duration = duration || DEFAULT_ANIMATION_DURATION;
        var oldAttrs = {};

        for(var key in attrs) {
            oldAttrs[key] = this.attr(key);
            if(oldAttrs[key] === null) {
                oldAttrs[key] = propDefaults[key];
            }
        }

        Timer(function(d) {
            var newAttrs = {};
            for(var key in attrs) {
                var dist = attrs[key] - oldAttrs[key];
                var lerpFunc = PropertyInterpolators[key];
                if(!lerpFunc) {
                    throw "No interpolators defined for property " + key;
                }
                self.attr(key, lerpFunc(oldAttrs[key], attrs[key], d / duration));
            }
        }, duration, function() {
            for(var key in attrs) {
                var lerpFunc = PropertyInterpolators[key];
                if(!lerpFunc) {
                    throw "No interpolators defined for property " + key;
                }
                self.attr(key, lerpFunc(oldAttrs[key], attrs[key], 1));
            }
            if(fin) { fin(); }
        });
    };

    Element.prototype.getBBox = function () {
        return this.__elem.getBBox();
    };

    return Element;
});