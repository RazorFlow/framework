describe ("Bread Crumb Tests", function () {
	var db;
	var _ = rf._;
	beforeEach(function () {
		$("#dbTarget").empty().removeClass("");
		$("#dbTarget").css({
			width: 1000
		});
		var data = [];
	    var startDate = new Date('1 Jan 2011');

	    while(startDate.getTime() !== (new Date('1 Jan 2014')).getTime()) {
	        var obj = {};
	        obj['id'] = 'iphone';
	        obj['name'] = 'iPhone';
	        obj['sales'] = Math.floor(Math.random() * 100);
	        obj['date'] = new Date(startDate.getTime());
	        data.push(obj);
	        startDate.setDate(startDate.getDate() + 1);
	    }
	    startDate = new Date('1 Jan 2011');
	    while(startDate.getTime() !== (new Date('1 Jan 2014')).getTime()) {
	        var obj = {};
	        obj['id'] = 'ipad';
	        obj['name'] = 'iPad';
	        obj['sales'] = Math.floor(Math.random() * 100);
	        obj['date'] = new Date(startDate.getTime());
	        data.push(obj);
	        startDate.setDate(startDate.getDate() + 1);
	    }

	    var labels = ['2011', '2012', '2013'];
	    var iphone = _.filter(data, function(item) {
	        return item.id === 'iphone';
	    });
	    var ipad = _.filter(data, function(item) {
	        return item.id === 'ipad';
	    });
	    iphoneYearly = [aggregateYearlyData(iphone, 2011), aggregateYearlyData(iphone, 2012), aggregateYearlyData(iphone, 2013)];
    	ipadYearly = [aggregateYearlyData(ipad, 2011), aggregateYearlyData(ipad, 2012), aggregateYearlyData(ipad, 2013)];
	});

	var chart_timeout = 400;

    var aggregateYearlyData = function(rows, year) {
        var yearData = _.filter(rows, function(item) {
            return item.date.getFullYear() === year;
        });

        var yearSales = _.pluck(yearData, 'sales');

        return _.reduce(yearSales, function(mem, item) {
            return mem + item;
        }, 0);
    };

    var aggregateMonthlyData = function(rows, year, month) {
        var monthData = _.filter(rows, function(item) {
            return  item.date.getFullYear() === year && item.date.getMonth() === month;
        });

        var monthSales = _.pluck(monthData, 'sales');

        return _.reduce(monthSales, function(mem, item) {
            return mem + item;
        }, 0);
    };

	afterEach(function() {
		db.pro.dispose();
		$(".rfTooltip").remove();
	});

	var createChart = function () {
		var data = [];
	    var startDate = new Date('1 Jan 2011');

	    while(startDate.getTime() !== (new Date('1 Jan 2014')).getTime()) {
	        var obj = {};
	        obj['id'] = 'iphone';
	        obj['name'] = 'iPhone';
	        obj['sales'] = Math.floor(Math.random() * 100);
	        obj['date'] = new Date(startDate.getTime());
	        data.push(obj);
	        startDate.setDate(startDate.getDate() + 1);
	    }
	    startDate = new Date('1 Jan 2011');
	    while(startDate.getTime() !== (new Date('1 Jan 2014')).getTime()) {
	        var obj = {};
	        obj['id'] = 'ipad';
	        obj['name'] = 'iPad';
	        obj['sales'] = Math.floor(Math.random() * 100);
	        obj['date'] = new Date(startDate.getTime());
	        data.push(obj);
	        startDate.setDate(startDate.getDate() + 1);
	    }

	    var labels = ['2011', '2012', '2013'];
	    var iphone = _.filter(data, function(item) {
	        return item.id === 'iphone';
	    });
	    var ipad = _.filter(data, function(item) {
	        return item.id === 'ipad';
	    });

		var chart = new ChartComponent('someid');
	    chart.setDimensions (4, 4);
	    chart.setCaption("Sales Trends");  
	    chart.setLabels (labels)
	    chart.addSeries("iphone", "iPhone", iphoneYearly);
	    chart.addSeries("ipad", "iPad", ipadYearly); 

	    var drillYear = null,
	        drillMonth = null,
	        monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	    chart.addDrillStep(function(done, params, updatedComponent) {
	        var year = +params.label;
	        var iphoneData = [];
	        var ipadData = [];

	        for(var i=-1; ++i<12;) {
	            iphoneData.push(aggregateMonthlyData(iphone, year, i));
	            ipadData.push(aggregateMonthlyData(ipad, year, i));
	        }
	        updatedComponent.setLabels(monthLabels);
	        updatedComponent.addSeries('iphone', 'iPhone', iphoneData);
	        updatedComponent.addSeries('ipad', 'iPad', ipadData);
	        drillYear = year;
	        done();
	    });

	    chart.addDrillStep(function(done, params, updatedComponent) {
	        var month = monthLabels.indexOf(params.label),
	            year = drillYear;

	        var iphoneData = _.pluck(_.filter(iphone, function(item) {
	            return  item.date.getFullYear() === year && item.date.getMonth() === month;
	        }), 'sales');
	        var ipadData = _.pluck(_.filter(ipad, function(item) {
	            return  item.date.getFullYear() === year && item.date.getMonth() === month;
	        }), 'sales');

	        var newLabels = [];

	        for(var i=-1; ++i<iphoneData.length;) {
	            newLabels.push('' + (i+1));
	        }
	        updatedComponent.setLabels(newLabels);
	        updatedComponent.addSeries('iphone', 'iPhone', iphoneData);
	        updatedComponent.addSeries('ipad', 'iPad', ipadData);
	        drillMonth = month;
	        done();
	    });
		return chart;
	}

	it("Should display Drill Down Chart", function (done) {
		db = new Dashboard();
		var chart = createChart();

	    db.addComponent(chart);
		db.embedTo("dbTarget");

		var th = new TestHelper ();
		th.start(done)
		  .wait(chart_timeout)
		  .setContext(chart.pro.renderer.$core.parent())
		  .drillContext(".rfHeader")
		  .assertClass("div:eq(0)", "rfBreadCrumb")
		  .finish();
	});

	it("Should drill into second level", function (done) {
		db = new Dashboard();
		var chart = createChart();

	    db.addComponent(chart);
		db.embedTo("dbTarget");

		var th = new TestHelper ();
		th.start(done)
		  .wait(chart_timeout)
		  .setContext(chart.pro.renderer.$core.parent())
		  .drillContext(".rc-series-1")
	      .svgTriggerEvent("rect:eq(0)", "click")
	      .wait(chart_timeout)
	      .setContext('.rfHeader')
		  .drillContext(".rfBreadCrumb ul li:eq(1)")
		  .assertText("a", "2011")
		  .assertClass("span", "rfBCRight")
		  .assertClass("span", "rfIcon")
		  .finish();
	});

	it("Should drill back into first level", function (done) {
		db = new Dashboard();
		var chart = createChart();

	    db.addComponent(chart);
		db.embedTo("dbTarget");

		var th = new TestHelper ();
		th.start(done)
		  .wait(chart_timeout)
		  .setContext(chart.pro.renderer.$core.parent())
		  .drillContext(".rc-series-1")
	      .svgTriggerEvent("rect:eq(0)", "click")
	      .wait(chart_timeout)
	      .setContext('.rfHeader')
		  .drillContext(".rfBreadCrumb ul li:eq(1)")
		  .assertText("a", "2011")
		  .assertClass("span", "rfBCRight")
		  .assertClass("span", "rfIcon")
		  .wait(chart_timeout)
		  .setContext('.rfHeader')
		  .drillContext(".rfBreadCrumb ul")
		  .click("li:eq(0)")
		  .finish();
	});
});