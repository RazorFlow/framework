// Welcome to the RazorFlow Dashbord Quickstart. Simply copy this "dashboard_quickstart"
// to somewhere in your computer/web-server to have a dashboard ready to use.
// This is a great way to get started with RazorFlow with minimal time in setup.
// However, once you're ready to go into deployment consult our documentation on tips for how to 
// maintain the most stable and secure 

StandaloneDashboard(function(db){
	db.setDashboardTitle ("My Dashboard");

	var chart = new ChartComponent();
	chart.setCaption("Sales");
	chart.setDimensions (6, 6);	
	chart.setLabels (["2013", "2014", "2015"]);
	chart.addSeries ([3151, 1121, 4982], {
		numberPrefix: "$",
		seriesDisplayType: "line"
	});
	db.addComponent (chart);
});