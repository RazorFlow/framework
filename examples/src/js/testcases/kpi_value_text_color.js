StandaloneDashboard(function(db) {
    db.setDashboardTitle('KPI Value Text Color');
    var kpi = new KPIComponent("kpi");
    kpi.setDimensions(4,4);
    kpi.setCaption("hello world");
    kpi.setValue(42, {
        valueTextColor: "red"
    });

    db.addComponent(kpi);
});