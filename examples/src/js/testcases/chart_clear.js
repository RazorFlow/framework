StandaloneDashboard(function (db) {
    var c1 = new ChartComponent();
    c1.setCaption("Chart clear");
    c1.setDimensions(4, 4);
    c1.setLabels(['January', 'February', 'March', 'April', 'May']);
    c1.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'column', numberPrefix: '$'});
    c1.addSeries("seriesB", "Series B", [9, 1, 5, 3, 1], {seriesDisplayType: 'line', numberPrefix: '$'});
    db.addComponent(c1);

    setTimeout(function() {
        c1.lock();
        c1.clearChart();
        c1.setLabels(['January', 'February', 'March', 'April', 'May']);
        c1.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'bar', numberPrefix: '$'});
        c1.addSeries("seriesB", "Series B", [9, 1, 5, 3, 1], {seriesDisplayType: 'bar', numberPrefix: '$'});
        c1.unlock();
    }, 2000);
});
