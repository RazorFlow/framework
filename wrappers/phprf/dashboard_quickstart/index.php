<?php

// Welcome to the RazorFlow PHP Dashbord Quickstart. Simply copy this "dashboard_quickstart"
// to somewhere in your PHP server to have a dashboard ready to use.
// This is a great way to get started with RazorFlow with minimal time in setup.
// However, once you're ready to go into deployment consult our documentation on tips for how to 
// maintain the most stable and secure 

// Require the library file
require "razorflow_php/razorflow.php";

class MyDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $this->setDashboardTitle ("My Dashboard");

    $chart = new ChartComponent('sales');
    $chart->setCaption("Sales");
    $chart->setDimensions (6, 6); 
    $chart->setLabels (array("2013", "2014", "2015"));
    $chart->addSeries (array(3151, 1121, 4982), array(
      'numberPrefix' => "$",
      'seriesDisplayType' => "line"
    ));
    $this->addComponent ($chart);
  }
}

// Create an instance of the dashboard that you created
$db = new MyDashboard();

// Here, we're manually setting the static root to where the CSS and HTML is available.
// This is relative to the current path of index.php and will not work in more advanced
// scenarios like integrating into MVC and embedding.
$db->setStaticRoot ("razorflow_php/static/rf/");
$db->enableDevTools ();
$db->renderStandalone();
  
