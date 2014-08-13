StandaloneDashboard(function(db) {
    db.setDashboardTitle('KPI group test case');
    var kpi = new KPIGroupComponent();
    kpi.setDimensions(12,2);
    kpi.setCaption('Sales by region 2013');
    kpi.addKPI('first', {
        caption: 'Bangalore',
        value: 2766,
        numberPrefix: '$'
    });
    kpi.addKPI('second', {
        caption: 'Chennai',
        value: 2136,
        numberPrefix: '$'
    });
    kpi.addKPI('third', {
        caption: 'Delhi',
        value: 4232,
        numberPrefix: '$'
    });
    kpi.addKPI('fourth', {
        caption: 'Mumbai',
        value: 2211,
        numberPrefix: '$'
    });
    kpi.addKPI('fifth', {
        caption: 'SFO',
        value: 2211,
        numberPrefix: '$'
    });
    kpi.addKPI('sixth', {
        caption: 'New York',
        value: 2211,
        numberPrefix: '$'
    });
    kpi.setValueIcon('first', 'arrow-circle-o-up', {color: '#2a2'});
    db.addComponent(kpi);
    setTimeout(function() {
        kpi.updateKPI('first', {value: 3000});
        kpi.setKPICaptionColor('first', '#f00');
        setTimeout(function() {
            kpi.deleteKPI('fifth');
        }, 1000);
    }, 3000);
    
});