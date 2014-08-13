rf.StandaloneDashboard(function(db){
	var chart = new ChartComponent();
	chart.setDimensions (4, 4);
	chart.setCaption("My First Chart");	
	chart.lock();

	// setTimeout(function() {
	// 	chart.setLabels (["Jan", "Feb", "Mar"]);
	// 	chart.addSeries ("beverages", "Beverages", [1355, 1916, 1150]);
	// 	chart.addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321]);
	// 	chart.unlock();
	// }, 2000);
	
	db.addComponent (chart);
});
