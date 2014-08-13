rf.StandaloneDashboard(function(db){
	var chart = new ChartComponent();
	chart.setDimensions (6, 4);
	chart.setCaption("Company Revenue and Profits");
	chart.setLabels (["Aug", "Sept", "Oct", "Nov", "Dec"]);
	chart.addSeries ("revenue", "Revenue", [20000, 17000, 22000, 19000, 23000], {
		numberPrefix: "$"
	});
	chart.addYAxis("profit", "Profit %", {
		numberSuffix: "%"
	});
	chart.addSeries ("profit", "Profit %", [25, 5.88, 36.36, 10.52, 30.43], {
		numberSuffix: "%",
		yAxis: "profit",
		seriesDisplayType: "line"
	});
	chart.addSeries ("avg", "Profits", [40000, 10000, 80000, 20000, 70000], {
		
	});

	chart.setYAxis('', {numberPrefix: '$', numberHumanize: true});
	db.addComponent (chart);


	var chart1 = new ChartComponent();
	chart1.setDimensions (6, 4);
	chart1.setCaption("Company Sales");
	chart1.setLabels (["Jan", "Feb", "Mar", "Apr", "May", "June"]);
	chart1.addSeries ("Revenue", "Revenue", [5854, 4171, 1375, 1875, 2246, 2696]);
	chart1.addSeries ("Profit", "Profit", [3242, 3171, 700, 1287, 1856, 1126], {
		seriesDisplayType: "area"
	});
	chart1.addSeries ("Predicted_Profit", "Predicted Profit", [4342, 2371, 740, 3487, 2156, 1326], {
		seriesDisplayType: "line"
	});
	chart1.setYAxis('', {numberPrefix: '$', numberHumanize: true});
	db.addComponent (chart1);
});
