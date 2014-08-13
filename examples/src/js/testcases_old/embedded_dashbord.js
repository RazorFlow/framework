
$('#dbTarget').width('400px');

EmbeddedDashboard(function(db) {
    db.setDashboardTitle('This header should not appear as we are drawing an embedded dashboard');
    var c5 = new ChartComponent();
    c5.setCaption ("Mixed with formatting and Column");
    c5.setDimensions(4,4);
    c5.setLabels(['January', 'February', 'March', 'April', 'May']);
    c5.addSeries("seriesA", "Prefixed", [1, 3, 5, 1, 9], {seriesDisplayType: 'column', numberPrefix: "$"});
    c5.addSeries("seriesB", "Suffixed", [3, 1, 9, 2, 3], {seriesDisplayType: 'line', numberSuffix: "%"});
    db.addComponent (c5);

    var c6 = new ChartComponent ();
    c6.setCaption ("Events on chart");
    c6.setDimensions(4,4);
    c6.setLabels(['January', 'February', 'March', 'April', 'May']);
    c6.addSeries("seriesA", "Prefixed", [1, 3, 5, 1, 9], {seriesDisplayType: 'column', numberPrefix: "$"});
    c6.addSeries("seriesB", "Suffixed", [3, 1, 9, 2, 3], {seriesDisplayType: 'line', numberSuffix: "%"});

    db.addComponent (c6);
});
