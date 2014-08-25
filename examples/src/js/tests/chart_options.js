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
});