describe ("DualY Chart Tests", function () {
    var db;
    var _ = rf._;
    beforeEach(function () {
        $("#dbTarget").empty().removeClass("");
        $("#dbTarget").css({
            width: 1000
        });
    });

    var chart_timeout = 400;

    afterEach(function() {
        db.pro.dispose();
        $(".rfTooltip").remove();
    });

    var createChart = function (seriesA, seriesB, yAxis, yAxisName, yAxisReturns, yAxisNameReturns) {
        seriesA = seriesA ? seriesA : {};
        seriesB = seriesB ? seriesB : {};
        yAxisName = yAxisName ? yAxisName : "";
        yAxis = yAxis ? yAxis : {};
        yAxisReturns = yAxisReturns ? yAxisReturns : {};

        seriesB = _.extend(seriesB, {
          yAxis: 'secondary'
        });

        var chart = new ChartComponent();
        chart.setDimensions (4, 4);
        chart.setYAxis(yAxisName, yAxis);
        chart.addYAxis('secondary', yAxisNameReturns, yAxisReturns);
        chart.setCaption("2011 Sales"); 
        chart.setLabels (["Beverages", "Vegetables"])
        chart.addSeries ("sales", "Sales", [1343, 7741], seriesA);
        chart.addSeries ("quantity", "Quantity", [300, 800], seriesB);
        return chart;
    }
// ********************* Basic chart tests for charts **********************
    it("Should display labels on X Axis", function (done) {
        db = new Dashboard ();
        var chart = createChart();

        db.addComponent(chart);
        db.embedTo("dbTarget");

        var th = new TestHelper ();
        th.start(done)
          .wait(chart_timeout)
          .setContext(chart.pro.renderer.$core.parent())
          .drillContext(".rc-axis:eq(0)")
          .assertText("text:eq(0)", "Beverages")
          .svgMeasure("text:eq(0)", "y", t3.approximate(14, 1))
          .assertText("text:eq(1)", "Vegetables")
          .finish();
    });

    it("Should display items on Y Axis", function (done) {
        db = new Dashboard ();
        var chart = createChart();

        db.addComponent(chart);
        db.embedTo("dbTarget");

        var th = new TestHelper ();
        th.start(done)
          .wait(chart_timeout)
          .setContext(chart.pro.renderer.$core.parent())
          .drillContext(".rc-axis:eq(1)")
          .assertText("text:eq(0)", "0")
          .svgMeasure("text:eq(0)", "y", t3.approximate(0, 0.1))
          .assertText("text:eq(1)", "1,600")
          .finish();
    });

    it("Should format numbers on Y Axis", function (done) {
        db = new Dashboard ();
        var chart = createChart({}, {}, {
            numberPrefix: "$"
        });

        db.addComponent(chart);
        db.embedTo("dbTarget");

        t3.start(done)
          .wait(chart_timeout)
          .setContext(chart.pro.renderer.$core.parent())
          .drillContext(".rc-axis:eq(1)")
          .assertText("text:eq(1)", "$1,600")
          .finish();
    });

    it("Should display rectangles for columns", function (done) {
        db = new Dashboard ();
        var chart = createChart();

        db.addComponent(chart);
        db.embedTo("dbTarget");

        t3.start(done)
          .wait(chart_timeout)
          .setContext(chart.pro.renderer.$core.parent())
          .drillContext("g.rc-series-1")
          .svgMeasure("rect:eq(0)", "width", t3.approximate(29, 2))
          .svgMeasure("rect:eq(0)", "height", t3.approximate(33, 1))
          .svgMeasure("rect:eq(1)", "height", t3.approximate(191, 2))
          .svgMeasure("rect:eq(1)", "width", t3.approximate(29, 2))
          .finish();
    });

    it("Should display a valid tooltip when there's a mouseover event", function (done) {
        db = new Dashboard ();
        var chart = createChart({}, {}, {
            numberPrefix: "$"
        });

        db.addComponent(chart);
        db.embedTo("dbTarget");

        t3.start(done)
          .wait(chart_timeout)
          .setContext(chart.pro.renderer.$core.parent())
          .svgTriggerEvent("rect:eq(0)", "mouseover")
          .wait(200)
          .enterTempContext($(".rfTooltip:eq(0)"))
            .assertText(".rfTooltipLabel", "Sales", {trim: true})
            .assertText(".rfTooltipValue", "$1,343")
            .assertText(".rfTooltipMainLabel", "Beverages")
            .assertCSS(".", "left", t3.approximate(58, 3))
            .assertCSS(".", "top", t3.approximate(205, 2))
          .exitTempContext()
          .svgTriggerEvent("rect:eq(0)", "mouseout")
          .wait(200)
          .svgTriggerEvent("rect:eq(1)", "mouseover")
          .wait(200)
          .enterTempContext($(".rfTooltip:eq(0)"))
            .assertText(".rfTooltipLabel", "Sales", {trim: true})
            .assertText(".rfTooltipValue", "$7,741")
            .assertText(".rfTooltipMainLabel", "Vegetables")
            .assertCSS(".", "left", t3.approximate(154, 2))
            .assertCSS(".", "top", t3.approximate(47, 2))
          .exitTempContext()
          .svgTriggerEvent("rect:eq(1)", "mouseout")
          .finish();
    });

    it("Should hide/show a series after clicking legend", function (done) {
        db = new Dashboard ();
        var chart = createChart({}, {}, {
            numberPrefix: "$"
        });

        db.addComponent(chart);
        db.embedTo("dbTarget");

        t3.start(done)
          .wait(chart_timeout)
          .setContext(chart.pro.renderer.$core)
          .click('.rfLegendKey:eq(0)')
          .wait(200)
          .setContext (function () {
            return chart.pro.renderer.$core;
          })
          .assertClass('.rfLegendKey:eq(0)', "disabled")
          .assert(function (contextDiv, success, fail) {
            if(contextDiv.find(".rc-column-chart").children().length !== 1) {
                fail("Expected column chart container to have just 1 child. It doesn't.");
            }
            success ();
          })
          .assert(function (contextDiv, success, fail) { // Specific to only dualY charts
            if(contextDiv.find(".rc-axis").children().length !== 2) {
                fail("Expected an x-axis and a y axis but found another one");
            }
            success ();
          })
          .click('.rfLegendKey:eq(0)')
          .wait(200)
          .setContext (function () {
            return chart.pro.renderer.$core;
          })
          .assert(function (contextDiv, success, fail) {
            if(contextDiv.find(".rc-column-chart").children().length !== 2) {
                fail("Expected column chart container to have just 2 children. It doesn't.");
            }
            success ();
          })
          .assert(function (contextDiv, success, fail) { // Specific to only dualY charts
            if(contextDiv.find(".rc-axis").children().length !== 3) {
                fail("Expected an x-axis and 2 y axes but only 1 was found");
            }
            success ();
          })
          .finish();
    });

    it("Should respect series colors everywhere", function (done) {
        db = new Dashboard ();
        var chart = createChart({
            seriesColor: "#a4c9f3"
        }, { seriesColor: "red"}, {
        });

        db.addComponent(chart);
        db.embedTo("dbTarget");

        t3.start(done)
          .wait(chart_timeout)
          .setContext(chart.pro.renderer.$core.parent())
          .enterTempContext("g.rc-series-1")
            .assertAttrs("rect:eq(0)", "fill", "#a4c9f3")
          .exitTempContext("g.rc-series-1")
          .enterTempContext("g.rc-series-2")
            .assertAttrs("rect:eq(0)", "fill", "#ff0000")
          .exitTempContext("g.rc-series-2")
          .assertCSS(".rfLegendKey:eq(0) > .legendColor", "background-color", "rgb(164, 201, 243)")
          .assertCSS(".rfLegendKey:eq(1) > .legendColor", "background-color", "rgb(255, 0, 0)")
          .finish();
    });

// ********************* Basic chart tests for charts **********************

// ********************* Dual Y Axis chart specific tests **********************
    it("Should display items on the secondary Y Axis", function (done) {
        db = new Dashboard ();
        var chart = createChart();

        db.addComponent(chart);
        db.embedTo("dbTarget");

        var th = new TestHelper ();
        th.start(done)
          .wait(chart_timeout)
          .setContext(chart.pro.renderer.$core.parent())
          .drillContext(".rc-axis:eq(2)")
          .assertText("text:eq(0)", "0")
          .svgMeasure("text:eq(0)", "y", t3.approximate(0, 0.1))
          .assertText("text:eq(1)", "200")
          .finish();
    });

    it("Should format numbers on the secondary Y Axis", function (done) {
        db = new Dashboard ();
        var chart = createChart({}, {}, {}, '', {
            numberPrefix: "$"
        });

        db.addComponent(chart);
        db.embedTo("dbTarget");

        t3.start(done)
          .wait(chart_timeout)
          .setContext(chart.pro.renderer.$core.parent())
          .drillContext(".rc-axis:eq(2)")
          .assertText("text:eq(1)", "$200")
          .finish();
    });
// ********************* Dual Y Axis chart specific tests **********************
});