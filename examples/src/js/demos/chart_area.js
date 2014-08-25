rf.StandaloneDashboard(function(db){
    var chart = new ChartComponent();
    chart.setDimensions (8, 6);
    chart.setCaption("Visits by Month");
    chart.setLabels (["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]);
    chart.addSeries ("month_2013", "2013", [420000, 460000, 480000, 520000, 560000, 510000, 470000, 430000, 420000, 370000, 360000, 360000], {
        seriesDisplayType: "area"
    });
    chart.setYAxis('', {numberPrefix: '$', numberHumanize: true});
    db.addComponent (chart);
});
