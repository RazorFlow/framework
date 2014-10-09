define(['vendor/lodash',
        'razorcharts2/scales/scale',
        'razorcharts2/axes/leftaxis',
        'razorcharts2/axes/bottomaxis',
        'razorcharts2/utils/graphutils',
        'razorcharts2/plots/bar',
        'razorcharts2/plots/stackedbar',
        'razorcharts2/axes/xgrid'], function (_, Scale, LeftAxis, BottomAxis, GraphUtils, Bar, StackedBar, XGrid) {
    var BarChart = function () {
        this.options = {};
        this.xAxisOptions = {};
        this.yAxisOptions = {};
        this.plot = [];
    };

    BarChart.prototype.config = function (_options) {
        var options = this.options = _.extend(this.options, _options);
        this.xAxisOptions = options.xAxis || {};
        this.yAxisOptions = options.yAxis || {};
        if(options.stacked) {
            configureStackedBarChart (this);
        } else {
            configureBarChart (this);
        }
    };

    function configureBarChart (self) {
        configureEvents (self);
        calcScaleBounds (self);
        configureScales (self);
        configureAxes (self);
        configurePlots (self);
    };

    function configureEvents (self) {
        var eventManager = self.options.eventManager;
        eventManager.bind('tooltip', function (obj) {
            self.options.tooltip.onShow (obj.position.x, obj.position.y, obj);
        });
    };

    function configureStackedBarChart (self) {
        configureEvents (self);
        calcStackedScaleBounds (self);
        configureScales (self);
        configureAxes (self);
        configureStackedPlots (self);
    }

    function calcScaleBounds (self) {
        var allData = [],
            series = self.options.series;

        for(var i=0; i<series.length; i++) {
            allData = allData.concat (series[i].data);
        }

        self.dataMin = _.min (allData);
        self.dataMax = _.max (allData);
    };

    function calcStackedScaleBounds (self) {
        var negevData = [],
            posiData = [],
            series = self.options.series;
        for(var i=0; i<series.length; i++) {
            var data = series[i].data;
            for(var j=0; j<series[i].data.length; j++) {
                posiData[j] = typeof posiData[j] === 'undefined' ? 0 : posiData[j];
                negevData[j] = typeof negevData[j] === 'undefined' ? 0 : negevData[j];
                if(data[j] >= 0) {
                    posiData[j] += data[j];
                } else {
                    negevData[j] += data[j];
                }
            }
        }

        self.dataMin = _.min (negevData);
        self.dataMax = _.max (posiData);
    };

    function configureScales (self) {
        self.yScale = new Scale.ordinal ();
        self.yScale.domain (self.options.labels);

        self.xScale = new Scale.linear ();
        self.xDomain = xAxisDomain (self);
        self.xScale.domain ([self.xDomain.min, self.xDomain.max]);
    };

    function configureAxes (self) {
        self.yAxis = new LeftAxis ();
        self.yAxis.config({
            type: 'ordinal',
            scale: self.yScale,
            ticks: self.options.labels.reverse(),
            tickLabels: self.options.labels.reverse()
        });

        self.xAxis = new BottomAxis ();
        self.xAxis.config({
            type: 'linear',
            scale: self.xScale,
            ticks: self.xDomain.ticks,
            tickLabels: _.map(self.xDomain.ticks, self.options.xAxis.format),
            label: self.options.yAxis.label
        });

        self.xGrid = new XGrid ();
        self.xGrid.config ({
            type: 'linear',
            scale: self.xScale,
            ticks: self.xDomain.ticks
        });
    };

    function xAxisDomain (self) {
        var min = self.dataMin < 0 ? self.dataMin : 0,
            max = self.dataMax;
        var domain;
        if(_.isNumber(self.xAxisOptions.minValue) || _.isNumber(self.xAxisOptions.maxValue)) {
            var numTicks = 5;
            min = self.xAxisOptions.minValue || min;
            max = self.xAxisOptions.maxValue || max;
            numTicks = self.yAxisOptions.numTicks || numTicks;
            var ticks = [],
                unit = (max - min) / numTicks;
            for(var i=0; i<numTicks + 1; i++) {
                ticks[i] = min + unit * i;
            }
            domain = {
                min: min,
                max: max,
                numTicks: numTicks,
                unit: unit,
                ticks: ticks
            };
        } else {
            domain = GraphUtils.prettyDomain (min, max);
        }
        return domain;
    };

    function configurePlots (self) {
        var series = self.options.series;
        for(var i=0; i<series.length; i++) {
            series[i].scale = self.xScale;
        }
        self.plot = new Bar ();
        self.plot.config({
            series: series,
            eventManager: self.options.eventManager,
            labels: self.options.labels
        });
    };

    function configureStackedPlots (self) {
        var series = self.options.series;
        for(var i=0; i<series.length; i++) {
            series[i].scale = self.xScale;
        }
        self.plot = new StackedBar ();
        self.plot.config({
            series: series,
            eventManager: self.options.eventManager,
            labels: self.options.labels
        });
    };

    BarChart.prototype.renderTo = function (paper, core, w, h) {
        this.paper = paper;
        this.width = w - 20;
        this.height = h - 30;
        this.core = core;
        createContainers (this);
        this.xScale.range ([0, w]);
        this.xAxis.renderTo (paper, this.xAxisContainer, w, h);

        this.yScale.range ([0, h - this.xAxis.height()]);
        this.yAxis.renderTo (paper, this.yAxisContainer, w, h - this.xAxis.height());

        this.xScale.range ([0, w - this.yAxis.width()]);
        this.xAxis.resizeTo (w - this.yAxis.width(), h);

        this.xAxisContainer.translate (this.yAxis.width(), h - this.xAxis.height());
        this.yAxisContainer.translate (this.yAxis.width(), 0);

        this.xGrid.renderTo (paper, this.gridContainer, w - this.yAxis.width(), h - this.xAxis.height ());

        this.plot.renderTo (paper, this.plotContainer, w - this.yAxis.width(), h - this.xAxis.height());
        this.plotContainer.translate (this.yAxis.width(), 0);
        this.core.translate(0,15);
    };

    function createContainers (self) {
        var paper = self.paper;
        var core = self.core;
        self.xAxisContainer = paper.g ();
        self.xAxisContainer.attr ('id', 'rc-axis-container');
        core.append (self.xAxisContainer);

        self.yAxisContainer = paper.g ();
        self.yAxisContainer.attr ('id', 'rc-axis-container');
        core.append (self.yAxisContainer);

        self.plotContainer = paper.g ();
        self.plotContainer.attr ('id', 'rc-plot-container');

        self.gridContainer = paper.g ();
        self.gridContainer.attr ('id', 'rc-grid-container');

        self.plotContainer.append (self.gridContainer);

        core.append (self.plotContainer);
    }

    BarChart.prototype.resizeTo = function (w, h) {
        this.width = w;
        this.height = h;

        this.xScale.range ([0, w]);
        this.xAxis.resizeTo (w, h);

        this.yScale.range ([0, h - this.xAxis.height ()]);
        this.yAxis.resizeTo (w, h - this.xAxis.height ());

        this.xScale.range ([0, w - this.yAxis.width()]);
        this.xAxis.resizeTo (w - this.yAxis.width(), h);

        this.xAxisContainer.translate (this.yAxis.width(), h - this.xAxis.height());
        this.yAxisContainer.translate (this.yAxis.width(), 0);

        this.xGrid.resizeTo (w - this.yAxis.width (), h - this.xAxis.height ());

        this.plot.resizeTo (w - this.yAxis.width(), h - this.xAxis.height());
        this.plotContainer.translate (this.yAxis.width(), 0);

    };

    BarChart.prototype.update = function (_options) {
        var options = this.options;
        var series = _options.series;
        if(series) {
            for(var i=0; i<series.length; i++) {
                var idx = series[i].seriesIndex;
                var oldSeries = _.where(options.series, {seriesIndex: idx})[0];
                oldSeries.data = series[i].data;
            }
        }
        if(options.stacked) {
            updateStackedBarChart (this);
        } else {
            updateBarChart (this);
        }
    };

    function updateBarChart (self) {
        var w = self.width,
            h = self.height;


        calcScaleBounds (self);
        self.xDomain = xAxisDomain (self);
        self.xScale.domain ([self.xDomain.min, self.xDomain.max]);
        self.xAxis.setTicks (self.xDomain.ticks);
        self.xAxis.update ();
        self.xGrid.setTicks (self.xDomain.ticks);
        self.xGrid.update ();

        self.plot.update ();
    };

    function updateStackedBarChart (self) {
        var w = self.width,
            h = self.height;

        calcStackedScaleBounds (self);
        self.xDomain = xAxisDomain (self);
        self.xScale.domain ([self.xDomain.min, self.xDomain.max]);
        self.xAxis.setTicks (self.xDomain.ticks);
        self.xAxis.update ();
        self.xGrid.setTicks (self.xDomain.ticks);
        self.xGrid.update ();
        self.plot.update ();
    };

    return BarChart;
});