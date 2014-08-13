<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $chart = new ChartComponent("chart1");
    $chart->setCaption("My First Chart");
    $chart->setDimensions (4, 4);
    $chart->setLabels (["Jan", "Feb", "Mar"]);
    $chart->addSeries ("beverages", "Beverages", array(1355, 1916, 1150));
    $chart->addSeries ("packaged_foods", "Packaged Foods", array(1513, 976, 1321));

    $this->addComponent ($chart);

    $chart2 = new ChartComponent("chart2");
    $chart2->setDimensions (4, 4);
    $chart2->setCaption ("My First Chart");
    $chart2->setLabels (array("A", "B", "C"));
    $chart2->addSeries ("series_1", "Series 1", array(1, 2, 3));
    $this->addComponent ($chart2);

    $chart->onItemClick (array($chart2), "handleItemClick", $this);
  }

  public function handleItemClick ($source, $targets, $params) {
    $chart2 = $this->getComponentByID("chart2");
    $chart2->updateSeries("series_1", [3, 5, 2]);
  }

}

$db = new SampleDashboard();
$db->renderStandalone();
  
