rf.StandaloneDashboard(function(db){
    var chart = new ChartComponent('sales');
    chart.setDimensions (8, 6);
    chart.setCaption("Sales - 2013 vs 2012");
    chart.setLabels (["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]);
    chart.addSeries ("sales2013", "2013", [22400, 24800, 21800, 21800, 24600, 27600, 26800, 27700, 23700, 25900, 26800, 24800]);
    chart.addSeries ("sales2012", "2012", [10000, 11500, 12500, 15000, 16000, 17600, 18800, 19700, 21700, 21900, 22900, 20800]);
    chart.setYAxis('', {numberPrefix: '$', numberHumanize: true});
    chart.addComponentKPI ('max2012', {
        caption: 'Maximum sales in 2012',
        value: 22900,
        numberPrefix: ' $',
        numberHumanize: true
    });

    chart.addComponentKPI('min2012', {
        caption: 'Lowest sales in 2012',
        value: 10000,
        numberPrefix: ' $',
        numberHumanize: true
    });

    chart.addComponentKPI('max2013', {
        caption: 'Maximum sales in 2013',
        value: 27700,
        numberPrefix: ' $',
        numberHumanize: true
    });

    chart.addComponentKPI('min2013', {
        caption: 'Lowest sales in 2013',
        value: 21800,
        numberPrefix: ' $',
        numberHumanize: true
    });

    db.addComponent (chart);
});
