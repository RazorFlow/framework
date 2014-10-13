/**
 *  The main chart object of razorcharts which accepts options and decides which type of chart to create, and renders them
 */

define([
    'vendor/lodash', 
    'razorcharts2/utils/assert',
    'leonardo/leomain',
    'razorcharts2/utils/eventmanager'], function (_, Assert, Leonardo, EventManager) {
    var defaultXPadding = 0,
        defaultYPadding = 10,
        xPadding = 20,
        yPadding = 30;
    var Chart =  function () {
        this.options = {};
        this.options.eventManager = new EventManager();
    };
    var charts = {};
    /**
     * Config function for razorcharts
     */
    Chart.prototype.config = function (_options) {
        var self = this;    

        // Override the default options
        this.options = _.extend(this.options, _options);

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
        var options = this.options;
        Assert.assertKey(options, 'type', 'string', 'Chart type not specified');
        Assert.assertKey(charts, options.type, 'string', 'No wrapper with type ' + options.type);
        this.chart = new (charts[options.type])();
        this.chart.config (options);
    };

    /**
     * Renders the chart
     * @param  {HTMLDOMNode} node the DOM node in which the main svg element is to be appended
     * @param  {Number} width  width of the chart
     * @param  {Number} height height of the chart
     */
    Chart.prototype.renderTo = function (node, width, height) {
        var paper = this.paper = Leonardo.paper(node, width, height);
        var core = this.core = paper.g();
        var paddingX = 0,
            paddingY = 10;

        if(this.options.type !== 'gauge') {
            defaultXPadding = xPadding;
            defaultYPadding = xPadding;
        }

        core.attr ('id', 'rc-chart-core');
        paper.append(core);
        this.chart.renderTo (paper, core, width - defaultXPadding, height -defaultYPadding);
    };

    /**
     * Resizes the chart
     * @param  {Number} width  width of the chart
     * @param  {Number} height height of the chart
     */
    Chart.prototype.resizeTo = function(width, height) {
        this.paper.attr ({
            width: width,
            height: height
        });

        if(this.options.type !== 'gauge') {
            defaultXPadding = xPadding;
            defaultYPadding = xPadding;
        }

        this.chart.resizeTo (width - defaultXPadding, height - defaultYPadding);
    }

    Chart.prototype.update = function (options) {
        this.options = _.extend(this.options, options);
        this.chart.update(options);
    }

    Chart.prototype.on = function(eventName, cb) {
        this.options.eventManager.bind(eventName, cb);
    };

    Chart.prototype.callFunction = function (funcName, argsObject) {
        return this.chart.callFunction (funcName, argsObject);
    };

    return Chart;
});