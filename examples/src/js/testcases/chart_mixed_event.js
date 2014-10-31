StandaloneDashboard(function (db) {
    var c1 = new ChartComponent();
    c1.setCaption("All Chart");
    c1.setDimensions(4, 4);
    c1.setLabels(['January', 'February', 'March', 'April', 'May']);
    c1.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'column', numberPrefix: '$'});
    c1.addSeries("seriesB", "Series A", [2, 4, 5, 1, 9], {seriesDisplayType: 'column', numberPrefix: '$'});
    c1.addSeries("seriesC", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'line', numberPrefix: '$'});
    c1.addSeries("seriesD", "Series A", [2, 4, 5, 1, 9], {seriesDisplayType: 'line', numberPrefix: '$'});
    c1.addSeries("seriesE", "Series A", [1, 3, 5, 10, 9], {seriesDisplayType: 'area', numberPrefix: '$'});
    c1.addSeries("seriesF", "Series A", [2, 4, 50, 1, 9], {seriesDisplayType: 'area', numberPrefix: '$'});

    c1.onItemClick (function (params) {
        console.log(params);
    });
 
    db.addComponent(c1);

});
