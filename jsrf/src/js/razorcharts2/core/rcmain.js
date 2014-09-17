/**
 * The main entry point to razorcharts
 */

define(['razorcharts2/core/chart', 'razorcharts2/charts/linearchart'], function (Chart, LinearChart) {
    Chart.registerWrapper ('linear', LinearChart);

    return Chart;
});