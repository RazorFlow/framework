/**
 * The element base class
 */
define(['vendor/lodash', 
        'leonardo/utils/timer', 
        'leonardo/utils/propertyinterpolators',
        'leonardo/utils/transformutils'], function (_, Timer, PropertyInterpolators, TransformUtils) {
    var DEFAULT_ANIMATION_DURATION = 500;
    var renderer = {};
    var Element = function () {
        
    };

    // The default prop values to start the animation with
    var propDefaults = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        transform: '',
        opacity: 1
    };

    /**
     * Constructor for the element class
     */
    Element.prototype.init = function () {
        // Cached attributes
        this.__attrs = {};
        // Cached CSS properties
        this.__css = {};
        // A queue which contains attribute mutations to be applied later when an animation is running
        this.mutationQueue = [];
    };

    /**
     * Check if any animation is going on, on this object. If it is queue it up for applying later
     */
    Element.prototype.__checkIfBusy = function (key, value) {
        // If the element is currently doing an animation push the attribute change to the mutation queue
        // so that it can be applied later
        if(this.isAnimating) {
            this.mutationQueue.push ({
                key: key, 
                value: value
            });
        }
        return this.isAnimating;
    };

    /**
     * Use this function to set attributes on the elem
     * @param  {String | Object} key   The attribute name or an object which contains a bunch of attributes
     * @param  {Number} value The value for the attribute
     * @param  {Boolean} force If true bypasses the checkIfBusy to check for running animations
     */
    Element.prototype.attr = function (key, value, force) {
        // If force is true bypass the check for running animations
        if(!force) {
            // Check if an animation is currently running on the element. If so it will be queued by
            // the __checkIfBusy method, nothing to do here, Onwards.
            if(this.__checkIfBusy(key, value)) {
                return;    
            }
        }
        // If the value is undefined it can be either a attribute GET or maybe an object is used for key
        if(typeof value === 'undefined') {
            // If key is string, surely this a GET. Return the attribute value
            if(typeof key === 'string') {
                if(typeof this.__attrs[key] === 'undefined') {
                    this.__attrs[key] = this.__elem.attr (key);
                }
                return this.__attrs[key];
            } else if(typeof key === 'object') {
                // If key is an object cache the values and call the attr method on the renderer
                this.__attr = _.extend(this.__attrs, key);
                this.__elem.attr (key, value);
            }
            
        } else {
            // Simple. This is a single attribute PUT. Just set the attribute and cache it.
            this.__attrs[key] = value;
            this.__elem.attr (key, value);
        }
    };

    /**
     * Appends another element inside this one
     * @param  {Element} element The element to be appended
     */
    Element.prototype.append = function (element) {
        this.__elem.append (element.__elem);
    };

    /**
     * Sets the paper for this element
     * @param  {Paper} _paper The paper. duh!
     */
    Element.prototype.setPaper = function(_paper) {
        this.paper = _paper;
    };

    /**
     * Sets the CSS properties
     * does similar things to the attr function but to apply CSS.
     */
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
            this.__css[key] = value;
            this.__elem.css (key, value);
        }
    };

    /**
     * A Helper function to set the transform attribute
     * @param  {Object} obj Object containing the translate, scale and rotate props
     */
    Element.prototype.transform = function (obj) {
        // Get the current transform attribute
        var tStr = this.attr ('transform') || '';
        // Convert the transform string into an object.
        var transformObject = TransformUtils.parseTransformString (tStr);
        if(typeof obj === 'object') {
            // Override the transform props
            transformObject = _.extend (transformObject, obj);
        }
        // Set it back after converting the transformObject back into a string
        this.attr ('transform', TransformUtils.transformObjectToString (transformObject));
    };

    /**
     * A Helper function to set just the translate property in a transform
     * @param  {Number} x The x coord
     * @param  {Number} y The y coord
     */
    Element.prototype.translate = function (x, y) {
        // just call the transform methid. Simple aint it? :D
        this.transform ({
            translate: [x, y]
        });
    };

    Element.prototype.rotate = function (a, x, y) {
        this.transform({
            rotate: [a, x || 0, y || 0]
        });
    }

    /**
     * Animates the attributes of this element using the animation props provided
     * @param  {Object} attrs    The attributes which are to be animated and their final values
     * @param  {[type]} duration Number of millisecs for the animation
     * @param  {[type]} fin      A callback to be called after the animation finishes
     */
    Element.prototype.animate = function (attrs, duration, fin) {
        var self = this;
        duration = duration || DEFAULT_ANIMATION_DURATION;
        var oldAttrs = {};

        // Set the state that, the element is being animated
        self.isAnimating = true;

        // Force a cache and return all the values from the actual attributes and store the current values
        for(var key in attrs) {
            oldAttrs[key] = this.attr(key, undefined, true);
            if(oldAttrs[key] === null) {
                oldAttrs[key] = propDefaults[key];
            }
        }

        // Call the timer, The timer is the function which dictates calling of the animFrames
        Timer(function(d) {
            var newAttrs = {};
            for(var key in attrs) {
                // The interpolation function which is to be applied for the current attribute which are stored in PropertyInterpolators
                var lerpFunc = PropertyInterpolators[key];
                if(!lerpFunc) {
                    throw "No interpolators defined for property " + key;
                }
                // Set the attributes by calling the interpolator with the current t
                self.attr(key, lerpFunc(oldAttrs[key], attrs[key], d / duration), true);
            }
        }, duration, function() {
            // This function is called after the animation ends and sets the final values to the attributes
            for(var key in attrs) {
                var lerpFunc = PropertyInterpolators[key];
                if(!lerpFunc) {
                    throw "No interpolators defined for property " + key;
                }
                self.attr(key, lerpFunc(oldAttrs[key], attrs[key], 1), true);
            }
            // Set the animating flag to false and apply all the queued up mutations
            self.isAnimating = false;
            self.__applyQueuedMutations ();
            // Call the finish animation callback
            if(fin) { fin(); }
        });
    };

    Element.prototype.animateWith = function (cb, duration) {
        var self = this;
        Timer (function(d) {
            cb(self, d / duration);
        }, duration);
    }

    /**
     * Applies all the queued mutations when the element finishes the animation
     */
    Element.prototype.__applyQueuedMutations = function () {
        if(this.mutationQueue.length) {
            for(var i = 0; i<this.mutationQueue.length; i++) {
                this.attr (this.mutationQueue[i].key, this.mutationQueue[i].value);
            }
            this.mutationQueue = [];
        }
    };

    /**
     * Removes the element and deletes it
     */
    Element.prototype.remove = function () {
        if(this.__elem) {
            this.__elem.remove ();
            this.__elem = undefined;
        }
    };

    /**
     * Wrapper for getBBox
     * @return {[type]} [description]
     */
    Element.prototype.getBBox = function () {
        return this.__elem.getBBox();
    };

    Element.prototype.text = function (text) {
        this.__elem.text (text);
    };

    Element.prototype.on = function (key, cb) {
        this.__elem.on (key, cb);
    };

    Element.prototype.click = function (cb) {
        this.__elem.on ('click', cb);
    };

    return Element;
});