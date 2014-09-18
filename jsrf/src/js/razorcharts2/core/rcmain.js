/**
 * The main entry point to razorcharts
 */

define(['razorcharts2/core/chart', 'razorcharts2/charts/linearchart'], function (Chart, LinearChart) {
    Chart.registerChart ('linear', LinearChart);

    return Chart;
});