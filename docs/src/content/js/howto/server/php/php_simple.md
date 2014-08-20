--
title: "A basic interactive PHP Dashboard example"
subtitle: ""
id: "php_simple"
index: 0
--


### What are we building?

We are building a dashboard with 2 charts for now. The data for these charts will be fetched from a MySQL Database using PHP.

* You can see a demo of this dashboard here: http://samples.razorflow.com/php/basic/index.php
* You can get the entire code for this dashboard here: https://github.com/RazorFlow/php_examples/tree/master/basic

## Part 1: Preparation

### Getting the database

We will build a simple dashboard using PHP and MySQL. For this, we will be demonstrating with the freely available open-source [Chinook Database](http://chinookdatabase.codeplex.com/). To load the database for use in the demo, follow these steps:

1. Download a copy of the Chinook MySQL Database.
2. Extract the ZIP file, and locate Chinook_MySql.sql
3. Create a new database using a MySQL tool like [PHPMyAdmin](http://www.phpmyadmin.net/home_page/index.php) called "Chinook"
4. Use PHPMyAdmin to load the Chinook_MySQL.sql file into MySQL
5. [Optional] Create a new user to access this data.

### Create an empty dashboard

1. Copy the "dashboard_quickstart" into a new folder, which will contain your dashboard. Make sure that your PHP Server (like Apache, Nginx, etc) is configured to display documents in this folder.
2. Rename `index.html` to `index.php` because this is a PHP Dashboard. Note that this step is technically optional because index.php doesn't really use any PHP code in it, but in a real world scenario, this would be required.
3. Load this page in your browser, which should display a blank page.
4. Check your browser inspector/console to make sure that there isn't any error being reported, and all the RazorFlow files are being loaded properly.

## Part 2: Displaying a single component.

Before really going into fetching the data, clearly define what data that you would like to see in your dashboard. For our dashboard, we wish to show two charts:

* The Top 5 Artists with most sales.
* The Top 5 Albums with most sales.

### Fetching Top Artists

By looking at the database structure, we can find the SQL Query to find the Top selling artists is:

~~~
SELECT SUM(Track.UnitPrice * Quantity) AS total_sales, Artist.Name 
FROM InvoiceLine JOIN Invoice ON Invoice.InvoiceId = InvoiceLine.InvoiceId
JOIN Track ON Track.TrackId = InvoiceLine.TrackId
JOIN Album ON Track.AlbumId = Album.AlbumId
JOIN Artist ON Album.ArtistId = Artist.ArtistId 
GROUP BY Artist.Name 
ORDER BY total_sales DESC
LIMIT 5;
~~~

If you run this in phpmyadmin, you'll see an output like:

![Top Artists](http://imgur.com/8TXinUb.png)

To expose this data to our dashboard, we can create a new PHP file called `top_artists.php` which contains this code:

~~~
<?php
$mysqli = new mysqli("localhost", "demouser", "demopass", "Chinook");
$res = $mysqli->query("SELECT SUM(Track.UnitPrice * Quantity) AS total_sales, Artist.Name FROM InvoiceLine JOIN Invoice ON Invoice.InvoiceId = InvoiceLine.InvoiceId JOIN Track ON Track.TrackId = InvoiceLine.TrackId JOIN Album ON Track.AlbumId = Album.AlbumId JOIN Artist ON Album.ArtistId = Artist.ArtistId GROUP BY Artist.Name ORDER BY total_sales DESC LIMIT 5;");

// fetch all rows from the query
$all_rows = array();
while($row = $res->fetch_assoc()) {
	$all_rows []= $row;
}

header("Content-Type: application/json");
echo json_encode($all_rows);
?>
~~~

In this file, we are doing the following things:

1. Connect to a MySQL Database using the `mysqli` connector.
2. Performing a query using `$mysqli->query()`
3. Fetching all of the rows as associative arrays using the `fetch_assoc` function, and making a full list using the `$all_rows` variable.
4. Setting the Content-Type as `application/json` so that the browser will know that it's JSON data.
5. Encoding the rows as JSON, and `echo`ing it to the browser.

If we open `top_artists.php` in a browser we only see some JSON text which isn't particularly meaningful right now.

### Displaying the "Top 5 Artists" chart in your dashboard

To display your chart in the dashboard, you will need to configure this using the JavaScript API. To begin with, we replace the code of the dashboard in `dashboard_app.js` with a function like this:

~~~
rf.StandaloneDashboard (function (db) {
	db.setDashboardTitle ("MySQL Example");
	var top_artists = new ChartComponent();
	top_artists.setDimensions (6,6);
	top_artists.setCaption ("Top 5 artists by revenue");
	top_artists.lock();

	$.get("top_artists.php", function(data) {
		var labels = [], sales_data = [];
		for(var i = 0; i < data.length; i++) {
			labels.push (data[i]["Name"]);
			sales_data.push (parseInt(data[i]["total_sales"]));
		}
		top_artists.setLabels (labels);
		top_artists.addSeries ("sales", "Total Sales", sales_data, {
			numberPrefix: "$"
		});
		top_artists.unlock();
	});
	db.addComponent (top_artists);
});
~~~

The code is actually quite straightforward. Here's a breakdown of what's happening.

1. We're setting the dashboard title.
2. We create a new Chart Component object called `top_artists`
3. We set the dimensions and the caption of the component.
4. We call `lock()` on the function which ensures that the component will not be displayed directly and instead, a "loading" indicator is displayed instead.
5. We start an AJAX request using [jQuery's $.get](https://api.jquery.com/jQuery.get/) to "top_artists.php".

RazorFlow then waits for the AJAX request to successfully complete. Once the request is completed, the callback is executed, which updates the data on the chart. Before we move on to the next part, let's take a closer look at the JSON produced by the server, and hence the `data` variable as well:

~~~
[
	{
		"total_sales": "138.60",
		"Name": "Iron Maiden"
	},
	{
		"total_sales": "105.93",
		"Name": "U2"
	},
	{
		"total_sales": "90.09",
		"Name": "Metallica"
	},
	{
		"total_sales": "86.13",
		"Name": "Led Zeppelin"
	},
	{
		"total_sales": "81.59",
		"Name": "Lost"
	}
]
~~~

To pass this data into the Dashboard JS API, you need two variables like:

~~~
var labels = ["Iron Maiden", "U2", "Metallica", "Led Zeppelin", "Lost"];
var sales_data = [138.6, 105.93, 90.69, 86.13, 81.59];
~~~

To convert the earlier form of the data into the required form, it can be accomplished with this simple code, which does the following: 

1. Iterates over all the data rows
2. Gets a list of all the labels which would have the key `Name`
3. Collects all the data which have the key `total_sales` into a separate array.

~~~
var labels = [], sales_data = [];
for(var i = 0; i < data.length; i++) {
	labels.push (data[i]["Name"]);
	sales_data.push (parseInt(data[i]["total_sales"]));
}
~~~	

Going back to the original code, let's take a look at only the code that's making the AJAX request:

~~~
$.get("top_artists.php", function(data) {
		var labels = [], sales_data = [];
		for(var i = 0; i < data.length; i++) {
			labels.push (data[i]["Name"]);
			sales_data.push (parseInt(data[i]["total_sales"]));
		}
		top_artists.setLabels (labels);
		top_artists.addSeries ("sales", "Total Sales", sales_data, {
			numberPrefix: "$"
		});
		top_artists.unlock();
	});
~~~

Notice the steps being taken here, after the "success" function is called:

1. We get the `labels` and `sales_data` as described above.
2. We use `setLabels` to set the labels on the column.
3. We use `addSeries` to add a single series to the chart in the dashboard.
4. **Important**: We call the `unlock` function which tells RazorFlow to immediately display the component because it is now ready to be rendered.

### Fetching top albums.

Similar to how we fetched the "Top 5 Artists" using 2 files, we can fetch the "Top 5 Albums" with these files and display in the dashboard:

#### "top_albums.php"

~~~
<?php

$mysqli = new mysqli("localhost", "demouser", "demopass", "Chinook");

$res = $mysqli->query("SELECT SUM(Track.UnitPrice * Quantity) AS total_sales, Album.Title FROM InvoiceLine JOIN Invoice ON Invoice.InvoiceId = InvoiceLine.InvoiceId JOIN Track ON Track.TrackId = InvoiceLine.TrackId JOIN Album ON Track.AlbumId = Album.AlbumId JOIN Artist ON Album.ArtistId = Artist.ArtistId GROUP BY Album.Title ORDER BY total_sales DESC LIMIT 5;");

// fetch all rows from the query
$all_rows = array();
while($row = $res->fetch_assoc()) {
	$all_rows []= $row;
}
header("Content-Type: application/json");
echo json_encode($all_rows);
~~~

#### Using this data in your dashboard:

Add this code inside the `StandaloneDashboard` function of your `dashboard_app.js`:

~~~
var top_albums= new ChartComponent();
top_albums.setDimensions (6,6);
top_albums.setCaption ("Top 5 albums by revenue");
top_albums.lock();

$.get("top_albums.php", function(data) {
	var labels = [], sales_data = [];
	for(var i = 0; i < data.length; i++) {
		labels.push (data[i]["Title"]);
		sales_data.push (parseInt(data[i]["total_sales"]));
	}
	top_albums.setLabels (labels);
	top_albums.addSeries ("sales", "Total Sales", sales_data, {
		numberPrefix: "$"
	});
	top_albums.unlock();
});
db.addComponent (top_albums);
~~~

## Part 3: Interactivity

Now we'll add a feature of interactivity to allow the user to click on one of the columns on the chart, which filters the data in the other chart. This filtering will be happening in a SQL Query. The first part that we'll be doing is modifying `top_albums.php`.

### Passing a parameter to top_albums.php

The first step is going to be having a feature to filter the Top Albums in case a specific artist is provided as a `GET` parameter. For instance, if a request is made to `top_albums.php?artist=Lost` it should filter and show only the top albums from the artist "Lost".

For this, we modify the `top_albums.php` file to check if there's a `GET` parameter for `'artist'`. If there is, we add a `WHERE Artist.Name='$artistString'` to the SQL Query. Do notice that we're escaping the string to protect against SQL Injections.

~~~
if(isset($_GET['artist'])) {
	$artistString = $mysqli->escape_string($_GET['artist']);
	$res = $mysqli->query("SELECT SUM(Track.UnitPrice * Quantity) AS total_sales, Album.Title FROM InvoiceLine JOIN Invoice ON Invoice.InvoiceId = InvoiceLine.InvoiceId JOIN Track ON Track.TrackId = InvoiceLine.TrackId JOIN Album ON Track.AlbumId = Album.AlbumId JOIN Artist ON Album.ArtistId = Artist.ArtistId WHERE Artist.Name = '$artistString' GROUP BY Album.Title ORDER BY total_sales DESC LIMIT 5;");
}
else {
	$res = $mysqli->query("SELECT SUM(Track.UnitPrice * Quantity) AS total_sales, Album.Title FROM InvoiceLine JOIN Invoice ON Invoice.InvoiceId = InvoiceLine.InvoiceId JOIN Track ON Track.TrackId = InvoiceLine.TrackId JOIN Album ON Track.AlbumId = Album.AlbumId JOIN Artist ON Album.ArtistId = Artist.ArtistId GROUP BY Album.Title ORDER BY total_sales DESC LIMIT 5;");
}
~~~

Once we get the `$res` which is a result of the query, it's quite straight forward to fetch the rows and collect it into a variable. For reference, the complete code for `top_albums.php` is:

~~~
<?php

$mysqli = new mysqli("localhost", "demouser", "demopass", "Chinook");
if(isset($_GET['artist'])) {
	$artistString = $mysqli->escape_string($_GET['artist']);
	$res = $mysqli->query("SELECT SUM(Track.UnitPrice * Quantity) AS total_sales, Album.Title FROM InvoiceLine JOIN Invoice ON Invoice.InvoiceId = InvoiceLine.InvoiceId JOIN Track ON Track.TrackId = InvoiceLine.TrackId JOIN Album ON Track.AlbumId = Album.AlbumId JOIN Artist ON Album.ArtistId = Artist.ArtistId WHERE Artist.Name = '$artistString' GROUP BY Album.Title ORDER BY total_sales DESC LIMIT 5;");
}
else {
	$res = $mysqli->query("SELECT SUM(Track.UnitPrice * Quantity) AS total_sales, Album.Title FROM InvoiceLine JOIN Invoice ON Invoice.InvoiceId = InvoiceLine.InvoiceId JOIN Track ON Track.TrackId = InvoiceLine.TrackId JOIN Album ON Track.AlbumId = Album.AlbumId JOIN Artist ON Album.ArtistId = Artist.ArtistId GROUP BY Album.Title ORDER BY total_sales DESC LIMIT 5;");
}
// fetch all rows from the query
$all_rows = array();
while($row = $res->fetch_assoc()) {
	$all_rows []= $row;
}
header("Content-Type: application/json");
echo json_encode($all_rows);
~~~

### Listening to the click event and handling it

The last step will be to listen to the click event and handle it. By using the `onItemClick` we can register a function to be called whenever an item on the chart is clicked:

~~~
top_artists.onItemClick (function(params) {
	top_albums.lock();
	top_albums.setCaption("Top 5 Albums by " + params.label);
	$.get("top_albums.php?artist=" + encodeURIComponent(params.label), function(data) {
		top_albums.clearChart();
		var labels = [], sales_data = [];
		for(var i = 0; i < data.length; i++) {
			labels.push (data[i]["Title"]);
			sales_data.push (parseInt(data[i]["total_sales"]));
		}
		top_albums.setLabels (labels);
		top_albums.addSeries ("sales", "Total Sales", sales_data, {
			numberPrefix: "$"
		});
		top_albums.unlock();
	});
});
~~~

Let's break down what's happening in this function:

1. The function will be called whenever the user clicks on the chart, and the `params` object will have one value `params.label` which contains the label of the item that was clicked. In this case, `params.label` contains the name of the artist.
2. We `lock()` the top_albums function to indicate that it's currently loading.
3. We set the caption to show "Top 5 albums by <Artist Name>" by using the `params.label` value
4. We make an AJAX request to the URL `top_albums.php?artist=Artist Name`. But notice that we're encoding the name of the artist using `encodeURIComponent`. For example, if the user clicks on "Iron Maiden", the URL will be `top_albums.php?artist=Iron%20Maiden`
5. We get the data when the AJAX request finishes, and display it exactly how it was displayed in earlier cases.
6. We `unlock` the component to show the final updated data on the component.


