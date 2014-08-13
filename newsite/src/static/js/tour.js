$(function () {

	if( $(".rfDesktopMenu").is(":visible") ) {
	 	$("#tourModal").modal("show");   
	}

	var template = "<div class='popover tour'> \
					  <div class='arrow'></div> \
					  <i class='rf-icon rf_cross pull-right' data-role='end'></i> \
					  <p class='popover-title'></p> \
					  <p class='popover-content'></p> \
					  <div class='popover-navigation'> \
					    <span class='prev' data-role='prev'><i class='rf-icon rf_arrow_left'></i> previous</span> \
					    <button class='btn btn-primary pull-right next' data-role='next'>next</button> \
					  </div> \
					</div>";

	var templateWithDownload = "<div class='popover tour'> \
					  <div class='arrow'></div> \
					  <i class='rf-icon rf_cross pull-right' data-role='end'></i> \
					  <p class='popover-title'></p> \
					  <p class='popover-content'></p> \
					  <div class='popover-navigation'> \
					    <span class='prev' data-role='prev'><i class='rf-icon rf_arrow_left'></i> previous</span> \
					    <a href='/download' class='btn btn-primary pull-right next download'>Download</a> \
					  </div> \
					</div>";


	var templateWithoutPrev = "<div class='popover tour'> \
					  <div class='arrow'></div> \
					  <i class='rf-icon rf_cross pull-right' data-role='end'></i> \
					  <p class='popover-title'></p> \
					  <p class='popover-content'></p> \
					  <div class='popover-navigation'> \
					    <button class='btn btn-primary pull-right next' data-role='next'>next</button> \
					  </div> \
					</div>";

	var templateWithoutNext = "<div class='popover tour'> \
					  <div class='arrow'></div> \
					  <i class='rf-icon rf_cross pull-right' data-role='end'></i> \
					  <p class='popover-title'></p> \
					  <p class='popover-content'></p> \
					  <div class='popover-navigation'> \
					    <span class='prev' data-role='prev'><i class='rf-icon rf_arrow_left'></i> previous</span> \
					  </div> \
					</div>";

	 var tour = new Tour({
	  steps: [
	  {
	  	element: ".rfDashboardCore:first-child",
	    title: " Welcome to the RazorFlow Tour",
	    content: "This entire section is a dashboard built using the RazorFlow Dashboard Framework in under 90 minutes.",
	    placement: 'top',
	    template: templateWithoutPrev
	  },
	  {
	  	element: ".rfComponentContainer:nth-child(4)",
	    title: "This is a component",
	    content: "Components are building blocks of RazorFlow Dashboards. This is a chart component.",
	    placement: "top",
	    template: template
	  },
	  {
	  	element: ".rfComponentContainer:first",
	    title: "Drill-downs",
	    content: "This chart has drill-downs. Click on one of the items to explore deeper.",
	    template: template
	  },
	  {
	  	element: ".rfComponentContainer:nth-child(2)",
	    title: "Pie chart",
	    content: "This is a pie chart, one of many different types of charts available with RazorFlow.",
	    placement: "left",
	    template: template
	  },
	  {
	  	element: "ul.tabLinks > li:last",
	    title: "Tabbed Dashboards",
	    content: "The content of your dashboard can be split into multiple tabs. Click on the “Stock Dashboard” tab to continue.",
	    reflex: true,
	    placement: "bottom",
	    template: templateWithoutNext
	  },
	  {
	    title: "Tabbed Dashboard",
	    content: "This is another dashboard as a tab",
	    orphan: true,
	    template: templateWithoutPrev
	  },
	  {
	  	element: "#rfTabCore-2 .rfComponentContainer:first",
	    title: "KPI Component",
	    content: "The KPI or Key Performance Indicator can be used to communicate important business metrics and summarized information",
	    placement: "top",
	    template: template
	  },
	  {
	  	element: "#rfTabCore-2 .rfComponentContainer:nth-child(2)",
	    title: "Table Component",
	    content: "The Table component can be used to display large quantites of information.",
	    template: template
	  },
	  {
	  	element: "#rfTabCore-2 .rfComponentContainer:nth-child(3), #rfTabCore-2 > .rfComponentContainer:nth-child(3)",
	    title: "Forms and Filtering",
	    content: "The Form component can be used to take user input and filter other components accordingly.",
	    reflex: true,
	    placement: "top",
	    template: template
	  },
	  {
	    title: "Thank you",
	    content: "Thank you for viewing the RazorFlow tour. Now build your own dashboard using our free developer version.",
	    orphan: true,
	    template: templateWithDownload
	  }
	],
	  storage: false,
	  backdrop: true
	});

	$("#startTour").bind("click", function () {
		$("#tourModal").modal("hide");
		tour.start();
	});
});
