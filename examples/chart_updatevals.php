<?php

require "../src/razorflow.php";

class SampleDashboard extends StandaloneDashboard {
  public function initialize(){
    $chart = new ChartComponent("chart1");
    $chart->setCaption("My First Chart");
    $chart->setDimensions (4, 4);
    $chart->setLabels (["Jan", "Feb", "Mar"]);
    $chart->addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321]);

    $this->addComponent ($chart);

    $chart->bindToEvent ("itemClick", array($chart), "handleItemClick");
  }

  public function handleItemClick ($source, $targets, $params) {
    $chart = $this->getComponentByID("chart1");
    $chart->updateSeries("packaged_foods", [1, 2, 3]);
  }

}

$db = new SampleDashboard();
$db->renderStandalone();
  
