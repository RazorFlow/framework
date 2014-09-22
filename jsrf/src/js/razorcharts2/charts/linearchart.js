/**
 * Wrapper for LinearChart
 */

define(['vendor/lodash', 
        'razorcharts2/scales/scale',
        'razorcharts2/axes/bottomaxis',
        'razorcharts2/axes/leftaxis',
        'razorcharts2/utils/graphutils'], function (_, Scale, BottomAxis, LeftAxis, GraphUtils) {
    var LinearChart = function() {
        this.options = {};
    };

    /**
     * Sets the config for the chart
     * @param  {Object} _options The options object given by the chart object
     */
    LinearChart.prototype.config = function (_options) {
        // Setting the options and a bunch of shared private variables
        var options = this.options = _.extend(this.options, _options);
        this.series = options.series;
        this.labels = options.labels;
        this.xAxisOptions = options.xAxis || {};
        this.yAxisOptions = options.yAxis || {};

        if(options.stacked) {
            configureStackedLinearChart (this);
        } else if(options.dualAxis) {
            configureDualAxisLinearChart (this);
        } else {
            configureLinearChart (this);
        }
    };

    function configureLinearChart (self) {
        calcScaleBounds (self);
        configureScales (self);
        configureAxis (self);
    }

    function configureStackedLinearChart () {

    }

    function configureDualAxisLinearChart () {

    }

    function calcScaleBounds (self) {
        var allData = [],
            series = self.options.series;
        for(var i=0; i<series.length; ++i) {
            allData = allData.concat(self.series[i].data);
        }
        self.dataMin = _.min (allData);
        self.dataMax = _.max (allData);
    }


    function configureScales (self) {
        // Create an ordinal scale for the x axis
        self.xScale = new Scale.ordinal ();
        self.xScale.domain (self.options.labels);

        self.yScale = new Scale.linear ();
        self.yDomain = yAxisDomain (self);
        self.yScale.domain ([self.yDomain.min, self.yDomain.max]);
    }

    function configureAxis (self) {
        self.xAxis = new BottomAxis ();
        self.xAxis.config ({
            type: 'ordinal',
            scale: self.xScale,
            ticks: self.labels
        });

        self.yAxis = new LeftAxis ();
        self.yAxis.config({
            type: 'linear',
            scale: self.yScale,
            ticks: self.yDomain.ticks
        });
    }

    function yAxisDomain (self) {
        var min = self.dataMin < 0 ? self.dataMin : 0;
        var max = self.dataMax;

        if(_.isNumber(self.yAxisOptions.minValue) || _.isNumber(self.yAxisOptions.maxValue)) {
            min = self.yAxisOptions.minValue || min;
            max = self.yAxisOptions.maxValue || max;
        }

        var domain = GraphUtils.prettyDomain (self.dataMin < 0 ? 0 : self.dataMin);
        return domain;
    }

    /**
     * Call this function to render the chart
     * @param  {Number} w width of the chart
     * @param  {Number} h height of the chart
     */
    LinearChart.prototype.renderTo = function (paper, w, h) {
        this.paper = paper;
        this.xScale.range ([0, w]);
        this.xAxisContainer = paper.g();
        this.xAxisContainer.attr ('id', 'rc-xaxis');
        this.paper.append (this.xAxisContainer);
        this.xAxis.renderTo (paper, this.xAxisContainer, w, h);

        // yScale.range ([0, h - xAxis.height]);
        // yAxisContainer = paper.g();
        // yAxisContainer.attr('id', 'rc-yaxis');
        // paper.append (yAxisContainer);
        // yAxis.renderTo (paper, yAxisContainer, w, h);
    };

    /**
     * Call this function to resize the chart
     */
    LinearChart.prototype.resizeTo = function () {

    }

    return LinearChart;
});