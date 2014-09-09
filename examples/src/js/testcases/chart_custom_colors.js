StandaloneDashboard(function (db) {
    var c4 = new ChartComponent();
    c4.setCaption("Custom colors for series");
    c4.setDimensions(6, 6);
    c4.setLabels(['January', 'February', 'March', 'April', 'May']);
    c4.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'column', numberPrefix: '$'});
    c4.addSeries("seriesB", "Series B", [3, 1, 9, 2, 3], {seriesDisplayType: 'column'});
    c4.addSeries("seriesC", "Series A", [4, 5, 5, 7, 9], {seriesDisplayType: 'column', seriesColor: 'b8e'});
    c4.addSeries("seriesD", "Series A", [1, 3, 6, 1, 4], {seriesDisplayType: 'column', seriesColor: 'a44'});
    c4.addSeries("seriesE", "Series B", [2, 1, 9, 2, 3], {seriesDisplayType: 'column', seriesColor: 'F0F'});
    db.addComponent(c4);

    var c5 = new ChartComponent();
    c5.setCaption("Custom colors for series");
    c5.setDimensions(6, 6);
    c5.setLabels(['January', 'February', 'March', 'April', 'May']);
    c5.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'bar', numberPrefix: '$'});
    c5.addSeries("seriesB", "Series B", [3, 1, 9, 2, 3], {seriesDisplayType: 'bar'});
    c5.addSeries("seriesC", "Series A", [4, 5, 5, 7, 9], {seriesDisplayType: 'bar', seriesColor: 'd1a'});
    c5.addSeries("seriesD", "Series A", [1, 3, 6, 1, 4], {seriesDisplayType: 'bar', seriesColor: '3ac'});
    c5.addSeries("seriesE", "Series B", [2, 1, 9, 2, 3], {seriesDisplayType: 'bar', seriesColor: '#ac3'});
    db.addComponent(c5);
});
