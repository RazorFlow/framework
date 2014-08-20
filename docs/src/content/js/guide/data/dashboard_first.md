--
title: "Configure dashboard first and fetch data next"
subtitle: ""
index: 2
id: "dashboard_first"
--


To display data in a dashboard you must first fetch it from a web server by using a HTTP AJAX request. Once the data has been fetched, you can use the RazorFlow Dashboard Framework API to define and build the dashboard. The summarized steps for this are:

1. Create an empty dashboard.
2. Add the components to display on the dashboard. If the data for the components are not yet available, use the {{ linkApi ('js', 'Component', 'lock') }} function to display a "Loading" indicator and the dashboard will wait for you to make the data available.
3. Make AJAX calls to retrieve the data from your web server. Make sure your server returns JSON.
4. Once the data is available, use the appropriate functions to set the data for the components and use the {{ linkApi ('js', 'Component', 'unlock') }} function to display the data.

### Where to fetch the data from?

You can fetch a data from a HTTP *endpoint* - this is a URL, which when called provides the required data in a JSON format which can be consumed by JavaScript. Defining a HTTP endpoint depends on the server technology that you are using. But here are some common examples:

1. If you are using PHP on the server, consider having a php file named like "data.php" which returns the processed data after encoding using `json_encode`. Your endpoint URL will be something like "/path/to/data.php"
2. If you are using an MVC framework, HTTP endpoints are usually defined by creating "Views" or "Actions", and need to have their routes configured.

### How to fetch the data?

To fetch the data, you will have to use AJAX. All RazorFlow dashboards include jQuery - a javascript library which helps you make AJAX requests easily. To learn more about AJAX using jQuery see this link.

## An example

Let's say we have a PHP web server, and calling a URL "/data/get_sales_data.php?year=2014" returns a JSON string like:

~~~
{
	"categories": ["Beverages", "Fruits", "Vegetables"],
	"sales": [3122, 15563, 18442]
}
~~~

We can build a simple dashboard like this:

~~~
rf.StandaloneDashboard(function(db){
	var sales_chart = new ChartComponent();
	sales_chart.setCaption ("Sales for 2014");
	sales_chart.lock ();
	db.addComponent(sales_chart);

	$.get("/data/get_sales_data.php?year=2014", function (data) {
		// This function is executed when the ajax request is successful.

		sales_chart.setLabels (data['categories']); // You can also use data.categories
		sales_chart.addSeries ("Sales", "sales", data['sales']);

		// Don't forget to call unlock or the data won't be displayed
		sales_chart.unlock ();
	});
});
~~~

What just happened here?

1. You created a new chart component object
2. The caption of the chart was set.
3. You `lock`ed the component
4. The component is added to the dashboard using the `addComponent` function.
5. An AJAX request was started to "/data/get_sales_data.php?year=2014".
6. In the meantime, the dashboard was processed and displayed in the browser with the chart as a "loading" spiner.
7. After a little time, your AJAX request is complete, and the success function is called.
8. Now, you set the labels and series using the {{ linkApi ('js', 'ChartComponent', 'setLabels') }} and {{ linkApi ('js', 'ChartComponent', 'addSeries') }} functions.
9. After the component is ready to be displayed, you call the {{ linkApi ('js', 'ChartComponent', 'unlock') }} function to remove the loading spinner and display the component.
