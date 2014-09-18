/**
 *  The main chart object of razorcharts which accepts options and decides which type of chart to create, and renders them
 */

define([
    'vendor/lodash', 
    'razorcharts2/utils/assert',
    'leonardo/leomain'], function (_, Assert, Leonardo) {
    var Chart =  function () {

    };

    /*
        Private properties of the chart object
     */
    var options = {};
    var charts = {};
    // The Chart wrapper object
    var chart = null;
    var paper = null;

    /**
     * Config function for razorcharts
     */
    Chart.prototype.config = function (_options) {
        var self = this;

        // Override the default options
        options = _.extend(options, _options);

        self.createAndConfigChart ();
    };

    /**
     * Registers a Chart type
     * @param  {String} key     The name of the wrapper
     * @param  {Function} _chart The chart's constructor 
     */
    Chart.registerChart = function (key, _chart) {
        if(typeof charts[key] === 'undefined') {
            charts[key] = _chart;    
        } else {
           throw "Trying to register a wrapper which already exists";
        }
    };

    /**
     * Finds the correct wrapper based on the options and creates it
     */
    Chart.prototype.createAndConfigChart = function () {
        Assert.assertKey(options, 'type', 'string', 'Chart type not specified');
        Assert.assertKey(charts, options.type, 'string', 'No wrapper with type ' + options.type);
        chart = new (charts[options.type])();
        chart.config (options);
    };

    Chart.prototype.renderTo = function (node, w, h) {
        // canvas = Leonardo.canvas ();
        paper = Leonardo.paper(node);

        debugger
    };

    return Chart;
});