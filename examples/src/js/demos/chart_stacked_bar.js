rf.StandaloneDashboard(function(db){
	var chart = new ChartComponent();
	chart.setDimensions (8, 6);
	chart.setCaption("Most spent on activity in a company");	
	chart.setLabels (["Software Deveplopemt", "Social Networking", "Communication", "Reference", "Utility"]);
	chart.setYAxis("", {
		numberSuffix: 'h'
	});
	chart.addSeries ("john", "John", [1.1, 0.3, 1.3, 2.2, 1.6], {
		seriesStacked: true,
		seriesDisplayType: "bar"
	});
	chart.addSeries ("mark", "Mark", [2.1, 0.6, 1.8, 0.9, 1.4], {
		seriesStacked: true,
		seriesDisplayType: "bar"
	});
	db.addComponent (chart);
});