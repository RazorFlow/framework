describe ("KPI Tests", function () {
	var db;
	beforeEach(function () {
		$("#dbTarget").empty();
		$("#dbTarget").css({
			width: 800
		});
	});

	afterEach(function() {
		db.pro.dispose();
	});

	it("Should render a basic KPI", function (done) {
		db = new Dashboard ();

		var kpi1 = new KPIComponent('c1');
		kpi1.setCaption ("Foo");
		kpi1.setValue (42);
		kpi1.setDimensions (4,4);
		db.addComponent (kpi1);

		db.embedTo("dbTarget");

		// // Give 1000 ms for dashboard to execute
		// setTimeout (function () {
		// 	expect($(".rfKPIValue").text()).toEqual("42");
		// 	done();
		// }, 1000);

		var th = new TestHelper ();
		th.start(done)
		  .wait(400)
		  .assertText(".rfKPIValue", "42")
		  .finish();
	});
});