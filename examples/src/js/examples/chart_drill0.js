StandaloneDashboard (function (db) {
	var chart = new ChartComponent ();
	chart.setCaption ("Country wide sales");
	chart.setLabels (["Country A", "Country B", "Country C"]);
	chart.addSeries ("sales", "Sales", [10, 7, 11])
	db.addComponent(chart);

	chart.addDrillStep (function (done, params) {
	    chart.setLabels (["State A", "State B"])
	    chart.addSeries ("sales", "Sales", [4, 3])

	    done (); // This is required
	});

	chart.addDrillStep (function (done, params) {
	    chart.setLabels ([ "City A", "City B", "City C", "City D"])
	    chart.addSeries ("sales", "Sales", [3, 1, 4, 2])

	    done (); // This is required
	});
});