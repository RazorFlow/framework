StandaloneDashboard(function(db) {
    db.setDashboardTitle('KPI table test case');
    var kpi = new KPITableComponent();
    kpi.setDimensions(4, 5);
    kpi.setCaption('Sales by region 2013');
    kpi.addKPI('first', {
        caption: 'Bangalore ;jnsdf ',
        value: 2766,
        numberPrefix: '$'
    });
    // kpi.addKPI('second', {
    //     caption: 'Chennai',
    //     value: 2136,
    //     numberPrefix: '$'
    // });
    // kpi.addKPI('third', {
    //     caption: 'Delhi',
    //     value: 4232,
    //     numberPrefix: '$'
    // });
    // kpi.addKPI('fourth', {
    //     caption: 'Mumbai',
    //     value: 2211,
    //     numberPrefix: '$'
    // });
    // kpi.addKPI('fifth', {
    //     caption: 'SFO',
    //     value: 2211,
    //     numberPrefix: '$'
    // });
    // kpi.addKPI('sixth', {
    //     caption: 'New York',
    //     value: 2211,
    //     numberPrefix: '$'
    // });

    kpi.setKPICaptionColor('first', '#2A2');
    kpi.setKPIValueColor('first', '#2A2');

    // setTimeout(function() {
    //     kpi.updateKPI('first', {
    //         caption: 'Bengaluru',
    //         value: 1000000000
    //     });
    //     kpi.setKPIValueColor('first', '#F50606');

    //     kpi.deleteKPI('second');
    // }, 2000);
    // kpi.setValueIcon('first', 'arrow-circle-o-up', {color: '#2a2'});
    db.addComponent(kpi);
});