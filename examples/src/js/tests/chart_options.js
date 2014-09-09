describe ("Chart Hide Labels", function () {
  var db;
  beforeEach(function () {
    $("#dbTarget").empty();
    $("#dbTarget").css({
      width: 1200
    });
  });

  afterEach(function() {
    db.pro.dispose();
  });

  it("Should render a Line Chart with no labels", function (done) {
    db = new Dashboard ();

    var c1 = new ChartComponent();
    c1.setCaption("Column Chart");
    c1.setDimensions(2, 2);
    c1.setLabels(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q']);
    c1.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9, 3, 5, 1, 9, 3, 5, 1, 9, 1, 2, 3, 1], {seriesDisplayType: 'line', numberPrefix: '$'});
    c1.setOption('showLabelFlag', false);
 
    db.addComponent(c1);

    db.embedTo("dbTarget");

    var th = new TestHelper ();
    th.start(done)
      .wait(c1)
      .setContext(c1.pro.renderer.$core.parent())
      .drillContext(".rc-axis:eq(0)")
      .assert(function(contextDiv, success, error) {
        if(contextDiv.children().children().length === 1) {
          success();
        }
        else {
          error("Labels do not seem to be hidden in Line Chart");
        }
      })
      .finish();
    });

  it("Should render a Column Chart with no labels", function (done) {
    db = new Dashboard ();

    var c1 = new ChartComponent();
    c1.setCaption("Column Chart");
    c1.setDimensions(4, 5);
    c1.setLabels(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q']);
    c1.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9, 3, 5, 1, 9, 3, 5, 1, 9, 1, 2, 3, 1], {numberPrefix: '$'});
    c1.setOption('showLabelFlag', false);
 
    db.addComponent(c1);

    db.embedTo("dbTarget");

    var th = new TestHelper ();
    th.start(done)
      .wait(c1)
      .setContext(c1.pro.renderer.$core.parent())
      .drillContext(".rc-axis:eq(0)")
      .assert(function(contextDiv, success, error) {
        if(contextDiv.children().children().length === 1) {
          success();
        }
        else {
          error("Labels do not seem to be hidden in Column Chart");
        }
      })
      .finish();
    });

  it("Should render a Bar Chart with no labels", function (done) {
    db = new Dashboard ();

    var c1 = new ChartComponent();
    c1.setCaption("Column Chart");
    c1.setDimensions(4, 5);
    c1.setLabels(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q']);
    c1.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9, 3, 5, 1, 9, 3, 5, 1, 9, 1, 2, 3, 1], {seriesDisplayType: 'bar', numberPrefix: '$'});
    c1.setOption('showLabelFlag', false);
 
    db.addComponent(c1);

    db.embedTo("dbTarget");

    var th = new TestHelper ();
    th.start(done)
      .wait(c1)
      .setContext(c1.pro.renderer.$core.parent())
      .drillContext(".rc-axis:eq(1)")
      .assert(function(contextDiv, success, error) {
        if(contextDiv.children().children().length === 0) {
          success();
        }
        else {
          error("Labels do not seem to be hidden in Bar Chart");
        }
      })
      .finish();
    });

  it("Should render a Column & Line Chart with no labels", function (done) {
    db = new Dashboard ();

    var c1 = new ChartComponent();
    c1.setCaption("Column Chart");
    c1.setDimensions(4, 5);
    c1.setLabels(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q']);
    c1.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9, 3, 5, 1, 9, 3, 5, 1, 9, 1, 2, 3, 1], {numberPrefix: '$'});
    c1.addSeries("seriesB", "Series B", [1, 3, 5, 1, 9, 3, 5, 1, 9, 3, 5, 1, 9, 1, 2, 3, 1], {seriesDisplayType: 'line', numberPrefix: '$'});
    c1.setOption('showLabelFlag', false);
 
    db.addComponent(c1);

    db.embedTo("dbTarget");

    var th = new TestHelper ();
    th.start(done)
      .wait(c1)
      .setContext(c1.pro.renderer.$core.parent())
      .drillContext(".rc-axis:eq(0)")
      .assert(function(contextDiv, success, error) {
        if(contextDiv.children().children().length === 1) {
          success();
        }
        else {
          error("Labels do not seem to be hidden in Column Chart");
        }
      })
      .finish();
    });

  it("Should respect series colors in a line chart", function (done) {
    db = new Dashboard ();

    var c1 = new ChartComponent();
    c1.setCaption("Line Chart");
    c1.setDimensions(5, 3);
    c1.setLabels(['A', 'B', 'C', 'D', 'E', 'F']);
    c1.addSeries("seriesA", "Series A", [1, 3, 5, 1, 2, 6], {seriesDisplayType: 'line', numberPrefix: '$', seriesColor: '#dd33aa'});
    c1.setOption('showLabelFlag', false);
 
    db.addComponent(c1);

    db.embedTo("dbTarget");

    var th = new TestHelper ();
    th.start(done)
      .wait(c1)
      .setContext(c1.pro.renderer.$core.parent())
      .enterTempContext("g.rc-series-1")
      .assertAttrs("circle:eq(0)", "stroke", "#dd33aa")
      .assertAttrs("path:eq(0)", "stroke", "#dd33aa")
      .exitTempContext("g.rc-series-1")
      .assertCSS(".rfLegendKey:eq(0) > .legendColor", "background-color", "rgb(221, 51, 170)")
      .svgTriggerEvent("circle:eq(1)", "mouseover")
      .wait(200)
      .enterTempContext($(".rfTooltip:eq(8)"))
      .assertCSS(".rfTooltipLabel", "color", "rgb(221, 51, 170)")
      .exitTempContext(".rfTooltip:eq(8)")
      .svgTriggerEvent("circle:eq(1)", "mouseout")
      .finish();
    });

  it("Should respect series colors in a stacked chart", function (done) {
    db = new Dashboard ();

    var c1 = new ChartComponent();
    c1.setCaption("Stacked Chart");
    c1.setDimensions(5, 3);
    c1.setLabels(['A', 'B', 'C', 'D', 'E', 'F']);
    c1.addSeries("seriesA", "Series A", [1, 3, 5, 1, 2, 6], {seriesDisplayType: 'column', numberPrefix: '$', seriesColor: 'dd33aa', seriesStacked: true});
    c1.addSeries("seriesB", "Series B", [3, 1, 3, 5, 1, 6], {seriesDisplayType: 'column', numberPrefix: '$', seriesColor: '3af311', seriesStacked: true});
    c1.setOption('showLabelFlag', false);
 
    db.addComponent(c1);

    db.embedTo("dbTarget");

    var th = new TestHelper ();
    th.start(done)
      .wait(c1)
      .setContext(c1.pro.renderer.$core.parent())
      .enterTempContext("g.rc-series-1")
      .assertAttrs("rect:eq(0)", "fill", "#dd33aa")
      .exitTempContext("g.rc-series-1")
      .enterTempContext("g.rc-series-2")
      .assertAttrs("rect:eq(0)", "fill", "#3af311")
      .exitTempContext("g.rc-series-2")
      .assertCSS(".rfLegendKey:eq(0) > .legendColor", "background-color", "rgb(221, 51, 170)")
      .assertCSS(".rfLegendKey:eq(1) > .legendColor", "background-color", "rgb(58, 243, 17)")
      .svgTriggerEvent("g.rc-series-1 > rect:eq(0)", "mouseover")
      .wait(200)
      .enterTempContext($(".rfTooltip:eq(10)"))
      .assertCSS(".rfTooltipLabel", "color", "rgb(221, 51, 170)")
      .exitTempContext(".rfTooltip:eq(10)")
      .svgTriggerEvent("g.rc-series-1 > rect:eq(0)", "mouseout")
      .svgTriggerEvent("g.rc-series-2 > rect:eq(0)", "mouseover")
      .wait(200)
      .enterTempContext($(".rfTooltip:eq(10)"))
      .assertCSS(".rfTooltipLabel", "color", "rgb(58, 243, 17)")
      .exitTempContext(".rfTooltip:eq(10)")
      .svgTriggerEvent("g.rc-series-2 > rect:eq(0)", "mouseout")
      .finish();
    });

  it("Should respect series colors in a bar chart", function (done) {
    db = new Dashboard ();

    var c1 = new ChartComponent();
    c1.setCaption("Bar Chart");
    c1.setDimensions(5, 3);
    c1.setLabels(['A', 'B', 'C', 'D', 'E', 'F']);
    c1.addSeries("seriesA", "Series A", [1, 3, 5, 1, 2, 6], {seriesDisplayType: 'bar', numberPrefix: '$', seriesColor: '#dd33aa'});
 
    db.addComponent(c1);

    db.embedTo("dbTarget");

    var th = new TestHelper ();
    th.start(done)
      .wait(c1)
      .setContext(c1.pro.renderer.$core.parent())
      .enterTempContext("g.rc-series-1")
      .assertAttrs("rect:eq(0)", "fill", "#dd33aa")
      .exitTempContext("g.rc-series-1")
      .assertCSS(".rfLegendKey:eq(0) > .legendColor", "background-color", "rgb(221, 51, 170)")
      .svgTriggerEvent("rect:eq(0)", "mouseover")
      .wait(200)
      .enterTempContext($(".rfTooltip:eq(12)"))
      .assertCSS(".rfTooltipLabel", "color", "rgb(221, 51, 170)")
      .exitTempContext(".rfTooltip:eq(12)")
      .svgTriggerEvent("rect:eq(0)", "mouseout")
      .finish();
    });

  it("Should respect series colors in an area chart", function (done) {
    db = new Dashboard ();

    var c1 = new ChartComponent();
    c1.setCaption("Bar Chart");
    c1.setDimensions(5, 3);
    c1.setLabels(['A', 'B', 'C', 'D', 'E', 'F']);
    c1.addSeries("seriesA", "Series A", [1, 3, 5, 1, 2, 6], {seriesDisplayType: 'area', numberPrefix: '$', seriesColor: '#dd33aa'});
 
    db.addComponent(c1);

    db.embedTo("dbTarget");

    var th = new TestHelper ();
    th.start(done)
      .wait(c1)
      .setContext(c1.pro.renderer.$core.parent())
      .enterTempContext("g.rc-series-1")
      .assertAttrs("path:eq(0)", "fill", "#dd33aa")
      .assertAttrs("path:eq(0)", "stroke", "#dd33aa")
      .exitTempContext("g.rc-series-1")
      .assertCSS(".rfLegendKey:eq(0) > .legendColor", "background-color", "rgb(221, 51, 170)")
      .svgTriggerEvent("circle:eq(1)", "mouseover")
      .wait(200)
      .enterTempContext($(".rfTooltip:eq(14)"))
      .assertCSS(".rfTooltipLabel", "color", "rgb(221, 51, 170)")
      .exitTempContext(".rfTooltip:eq(14)")
      .svgTriggerEvent("circle:eq(1)", "mouseout")
      .finish();
    });
});