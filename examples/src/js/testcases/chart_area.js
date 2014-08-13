StandaloneDashboard(function (db) {
    var c1 = new ChartComponent();
    c1.setCaption("Column Chart");
    c1.setDimensions(4, 4);
    c1.setLabels(['<p>January</p>', 'February', 'March', 'April', 'May']);
    c1.addSeries("<p>seriesA<p>", "<p>Series A</p>", [1, 3, 5, 1, 9], {seriesDisplayType: 'area', numberPrefix: '$'});
 
    db.addComponent(c1);

    var c2 = new ChartComponent();
    c2.setCaption("Column Chart multi-series");
    c2.setDimensions(4, 4);
    c2.setLabels(['January', 'February', 'March', 'April', 'May']);
    c2.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'area', numberPrefix: '$'});
    c2.addSeries("seriesB", "Series B", [9, 1, 5, 3, 1], {seriesDisplayType: 'area', numberPrefix: '$'});

    db.addComponent(c2);

    var c3 = new ChartComponent();
    c3.setCaption("Column Chart multi-series");
    c3.setDimensions(4, 4);
    c3.stacked();
    c3.setLabels(['January', 'February', 'March', 'April', 'May']);
    c3.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'area', numberPrefix: '$', seriesStacked: true});
    c3.addSeries("seriesB", "Series B", [9, 1, 5, 3, 1], {seriesDisplayType: 'area', numberPrefix: '$', seriesStacked: true});
 
    db.addComponent(c3);
});
