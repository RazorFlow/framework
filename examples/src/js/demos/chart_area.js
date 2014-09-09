rf.StandaloneDashboard(function(db){
    var chart = new ChartComponent();
    chart.setDimensions (8, 6);
    chart.setCaption("Number of monthly unique visitors on a website in 2013");
    chart.setLabels (["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]);
    chart.addSeries ("month_2013", "2013", [420000, 460000, 480000, 520000, 560000, 510000, 470000, 430000, 420000, 370000, 360000, 360000], {
        seriesDisplayType: "area"
    });
    chart.setYAxis('Number of visitors', {numberHumanize: true});
    db.addComponent (chart);
});
