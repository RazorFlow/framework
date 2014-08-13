rf.StandaloneDashboard(function(db){
	var chart = new ChartComponent();
	chart.setDimensions (8, 6);
	chart.setCaption("Monthly Sales Summary Comparision");	
	chart.setLabels (["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]);
	chart.setYAxis("", {
		numberPrefix: "$"
	});
	chart.addSeries ("2013", "2013", [22400, 24800, 21800, 21800, 24600, 27600, 26800, 27700, 23700, 25900, 26800, 24800], {
		seriesStacked: true,
		seriesDisplayType: "bar"
	});
	chart.addSeries ("2014", "2014", [10000, 11500, 12500, 15000, 16000, 17600, 18800, 19700, 21700, 21900, 22900, 20800], {
		seriesStacked: true,
		seriesDisplayType: "bar"
	});
	db.addComponent (chart);
});