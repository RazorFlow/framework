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

	var createTable = function () {
		var table1 = new TableComponent ();
		table1.setCaption ("Table Component");
		table1.setDimensions (12, 8);
		table1.addColumn("foo", "Foo", {});
		table1.addColumn("bar", "Bar", {});
		table1.addColumn("bit", "Bit", {});
		table1.addColumn("hello", "Hello", {});
		table1.addColumn("world", "World", {});
		table1.addColumn("str", "Stringlike");

		for(var i = 0; i < 20; i++) {
			table1.addRow ({foo: i, bar: i * 2, bit: i * 2 + 1, hello: i * 2 + 2, world: i * 2 + 3, str: "Item # " + i});
		}

		return table1;
	}

	it("Greater than Conditional Format", function (done) {
		db = new Dashboard ();
		var table = createTable();
		table.cellConditionalFormat("foo", "value > 5", {"cellBackgroundColor":"#000", "cellTextColor": "#fff"});
		db.addComponent(table);
		db.embedTo ("dbTarget");
		var th = new TestHelper ();
		th.start(done)
		  .wait(200)
		  .setContext(table.pro.renderer.$core)
		  .drillContext("tbody")
		  .assertText ("tr:eq(6) > td > p:eq(0)", "6")
		  .assertCSS ("tr:eq(7) > td:eq(0)", "background-color", "rgb(0, 0, 0)")
		  .assertCSS ("tr:eq(7) > td:eq(0)", "color", "rgb(255, 255, 255)")
		  .finish();
	});

	it("Lesser than Conditional Format", function (done) {
		db = new Dashboard ();
		var table = createTable();
		table.cellConditionalFormat("bar", "value < 5", {"cellBackgroundColor":"#000", "cellTextColor": "#fff"});
		db.addComponent(table);
		db.embedTo ("dbTarget");
		var th = new TestHelper ();
		th.start(done)
		  .wait(200)
		  .setContext(table.pro.renderer.$core)
		  .drillContext("tbody")
		  .assertText ("tr:eq(2) > td > p:eq(1)", "4")
		  .assertCSS ("tr:eq(2) > td:eq(1)", "background-color", "rgb(0, 0, 0)")
		  .assertCSS ("tr:eq(2) > td:eq(1)", "color", "rgb(255, 255, 255)")

		  .finish();
	});

	it("Equal to Conditional Format", function (done) {
		db = new Dashboard ();
		var table = createTable();
		table.cellConditionalFormat("bit", "value == 5", {"cellBackgroundColor":"#000", "cellTextColor": "#fff"});
		db.addComponent(table);
		db.embedTo ("dbTarget");
		var th = new TestHelper ();
		th.start(done)
		  .wait(200)
		  .setContext(table.pro.renderer.$core)
		  .drillContext("tbody")

		  .assertText ("tr:eq(2) > td > p:eq(2)", "5")
		  .assertCSS ("tr:eq(2) > td:eq(2)", "background-color", "rgb(0, 0, 0)")
		  .assertCSS ("tr:eq(2) > td:eq(2)", "color", "rgb(255, 255, 255)")
		  .finish();
	});

	it("greater than or equal with addition Conditional Format", function (done) {
		db = new Dashboard ();
		var table = createTable();
		table.cellConditionalFormat("hello", "value+5 >= 10", {"cellBackgroundColor":"#000", "cellTextColor": "#fff"});
		db.addComponent(table);
		db.embedTo ("dbTarget");
		var th = new TestHelper ();
		th.start(done)
		  .wait(200)
		  .setContext(table.pro.renderer.$core)
		  .drillContext("tbody")

		  .assertText ("tr:eq(2) > td > p:eq(3)", "6")
		  .assertCSS ("tr:eq(2) > td:eq(3)", "background-color", "rgb(0, 0, 0)")
		  .assertCSS ("tr:eq(2) > td:eq(3)", "color", "rgb(255, 255, 255)")

		  .finish();
	});

	it("Equal to with modulas Conditional Format", function (done) {
		db = new Dashboard ();
		var table = createTable();
		table.cellConditionalFormat("world", "value%3 == 0", {"cellBackgroundColor":"#000", "cellTextColor": "#fff"});
		db.addComponent(table);
		db.embedTo ("dbTarget");
		var th = new TestHelper ();
		th.start(done)
		  .wait(200)
		  .setContext(table.pro.renderer.$core)
		  .drillContext("tbody")

		  .assertText ("tr:eq(3) > td > p:eq(4)", "9")
		  .assertCSS ("tr:eq(3) > td:eq(4)", "background-color", "rgb(0, 0, 0)")
		  .assertCSS ("tr:eq(3) > td:eq(4)", "color", "rgb(255, 255, 255)")
		  .finish();
	});

	it("Logical AND Conditional Format", function (done) {
		db = new Dashboard ();
		var table = createTable();
		table.cellConditionalFormat("foo", "value > 2 && value <= 8 ", {"cellBackgroundColor":"#000", "cellTextColor": "#fff"});
		db.addComponent(table);
		db.embedTo ("dbTarget");
		var th = new TestHelper ();
		th.start(done)
		  .wait(200)
		  .setContext(table.pro.renderer.$core)
		  .drillContext("tbody")

		  .assertText ("tr:eq(3) > td > p:eq(0)", "3")
		  .assertCSS ("tr:eq(3) > td:eq(0)", "background-color", "rgb(0, 0, 0)")
		  .assertCSS ("tr:eq(3) > td:eq(0)", "color", "rgb(255, 255, 255)")

		  .assertText ("tr:eq(8) > td > p:eq(0)", "8")
		  .assertCSS ("tr:eq(8) > td:eq(0)", "background-color", "rgb(0, 0, 0)")
		  .assertCSS ("tr:eq(8) > td:eq(0)", "color", "rgb(255, 255, 255)")
		  .finish();
	});

	it("Logical OR Conditional Format", function (done) {
		db = new Dashboard ();
		var table = createTable();
		table.cellConditionalFormat("bar", "value%3 == 0 || value%5 == 0", {"cellBackgroundColor":"#000", "cellTextColor": "#fff"});
		db.addComponent(table);
		db.embedTo ("dbTarget");
		var th = new TestHelper ();
		th.start(done)
		  .wait(200)
		  .setContext(table.pro.renderer.$core)
		  .drillContext("tbody")

		  .assertText ("tr:eq(3) > td > p:eq(1)", "6")
		  .assertCSS ("tr:eq(3) > td:eq(1)", "background-color", "rgb(0, 0, 0)")
		  .assertCSS ("tr:eq(3) > td:eq(1)", "color", "rgb(255, 255, 255)")

		  .assertText ("tr:eq(5) > td > p:eq(1)", "10")
		  .assertCSS ("tr:eq(5) > td:eq(1)", "background-color", "rgb(0, 0, 0)")
		  .assertCSS ("tr:eq(5) > td:eq(1)", "color", "rgb(255, 255, 255)")
		  .finish();
	});

	it("Multiple Conditional Format", function (done) {
		db = new Dashboard ();
		var table = createTable();
		table.cellConditionalFormat("foo", "value > 2 && value <= 8 ", {"cellBackgroundColor":"#000", "cellTextColor": "#fff"});
		table.cellConditionalFormat("bar", "value%3 == 0 || value%5 == 0", {"cellBackgroundColor":"#000", "cellTextColor": "#fff"});
		table.cellConditionalFormat("world", "value%3 == 0", {"cellBackgroundColor":"#000", "cellTextColor": "#fff"});
		table.cellConditionalFormat("hello", "value+5 >= 10", {"cellBackgroundColor":"#000", "cellTextColor": "#fff"});
		table.cellConditionalFormat("bit", "value == 5", {"cellBackgroundColor":"#000", "cellTextColor": "#fff"});
		db.addComponent(table);
		db.embedTo ("dbTarget");
		var th = new TestHelper ();
		th.start(done)
		  .wait(200)
		  .setContext(table.pro.renderer.$core)
		  .drillContext("tbody")

		  .assertText ("tr:eq(3) > td > p:eq(1)", "6")
		  .assertCSS ("tr:eq(3) > td:eq(1)", "background-color", "rgb(0, 0, 0)")
		  .assertCSS ("tr:eq(3) > td:eq(1)", "color", "rgb(255, 255, 255)")

		  .assertText ("tr:eq(5) > td > p:eq(1)", "10")
		  .assertCSS ("tr:eq(5) > td:eq(1)", "background-color", "rgb(0, 0, 0)")
		  .assertCSS ("tr:eq(5) > td:eq(1)", "color", "rgb(255, 255, 255)")

		  .assertText ("tr:eq(3) > td > p:eq(0)", "3")
		  .assertCSS ("tr:eq(3) > td:eq(0)", "background-color", "rgb(0, 0, 0)")
		  .assertCSS ("tr:eq(3) > td:eq(0)", "color", "rgb(255, 255, 255)")

		  .assertText ("tr:eq(8) > td > p:eq(0)", "8")
		  .assertCSS ("tr:eq(8) > td:eq(0)", "background-color", "rgb(0, 0, 0)")
		  .assertCSS ("tr:eq(8) > td:eq(0)", "color", "rgb(255, 255, 255)")

		  .assertText ("tr:eq(3) > td > p:eq(4)", "9")
		  .assertCSS ("tr:eq(3) > td:eq(4)", "background-color", "rgb(0, 0, 0)")
		  .assertCSS ("tr:eq(3) > td:eq(4)", "color", "rgb(255, 255, 255)")

		  .assertText ("tr:eq(2) > td > p:eq(3)", "6")
		  .assertCSS ("tr:eq(2) > td:eq(3)", "background-color", "rgb(0, 0, 0)")
		  .assertCSS ("tr:eq(2) > td:eq(3)", "color", "rgb(255, 255, 255)")
		  
		  .assertText ("tr:eq(2) > td > p:eq(2)", "5")
		  .assertCSS ("tr:eq(2) > td:eq(2)", "background-color", "rgb(0, 0, 0)")
		  .assertCSS ("tr:eq(2) > td:eq(2)", "color", "rgb(255, 255, 255)")
		  .finish();
	});

	it("Multiple Conditional Format", function (done) {
		db = new Dashboard ();
		var table = createTable();
		table.cellConditionalFormat("foo", "value > 3", {"cellBackgroundColor":"#000", "cellTextColor": "#fff"});
		table.cellConditionalFormat("foo", "value == 2", {"cellBackgroundColor":"#000", "cellTextColor": "#fff"});
		db.addComponent(table);
		db.embedTo ("dbTarget");
		var th = new TestHelper ();
		th.start(done)
		  .wait(200)
		  .setContext(table.pro.renderer.$core)
		  .drillContext("tbody")
		  .finish();
	});



});