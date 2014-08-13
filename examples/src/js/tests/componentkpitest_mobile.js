describe ("Component KPI Mobile Tests", function () {
	var db;
	var _ = rf._;
	beforeEach(function () {
		$("#dbTarget").empty().removeClass("");
		$("#dbTarget").css({
			width: 320
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
		_.defer(function() {
			var th = new TestHelper ();
			th.start(done)
			  .wait(600)
			  .setContext(table.pro.renderer.$core.parent())
			  .setContext(".rfKPIGroupContainer", false) // Set the context to the kpi group container. without resetting context
			  .assertText(".rfMiniKPIContainer:eq(0) .rfKPICaption", "Hello", {trim: true}) // Trim the text
			  .assertText(".rfMiniKPIContainer:eq(1) .rfKPIValue", "45,000", {trim:true})
			  .finish();
		});
			
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

	it("Should update the value of kpi", function (done) {
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
		  .doSync(function () {
		  	table.updateComponentKPI("foo", {
		  		value: 45
		  	});
		  })
		  .setContext(function () {
		  	var x = table.pro.renderer.$core.parent().find(".rfKPIGroupContainer");
		  	return x;
		  }) // Reset the context
		  .assertText(".rfMiniKPIContainer:eq(0) .rfKPIValue", "$45", {trim: true})
		  .finish();
	});	


	it("Should support larger number of KPIs", function (done) {
		db = new Dashboard ();
		var table = createTable(12, 12);
		table.addComponentKPI("foo", {
			caption: "KPI 1",
			value: 1,
			numberPrefix: "$"
		});
		table.addComponentKPI("bar", {
			caption: "KPI 2",
			value: 2,
			numberHumanize: true
		});
		table.addComponentKPI("bar2", {
			caption: "KPI 3",
			value: 3,
			numberHumanize: true
		});
		table.addComponentKPI("bar45", {
			caption: "KPI 4",
			value: 4,
			numberHumanize: true
		});

		db.addComponent(table);
		db.embedTo("dbTarget");

		var th = new TestHelper ();
		th.start(done)
		  .wait(200)
		  .setContext(table.pro.renderer.$core.parent())
		  .setContext(".rfKPIGroupContainer", false) // Set the context to the kpi group container. without resetting context
		  .assertText(".rfMiniKPIContainer:eq(0) .rfKPICaption", "KPI 1", {trim: true}) // Trim the text
		  .assertText(".rfMiniKPIContainer:eq(0) .rfKPIValue", "$1", {trim: true})
		  .assertText(".rfMiniKPIContainer:eq(1) .rfKPICaption", "KPI 2", {trim: true}) // Trim the text
		  .assertText(".rfMiniKPIContainer:eq(1) .rfKPIValue", "2", {trim: true})
		  .assertText(".rfMiniKPIContainer:eq(2) .rfKPICaption", "KPI 3", {trim: true}) // Trim the text
		  .assertText(".rfMiniKPIContainer:eq(2) .rfKPIValue", "3", {trim: true})
		  .assertText(".rfMiniKPIContainer:eq(3) .rfKPICaption", "KPI 4", {trim: true}) // Trim the text
		  .assertText(".rfMiniKPIContainer:eq(3) .rfKPIValue", "4", {trim: true})
		  .assertText(".rfMiniKPIContainer:eq(3) .rfKPIValue", "4", {trim: true})
		  .finish();
	});	
	it("Should automatically grow in height with more kpis", function (done) {
		db = new Dashboard ();
		var table = createTable(12, 12);
		table.addComponentKPI("foo", {
			caption: "KPI 1",
			value: 1,
			numberPrefix: "$"
		});
		table.addComponentKPI("bar", {
			caption: "KPI 2",
			value: 2,
			numberHumanize: true
		});
		table.addComponentKPI("bar2", {
			caption: "KPI 3",
			value: 3,
			numberHumanize: true
		});
		table.addComponentKPI("bar45", {
			caption: "KPI 4",
			value: 4,
			numberHumanize: true
		});

		db.addComponent(table);
		db.embedTo("dbTarget");

		var th = new TestHelper ();
		th.start(done)
		  .wait(200)
		  .setContext(table.pro.renderer.$core.parent())
		  .setContext(".rfKPIGroupContainer", false) // Set the context to the kpi group container. without resetting context
		  .assertCSS(".", "height", function (val) { return 160 < parseInt(val) < 170})
		  .finish();
	});	
});