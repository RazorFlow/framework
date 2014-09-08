StandaloneDashboard(function (db) {
    var c2 = new ChartComponent();
    c2.setCaption("Number formatting on Axis and yAxis Name");
    c2.setDimensions(4, 4);
    c2.setLabels(['January', 'February', 'March', 'April', 'May']);
    c2.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'column', numberPrefix: '$'});
    c2.addSeries("seriesB", "Series B", [1, 3, 5, 1, 9], {seriesDisplayType: 'line', numberPrefix: '$'});
    c2.addSeries("seriesC", "Series C", [9, 1, 5, 3, 1], {seriesDisplayType: 'line', yAxis: 'gg'});
    c2.addSeries("seriesD", "Series D", [9, 1, 5, 3, 1], {seriesDisplayType: 'column', yAxis: 'gg'});
    c2.setYAxis('Sales', {
        numberPrefix: '$'
    });
    c2.addYAxis('gg', 'GG', {
        numberPrefix: '#'
    });
    db.addComponent(c2);
});
