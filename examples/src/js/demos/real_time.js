rf.StandaloneDashboard(function(db){
    var kpi = new GaugeComponent ();
    kpi.setDimensions (4, 3);
    kpi.setCaption ('# Closed/Total Tickets (24h)');
    kpi.setLimits (0, 100);
    kpi.setValue (Math.floor((Math.random() * 100)));

    db.addComponent(kpi);


    var chart = new ChartComponent('sales');
	chart.setDimensions (8, 6);
	chart.setCaption("Sales");
	chart.setLabels (["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]);
	chart.addSeries ("sales2013", "2013", [22400, 24800, 21800, 21800, 24600, 27600, 26800, 27700, 23700, 25900, 26800, 24800]);
	chart.setYAxis('', {numberPrefix: '$', numberHumanize: true});
	db.addComponent (chart);

	setInterval(function () {
		db.ready(function () {
			kpi.setValue(Math.floor((Math.random() * 100)));
	        var data = [];
	        for(var i = 0; i < 12; i++) {
	            data.push(Math.random() * 100000);
	        }
	        chart.updateSeries ("sales2013", data);
		});
    }, 1500);
});