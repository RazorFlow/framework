define(['razorcharts/renderers/pie', 'vendor/lodash'], function(Pie, _) {
    var PieChart = function() {
        var self = this,    
            options = null,
            paper = null,
            core = null,
            width = null,
            height = null,
            chart = null,
            series = null;

        self.config = function(_options) {
            options = _options;

            chart = new Pie();
            chart.config(options);
        };

        self.renderTo = function(_paper, w, h) {
            paper = _paper;
            width = w;
            height = h;
            series = options.series;

            core = paper.group('core');
            chart.renderTo(paper, core, w, h);
        };

        self.resizeTo = function(w, h) {
            chart.resizeTo(w, h);
        };

        self.updateSeries = function(_series) {
            options.series = _series;
            chart.updateSeries();
        };

        self.callFunction = function(func) {
            return chart.callFunction(func);
        };
    };

    return PieChart;
});