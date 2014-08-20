--
title: "Embed a dashboard into an existing page"
id: "php_create_embed"
index: 2
--


### What is an embedded dashboard?

You can embed the dashboard into an existing application. In this situation the dashboard is directly embedded and integrated as part of your page. This allows you to add a dashboard into an existing application.

For example, you can see an example of an embedded dashboard here: [http://examples.razorflow.com/apps/php_embedded/](examples.razorflow.com/apps/php_embedded/).

The steps to embed a dashboard into your applications are:

1. Create the dashboard using the RazorFlow API. Note that this actually doesn't display your dashboard, but is more a specification of how your dashboard works.
2. Find the PHP page in which you will be embedding your dashboard. 
3. Add an "action path" to enable interactivity

### Part 1: Create an embedded dashboard class

Before you begin, copy the `razorflow_php` folder from the RazorFlow download into the folder where you'll be embedding the dashboard.

Create a file that contains the dashboard class. For example, we'll be using `salesdashboard.php`. This contains the definition of the dashboard. You'll also need to "require" `razorflow.php` file from the `razorflow_php` folder that you've copied.

~~~
<?php

// Change this to the path to razorflow.php which you have extracted
require "razorflow_php/razorflow.php";

class SalesDashboard extends EmbeddedDashboard {
  public function buildDashboard(){
    $chart = new ChartComponent("chart1");
    $chart->setCaption("The first Chart");
    $chart->setDimensions (4, 4);
    $chart->setLabels (["Jan", "Feb", "Mar"]);
    $chart->addSeries ("beverages", "Beverages", array(1355, 1916, 1150));
    $chart->addSeries ("packaged_foods", "Packaged Foods", array(1513, 976, 1321));

    $this->addComponent ($chart);
  }
}
?>
~~~

### Part 2: Embed the dashboard in your page

To embed the dashboard into a page follow these steps:

1. Find the page and the div where you want to embed the dashboard.
2. Include the JavaScript and CSS files required to use RazorFlow. These are:
   * `jquery.min.js`
   * `razorflow.wrapper.min.js`. Note that this is **not** "razorflow.min.js", but a special version required for server-side wrappers.
   * `razorflow.min.css`
3. In the PHP script, require the `salesdashboard.php`
4. Create a new instance of `SalesDashboard` and use the `renderEmbedded` function to display the embedded dashboard.

Full source code for `index.php`:

~~~
<?php
require "salesdashboard.php";
?>
<html>
	<head>
		<link rel="stylesheet" href="razorflow_php/static/rf/css/razorflow.min.css"/>
		<script src="razorflow_php/static/rf/js/jquery.min.js" type="text/javascript"></script>
		<script src="razorflow_php/static/rf/js/razorflow.wrapper.min.js" type="text/javascript"></script>
    <script src="razorflow_php/static/rf/js/razorflow.devtools.min.js" type="text/javascript"></script>
	</head>
	<body>
		<h1>Embedded Dashboard!!</h1>
		<?php
		$db = new SalesDashboard ();
		$db->renderEmbedded();
		?>
	</body>
</html>
~~~

Now load `index.php` in your browser, and you should be able to see the dashboard embedded along with regular HTML.

### Part 3: Enable interactivity in your dashboard.

If you try to use any interactivity features in your dashboard, it will not work directly with embedded dashboards. This is because RazorFlow uses a special URL to communicate with the server and do AJAX requests and error handling. This is caled the **action url**.

Of course, you don't need to worry about all the complexities, you simply need to take 3 simple steps:

1. Create a new file (in this example we call it `action.php`)
2. Add 3 lines of code to this file
3. In `index.php` call the `setActionPath` function to set the URL to specify the URL where the action is set.

In `action.php`, add the following code:

~~~
<?php

require "salesdashboard.php";

$db = new SalesDashboard();
$db->handleAction ();
?>
~~~

And in `index.php`

~~~
	<body>
		<h1>Embedded Dashboard!!</h1>
		<?php
		$db = new SalesDashboard ();
		$db->setActionPath("path/to/action.php");
		$db->renderEmbedded();
		?>
	</body>
~~~

Now modify the dashboard to add some interactivity just to test it out:

~~~
<?php

// Change this to the path to razorflow.php which you have extracted
require "../../lib/phprf/razorflow.php";

class SalesDashboard extends EmbeddedDashboard {
  public function buildDashboard(){
    $chart = new ChartComponent("chart1");
    $chart->setCaption("The first Chart");
    $chart->setDimensions (4, 4);
    $chart->setLabels (["Jan", "Feb", "Mar"]);
    $chart->addSeries ("beverages", "Beverages", array(1355, 1916, 1150));
    $chart->addSeries ("packaged_foods", "Packaged Foods", array(1513, 976, 1321));

    $this->addComponent ($chart);

    $chart2 = new ChartComponent("chart2");
    $chart2->setDimensions (4, 4);
    $chart2->setCaption ("Second chart");
    $chart2->setLabels (array("A", "B", "C"));
    $chart2->addSeries ("series_1", "Series 1", array(1, 2, 3));
    $this->addComponent ($chart2);

    $chart->onItemClick (array($chart2), "handleItemClick", $this);
  }

  public function handleItemClick ($source, $targets, $params) {
    $chart2 = $this->getComponentByID("chart2");
    $chart2->clearChart ();
    $chart2->setLabels (array ("E", "F", "G", "H", "I"));
    $chart2->addSeries ("series_3", "Series 3", [3, 5, 2, 1, 6]);
  }	
}
?>
~~~

Now, if you click on the first chart it will show a change in the second chart.

### Related Articles

* {{ linkArticle ('php_cakephp') }}
