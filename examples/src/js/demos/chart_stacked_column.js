rf.StandaloneDashboard(function(db){
	var chart = new ChartComponent();
	chart.setDimensions (8, 6);
	chart.setCaption("Visits from search engines");	
	chart.setLabels (["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]);
	chart.setYAxis("", {
		numberPrefix: "$"
	});
	chart.addSeries ("Google", "Google", [3040, 2794, 3026, 3341, 2800, 2507, 3701, 2671, 2980, 2041, 1813, 1691], {
		seriesStacked: true,
		seriesDisplayType: "column"
	});
	chart.addSeries ("Yahoo", "Yahoo", [1200, 1124, 1006, 921, 1500, 1007, 921, 971, 1080, 1041, 1113, 1091], {
		seriesStacked: true,
		seriesDisplayType: "column"
	});
	chart.addSeries ("MSN", "MSN", [600, 724, 806, 621, 700, 907, 821, 671, 880, 641, 913, 691], {
		seriesStacked: true,
		seriesDisplayType: "column"
	});
	chart.addSeries ("Others", "Others", [965, 771, 732, 611, 700, 607, 621, 751, 800, 741, 813, 791], {
		seriesStacked: true,
		seriesDisplayType: "column"
	});
	db.addComponent (chart);
});