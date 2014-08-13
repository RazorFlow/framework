rf.StandaloneDashboard(function(db){
    var chart = new ChartComponent();
    chart.setDimensions (4, 4);
    chart.setYAxis("Sales", {
        numberPrefix: "$ ",
        numberHumanize: true
    });
    chart.setCaption("Car sales and quantity");    
    chart.setLabels (["Jan", "Feb", "Mar"]);
    chart.addSeries ("sales", "Sales", [1355340, 2214134, 1854313], {
        numberPrefix: '$',
        seriesDisplayType: 'column'
    });
    chart.addSeries ("quantity", "Quantity", [14, 19, 17], {
        seriesDisplayType: 'column',
    });
    db.addComponent (chart);
});
