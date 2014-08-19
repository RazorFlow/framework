StandaloneDashboard(function (db) {
    var c1 = new ChartComponent();
    c1.setCaption("Costs by division - 2013 v 2012");
    c1.setDimensions(8, 6);
    c1.setLabels(['Manufacturing', 'Publishing', 'Transportation', 'Communications']);
    c1.addSeries("costs2013", "2013", [24400, 27800, 23800, 24800], {seriesDisplayType: 'bar'});
    c1.addSeries("costs2012", "2012", [15000, 15000, 17500, 20000], {seriesDisplayType: 'bar'});

    c1.setYAxis('', {numberPrefix: '$', numberHumanize: true});
 
    db.addComponent(c1);
});
