StandaloneDashboard(function (db) {
	var chart = new ChartComponent ();
	chart.lock ();

	setTimeout (function (db) {
		chart.setCaption ("Hello World!");
		chart.unlock();
	}, 1000)
	db.addComponent (chart);
});