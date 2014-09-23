window.rfBenchmark = function () {
	var db = new Dashboard ();
	var chart = new ChartComponent("chart");
	chart.setCaption("Sales");
	chart.setDimensions (6, 6);	
	chart.setLabels (["2013", "2014", "2015"]);
	chart.addSeries ([3151, 1121, 4982]);
	db.addComponent (chart);
	var chart2 = new ChartComponent();
	chart2.setCaption("Sales");
	chart2.setDimensions (6, 6);	
	chart2.setLabels (["2013", "2014", "2015"]);
	chart2.addSeries ([3151, 1121, 4982], {
		numberPrefix: "$",
		seriesDisplayType: "line"
	});
	db.addComponent (chart2);
	return db;
};