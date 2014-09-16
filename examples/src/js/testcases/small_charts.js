StandaloneDashboard(function (db) {
    var c1 = new ChartComponent();
    c1.setCaption("Sales");
    c1.setDimensions(3, 2);
    c1.setLabels(['January', 'February', 'March', 'April', 'May']);
    c1.addSeries("seriesA", "Series A", [-1, -3, -35, -1, 9], {seriesDisplayType: 'column', numberPrefix: '$'});
 
    db.addComponent(c1);

    var c2 = new ChartComponent();
    c2.setCaption("Sales");
    c2.setDimensions(3, 2);
    c2.setLabels(['January', 'February', 'March', 'April', 'May']);
    c2.addSeries("seriesA", "Series A", [1, 3, 5, 1, 129], {seriesDisplayType: 'column', numberPrefix: '$'});
 
    db.addComponent(c2);

    var c3 = new ChartComponent();
    c3.setCaption("Sales");
    c3.setDimensions(3, 2);
    c3.setLabels(['January', 'February', 'March', 'April', 'May']);
    c3.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'column', numberPrefix: '$'});
 
    db.addComponent(c3);

    var c4 = new ChartComponent();
    c4.setCaption("Sales");
    c4.setDimensions(3, 2);
    c4.setLabels(['January', 'February', 'March', 'April', 'May']);
    c4.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'column', numberPrefix: '$'});
 
    db.addComponent(c4);
});
