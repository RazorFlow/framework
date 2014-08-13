StandaloneDashboard(function (db) {
	var gauge1 = new GaugeComponent();
    gauge1.setDimensions(3,2);
    gauge1.setCaption('min max disappeared');
    gauge1.setValue(144, {numberPrefix: '$'});
    gauge1.setLimits(0, 200);
    db.addComponent(gauge1);

    var gauge2 = new GaugeComponent();
    gauge2.setDimensions(4,4);
    gauge2.setCaption('negative');
    gauge2.setValue(-125);
    gauge2.setLimits(-250, 0);
    db.addComponent(gauge2);

    var gauge3 = new GaugeComponent();
    gauge3.setDimensions(4,4);
    gauge3.setCaption('value below min');
    gauge3.setValue(250);
    gauge3.setLimits(500, 600);
    db.addComponent(gauge3);

    var gauge4 = new GaugeComponent();
    gauge4.setDimensions(4,4);
    gauge4.setCaption('all same values');
    gauge4.setValue(500);
    gauge4.setLimits(500, 500);
    db.addComponent(gauge4);

    var gauge5 = new GaugeComponent();
    gauge5.setDimensions(4,4);
    gauge5.setCaption('min and value same');
    gauge5.setValue(500);
    gauge5.setLimits(500, 1000);
    db.addComponent(gauge5);

    var gauge6 = new GaugeComponent();
    gauge6.setDimensions(4,4);
    gauge6.setCaption('max and value same');
    gauge6.setValue(500);
    gauge6.setLimits(200, 500);
    db.addComponent(gauge6);

    var gauge7 = new GaugeComponent();
    gauge7.setDimensions(4,4);
    gauge7.setCaption('value above max');
    gauge7.setValue(700);
    gauge7.setLimits(500, 600);
    db.addComponent(gauge7);
});
