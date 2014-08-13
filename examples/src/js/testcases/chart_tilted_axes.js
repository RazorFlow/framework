StandaloneDashboard(function (db) {
    var c1 = new ChartComponent();
    c1.setCaption("Column Chart");
    c1.setDimensions(4, 4);
    c1.setLabels(['January', 'February', 'March', 'April', 'May']);
    c1.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'column', numberPrefix: '$'});
 
    db.addComponent(c1);
});
