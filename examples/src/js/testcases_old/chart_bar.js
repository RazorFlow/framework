
StandaloneDashboard(function (db) {
    var c1 = new ChartComponent();
    c1.setCaption("Bar Chart");
    c1.setDimensions(4, 4);
    c1.setLabels(['January', 'February', 'March', 'April', 'May']);
    c1.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'bar', numberPrefix: '$'});
 
    db.addComponent(c1);

    var c2 = new ChartComponent();
    c2.setCaption("Bar Chart");
    c2.setDimensions(4, 4);
    c2.setLabels(['January', 'February', 'March', 'April', 'May']);
    c2.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'bar', numberPrefix: '$'});
    c2.addSeries("seriesB", "Series B", [9, 1, 5, 3, 1], {seriesDisplayType: 'bar', numberPrefix: '$'});
 
    db.addComponent(c2);
});
