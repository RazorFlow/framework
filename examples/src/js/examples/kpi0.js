StandaloneDashboard(function(db){
	var kpi = new KPIComponent ();
	kpi.setDimensions (4, 4);
	kpi.setCaption ("Sales");
	kpi.setValue (42);

	db.addComponent (kpi);
});