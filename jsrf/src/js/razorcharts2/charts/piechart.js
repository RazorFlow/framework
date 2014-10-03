define(['vendor/lodash', 'razorcharts2/plots/pie'], function (_, Pie) {
    var PieChart = function () {
        this.options = {};
    };

    PieChart.prototype.config = function (_options) {
        this.options = _.extend (this.options, _options);

        this.plot = new Pie ();
        this.plot.config({
            series: this.options.series,
            labels: this.options.labels
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

    PieChart.prototype.update = function (series) {
        this.options.series = _.extend(this.options.series, series);
        this.plot.update (series);
    };

    return PieChart;
});