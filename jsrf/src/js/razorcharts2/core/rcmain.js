/**
 * The main entry point to razorcharts
 */

define(['razorcharts2/core/chart', 
        'razorcharts2/charts/linearchart', 
        'razorcharts2/charts/barchart',
        'razorcharts2/charts/piechart'], function (Chart, LinearChart, BarChart, PieChart) {
    Chart.registerChart ('linear', LinearChart);
    Chart.registerChart ('bar', BarChart);
    Chart.registerChart ('pie', PieChart);

    return Chart;
});