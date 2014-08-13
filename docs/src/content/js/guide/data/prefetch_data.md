<meta>
{
	"title": "Dashboards with data fetched first",
	"subtitle": "",
	"index": 3,
	"id": "prefetch_data"
}
</meta>

One of the other options to build a data driven dashboard, is to fetch the data for the dashboard first before creating the dashboard. This is ideal for scenarios where all the data for the dashboard can be processed and fetched at once.

### Where to fetch the data from?

You can fetch a data from a HTTP *endpoint* - this is a URL, which when called provides the required data in a JSON format which can be consumed by JavaScript. Defining a HTTP endpoint depends on the server technology that you are using. But here are some common examples:

1. If you are using PHP on the server, consider having a php file named like "data.php" which returns the processed data after encoding using `json_encode`. Your endpoint URL will be something like "/path/to/data.php"
2. If you are using an MVC framework, HTTP endpoints are usually defined by creating "Views" or "Actions", and need to have their routes configured.

### How to fetch the data?

To fetch the data, you will have to use AJAX. All dashboards include jQuery - a javascript library which helps you make AJAX requests easily. To learn more about AJAX using jQuery see this link.

To make an AJAX request, replace the contents of your `dashboard.js` with:

~~~
$.ajax({
	type: "GET",
	url: "/path/to/your/endpoint",
	success: function (data) {
		rf.StandaloneDashboard(function (db) {
			// use the data from your 'data' variable to 
			// build the dashboard in the 'db' variable
		});
	}
})
~~~

### To recap

1. Decide what data you want on your dashboard, and use your server-side technologies to expose them as an HTTP endpoint.
2. Use jQuery's `$.ajax` or a similar AJAX library to fetch the data.
3. Use RazorFlow's API to build the dashboard with your data.
