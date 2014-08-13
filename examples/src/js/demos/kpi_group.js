rf.StandaloneDashboard(function(db){
    var kpi = new KPIGroupComponent ();
    kpi.setDimensions (12, 2);
    kpi.setCaption('Food Units Available');

    kpi.addKPI('beverages', {
        caption: 'Beverages',
        value: 559,
        numberSuffix: ' units'
    });

    kpi.addKPI('condiments', {
        caption: 'Condiments',
        value: 507,
        numberSuffix: ' units'
    });

    kpi.addKPI('confections', {
        caption: 'Confections',
        value: 386,
        numberSuffix: ' units'
    });

    kpi.addKPI('daily_products', {
        caption: 'Daily Products',
        value: 393,
        numberSuffix: ' units'
    });
    db.addComponent (kpi);
});