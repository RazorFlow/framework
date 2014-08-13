
StandaloneDashboard(function (db) {
    var c4 = new ChartComponent();
    c4.setCaption("Mixed Line and Column");
    c4.setDimensions(4, 4);
    c4.setLabels(['January', 'February', 'March', 'April', 'May']);
    c4.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'column', numberPrefix: '$'});
    c4.addSeries("seriesB", "Series B", [3, 1, 9, 2, 3], {seriesDisplayType: 'column'});
    c4.addSeries("seriesC", "Series A", [4, 5, 5, 7, 9], {seriesDisplayType: 'column'});
    c4.addSeries("seriesD", "Series A", [1, 3, 6, 1, 4], {seriesDisplayType: 'column'});
    c4.addSeries("seriesE", "Series B", [2, 1, 9, 2, 3], {seriesDisplayType: 'column'});
 
    setTimeout(function() {
        c4.lock();
        // TODO: need to support this in the new version
        // c4.clearChart();
        c4.setLabels(['a', 'b', 'c', 'd', 'e']);
        c4.addSeries("seriesA", "Series A", [4, 10, 2, 6, 8], {seriesDisplayType: 'column', numberPrefix: '$'});
        c4.unlock();
    }, 2000);
    db.addComponent(c4);
});
