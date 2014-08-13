rf.StandaloneDashboard(function(db){
    var kpi = new KPIComponent ();
    kpi.setDimensions (3, 2);
    kpi.setCaption ('Sales in 24h');
    kpi.setValue (3145, {
        numberPrefix: "$"
    });

    db.addComponent(kpi);
});