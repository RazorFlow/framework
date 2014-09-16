StandaloneDashboard(function (db) {
    var _ = rf._;
         var createChart = function (w, h, negative) {
        seriesA = {};
        seriesB = {};
        yAxisName =  "";
        yAxis = {};

        var chart = new ChartComponent();
        chart.setDimensions (w || 4 , h || 4);
        chart.setYAxis(yAxisName, yAxis)
        chart.setCaption("2011 Sales"); 
        chart.setLabels (["Beverages", "Vegetables"])
        chart.addSeries ("sales", "Sales", [1343, !negative ? 776 : -774], seriesA);
        chart.addSeries ("quantity", "Quantity", [300, !negative ? 800 : -800], seriesB);
        return chart;
    }

    var chart = createChart(4, 4, true);

    db.addComponent(chart);

    var small = createChart (3, 2, true);

    db.addComponent(small);
});
