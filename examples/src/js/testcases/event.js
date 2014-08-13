rf.StandaloneDashboard(function(db){
	var chart = new ChartComponent('someid');
	chart.setDimensions (4, 4);
	chart.setCaption("Expenses incurred on Food Consumption by Year");
	chart.setLabels (["2009", "2010", "2011"]);
	chart.addSeries ("beverages", "Beverages", [1355, 1916, 1150]);
	chart.addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321]);
	chart.bind("beforeRender", function () {
		console.log("`before render` event triggered");
	});
	chart.bind("render", function () {
		console.log("`render` event triggered");
	});
	chart.bind("firstRender", function () {
		console.log("`first render` event triggered");
	});
	chart.bind("beforeFirstRender", function () {
		console.log("`before first render` event triggered");
	});
	chart.bind("beforeResize", function () {
		console.log("`before resize` event triggered");
	});
	chart.bind("resize", function () {
		console.log("`resize` event triggered");
	});
	chart.bind("beforeRedraw", function () {
		console.log("`beforeRedraw` event triggered");
	});
	chart.bind("redraw", function () {
		console.log("`redraw` event triggered");
	});
	chart.bind("beforeMaximize", function () {
		console.log("`beforeMaximize` event triggered");
	});
	chart.bind("maximize", function () {
		console.log("`maximize` event triggered");
	});
	chart.bind("componentMaximize", function () {
		console.log("`componentMaximize` event triggered");
	});
	chart.bind("labelActivate", function (e) {
		console.log("`labelActivate` event triggered");
	});
	chart.bind("plotItemMouseOver", function (e) {
		console.log("`plotItemMouseOver` event triggered");
	});
	chart.bind("plotItemMouseOut", function (e) {
		console.log("`plotItemMouseOut` event triggered");
	});

	db.bind("componentAdd", function () {
		console.log("`componentAdd` event triggered");
	});
	db.bind("componentRemove", function () {
		console.log("`componentAdd` event triggered");
	});
	db.addComponent (chart);
});
