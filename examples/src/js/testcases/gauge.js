StandaloneDashboard(function (db) {
    var gauge1 = new GaugeComponent();
    gauge1.setDimensions(4,3);
    gauge1.setCaption('Gauge Test');
    gauge1.setValue(144, {numberPrefix: '$'});
    gauge1.setLimits(0, 200);
    db.addComponent(gauge1);

    setTimeout(function() {
        gauge1.setValue(200);
    }, 3000);
});
