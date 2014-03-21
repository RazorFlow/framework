<?php

require "../src/razorflow.php";

class SampleDashboard extends StandaloneDashboard {
  public function initialize(){
    $chart = new ChartComponent("my_first_chart");
    $chart->setCaption("My First Chart");
    $chart->setYAxis("Sales", array(
      "numberPrefix" => "$ "
    ));
    $chart->setDimensions (4, 4);
    $chart->setLabels (["Jan", "Feb", "Mar"]);
    $chart->addSeries ("beverages", "Beverages", [1355, 1916, 1150]);
    $chart->addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321]);

    $this->addComponent ($chart);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
