define(['razorcharts/charts/linearchart', 
        'razorcharts/charts/barchart', 
        'razorcharts/charts/piechart', 
        'razorcharts/charts/gaugechart',
        'razorcharts/charts/timeseries',
        'razorcharts/utils/eventmanager',
        'vendor/lodash'], function(LinearChart, BarChart, PieChart, GaugeChart, Timeseries, EventManager, _) {
    var Chart = function() {
        // Private variables
        var self = this,
            options = {},
            core = null,
            chart = null,
            eventManager = new EventManager(),
            chart_defaults = {
                animateOnRender: true,
                eventManager: eventManager
            };

        self.config = function (_options) {
            options = _options;

            if(options.type === 'linear') {
                chart = new LinearChart();
            } else if(options.type === 'bar') {
                chart = new BarChart();
            } else if(options.type === 'pie') {
                chart = new PieChart();
            } else if(options.type === 'gauge') {
                chart = new GaugeChart();
            } else if(options.type === 'timeseries') {
                chart = new Timeseries();
            }
            options = _.extend(chart_defaults, options);
            chart.config(options);
        };

        self.zoom = function(zoomFactor) {
            chart.zoom(zoomFactor);
        };

        self.renderTo = function (id, w, h) {
            core = Raphael(id, w, h);
            core.canvas.setAttribute('class', 'rc-chart');
            chart.renderTo(core, w, h);
        };

        self.resizeTo = function (w, h) {
            core.setSize(w, h);
            chart.resizeTo(w, h);
        };

        self.updateSeries = function(_series) {
            chart.updateSeries(_series);
        };

        self.on = function(eventName, cb) {
            eventManager.bind(eventName, cb);
        };

        self.callFunction = function(func) {
            return chart.callFunction(func);
        };
    };

    return Chart;
});