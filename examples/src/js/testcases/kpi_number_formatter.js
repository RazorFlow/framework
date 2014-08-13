StandaloneDashboard(function (db) {

    var kpi1 = new KPIComponent();
    var kpi2 = new KPIComponent();
    var kpi3 = new KPIComponent();
    var kpi4 = new KPIComponent();
    var kpi5 = new KPIComponent();

    kpi1.setCaption('Number Prefix');
    kpi1.setDimensions(3, 2);
    kpi1.setValue(100, {
      "numberPrefix": "$",
      "numberForceDecimals": true  
    });

    kpi2.setCaption('Number Suffix');
    kpi2.setDimensions(3, 2);
    kpi2.setValue(49, {
      "numberSuffix": "ft"
    });

    kpi3.setCaption('Number Humanize');
    kpi3.setDimensions(3, 2);
    kpi3.setValue(5600, {
      "numberHumanize": true  
    });

    kpi4.setCaption('Long Longer Longest Losgesttttt Thousands Separator');
    kpi4.setDimensions(3, 2);
    kpi4.setValue(5600000, {
    });

    kpi5.setCaption('Five Number Decimal Points');
    kpi5.setDimensions(3, 2);
    kpi5.setValue(0.99999999999, {
        "numberDecimalPoints": 5
    });

    db.addComponent(kpi1);
    db.addComponent(kpi2);
    db.addComponent(kpi3);
    db.addComponent(kpi4);
    db.addComponent(kpi5);
});