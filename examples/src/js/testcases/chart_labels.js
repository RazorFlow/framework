StandaloneDashboard(function(db) {
    var c1 = new ChartComponent();
    c1.setCaption("Small labels");
    c1.setDimensions(4, 4);
    c1.setLabels(['Jan', 'Feb', 'Mar', 'Apr', 'May']);
    c1.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'column', numberPrefix: '$'});
 
    db.addComponent(c1);

    var c2 = new ChartComponent();
    c2.setCaption("Broken labels");
    c2.setDimensions(8, 4);
    c2.setLabels(['January is the first month', 'February is the second month', 'March is the third month', 'April is the fourth month', 'May is the fifth month']);
    c2.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'column', numberPrefix: '$'});
 
    db.addComponent(c2);

    var c3 = new ChartComponent();
    c3.setCaption("Tilted labels");
    c3.setDimensions(4, 4);
    c3.setLabels(['January', 'February', 'March', 'April', 'May']);
    c3.addSeries("seriesA", "Series A", [1.1, 3.3, 5.3, 1.1, 9.9], {seriesDisplayType: 'column', numberPrefix: '$'});
 
    db.addComponent(c3);

    var c4 = new ChartComponent();
    c4.setCaption("Bar long labels");
    c4.setDimensions(8, 4);
    c4.setLabels(['January is the first month', 'February is the second month', 'March is the third month', 'April is the fourth month', 'May is the fifth month']);
    c4.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'bar', numberPrefix: '$'});
 
    db.addComponent(c4);

});