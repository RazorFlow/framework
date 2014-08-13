StandaloneDashboard(function(db){
	var chart = new ChartComponent('someid');
	chart.setDimensions (6, 6);
	chart.setCaption("Sales of categories by year");
	chart.setLabels (["2009", "2010", "2011"]);
	chart.addSeries ("beverages", "Beverages", [13552, 19126, 12150]);
	chart.addSeries ("packaged_foods", "Packaged Foods", [15213, 9726, 12321]);

	chart.addComponentKPI ("total_sales", {
		caption: "Total Sales",
		value: 41332,
		numberPrefix: "$"
	});

	chart.addComponentKPI ("total_profit", {
		caption: "Total Profit",
		value: 31215,
		numberPrefix: "$",
		numberHumanize: true,
		numberDecimalPoints: 0
	});

	db.addComponent (chart);
});
