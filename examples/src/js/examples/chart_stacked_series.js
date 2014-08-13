rf.StandaloneDashboard(function(db){
	var chart = new ChartComponent();
	chart.setDimensions (4, 4);
	chart.setCaption("Stacked Column Chart");	
	chart.setLabels (["Jan", "Feb", "Mar"]);
	chart.setYAxis("", {
		numberPrefix: "$"
	});
	chart.addSeries ("beverages", "Beverages", [1355, 1916, 1150], {
		seriesStacked: true,
		seriesDisplayType: "column"
	});
	chart.addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321], {
		seriesStacked: true,
		seriesDisplayType: "column"
	});
	chart.addSeries ("vegetables", "Vegetables", [1313, 1976, 924], {
		seriesStacked: true,
		seriesDisplayType: "column"
	});
	db.addComponent (chart);
});