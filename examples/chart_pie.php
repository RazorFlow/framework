<?php

require "../src/razorflow.php";

class SampleDashboard extends StandaloneDashboard {
  public function initialize(){
    $chart = new ChartComponent("pie_chart");
    $chart->setCaption("A pie chart");
    $chart->setDimensions (4, 4);
    $chart->setLabels (["Jan", "Feb", "Mar"]);
    $chart->setPieValues ([10, 14, 13]);

    $this->addComponent ($chart);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
