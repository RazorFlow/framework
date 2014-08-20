--
title: "Create a Tabbed Dashboard"
id: "php_create_tabbed"
index: 4
--


### What is a Tabbed Dashboard?
A Tabbed Dashboard allows you to separate dashboards by tabs.
RazorFlow Framework allows you to create:
1. A Standalone Tabbed Dashboard
2. Embedding a Tabbed Dashboard onto a webpage. 

To create a new standalone dashboard follow these steps:

1. Create a new PHP file `yourdashboard.php` which is inside your document root (you can change this file to anything).
2. Create individual dashboard classes by extending the `Dashboard` class.
3. Create a dashboard by extending the `TabbedDashboard` class.
4. Use `setTabbedDashboardTitle` to set the tabbed dashboard title.
5. Use `addDashboardTab` to add individual dashboards to the tabbed dashboard object.
6. Use `setActive` on a dashboard to set the active dashboard.
7. Render the tabbed Dashboard using `renderStandalone`.

Here's a quick example php snippet on how you would add a Standalone Tabbed Dashboard.
~~~
<?php
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

$dashboard = new MyDashboard ()
$dashboard->renderStandalone ();
?>
~~~