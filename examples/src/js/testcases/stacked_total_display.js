StandaloneDashboard(function (db) {
    var c3 = new ChartComponent();
    c3.setCaption("Column Chart multi-series");
    c3.setDimensions(6, 4);
    c3.setLabels(['January', 'February', 'March', 'April', 'May']);
    c3.addSeries("seriesA", "Series A", [1, 3, -1, 1, 9], {seriesDisplayType: 'column', numberPrefix: '$', seriesStacked: true});
    c3.addSeries("seriesB", "Series B", [2, 1, -3, 3, 1], {seriesDisplayType: 'column', numberPrefix: '$', seriesStacked: true});
    c3.setOption ('stackedTotalDisplay', true);
    db.addComponent(c3);
});
    