rf.StandaloneDashboard(function(db){
	var chart = new ChartComponent();
	chart.setDimensions (4, 4);
	chart.setYAxis("Sales", {
		numberPrefix: "$ "
	})
	chart.setCaption("Expenses incurred for Food Consumption by Month");	
	chart.setLabels (["Jan", "Feb", "Mar"]);
	chart.addSeries ("beverages", "Beverages", [1355, 1916, 1150]);
	chart.addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321]);
	db.addComponent (chart);
});
