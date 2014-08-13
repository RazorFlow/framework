$(document).ready(function () {
	var tempwithoutNext = "<div class='popover tour'> \
					  <div class='arrow'></div> \
					  <h3 class='popover-title'></h3> \
					  <div class='popover-content'></div> \
					  <div class='popover-navigation'> \
					    <button class='btn btn-default' data-role='prev'>« Prev</button> \
					    <button class='btn btn-default' data-role='end'>End tour</button> \
					  </div> \
					</div>";

	 var tour = new Tour({
	  steps: [
	  {
	    title: "Welcome! This is RazorFlow Dashboard",
	    content: "",
	    orphan: true
	  },
	  {
	  	element: ".rfComponentContainer:first",
	    title: "This is a component. Click on one of the items.",
	    content: "",
	    reflex: true,
	    template: tempwithoutNext
	  },
	  {
	  	element: ".rfComponentContainer:first",
	    title: "This is a Drill Down Chart component",
	    content: "",
	  },
	  {
	  	element: ".rfComponentContainer:nth-child(2)",
	    title: "This is one of many chart types",
	    content: "",
	    placement: "left"
	  },
	  {
	  	element: ".tabLinks > li:last",
	    title: "Click the 'second tab' to continue",
	    content: "",
	    reflex: true,
	    template: tempwithoutNext
	  },
	  {
	    title: "This is another dashboard as a tab",
	    content: "",
	    orphan: true
	  },
	  {
	  	element: "#rfTabCore-2 .rfComponentContainer:first",
	    title: "This is a KPI group component",
	    content: "",
	    placement: "bottom"
	  },
	  {
	  	element: "#rfTabCore-2 .rfComponentContainer:nth-child(3)",
	    title: "This is a Table Component",
	    content: "",
	    placement: "right"
	  },
	  {
	  	element: "#rfTabCore-2 .rfComponentContainer:nth-child(4)",
	    title: "This is a Filter Component, modify it",
	    content: "",
	    placement: "left"
	  },
	  {
	  	element: "#rfTabCore-2 .rfComponentContainer:nth-child(3)",
	    title: "Changes done on filter is reflected",
	    content: "",
	    placement: "right"
	  },
	  {
	    title: "Now click here to get started",
	    content: "",
	    orphan: true
	  }
	],
	  storage: false,
	  backdrop: true
	});

	 $('body').prepend("<input type='button' value='Start Tour' id='StartTour'>");

	 $("#StartTour").click(function () {
	 	tour.start();
	 	tour.restart();
	 });
});