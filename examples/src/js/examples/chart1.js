rf.StandaloneDashboard(function(db){
	var chart = new ChartComponent();
	chart.setDimensions (4, 4);
	chart.setCaption("2011 Sales");	
	chart.setLabels (["Beverages", "Vegetables"])
	chart.addSeries ("sales", "Sales", [1343, 7741]);
	chart.addSeries ("quantity", "Quantity", [76, 119]);
	db.addComponent (chart);
});