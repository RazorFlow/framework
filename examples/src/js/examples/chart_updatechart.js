rf.StandaloneDashboard(function(db){
	var chart = new ChartComponent();
	chart.setDimensions (4, 4);
	chart.setCaption("First Chart");	
	chart.setLabels (["Jan", "Feb", "Mar"]);
	chart.addSeries ("beverages", "Beverages", [1355, 1916, 1150]);
	chart.addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321]);
	db.addComponent (chart);

	var chart2 = new ChartComponent();
	chart2.setDimensions (4, 4);
	chart2.setCaption("Second Chart");	
	chart2.setLabels (["A", "B", "C"]);
	chart2.addSeries("series_1", "Series 1", [1, 2, 3]);
	db.addComponent (chart2);

	chart.onItemClick (function (params) {
		chart2.lock();
		chart2.clearChart ();
		chart2.setLabels (["D", "E", "F", "G"]);
		chart2.addSeries("another_series", "Another Series", [13, 5, 9, 12]);
		chart2.unlock();
	});
});
