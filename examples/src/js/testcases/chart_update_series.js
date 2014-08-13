StandaloneDashboard(function (db) {
    var c1 = new ChartComponent();
    c1.setCaption("Chart updating values");
    c1.setDimensions(4, 4);
    c1.setLabels(['January', 'February', 'March', 'April', 'May']);
    c1.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'column', numberPrefix: '$'});
    c1.addSeries("seriesB", "Series B", [9, 1, 5, 3, 1], {seriesDisplayType: 'line', numberPrefix: '$'});
    db.addComponent(c1);

    setTimeout(function() {
        c1.updateSeries('seriesA', [5,5,5,5,5]);
        c1.updateSeries('seriesB', [15,13,13,13,13]);
    }, 2000);
});
