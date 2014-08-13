StandaloneDashboard(function (db) {
    var c1 = new ChartComponent();
    c1.setCaption("Column & Line Chart");
    c1.setDimensions(4, 4);
    c1.setLabels(['January', 'February', 'March', 'April', 'May']);
    c1.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'column', numberPrefix: '$'});
    c1.addSeries("seriesB", "Series B", [9, 1, 5, 3, 1], {seriesDisplayType: 'line', numberPrefix: '$'});
    db.addComponent(c1);

    var c2 = new ChartComponent();
    c2.setCaption("Column & Area Chart multi-series");
    c2.setDimensions(4, 4);
    c2.setLabels(['January', 'February', 'March', 'April', 'May']);
    c2.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'column', numberPrefix: '$'});
    c2.addSeries("seriesB", "Series B", [9, 1, 5, 3, 1], {seriesDisplayType: 'area', numberPrefix: '$'});

    db.addComponent(c2);

    var c3 = new ChartComponent();
    c3.setCaption("Line & Area Chart multi-series");
    c3.setDimensions(4, 4);
    c3.setLabels(['January', 'February', 'March', 'April', 'May']);
    c3.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'line', numberPrefix: '$'});
    c3.addSeries("seriesB", "Series B", [9, 1, 5, 3, 1], {seriesDisplayType: 'area', numberPrefix: '$'});
 
    db.addComponent(c3);

    var c4 = new ChartComponent();
    c4.setCaption("Line & Area Chart multi-series");
    c4.setDimensions(4, 4);
    c4.setLabels(['January', 'February', 'March', 'April', 'May']);
    c4.addSeries("seriesA", "Series A", [2, 4, 6, 3, 10], {seriesDisplayType: 'column', numberPrefix: '$'});
    c4.addSeries("seriesB", "Series B", [1, 3, 5, 1, 9], {seriesDisplayType: 'line', numberPrefix: '$'});
    c4.addSeries("seriesC", "Series C", [9, 1, 5, 3, 1], {seriesDisplayType: 'area', numberPrefix: '$'});
 
    db.addComponent(c4);


});
