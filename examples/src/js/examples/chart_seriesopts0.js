rf.StandaloneDashboard(function(db){
	var chart = new ChartComponent();
	chart.setDimensions (4, 4);
	chart.setCaption("My First Chart");	
	chart.setLabels (["Jan", "Feb", "Mar"]);
	chart.addSeries ("beverages", "Beverages", [1355, 1916, 1150], {
		seriesDisplayType: 'line',
		seriesColor: '#a4c9f3'
	});
	chart.addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321], {
		numberPrefix: "$ ",
		numberForceDecimals: true
	});
	db.addComponent (chart);
});