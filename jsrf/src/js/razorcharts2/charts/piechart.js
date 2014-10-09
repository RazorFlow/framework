define(['vendor/lodash', 'razorcharts2/plots/pie'], function (_, Pie) {
    var PieChart = function () {
        this.options = {};
    };

    PieChart.prototype.config = function (_options) {
        this.options = _.extend (this.options, _options);

        this.plot = new Pie ();
        this.plot.config({
            series: this.options.series,
            labels: this.options.labels,
            valueLabels: _.map(this.options.series.data, this.options.series.format),
            eventManager: this.options.eventManager
        });

        var eventManager = this.options.eventManager;
        var self = this;
        eventManager.bind('tooltip', function (obj) {
            self.options.tooltip.onShow (obj.position.x, obj.position.y, obj);
        });
    };

    PieChart.prototype.renderTo = function (paper, w, h) {
        this.paper = paper;
        this.width = w;
        this.height = h;

        this.plotContainer = paper.g ();
        this.plotContainer.attr ('id', 'rc-plot-container');
        paper.append (this.plotContainer);
        this.plot.renderTo (paper, this.plotContainer, w, h);
    };

    PieChart.prototype.resizeTo = function (w, h) {
        this.plot.resizeTo (w, h);
    };

    PieChart.prototype.update = function (_options) {
        this.options = _.extend (this.options, _options);
        this.plot.update (_options);
    };

    PieChart.prototype.callFunction = function (funcName, argsObject) {
        if(funcName === 'hasLabels') {
            return this.plot.hasLabels ();
        }
    };

    return PieChart;
});