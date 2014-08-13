StandaloneDashboard(function (db) {
    var gauge = new GaugeComponent();
    gauge.setDimensions(4,3);
    gauge.setCaption('Points');
    gauge.setValue(144, {numberPrefix: '$'});
    gauge.setLimits(0, 200);
    db.addComponent(gauge);
});
