describe("labelStep", function () {
    var labels = [];
    var data = [];

    for(var i=-1; ++i<31;) {
        labels[i] = (i+1) + ' Aug 2014';
        data[i] = Math.floor(Math.random() * 200);
    }

    var createChart = function (step, index) {
        var c1 = new ChartComponent();
        c1.setCaption("Sales");
        c1.setDimensions(4, 4);
        c1.setLabels(labels);
        c1.addSeries("sales", "Sales", data, {seriesDisplayType: 'column', numberPrefix: '$'});
        if(step) {
            c1.setLabelStep (5, index);
        }
        return c1;
    }

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

    it("should have correct number of labels after step is performed", function (done) {
        db = new Dashboard ();
        var chart = createChart();
        db.addComponent(chart);
        var step = createChart (true);
        db.addComponent(step);

        db.embedTo("dbTarget");

        var th = TestHelper ();

        t3.start(done)
            .wait(300)
            .setContext(chart.pro.renderer.$core.parent())
            .drillContext(".rc-axis:eq(0)")
            .count('text', 31, {op: '='})
            .setContext(step.pro.renderer.$core.parent())
            .drillContext(".rc-axis:eq(0)")
            .count('text', 6, {op: '='})
            .finish();

    });

     it("should have correct number of labels after step is performed with index", function (done) {
        db = new Dashboard ();
        var chart = createChart();
        db.addComponent(chart);
        var step = createChart (true, 5);
        db.addComponent(step);

        db.embedTo("dbTarget");

        var th = TestHelper ();

        t3.start(done)
            .wait(300)
            .setContext(chart.pro.renderer.$core.parent())
            .drillContext(".rc-axis:eq(0)")
            .count('text', 31, {op: '='})
            .setContext(step.pro.renderer.$core.parent())
            .drillContext(".rc-axis:eq(0)")
            .count('text', 10, {op: '='})
            .finish();

    });
});