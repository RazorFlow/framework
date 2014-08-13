StandaloneDashboard(function(db) {
    db.setDashboardTitle('Gauge test case');
    var kpi = new GaugeComponent();
    kpi.setDimensions(4,4);
    kpi.setValue(67);
    kpi.setLimits(0, 100);
    kpi.setCaption("Hello world");

    db.addComponent(kpi);
    
});