/**
 *  The main chart object of razorcharts which accepts options and decides which type of chart to create, and renders them
 */

define(['vendor/lodash', 'razorcharts2/utils/assert'], function (_, Assert) {
    var Chart =  function () {

    };

    /*
        Private properties of the chart object
     */
    var options = {};
    var wrappers = {};
    // The Chart wrapper object
    var chart = null;

    /**
     * Config function for razorcharts
     */
    Chart.prototype.config = function (_options) {
        var self = this;

        // Override the default options
        options = _.extend(options, _options);

        self.createAndConfigWrapper ();
    };

    /**
     * Registers a wrapper
     * @param  {String} key     The name of the wrapper
     * @param  {Function} wrapper The wrapper's constructor 
     */
    Chart.registerWrapper = function (key, wrapper) {
        if(typeof wrappers[key] === 'undefined') {
            wrappers[key] = wrapper;    
        } else {
           throw "Trying to register a wrapper which already exists";
        }
    };

    /**
     * Finds the correct wrapper based on the options and creates it
     */
    Chart.prototype.createAndConfigWrapper = function () {
        Assert.assertKey(options, 'type', 'string', 'Chart type not specified');
        Assert.assertKey(wrappers, options.type, 'string', 'No wrapper with type ' + options.type);
        chart = new (wrappers[options.type])();
    };

    return Chart;
});