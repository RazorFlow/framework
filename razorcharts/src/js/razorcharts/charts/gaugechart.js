define(['razorcharts/renderers/gauge', 'vendor/lodash'], function(Gauge, _) {
    var GaugeChart = function() {
        var self = this,
            options = null,
            paper = null,
            core = null,
            width = null,
            height = null,
            gauge = null;

        self.config = function(_options) {
            options = _options;
            gauge = new Gauge();
            gauge.config(options);
        };

        self.renderTo = function(_paper, w, h) {
            paper = _paper;
            width = w;
            height = h;
            core = paper.group('rc-gauge');
            core.node.setAttribute('class', 'rc-gauge');
            gauge.renderTo(paper, core, width, height);
        };

        self.resizeTo = function(w, h) {
            width = w;
            height = h;
            gauge.resizeTo(w, h);
        };

        self.updateSeries = function(_series) {
            gauge.updateSeries(_series);
        };
    };

    return GaugeChart;
});