
StandaloneDashboard(function (db) {
    var c4 = new ChartComponent();
    c4.setCaption("Custom colors for series");
    c4.setDimensions(12, 8);
    c4.setLabels(['January', 'February', 'March', 'April', 'May']);
    c4.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'column', numberPrefix: '$'});
    c4.addSeries("seriesB", "Series B", [3, 1, 9, 2, 3], {seriesDisplayType: 'column'});
    c4.addSeries("seriesC", "Series A", [4, 5, 5, 7, 9], {seriesDisplayType: 'column', seriesColor: 'green'});
    c4.addSeries("seriesD", "Series A", [1, 3, 6, 1, 4], {seriesDisplayType: 'line', seriesColor: 'rgb(0, 255, 255)'});
    c4.addSeries("seriesE", "Series B", [2, 1, 9, 2, 3], {seriesDisplayType: 'line', seriesColor: '#F0F'});
    db.addComponent(c4);
});
