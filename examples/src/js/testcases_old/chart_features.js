
StandaloneDashboard(function(db) {
    var c1 = new ChartComponent();
    c1.setCaption ("Column Chart");
    c1.setDimensions(4,4);
    c1.setLabels(['January', 'February', 'March', 'April', 'May']);
    c1.addSeries("seriesA", 4234, [1, 3, 5, 1, 9])
    c1.addSeries("seriesB", "Series B", [3, 1, 9, 2, 3])
    db.addComponent (c1);

    var c2 = new ChartComponent();
    c2.setCaption ("Line Chart");
    c2.setDimensions(4,4);
    c2.setLabels(['January', 'February', 'March', 'April', 'May']);
    c2.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'line'});
    c2.addSeries("seriesB", "Series B", [3, 1, 9, 2, 3], {seriesDisplayType: 'line'});
    db.addComponent (c2);



    var c4 = new ChartComponent();
    c4.setCaption ("Mixed Line and Column");
    c4.setDimensions(4,4);
    c4.setLabels(['January', 'February', 'March', 'April', 'May']);
    c4.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'column'});
    c4.addSeries("seriesB", "Series B", [3, 1, 9, 2, 3], {seriesDisplayType: 'line'});
    db.addComponent (c4);

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
    // c6.onItemClick(function(params) {
    //     alert("clicked on " + params['label'] + " series " + params['seriesIndex']);

    // })
    db.addComponent (c6);
});
