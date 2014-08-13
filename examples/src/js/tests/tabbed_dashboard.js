describe ("Basic Chart Tests", function () {
	var db;
	beforeEach(function () {
		$("#dbTarget").empty().removeClass("");
		$("#dbTarget").css({
			width: 1000
		});
	});

	var chart_timeout = 400;

	afterEach(function() {
		db1.pro.dispose();
		db2.pro.dispose();
		$(".rfTooltip").remove();
	});

	var createChart = function (seriesA, seriesB, yAxis, yAxisName) {
		seriesA = seriesA ? seriesA : {};
		seriesB = seriesB ? seriesB : {};
		yAxisName = yAxisName ? yAxisName : "";
		yAxis = yAxis ? yAxis : {};

		var chart = new ChartComponent();
		chart.setDimensions (4, 4);
		chart.setYAxis(yAxisName, yAxis)
		chart.setCaption("2011 Sales");	
		chart.setLabels (["Beverages", "Vegetables"])
		chart.addSeries ("sales", "Sales", [1343, 7741], seriesA);
		chart.addSeries ("quantity", "Quantity", [300, 800], seriesB);
		return chart;
	}

	it("Should display tabbed Dashboard", function (done) {
		tdb = new TabbedDashboard();
		db1 = new Dashboard();
		db2 = new Dashboard();
		var chart1 = createChart(),
			chart2 = createChart();
		db1.setDashboardTitle('Dashboard 1');
		db2.setDashboardTitle('Dashboard 2');
		db1.addComponent(chart1);
		db2.addComponent(chart2);

		tdb.addDashboardTab(db1);
		tdb.addDashboardTab(db2);

		tdb.embedTo("dbTarget");


		var th = new TestHelper ();
		th.start(done)
		  .wait(chart_timeout)
		  .setContext(tdb.pro.$tabDiv)
		  .drillContext(".tabLinks")
		  .assertText("li:eq(0) .k-link", "Dashboard 1")
		  .assertText("li:eq(1) .k-link", "Dashboard 2")
		  .finish();
	});

	it("Should click on another Tab", function (done) {
		tdb = new TabbedDashboard();
		db1 = new Dashboard();
		db2 = new Dashboard();
		var chart1 = createChart(),
			chart2 = createChart();
		db1.setDashboardTitle('Dashboard 1');
		db2.setDashboardTitle('Dashboard 2');
		db1.addComponent(chart1);
		db2.addComponent(chart2);

		tdb.addDashboardTab(db1);
		tdb.addDashboardTab(db2);

		tdb.embedTo("dbTarget");


		var th = new TestHelper ();
		th.start(done)
		  .wait(chart_timeout)
		  .setContext(tdb.pro.$tabDiv)
		  .drillContext(".tabLinks")
		  .click("li:eq(1)")
		  .wait(chart_timeout)
		  .assertClass("li:eq(1)", "k-state-active")
		  .finish();
	});

	it("Second tab should be active", function (done) {
		tdb = new TabbedDashboard();
		db1 = new Dashboard();
		db2 = new Dashboard();
		var chart1 = createChart(),
			chart2 = createChart();
		db1.setDashboardTitle('Dashboard 1');
		db2.setDashboardTitle('Dashboard 2');
		db1.addComponent(chart1);
		db2.addComponent(chart2);

		tdb.addDashboardTab(db1);
		tdb.addDashboardTab(db2, {
			active : true
		});

		tdb.embedTo("dbTarget");


		var th = new TestHelper ();
		th.start(done)
		  .wait(chart_timeout)
		  .setContext(tdb.pro.$tabDiv)
		  .drillContext(".tabLinks")
		  .assertClass("li:eq(1)", "k-state-active")
		  .finish();
	});

	it("Second set customized tab title", function (done) {
		tdb = new TabbedDashboard();
		db1 = new Dashboard();
		db2 = new Dashboard();
		var chart1 = createChart(),
			chart2 = createChart();
		db1.setDashboardTitle('Dashboard 1');
		db2.setDashboardTitle('Dashboard 2');
		db1.addComponent(chart1);
		db2.addComponent(chart2);

		tdb.addDashboardTab(db1);
		tdb.addDashboardTab(db2, {
			title : "Customized Title"
		});

		tdb.embedTo("dbTarget");


		var th = new TestHelper ();
		th.start(done)
		  .wait(chart_timeout)
		  .setContext(tdb.pro.$tabDiv)
		  .drillContext(".tabLinks")
		  .assertText("li:eq(1) .k-link", "Customized Title")
		  .finish();
	});


});