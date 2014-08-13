StandaloneDashboard(function (db) {
    var c1 = new ChartComponent();
    c1.setCaption("Chart Negative Column");
    c1.setDimensions(4, 4);
    c1.setLabels(['January', 'February', 'March', 'April', 'May']);
    c1.addSeries("seriesA", "Series A", [1, 3, -5, 1, 9], {seriesDisplayType: 'column', numberPrefix: '$'});
    c1.addSeries("seriesB", "Series B", [9, 1, 5, -3, 1], {seriesDisplayType: 'column', numberPrefix: '$'});
    db.addComponent(c1);

    var c2 = new ChartComponent();
    c2.setCaption("Chart Negative Column Stacked");
    c2.setDimensions(4, 4);
    c2.setLabels(['January', 'February', 'March', 'April', 'May']);
    c2.addSeries("seriesA", "Series A", [1, 3, -5, 1, 9], {seriesDisplayType: 'column', numberPrefix: '$', seriesStacked: true});
    c2.addSeries("seriesB", "Series B", [9, 1, 5, -3, 1], {seriesDisplayType: 'column', numberPrefix: '$', seriesStacked: true});
    db.addComponent(c2);

    var c3 = new ChartComponent();
    c3.setCaption("Chart Negative Line");
    c3.setDimensions(4, 4);
    c3.setLabels(['January', 'February', 'March', 'April', 'May']);
    c3.addSeries("seriesA", "Series A", [1, 3, -5, 1, 9], {seriesDisplayType: 'line', numberPrefix: '$'});
    c3.addSeries("seriesB", "Series B", [9, 1, 5, -3, 1], {seriesDisplayType: 'line', numberPrefix: '$'});
    db.addComponent(c3);

    var c4 = new ChartComponent();
    c4.setCaption("Chart Negative Area");
    c4.setDimensions(4, 4);
    c4.setLabels(['January', 'February', 'March', 'April', 'May']);
    c4.addSeries("seriesA", "Series A", [1, 3, -5, 1, 9], {seriesDisplayType: 'area', numberPrefix: '$'});
    c4.addSeries("seriesB", "Series B", [9, 1, -5, 3, 1], {seriesDisplayType: 'area', numberPrefix: '$'});
    db.addComponent(c4);

    var c5 = new ChartComponent();
    c5.setCaption("Chart Negative Area Stacked");
    c5.setDimensions(4, 4);
    c5.stacked();
    c5.setLabels(['January', 'February', 'March', 'April', 'May']);
    c5.addSeries("seriesA", "Series A", [1, 3, -5, 1, 9], {seriesDisplayType: 'area', numberPrefix: '$', seriesStacked: true});
    c5.addSeries("seriesB", "Series B", [9, 1, -5, 3, 1], {seriesDisplayType: 'area', numberPrefix: '$', seriesStacked: true});
    db.addComponent(c5);

    var c6 = new ChartComponent();
    c6.setCaption("Chart Negative Bar");
    c6.setDimensions(4, 4);
    c6.setLabels(['January', 'February', 'March', 'April', 'May']);
    c6.addSeries("seriesA", "Series A", [1, 3, -5, 1, 9], {seriesDisplayType: 'bar', numberPrefix: '$'});
    c6.addSeries("seriesB", "Series B", [9, 1, 5, -3, 1], {seriesDisplayType: 'bar', numberPrefix: '$'});
    db.addComponent(c6);

    var c7 = new ChartComponent();
    c7.setCaption("Chart Negative Bar Stacked");
    c7.setDimensions(4, 4);
    c7.setLabels(['January', 'February', 'March', 'April', 'May']);
    c7.addSeries("seriesA", "Series A", [1, 3, -5, 1, 9], {seriesDisplayType: 'bar', numberPrefix: '$', seriesStacked: true});
    c7.addSeries("seriesB", "Series B", [9, 1, 5, -3, 1], {seriesDisplayType: 'bar', numberPrefix: '$', seriesStacked: true});
    db.addComponent(c7);

});
