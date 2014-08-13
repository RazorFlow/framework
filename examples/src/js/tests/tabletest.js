describe ("Table Tests", function () {
	var db;
	beforeEach(function () {
		$("#dbTarget").empty().removeClass();
		$("#dbTarget").css({
			width: 800
		});
	});

	afterEach(function() {
		db.pro.dispose();
	});

	var createTable = function (col1Obj, col2Obj) {
		var table1 = new TableComponent ();
		table1.setCaption ("Table Component");
		table1.setDimensions (6, 6);
		table1.addColumn("foo", "Foo", col1Obj);
		table1.addColumn("bar", "Bar", col2Obj);
		table1.addColumn("str", "Stringlike");

		for(var i = 0; i < 20; i++) {
			table1.addRow ({foo: i * 2, bar: i * 2 + 1, str: "Item # " + i});
		}

		return table1;
	}

	it("Should render a basic Table", function (done) {
		db = new Dashboard ();
		var table = createTable({}, {});
		db.addComponent(table);
		db.embedTo ("dbTarget");

		// setTimeout(function () {
		// 	var core = table.pro.renderer.$core;
		// 	expect($($(core.find("tr")[3]).find("td > p")[0]).text()).toBe("4");
		// 	done();
		// }, 200);

		var th = new TestHelper ();
		th.start(done)
		  .wait(200)
		  .setContext(table.pro.renderer.$core)
		  .assertText(function (context) {
		  	return context.find("tr:eq(3)").find("td > p:eq(0)");
		  }, "4")
		  .finish();
	});	

	it("Should format values", function (done) {
		db = new Dashboard ();
		var table = createTable({dataType: "number", numberPrefix:"$"}, {});
		db.addComponent(table);
		db.embedTo ("dbTarget");

		// setTimeout(function () {
		// 	var core = table.pro.renderer.$core;
		// 	expect($($(core.find("tr")[3]).find("td > p")[0]).text()).toBe("$4");
		// 	done();
		// }, 200);

		var th = new TestHelper ();
		th.start(done)
		  .wait(200)
		  .setContext(table.pro.renderer.$core)
		  .assertText(function (context) {
		  	return context.find("tr:eq(3)").find("td > p:eq(0)");
		  }, "$4")
		  .finish();
	});

	it("Should paginate", function (done) {
		db = new Dashboard ();
		var table = createTable({dataType: "number", numberPrefix:"$"}, {});
		db.addComponent(table);
		db.embedTo ("dbTarget");

		// setTimeout(function () {
		// 	var core = table.pro.renderer.$core;
		// 	core.find(".rfNextButton").click ();
		// 	setTimeout(function () {
		// 		expect($($(core.find("tr")[3]).find("td > p")[0]).text()).toBe("$24");
		// 		done();
		// 	}, 200);
		// }, 200);
		var th = new TestHelper ();
		th.start(done)
		  .wait(200)
		  .setContext(table.pro.renderer.$core)
		  .click(".rfNextButton")
		  .wait(200)
		  .assertText(function (context) {
		  	return context.find("tr:eq(3)").find("td > p:eq(0)");
		  }, "$24")
		  .finish();
	});

	it("Should apply columnWidth", function (done) {
		db = new Dashboard ();
		var table = createTable({columnWidth: 150, numberPrefix:"$"}, {});
		db.addComponent(table);
		db.embedTo ("dbTarget");

		// setTimeout(function () {
		// 	var core = table.pro.renderer.$core;
		// 	core.find(".rfNextButton").click ();
		// 	setTimeout(function () {
		// 		expect($($(core.find("tr")[3]).find("td > p")[0]).text()).toBe("$24");
		// 		done();
		// 	}, 200);
		// }, 200);
		var th = new TestHelper ();
		th.start(done)
		  .wait(200)
		  .setContext(table.pro.renderer.$core)
		  .assertCSS(function (context) {
		  	var x = context.find("tr:eq(3)").find("td > p:eq(0)");
		  	return x;
		  }, "width", function (val) {return 147 < parseInt(val) < 153; })
		  .finish();
	});
});