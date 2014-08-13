describe ("KPI Group Tests", function () {
  var db;
  var th;

  beforeEach(function () {
    $("#dbTarget").empty();
    $("#dbTarget").css({
      width: 800
    });

    db= new Dashboard();
    th = new TestHelper();
  });

  afterEach(function() {
    db.pro.dispose();
  });

  var createKPIGroup= function() {
    var kpi = new KPIGroupComponent('c1');
    kpi.setDimensions (12, 2);
    kpi.setCaption('KPI Group Test');

    return kpi;
  };

  it("should add and render a basic KPI Group container with two KPIs", function (done) {
    
    var kpi = createKPIGroup();

    kpi.addKPI('first', {
      caption: 'Bangalore',
      value: 40
    });

    kpi.addKPI('second', {
      caption: 'Delhi',
      value: 30
    });

    db.addComponent (kpi);

    db.embedTo("dbTarget");

    th.start(done)
      .setContext(".rfKPIGroupContainer")
      .wait(400)
      .assert(function(contextDiv, success, error) {
        if(contextDiv.children().length === 2) {
          success();
        }
        else {
          error("The number of KPIs are 2.");
        }
      })
      .finish();
  });

  it("should add a KPI with the specified caption and value", function(done) {
    var kpi = createKPIGroup();

    kpi.addKPI('first', {
      caption: 'Bangalore',
      value: 40,
      numberPrefix: '$'
    });

    kpi.addKPI('second', {
      caption: 'Delhi',
      value: 3000,
      numberHumanize: true
    });

    db.addComponent (kpi);

    db.embedTo("dbTarget");

    th.start(done)
      .setContext(".rfKPIGroupContainer")
      .wait(400)
      .assertText(".rfMiniKPIContainer:eq(0) .rfKPICaption", "Bangalore", { trim: true })
      .assertText(".rfMiniKPIContainer:eq(1) .rfKPICaption", "Delhi", { trim: true })
      .assertText(".rfMiniKPIContainer:eq(0) .rfKPIValue", "$40", { trim: true })
      .assertText(".rfMiniKPIContainer:eq(1) .rfKPIValue", "3K", { trim: true })
      .finish();

  });

  it("should update the KPI caption and value", function(done) {
    var kpi = createKPIGroup();

    kpi.addKPI('first', {
      caption: 'Bangalore',
      value: 40
    });

    kpi.addKPI('second', {
      caption: 'Delhi',
      value: 30
    });

    kpi.updateKPI('first', {
      caption: 'Kochi',
      value: 50
    });

    db.addComponent (kpi);

    db.embedTo("dbTarget");

    th.start(done)
      .setContext(".rfKPIGroupContainer")
      .wait(400)
      .assertText(".rfMiniKPIContainer:eq(0) .rfKPICaption", "Kochi", { trim: true })
      .assertText(".rfMiniKPIContainer:eq(0) .rfKPIValue", "50", { trim: true })
      .finish();

  });

  it("should delete the KPI", function(done) {
    var kpi = createKPIGroup();

    kpi.addKPI('first', {
      caption: 'Bangalore',
      value: 40
    });

    kpi.addKPI('second', {
      caption: 'Delhi',
      value: 30
    });

    kpi.addKPI('third', {
      caption: 'Kochi',
      value: 50
    });

    kpi.deleteKPI('first');

    db.addComponent (kpi);

    db.embedTo("dbTarget");

    th.start(done)
      .setContext(".rfKPIGroupContainer")
      .wait(400)
      .assert(function(contextDiv, success, error) {
        if(contextDiv.children().length === 2) {
          success();
        }
        else {
          error("The number of KPIs are 2.");
        }
      })
      .finish();

  });

  it("should set caption color to the KPI", function(done) {
    var kpi = createKPIGroup();

    kpi.addKPI('first', {
      caption: 'Bangalore',
      value: 40
    });

    kpi.addKPI('second', {
      caption: 'Delhi',
      value: 30
    });

    kpi.addKPI('third', {
      caption: 'Kochi',
      value: 50
    });

    kpi.setKPICaptionColor('first', 'rgb(0, 128, 0)');

    db.addComponent (kpi);

    db.embedTo("dbTarget");

    th.start(done)
      .setContext(".rfKPIGroupContainer")
      .wait(400)
      .assertCSS(".rfMiniKPIContainer:eq(0) .rfKPICaption", 'color', 'rgb(0, 128, 0)')
      .finish();

  });

  it("should set value color to the KPI", function(done) {
    var kpi = createKPIGroup();

    kpi.addKPI('first', {
      caption: 'Bangalore',
      value: 40
    });

    kpi.addKPI('second', {
      caption: 'Delhi',
      value: 30
    });

    kpi.addKPI('third', {
      caption: 'Kochi',
      value: 50
    });

    kpi.setKPIValueColor('first', 'rgb(0, 128, 0)');

    db.addComponent (kpi);

    db.embedTo("dbTarget");

    th.start(done)
      .setContext(".rfKPIGroupContainer")
      .wait(400)
      .assertCSS(".rfMiniKPIContainer:eq(0) .rfKPIValue", 'color', 'rgb(0, 128, 0)')
      .finish();

  });
});