/**
 * Wrapper for LinearChart
 */

define(['vendor/lodash', 
        'razorcharts2/scales/scale',
        'razorcharts2/axes/bottomaxis',
        'razorcharts2/axes/leftaxis',
        'razorcharts2/utils/graphutils',
        'razorcharts2/plots/column'], function (_, Scale, BottomAxis, LeftAxis, GraphUtils, Column) {

    var plots = {
        'column': Column
    };

    var plotOrder = ['column', 'area', 'line'];
    var LinearChart = function() {
        this.options = {};
        this.plots = {};
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
        configurePlots (self);
    }

    function configureStackedLinearChart () {

    }

    function configureDualAxisLinearChart () {

    }

    function configurePlots (self) {
        var series = self.options.series;
        dividePlotsByDisplayType (self);
        
        for(var i=0; i<plotOrder.length; i++) {
            var plotType = plotOrder[i];
            var plotSeries = self.plotsByDisplayType[plotType];
            var plot = plots[plotType];

            for(var j=0; j<series.length; j++) {
                // TODO : for dual axis use this to provide the correct scale
                series[j].scale = self.yScale;
            }

            if(plot && plotSeries) {
                self.plots[plotType] = new plot();
                self.plots[plotType].config({
                    series: series
                });
            }
        }
    }

    function dividePlotsByDisplayType (self) {
        var series = self.options.series;
        self.plotsByDisplayType = {};

        for(var i=0; i<series.length; i++) {
            var displayType = series[i].displayType;
            if(!_.isArray(self.plotsByDisplayType[displayType])) {
                self.plotsByDisplayType[displayType] = [];
            }
            self.plotsByDisplayType[displayType].push(series[i]);
        }
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

        var domain = GraphUtils.prettyDomain (self.dataMin < 0 ? self.dataMin : 0, self.dataMax);
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
        paper.append (this.xAxisContainer);
        this.xAxis.renderTo (paper, this.xAxisContainer, w, h);
        
        this.yScale.range ([0, h - this.xAxis.height()]);
        this.yAxisContainer = paper.g();
        this.yAxisContainer.attr('id', 'rc-yaxis');
        paper.append (this.yAxisContainer);
        this.yAxis.renderTo (paper, this.yAxisContainer, w, h - this.xAxis.height());
        this.yAxisContainer.css({
            'transform': 'translate(' + this.yAxis.width() + 'px, 0)'
        });

        this.xScale.range ([0, w - this.yAxis.width()]);
        this.xAxis.resizeTo (w - this.yAxis.width(), h);
        this.xAxisContainer.css({
            'transform': 'translate(' + this.yAxis.width() + 'px,' + (h - this.xAxis.height()) + 'px)'
        });

        this.plotContainer = paper.g ();
        this.plotContainer.attr ('id', 'rc-plotcontainer');
        paper.append (this.plotContainer);

        renderPlots (this, w - this.yAxis.width(), h - this.xAxis.height());

        this.plotContainer.css({
            'transform': 'translate(' + this.yAxis.width() + 'px,0px)'
        });
    };

    function renderPlots (self, w, h) {
        for(var key in self.plots) {
            var plot = self.plots[key];
            plot.renderTo (self.paper, self.plotContainer, w, h);
        }
    }

    /**
     * Call this function to resize the chart
     */
    LinearChart.prototype.resizeTo = function () {

    }

    return LinearChart;
});