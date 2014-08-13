StandaloneDashboard(function(db){
	var kpi = new KPIComponent ();
	kpi.setDimensions (4, 4);
	kpi.setCaption ("Sales");
	kpi.setValue (42, {
		numberPrefix: "$", 
		valueTextColor: "#ff000d"
	});

	db.addComponent (kpi);
});