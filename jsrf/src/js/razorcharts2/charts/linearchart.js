/**
 * Wrapper for LinearChart
 */

define(['vendor/lodash'], function (_) {
    var LinearChart = function() {

    };

    var options = {};

    /**
     * Sets the config for the chart
     * @param  {Object} _options The options object given by the chart object
     */
    LinearChart.prototype.config = function (_options) {
        config = _.extend(options, _options);
    };

    /**
     * Call this function to render the chart
     * @param  {Number} w width of the chart
     * @param  {Number} h height of the chart
     */
    LinearChart.prototype.renderTo = function (w, h) {

    };

    /**
     * Call this function to resize the chart
     */
    LinearChart.prototype.resizeTo = function () {

    }

    return LinearChart;
});