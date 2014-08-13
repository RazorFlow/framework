StandaloneDashboard(function (db) {
    db.setDashboardTitle('Changing the component order');

    var c1 = new KPIComponent ('kpi1');
    c1.setCaption ('KPI 1');
    c1.setValue (42);
    db.addComponent (c1);

    var c2 = new KPIComponent ('kpi2');
    c2.setCaption ('KPI 2');
    c2.setValue (43);
    db.addComponent (c2);

    var c3 = new KPIComponent ('kpi3');
    c3.setCaption ('KPI 3');
    c3.setValue (44);
    db.addComponent (c3);

    c1.overrideDisplayOrderIndex (2);
    c2.overrideDisplayOrderIndex (1);
    c3.overrideDisplayOrderIndex (0);
});