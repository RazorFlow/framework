/**
 * The main entry point to razorcharts
 */

define(['razorcharts2/core/chart', 'razorcharts2/charts/linearchart', 'razorcharts2/charts/barchart'], function (Chart, LinearChart, BarChart) {
    Chart.registerChart ('linear', LinearChart);
    Chart.registerChart ('bar', BarChart);

    return Chart;
});