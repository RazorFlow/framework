/**
 * Wrapper for LinearChart
 */

define(['vendor/lodash', 
        'razorcharts2/scales/scale',
        'razorcharts2/axes/bottomaxis',
        'razorcharts2/utils/graphutils'], function (_, Scale, BottomAxis, GraphUtils) {
    var LinearChart = function() {

    };

    var options = {},
        paper = null,
        width = null,
        height = null,
        series = null,
        labels = null,
        dataMin = null,
        dataMax = null,
        xScale = null,
        yScale = null,
        xAxis = null,
        yAxis = null,
        xAxisOptions = null,
        yAxisOptions = null,
        xAxisContainer = null,
        yAxisContainer = null;

    /**
     * Sets the config for the chart
     * @param  {Object} _options The options object given by the chart object
     */
    LinearChart.prototype.config = function (_options) {
        // Setting the options and a bunch of shared private variables
        options = _.extend(options, _options);
        series = options.series;
        labels = options.labels;
        xAxisOptions = options.xAxis || {};
        yAxisOptions = options.yAxis || {};

        if(options.stacked) {
            configureStackedLinearChart ();
        } else if(options.dualAxis) {
            configureDualAxisLinearChart ();
        } else {
            configureLinearChart ();
        }
    };

    function configureLinearChart () {
        calcScaleBounds ();
        configureScales ();
        configureAxis ();
    }

    function configureStackedLinearChart () {

    }

    function configureDualAxisLinearChart () {

    }

    function calcScaleBounds () {
        var allData = [];
        for(var i=0; i<series.length; ++i) {
            allData = allData.concat(series[i].data);
        }
        dataMin = _.min (allData);
        dataMax = _.max (allData);
    }


    function configureScales () {
        // Create an ordinal scale for the x axis
        xScale = new Scale.ordinal ();
        xScale.domain (options.labels);

        yScale = new Scale.linear ();
        var yDomain = yAxisDomain ();
        yScale.domain ([yDomain.min, yDomain.max]);
    }

    function configureAxis () {
        xAxis = new BottomAxis ();
        xAxis.config ({
            type: 'ordinal',
            scale: xScale,
            ticks: labels
        });
    }

    function yAxisDomain () {
        var min = dataMin < 0 ? dataMin : 0;
        var max = dataMax;

        if(_.isNumber(yAxisOptions.minValue) || _.isNumber(yAxisOptions.maxValue)) {
            min = yAxisOptions.minValue || min;
            max = yAxisOptions.maxValue || max;
        }

        var domain = GraphUtils.prettyDomain (dataMin < 0 ? 0 : dataMin);
        return domain;
    }

    /**
     * Call this function to render the chart
     * @param  {Number} w width of the chart
     * @param  {Number} h height of the chart
     */
    LinearChart.prototype.renderTo = function (paper, w, h) {

        xScale.range ([0, w]);

        xAxisContainer = paper.g();
        xAxisContainer.attr ('id', 'rc-xaxis');
        paper.append (xAxisContainer);
        xAxis.renderTo (paper, xAxisContainer, w, h);
    };

    /**
     * Call this function to resize the chart
     */
    LinearChart.prototype.resizeTo = function () {

    }

    return LinearChart;
});