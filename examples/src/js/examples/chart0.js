rf.StandaloneDashboard(function(db){
	var chart = new ChartComponent('someid');
	chart.setDimensions (4, 4);
	chart.setCaption("Expenses incurred on Food Consumption by Year");
	chart.setLabels (["2009", "2010", "2011"]);
	chart.addSeries ("beverages", "Beverages", [1355, 1916, 1150]);
	chart.addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321]);
	db.addComponent (chart);
});
