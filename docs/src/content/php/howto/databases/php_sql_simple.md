--
title: "A simple SQL Dashboard with PHP"
subtitle: ""
id: "php_sql_simple"
index: 0
--


## See a live demo of this example

* [See the full dashboard in action](http://examples.razorflow.com/dashboard/php/examples/sql0)
* [View the full code on github](https://github.com/RazorFlow/examples/blob/master/src/php/examples/sql0.php)

## Steps to build this dashboard

### Create an empty dashboard

~~~
<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard () {

  }
}

$db = new SampleDashboard();
$db->renderStandalone();
?>
~~~

### Add an "initialize" function

The `initialize` function in a dashboard is called before any action on the dashboard is executed. We use this to open a connection to a SQLite Database. In this example, we will be using a SQLite database. SQLite is a database with a syntax similar to MySQL but the entire database is stored as a file. The SQLite database that we are using is freely available to download from [Chinook Database Homepage](http://chinookdatabase.codeplex.com/).

~~~
  protected $pdo;
  public function initialize(){
  	$this->pdo = new PDO("sqlite:fixtures/databases/Chinook_Sqlite.sqlite");
  }
~~~

### Add functions to fetch the top artists

Before really going into fetching the data, clearly define what data that you would like to see in your dashboard. For our dashboard, we wish to show two charts:

* The Top 5 Artists with most sales.
* The Top 5 Albums with most sales

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

Now let's add a function to perform the query:

~~~
  private function getTopArtists () {
  	$query = $this->pdo->query("SELECT SUM(Track.UnitPrice * Quantity) AS total_sales, Artist.Name FROM InvoiceLine JOIN Invoice ON Invoice.InvoiceId = InvoiceLine.InvoiceId JOIN Track ON Track.TrackId = InvoiceLine.TrackId JOIN Album ON Track.AlbumId = Album.AlbumId JOIN Artist ON Album.ArtistId = Artist.ArtistId GROUP BY Artist.Name ORDER BY total_sales DESC LIMIT 5;");
  	return  $query->fetchAll(PDO::FETCH_ASSOC);
  }
~~~

### Display the top artists chart

~~~
  public function buildDashboard () {
    $this->setDashboardTitle ("SQL Demo Dashboard");
  	$topArtistsChart = new ChartComponent ('c1');
  	$topArtistsChart->setDimensions (6, 6);
  	$topArtistsChart->setCaption ("Top 5 Artists by Revenue");
  	$top_artists = $this->getTopArtists();
  	$topArtistsChart->setLabels (ArrayUtils::pluck($top_artists, "Name"));
  	$topArtistsChart->addSeries ('top_artists', "Top Artists", ArrayUtils::pluck($top_artists, "total_sales"));
  	$this->addComponent($topArtistsChart);
  }
~~~

In this code, we use a utility function provided inside the framework called {{ linkApi ('php', "ArrayUtils", "pluck")}}.

### Add functions to fetch the top albums

Similar to the way we fetched the top artists, let's fetch the top albums.

~~~
  private function getTopAlbums($artistName = null) {
	$res = $this->pdo->query("SELECT SUM(Track.UnitPrice * Quantity) AS total_sales, Album.Title FROM InvoiceLine JOIN Invoice ON Invoice.InvoiceId = InvoiceLine.InvoiceId JOIN Track ON Track.TrackId = InvoiceLine.TrackId JOIN Album ON Track.AlbumId = Album.AlbumId JOIN Artist ON Album.ArtistId = Artist.ArtistId GROUP BY Album.Title ORDER BY total_sales DESC LIMIT 5;");

  	return  $res->fetchAll(PDO::FETCH_ASSOC);
  }

  public function buildDashboard () {
  	// ...
  	// configure topArtists
  	//

 	$topAlbumsChart = new ChartComponent ('c2');
  	$topAlbumsChart->setDimensions (6, 6);
  	$topAlbumsChart->setCaption ("Top 5 Albums by Revenue");
  	$top_albums = $this->getTopAlbums();
  	$topAlbumsChart->setLabels (ArrayUtils::pluck($top_albums, "Title"));
  	$topAlbumsChart->addSeries ('top_albums', "Top Albums", ArrayUtils::pluck($top_albums, "total_sales"));
  	$this->addComponent($topAlbumsChart);
  }
~~~

### Modify the getTopAlbums to filter the albums

We can modify the `getTopAlbums` function to filter out the top albums by only a specific artist by adding a parameter `$artistName` in the function.

~~~
  private function getTopAlbums($artistName = null) {
  	if($artistName !== null) {
  		$res = $this->pdo->prepare("SELECT SUM(Track.UnitPrice * Quantity) AS total_sales, Album.Title FROM InvoiceLine JOIN Invoice ON Invoice.InvoiceId = InvoiceLine.InvoiceId JOIN Track ON Track.TrackId = InvoiceLine.TrackId JOIN Album ON Track.AlbumId = Album.AlbumId JOIN Artist ON Album.ArtistId = Artist.ArtistId WHERE Artist.Name = :artistName GROUP BY Album.Title ORDER BY total_sales DESC LIMIT 5;");
  		$res->execute(array('artistName' => $artistName));
  	}
  	else {
  		$res = $this->pdo->query("SELECT SUM(Track.UnitPrice * Quantity) AS total_sales, Album.Title FROM InvoiceLine JOIN Invoice ON Invoice.InvoiceId = InvoiceLine.InvoiceId JOIN Track ON Track.TrackId = InvoiceLine.TrackId JOIN Album ON Track.AlbumId = Album.AlbumId JOIN Artist ON Album.ArtistId = Artist.ArtistId GROUP BY Album.Title ORDER BY total_sales DESC LIMIT 5;");
  	}
  	return  $res->fetchAll(PDO::FETCH_ASSOC);
  }
~~~

This way, if `$artistName` is set to a string, it goes and fetches the data. Note that we're using [PDOStatement::execute](http://www.php.net/manual/en/pdostatement.execute.php) to fetch the data using prepared queries to protect from SQL Injection.

### Create an event listener

~~~
  public function buildDashboard () {
  	// ...
  	// [snip]
  	// ...

    $topArtistsChart->bindToEvent ("itemClick", array($topAlbumsChart), "handleArtistChartClick");
  }

  public function handleArtistChartClick ($source, $target, $params) {
    $artistName = $params['label'];
    $topAlbumsChart = $this->getComponentByID("c2");
    $top_albums = $this->getTopAlbums ($artistName);
    $topAlbumsChart->setCaption ("Top 5 albums by ".$artistName);
    $topAlbumsChart->clearChart();
    $topAlbumsChart->setLabels (ArrayUtils::pluck($top_albums, "Title"));
    $topAlbumsChart->addSeries('top_albums', "Top Albums", ArrayUtils::pluck($top_albums, "total_sales"));
  }
~~~

Notice these steps:

1. We're getting the artist name using the `$params['label']`
2. We get the component by ID 'c2'
3. We get the top albums filtered by the artist name.
4. We set the caption
5. We call {{ linkApi ('php', 'ChartComponent', 'clearChart') }} to clear the chart.
6. We set the labels and add a new series with the data.


### Completed example

{{ embedExample ('php', 'sql0') }}