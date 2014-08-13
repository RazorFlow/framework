describe ("Component KPI Tests - Desktop", function () {
	var db;
	beforeEach(function () {
		$("#dbTarget").empty().removeClass("");
		$("#dbTarget").css({
			width: 1000
		});
	});

	afterEach(function() {
		db.pro.dispose();
	});

	var createTable = function (width, height) {
		var table1 = new TableComponent ();
		table1.setCaption ("Table Component");
		table1.setDimensions (width, height);
		table1.addColumn("foo", "Foo", {});
		table1.addColumn("bar", "Bar", {});
		table1.addColumn("str", "Stringlike");

		for(var i = 0; i < 20; i++) {
			table1.addRow ({foo: i * 2, bar: i * 2 + 1, str: "Item # " + i});
		}

		return table1;
	}

	it("Assert Basic value and caption text", function (done) {
		db = new Dashboard ();
		var table = createTable(6, 6);
		table.addComponentKPI("foo", {
			caption: "Hello",
			value: 42
		});
		table.addComponentKPI("bar", {
			caption: "World",
			value: 45000
		});

		db.addComponent(table);
		db.embedTo("dbTarget");

		var th = new TestHelper ();
		th.start(done)
		  .wait(200)
		  .setContext(table.pro.renderer.$core.parent())
		  .setContext(".rfKPIGroupContainer", false) // Set the context to the kpi group container. without resetting context
		  .assertText(".rfMiniKPIContainer:eq(0) .rfKPICaption", "Hello", {trim: true}) // Trim the text
		  .assertText(".rfMiniKPIContainer:eq(1) .rfKPIValue", "45,000", {trim:true})
		  .finish();
	});

	it("Should format the numbers of component kpi", function (done) {
		db = new Dashboard ();
		var table = createTable(6, 6);
		table.addComponentKPI("foo", {
			caption: "Hello",
			value: 42,
			numberPrefix: "$"
		});
		table.addComponentKPI("bar", {
			caption: "World",
			value: 45000,
			numberHumanize: true
		});

		db.addComponent(table);
		db.embedTo("dbTarget");

		var th = new TestHelper ();
		th.start(done)
		  .wait(200)
		  .setContext(table.pro.renderer.$core.parent())
		  .setContext(".rfKPIGroupContainer", false) // Set the context to the kpi group container. without resetting context
		  .assertText(".rfMiniKPIContainer:eq(0) .rfKPICaption", "Hello", {trim: true}) // Trim the text
		  .assertText(".rfMiniKPIContainer:eq(0) .rfKPIValue", "$42", {trim: true})
		  .assertText(".rfMiniKPIContainer:eq(1) .rfKPIValue", "45K", {trim:true})
		  .finish();
	});

	it("should update the component kpi", function (done) {
		db = new Dashboard ();
		var table = createTable(8, 8);
		table.addComponentKPI("foo", {
			caption: "Hello",
			value: 42,
			numberPrefix: "$"
		});

		db.addComponent(table);
		db.embedTo("dbTarget");

		table.updateComponentKPI("foo", {
	      value: "10"
	    });
		var th = new TestHelper ();
		th.start(done)
		  .wait(1000)
		  .setContext(table.pro.renderer.$core.parent())
		  .setContext(".rfKPIGroupContainer", false) // Set the context to the kpi group container. without resetting context
		  .assertText(".rfMiniKPIContainer:eq(0) .rfKPICaption", "Hello", {trim: true}) // Trim the text
		  .assertText(".rfMiniKPIContainer:eq(0) .rfKPIValue", "$10", {trim: true})
		  .finish();
	});
});