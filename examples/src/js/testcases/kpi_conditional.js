StandaloneDashboard(function(db) {
    db.setDashboardTitle('KPI Value Text Color');
    var kpi2 = new KPIComponent("kpi2");
    kpi2.setDimensions(4,4);
    kpi2.setCaption("hello world");
    kpi2.setValue(42);
    kpi2.valueConditionalFormat ("value >= 42", "green");

    var kpi1 = new KPIComponent("kpi1");
    kpi1.setDimensions(4,4);
    kpi1.setCaption("hello world");
    kpi1.setValue(02);
    kpi1.valueConditionalFormat ("value < 42", "red");

    db.addComponent(kpi1);
    db.addComponent(kpi2);

    var kpi = new KPIGroupComponent ("kpi");
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
    // kpi.valueConditionalFormat ("value < 400", "red");
    kpi.valueConditionalFormat ("value > 400", "red");
    db.addComponent (kpi);

    var kpi3 = new KPITableComponent ("kpi3");
	  kpi3.setDimensions (4, 6);
	  kpi3.setCaption('Food Units Available');

	  kpi3.addKPI('grains_cereals', {
	    caption: 'Grains/Cereals',
	    value: 308,
	    numberSuffix: ' units'
	  });

	  kpi3.addKPI('meat_poultry', {
	    caption: 'Meat/Poultry',
	    value: 165,
	    numberSuffix: ' units'
	  });

	  kpi3.addKPI('produce', {
	    caption: 'Produce',
	    value: 100,
	    numberSuffix: ' units'
	  });

	  kpi3.addKPI('seafood', {
	    caption: 'Sea Food',
	    value: 701,
	    numberSuffix: ' units'
	  });
	  // kpi3.valueConditionalFormat ("value < 200", "red");
	  kpi3.valueConditionalFormat ("value > 200", "red");
	  db.addComponent (kpi3);
});