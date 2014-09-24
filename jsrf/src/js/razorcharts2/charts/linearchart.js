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
        this.width = w;
        this.height = h;
        // Create Containers group elemets for the chart inner components
        createContainers (this);

        // Set the xScale and render xAxis
        this.xScale.range ([0, w]);
        this.xAxis.renderTo (paper, this.xAxisContainer, w, h);
        
        // Set the yScale negating the space taken by the xAxis and render the yAxis
        this.yScale.range ([0, h - this.xAxis.height()]);
        this.yAxis.renderTo (paper, this.yAxisContainer, w, h - this.xAxis.height());
        this.yAxisContainer.attr({
            'transform': 'translate(' + this.yAxis.width() + ', 0)'
        });

        // Resize the xAxis since the space taken by yAxis was not considered while rendering
        this.xScale.range ([0, w - this.yAxis.width()]);
        this.xAxis.resizeTo (w - this.yAxis.width(), h);
        this.xAxisContainer.attr({
            'transform': 'translate(' + this.yAxis.width() + ',' + (h - this.xAxis.height()) + ')'
        });

        // Render the plots
        renderPlots (this, w - this.yAxis.width(), h - this.xAxis.height());
        this.plotContainer.attr({
            'transform': 'translate(' + this.yAxis.width() + ',0)'
        });
    };

    /**
     * Call this function to resize the chart
     * @param  {Number} w width of the chart
     * @param  {Number} h height of the chart
     */
    LinearChart.prototype.resizeTo = function (w, h) {
        this.width = w;
        this.height = h;

        // Set the xScale and render xAxis
        this.xScale.range ([0, w]);
        this.xAxis.resizeTo (w, h);

        this.yScale.range ([0, h - this.xAxis.height()]);
        this.yAxis.resizeTo (w, h - this.xAxis.height());
        this.yAxisContainer.attr({
            'transform': 'translate(' + this.yAxis.width() + ', 0)'
        });

        // Resize the xAxis since the space taken by yAxis was not considered while rendering
        this.xScale.range ([0, w - this.yAxis.width()]);
        this.xAxis.resizeTo (w - this.yAxis.width(), h);
        this.xAxisContainer.attr({
            'transform': 'translate(' + this.yAxis.width() + ',' + (h - this.xAxis.height()) + 'px)'
        });

        resizePlots (this, w - this.yAxis.width(), h - this.xAxis.height());
        this.plotContainer.attr({
            'transform': 'translate(' + this.yAxis.width() + ', 0)'
        });
    };

    LinearChart.prototype.update = function (series) {
        var options = this.options;
        if(series) {
            for(var i=0; i<series.length; i++) {
                var idx = series[i].seriesIndex;
                var oldSeries = _.where(options.series, {seriesIndex: idx})[0];
                oldSeries.data = series[i].data;
            }
        }

        if(options.stacked) {
            updateStackedLinearChart (this);
        } else if(options.dualAxis) {
            updateDualAxisLinearChart (this);
        } else {
            updateLinearChart (this);
        }
    };

    function updateLinearChart (self) {
        calcScaleBounds(self);

        self.yDomain = yAxisDomain (self);
        self.yScale.domain ([self.yDomain.min, self.yDomain.max]);

        self.yAxis.update ();
        updatePlots (self);
    }

    function createContainers (self) {
        var paper = self.paper;

        self.xAxisContainer = paper.g();
        self.xAxisContainer.attr ('id', 'rc-xaxis');
        paper.append (self.xAxisContainer);

        self.yAxisContainer = paper.g();
        self.yAxisContainer.attr('id', 'rc-yaxis');
        paper.append (self.yAxisContainer);

        self.plotContainer = paper.g ();
        self.plotContainer.attr ('id', 'rc-plotcontainer');
        paper.append (self.plotContainer);
    }

    function renderPlots (self, w, h) {
        for(var key in self.plots) {
            var plot = self.plots[key];
            plot.renderTo (self.paper, self.plotContainer, w, h);
        }
    }

    function resizePlots (self, w, h) {
        for(var key in self.plots) {
            var plot = self.plots[key];
            plot.resizeTo (w, h);
        }    
    }

    function updatePlots (self) {
        for(var key in self.plots) {
            var plot = self.plots[key];
            plot.update ();
        }    
    }

    return LinearChart;
});