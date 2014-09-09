rf.StandaloneDashboard(function(db){
    var chart = new ChartComponent();
    chart.setDimensions (8, 6);
    chart.setYAxis("Sales", {
        numberPrefix: "$ ",
        numberHumanize: true
    });
    chart.addYAxis('profit', "Profit %", {
        numberSuffix: "%",
    });
    chart.setCaption("Showing monthly sales and profit of a retail company");    
    chart.setLabels (["March", "April", "May", "June", "July"]);
    chart.addSeries ("product_A", "Product A", [25601.34, 20148.82, 17372.76, 35407.15, 38105.68], {
        numberPrefix: '$',
        seriesDisplayType: 'column'
    });
    chart.addSeries ("product_B", "Product B", [57401.85, 41941.19, 45263.37, 117320.16, 114845.27], {
        numberPrefix: '$',
        seriesDisplayType: 'column'
    });
    chart.addSeries ("profit", "Profit %", [20, 42, 10, 23, 16], {
        numberSuffix: "%",
        seriesDisplayType: 'line',
        yAxis: "Profit %"
    });
    db.addComponent (chart);
});
