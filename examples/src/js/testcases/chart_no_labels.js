StandaloneDashboard(function (db) {
    var c1 = new ChartComponent();
    c1.setCaption("Column Chart");
    c1.setDimensions(2, 2);
    c1.setLabels(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q']);
    c1.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9, 3, 5, 1, 9, 3, 5, 1, 9, 1, 2, 3, 1], {seriesDisplayType: 'line', numberPrefix: '$'});
    c1.setOption('showLabelFlag', false);
 
    db.addComponent(c1);

});
