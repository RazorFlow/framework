describe("Gauge tests", function() {
    var db;
    beforeEach(function () {
        $("#dbTarget").empty().removeClass("");
        $("#dbTarget").css({
            width: 1000
        });
    });

    afterEach(function() {
        db.pro.dispose();
        $(".rfTooltip").remove();
    });

    var createGauge = function(min, max, value, opts) {
        opts = opts || {};
        db = new Dashboard();
        var gauge = new GaugeComponent();
        gauge.setDimensions(4,3);
        gauge.setCaption('Gauge Test');
        gauge.setValue(value, opts);
        gauge.setLimits(min, max);
        db.addComponent(gauge);
        db.embedTo("dbTarget");
        return gauge;
    };

    it("should have the correct caption", function(done) {
        var gauge = createGauge(0, 100, 42);

        var th = new TestHelper ();
        th.start(done)
            .setContext(gauge.pro.renderer.$core.parent())
            .assertText(".rfKPICaption", "Gauge Test")
            .finish();
    });

    it("should have the correct value", function(done) {
        var gauge = createGauge(0, 100, 42);

        var th = new TestHelper ();
        th.start(done)
            .setContext(gauge.pro.renderer.$core.parent())
            .assertText(".value-label", "42")
            .assertText("text.label:eq(0)", "0")
            .assertText("text.label:eq(1)", "100")
            .finish();
    });

    it("should display the formatted value", function(done) {
        var gauge = createGauge(0, 100, 42, {numberPrefix: '$'});

        var th = new TestHelper ();
        th.start(done)
            .setContext(gauge.pro.renderer.$core.parent())
            .assertText(".value-label", "$42")
            .assertText("text.label:eq(0)", "$0")
            .assertText("text.label:eq(1)", "$100")
            .finish();
    });

    it("should update the value", function(done) {
        var gauge = createGauge(0, 100, 42, {numberPrefix: '$'});
       
        gauge.setValue(80);
        var th = new TestHelper ();
        th.start(done)
            .wait(1000)
            .setContext(gauge.pro.renderer.$core.parent())
            .assertText(".value-label", "$80")
            .finish(); 
    });
});