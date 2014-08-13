StandaloneDashboard(function (db) {
    var c1 = new ChartComponent();
    c1.setCaption("Number formatting on values");
    c1.setDimensions(4, 4);
    c1.setLabels(['January', 'February', 'March', 'April', 'May']);
    c1.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'column', numberPrefix: '$'});
    c1.addSeries("seriesB", "Series B", [9, 1, 5, 3, 1], {seriesDisplayType: 'line', numberPrefix: '$'});
    db.addComponent(c1);

    var c2 = new ChartComponent();
    c2.setCaption("Number formatting on Axis and yAxis Name");
    c2.setDimensions(4, 4);
    c2.setLabels(['January', 'February', 'March', 'April', 'May']);
    c2.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'column', numberPrefix: '$'});
    c2.addSeries("seriesB", "Series B", [9, 1, 5, 3, 1], {seriesDisplayType: 'line', numberPrefix: '$'});
    c2.setYAxis('Sales', {
        numberPrefix: '$'
    });
    db.addComponent(c2);
});
