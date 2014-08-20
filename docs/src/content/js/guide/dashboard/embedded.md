--
title: "Embedding a dashboard"
id: "js_create_embedded"
index: 5
--



### What is an embedded dashboard?

You can embed the dashboard into an existing application. In this situation the dashboard is directly embedded and integrated as part of your page, not as an IFrame, allowing you to control and integrate your dashboard and control it using external controls.

For example, you can see an example of an embedded dashboard here: [examples.razorflow.com/apps/html_embedded/](http://examples.razorflow.com/apps/html_embedded/). 

### Steps to embed a dashboard

The steps to embed a dashboard into your applications are:

1. Include the RazorFlow Static files in your HTML Page'
2. Build your dashboard.

Copy the RazorFlow `js`, `css` and `img` files to your project. And create a new HTML page that looks like this:

~~~
<!doctype html>
<html>
	<head>
		<title>RazorFlow Embedded Example</title>
		<link rel="stylesheet" href="razorflow_js/css/razorflow.min.css"/>
		<script src="razorflow_js/js/jquery.min.js" type="text/javascript"></script>
		<script src="razorflow_js/js/razorflow.min.js" type="text/javascript"></script>
		<script src="razorflow_js/js/razorflow.devtools.min.js" type="text/javascript"></script>
		<style>
			#dashboard_target {
				width: 800px;
			}
		</style>
	</head>
	<body>
		<h1>Embedded Dashboard</h1>
		<div id="dashboard_target"></div>
	</body>
</html>
~~~

Notice that we're creating a new div called `dashboard_target` and setting the width for it using CSS. This div can be called anything you want. Now add a `<script>` tag and add code for the dashboard.

~~~
	<body>
		<h1>Embedded Dashboard</h1>
		<div id="dashboard_target"></div>
		<script type="text/javascript">
			var db = new EmbeddedDashboard ();

			var chart = new ChartComponent();
			chart.setDimensions (6, 6);
			chart.setCaption("First Chart");	
			chart.setLabels (["Jan", "Feb", "Mar"]);
			chart.addSeries ("beverages", "Beverages", [1355, 1916, 1150]);
			chart.addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321]);
			db.addComponent (chart);

			var chart2 = new ChartComponent();
			chart2.setDimensions (6, 6);
			chart2.setCaption("Second Chart");	
			chart2.setLabels (["A", "B", "C"]);
			chart2.addSeries("series_1", "Series 1", [1, 2, 3]);
			db.addComponent (chart2);

			chart.onItemClick (function (params) {
				chart2.updateSeries ("series_1", [3, 5, 2]);
			});

			db.embedTo("dashboard_target");
		</script>
	</body>
~~~

Now open this page in your browser. You should be able to see a dashboard in the page now.

### Configuring the height and width of the dashboard.

There are 2 ways to set the height/width of the embedded dashboard.

1. You can set them using CSS width/height properties for the div. RazorFlow's dashboard engine will automatically adjust the size of the components.
2. You can use `db.setWidth` and `db.setHeight` to set the dimensions

~~~
db.setHeight (800); // Set the height to max of 800 pixels.
db.setWidth (600); // Set the height of 600 pixels.
~~~


### Making the embed work on mobile devices

The dashboard will automatically adjust into mobile mode when it detects that the size of the ``div`` is small. To make a dashboard completely responsive, consider setting the width of the dashboard as a percentage, and letting the height expand automatically.

~~~
#dashboard_target {
	width: "90%";
}
~~~

(or)

~~~
db.setWidth ("90%");
~~~

To see it in action, resize the browser of your dashboard.