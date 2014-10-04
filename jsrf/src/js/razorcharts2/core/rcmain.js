/**
 * The main entry point to razorcharts
 */

define(['razorcharts2/core/chart', 
        'razorcharts2/charts/linearchart', 
        'razorcharts2/charts/barchart',
        'razorcharts2/charts/piechart',
        'razorcharts2/charts/gaugechart'], function (Chart, LinearChart, BarChart, PieChart, GaugeChart) {
    Chart.registerChart ('linear', LinearChart);
    Chart.registerChart ('bar', BarChart);
    Chart.registerChart ('pie', PieChart);
    Chart.registerChart ('gauge', GaugeChart);

    return Chart;
});