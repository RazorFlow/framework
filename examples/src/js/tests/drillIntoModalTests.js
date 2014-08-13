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
		db.pro.dispose();
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

	it("Should drill into modal", function (done) {
		db = new Dashboard ();
		var chart = createChart(),
			chart1 = createChart();

		chart1.hideComponent();
		db.addComponent(chart);
		db.addComponent(chart1);
		db.embedTo("dbTarget");
		chart.onItemClick(function() {
	        chart1.showAsModal();
	    });

	    t3.start(done)
	      .wait(chart_timeout)
	      .setContext(chart.pro.renderer.$core)
	      .drillContext(".rc-axis:eq(0)")
	      .assertText("text:eq(0)", "Beverages")
	      .assertText("text:eq(1)", "Vegetables")
	      .setContext(chart.pro.renderer.$core)
	      .drillContext(".rc-series-1")
	      .svgTriggerEvent("rect", "click")
	      .wait(chart_timeout)
	      .setContext(".k-window")
	      .drillContext(".rc-axis:eq(0)")
	      .assertText("text:eq(0)", "Beverages")
	      .assertText("text:eq(1)", "Vegetables")
	      .setContext(".k-window")
	      .click(".k-i-close")
	      .finish();
	});

	


});