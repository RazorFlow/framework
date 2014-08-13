
StandaloneDashboard(function(db) {
    db.setDashboardTitle('KPI Basic Test Cases');
    var multiKpi = function (cb, gaugeFlag) {
        var kpi1 = gaugeFlag ? new GaugeComponent() : new KPIComponent();
        kpi1.setDimensions(1,2);
        cb(kpi1);
        db.addComponent(kpi1);

        var kpi2 = gaugeFlag ? new GaugeComponent() : new KPIComponent();
        kpi2.setDimensions(2,2);
        cb(kpi2);
        db.addComponent(kpi2);

        var kpi2 = gaugeFlag ? new GaugeComponent() : new KPIComponent();
        kpi2.setDimensions(3,2);
        cb(kpi2);
        db.addComponent(kpi2);

        var kpi3 = gaugeFlag ? new GaugeComponent() : new KPIComponent();
        kpi3.setDimensions(6,2);
        cb(kpi3);
        // TODO: Implement override mode
        // kpi3.pro.overrideMode('mobile');
        db.addComponent(kpi3);
    };

    multiKpi(function(kpi) {
        kpi.setValue(42);
        kpi.setCaption("Small Label");
    });
    multiKpi(function(kpi) {
        kpi.setValue(421315);
        kpi.setCaption("A long label which is also quite common in applications");
    });
    multiKpi(function(kpi) {
        kpi.setValue(415);
        kpi.setSparkValues(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], [20, 32, 34, 12, 4, 16]);
        kpi.setCaption("Hello world");
    });
    multiKpi(function(kpi) {
        kpi.setValue(67);
        kpi.setLimits(0, 100);
        kpi.setCaption("Hello world");
    }, true);
});