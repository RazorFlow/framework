
StandaloneDashboard(function (db) {

    var c1 = new KPIComponent();
    c1.setDimensions(3,2);
    c1.setCaption('Beverages');
    c1.setValue(559, {
        numberSuffix: ' units'
    });
    db.addComponent(c1);

    var c2 = new KPIComponent();
    c2.setDimensions(3,2);
    c2.setCaption('Condiments');
    c2.setValue(507, {
        numberSuffix: ' units'
    });
    db.addComponent(c2);

    var c4 = new ChartComponent();
    c4.setCaption("Mixed Line and Column");
    c4.setDimensions(4, 4);
    c4.setLabels(['January', 'February', 'March', 'April', 'May']);
    c4.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'column', numberPrefix: '$'});
    c4.addSeries("seriesB", "Series B", [3, 1, 9, 2, 3], {seriesDisplayType: 'column'});
    c4.addSeries("seriesC", "Series A", [4, 5, 5, 7, 9], {seriesDisplayType: 'column'});
    c4.addSeries("seriesD", "Series A", [1, 3, 6, 1, 4], {seriesDisplayType: 'column'});
    c4.addSeries("seriesE", "Series B", [2, 1, 9, 2, 3], {seriesDisplayType: 'column'});
     
    db.addComponent(c4);

    setTimeout(function() {
        db.removeComponent(c1);
        setTimeout(function() {
            c2.removeFromDashboard();
        }, 1000);
    }, 3000);
});
