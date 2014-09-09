rf.StandaloneDashboard(function(db){
    var kpi = new GaugeComponent ();
    kpi.setDimensions (4, 3);
    kpi.setCaption ('Current server load. In %');
    kpi.setLimits (0, 100);
    kpi.setValue (Math.floor((Math.random() * 10)) + 40);

    db.addComponent(kpi);


    var chart = new ChartComponent('hashtags');
	chart.setDimensions (8, 6);
	chart.setCaption("Number of tweets on top 5 hashtags");
	chart.setLabels (["#android", "#ipad", "#news", "#salute", "#nowplaying"]);
	chart.addSeries ("tweets", "No. of tweets", [220, 240, 218, 218, 246]);
	chart.setYAxis('', {numberHumanize: true});
	db.addComponent (chart);

	db.setInterval(function () {
		kpi.setValue(Math.floor((Math.random() * 10)) + 40);
        var data = [];
        for(var i = 0; i < 5; i++) {
            data.push(Math.floor((Math.random() * 200)) + 200);
        }
        chart.updateSeries ("tweets", data);
    }, 1500);
});