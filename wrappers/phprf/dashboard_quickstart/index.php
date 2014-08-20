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
  	// Here's a sample component 
    $chart = new ChartComponent("2014_sales");
    $chart->setCaption("2014 Sales");
    $chart->setDimensions (4, 4);
    $chart->setLabels (["Beverages", "Vegetables"]);
    $chart->addSeries ("sales", "Sales", [1343, 7741], array(
    	'numberPrefix' => "$"
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
  
