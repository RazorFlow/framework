describe("domain adjustments based on chart size", function () {
    var createChart = function (w, h, negative) {
        seriesA = {};
        seriesB = {};
        yAxisName =  "";
        yAxis = {};

        var chart = new ChartComponent();
        chart.setDimensions (w || 4 , h || 4);
        chart.setYAxis(yAxisName, yAxis)
        chart.setCaption("2011 Sales"); 
        chart.setLabels (["Beverages", "Vegetables"])
        chart.addSeries ("sales", "Sales", [1343, !negative ? 7741 : -7741], seriesA);
        chart.addSeries ("quantity", "Quantity", [300, !negative ? 800 : -800], seriesB);
        return chart;
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

    it("should have lesser number of ticks on a small sized chart", function (done) {
        db = new Dashboard ();
        var chart = createChart();

        db.addComponent(chart);

        var small = createChart (3, 2);
        db.addComponent(small);
        db.embedTo("dbTarget");

        // var th = TestHelper ();

        t3.start(done)
            .wait(300)
            .setContext(chart.pro.renderer.$core.parent())
            .drillContext(".rc-axis:eq(1)")
            .count('text', 6, {op: '='})
            .setContext(small.pro.renderer.$core.parent())
            .drillContext(".rc-axis:eq(1)")
            .count('text', 2, {op: '='})
            .finish();

    });

    it("should have lesser number of ticks on a small sized chart with negative numbers", function (done) {
        db = new Dashboard ();
        var chart = createChart(4, 4, true);

        db.addComponent(chart);

        var small = createChart (3, 2, true);
        db.addComponent(small);
        db.embedTo("dbTarget");

        // var th = TestHelper ();

        t3.start(done)
            .wait(300)
            .setContext(chart.pro.renderer.$core.parent())
            .drillContext(".rc-axis:eq(1)")
            .count('text', 7, {op: '='})
            .setContext(small.pro.renderer.$core.parent())
            .drillContext(".rc-axis:eq(1)")
            .count('text', 3, {op: '='})
            .finish();

    });
});