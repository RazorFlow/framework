rf.StandaloneDashboard(function(db){
    var kpi = new KPIComponent ();
    kpi.setDimensions (3, 2);
    kpi.setCaption ('Sales in the last 24 hours');
    kpi.setValue (3145, {
        numberPrefix: "$"
    });

    db.addComponent(kpi);
});