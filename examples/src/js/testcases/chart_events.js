StandaloneDashboard(function (db) {
    var c1 = new ChartComponent();
    c1.setCaption("Chart events");
    c1.setDimensions(8, 4);
    c1.setLabels(['January', 'February', 'March', 'April', 'May']);
    c1.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'column', numberPrefix: '$'});
    c1.addSeries("seriesB", "Series B", [9, 1, 5, 3, 1], {seriesDisplayType: 'line', numberPrefix: '$'});
    c1.bind('plotItemActivate', function(data) {
        console.log('plotItemActivate Event triggered with ', data);
    });
    c1.bind('labelActivate', function(data) {
        console.log('labelActivate Event triggered with ', data);
    });
    c1.bind('plotItemMouseOver', function(data) {
        console.log('plotItemMouseOver Event triggered with ', data);
    });
    c1.bind('plotItemMouseOut', function(data) {
        console.log('plotItemMouseOut Event triggered with ', data);
    });
    db.addComponent(c1);
});
