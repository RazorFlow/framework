<meta>
{
    "title": "Embed a Tabbed Dashboard into an existing page",
    "id": "php_embed_tabbed",
    "index": 5
}
</meta>

### To embed a Tabbed Dashboard into a web page follow these steps:

1. Create a new PHP file `dashboards.php` (you can change this file to anything).
2. Create individual dashboard classes by extending the `Dashboard` class.
3. Create a dashboard by extending the `TabbedDashboard` class.
4. Use `addDashboardTab` to add individual dashboards to the tabbed dashboard object.
5. Use `setActive` on a dashboard to set the active dashboard.
6. Create a file named `tabbed.php` (change it as you desire) which contains the HTML markup.
6. Render the tabbed Dashboard by using `renderEmbedded` in your webpage.


Here's an example of embedding a tabbed dashboard into a webpage.
~~~
<?php
// Filename: dashboards.php

// Require the RazorFlow php wrapper
require('path/to/razorflow.php');
// You can rename the "MyDashboard" class to anything you want


class SalesDashboard extends Dashboard {
  public function buildDashboard(){
    $chart = new ChartComponent("chart1");
    $chart->setCaption("The first Chart");
    $chart->setDimensions (4, 4);
    $chart->setLabels (["Jan", "Feb", "Mar"]);
    $chart->addSeries ("beverages", "Beverages", array(1355, 1916, 1150));
    $chart->addSeries ("packaged_foods", "Packaged Foods", array(1513, 976, 1321));

    $this->setDashboardTitle('Sales');
    $this->setActive();
    $this->addComponent ($chart);
  }
}

class UsersDashboard extends Dashboard {

  public function buildDashboard() {
    $kpi = new KPIComponent('kpi');
    $kpi->setDimensions(3, 3);
    $kpi->setCaption('Online Users');
    $kpi->setValue(10);

    $this->setDashboardTitle('Online Users');
    $this->addComponent($kpi);
  }
}


class MyDashboard extends TabbedDashboard {
  public function buildDashboard () {
    $sales = new SalesDashboard();
    $users = new UsersDashboard();

    $this->setTabbedDashboardTitle("Tabbed Dashboard");
    $this->addDashboardTab($sales);
    $this->addDashboardTab($users);
  }
}

?>
~~~

Create the HTML markup for rendering the dashboard.

~~~
<?php
// Filename: tabbed.php

require 'dashboards.php';

?>
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="razorflow_php/static/rf/css/razorflow.min.css"/>
    <script src="razorflow_php/static/rf/js/jquery.min.js" type="text/javascript"></script>
    <script src="razorflow_php/static/rf/js/razorflow.wrapper.min.js" type="text/javascript"></script>
    <script src="razorflow_php/static/rf/js/razorflow.devtools.min.js" type="text/javascript"></script>
  </head>
  <body>
    <h1>Tabbed Embedded Dashboard</h1>
    <?php
    $db = new MyDashboard ();
    $db->renderEmbedded();
    ?>
  </body>
</html>

~~~