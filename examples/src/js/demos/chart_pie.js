rf.StandaloneDashboard(function(db){
	var chart = new ChartComponent();
	chart.setDimensions (8, 6);
	chart.setCaption("Expenditures Incurred in Publishing a Book");
	chart.setLabels (["Paper Cost", "Binding", "Printing Cost", "Royality", "Transportation Cost", "Promotion Cost"]);
	chart.setPieValues ([25, 20, 20, 15, 10, 10], {
		dataType: "number",
		numberSuffix: "%"
	});
	db.addComponent (chart);
});