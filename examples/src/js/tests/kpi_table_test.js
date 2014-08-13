describe ("KPI Table Tests", function () {
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

  var createKPITable = function() {
    var kpi = new KPITableComponent('c1');
    kpi.setDimensions (4, 6);
    kpi.setCaption('KPI Table Test');

    return kpi;

  }

  it("should render a basic KPI Table", function (done) {

    var kpi = createKPITable();

    kpi.addKPI('first', {
      caption: 'Bangalore',
      value: 40
    });

    db.addComponent(kpi);
    db.embedTo("dbTarget");

    th.start(done)
      .setContext('.rfKPITableContainer')
      .wait(400)
      .assertElementExists('.rfTable')

    done()

  });

  it("should add and render a basic KPI Table container with two KPIs", function (done) {
    
    var kpi = createKPITable();

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
      .setContext(".rfTable tbody")
      .wait(400)
      .assert(function(contextDiv, success, error) {
        if(contextDiv.children().length === 2) {
          success();
        }
        else {
          error("The number of KPIs must be 2. But returned: " + contextDiv.children().length);
        }
      })
      .finish();
  });

  it("should add a KPI with the specified caption and value", function(done) {
    var kpi = createKPITable();

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
      .setContext(".rfTable tbody")
      .wait(400)
      .assertText("tr:eq(0) .rfKPITableCaption", "Bangalore", { trim: true })
      .assertText("tr:eq(1) .rfKPITableCaption", "Delhi", { trim: true })
      .assertText("tr:eq(0) .rfKPITableValue", "$40", { trim: true })
      .assertText("tr:eq(1) .rfKPITableValue", "3K", { trim: true })
      .finish();

  });

  it("should update the KPI caption and value", function(done) {
    var kpi = createKPITable();

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
      .setContext(".rfTable tbody")
      .wait(400)
      .assertText("tr:eq(0) .rfKPITableCaption", "Kochi", { trim: true })
      .assertText("tr:eq(0) .rfKPITableValue", "50", { trim: true })
      .finish();

  });

  it("should delete the KPI", function(done) {
    var kpi = createKPITable();

    kpi.addKPI('first', {
      caption: 'Bangalore',
      value: 40
    });

    kpi.addKPI('second', {
      caption: 'Delhi',
      value: 30
    });

    kpi.deleteKPI('first');

    db.addComponent (kpi);

    db.embedTo("dbTarget");

    th.start(done)
      .setContext(".rfTable tbody")
      .wait(400)
      .assert(function(contextDiv, success, error) {
        if(contextDiv.children().length === 1) {
          success();
        }
        else {
          error("The number of KPIs must be 1.");
        }
      })
      .finish();

  });

  it("should set caption color to the KPI", function(done) {
    var kpi = createKPITable();

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
      .setContext(".rfTable tbody")
      .wait(400)
      .assertCSS("tr:eq(0) .rfKPITableCaption", 'color', 'rgb(0, 128, 0)')
      .finish();

  });

  it("should set value color to the KPI", function(done) {
    var kpi = createKPITable();

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
      .setContext(".rfTable tbody")
      .wait(400)
      .assertCSS("tr:eq(0) .rfKPITableValue", 'color', 'rgb(0, 128, 0)')
      .finish();

  });
});