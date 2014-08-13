<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $chart = new ChartComponent("my_first_chart");
    $chart->setCaption("Expenses incurred on Food Consumption by Year");
    $chart->setDimensions (4, 4);
    $chart->setLabels (["2009", "2010", "2011"]);
    $chart->addSeries ("beverages", "Beverages", [1355, 1916, 1150]);
    $chart->addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321]);
    $chart->addDrillStep("firstDrill", $this);
    $chart->addDrillStep("secondDrill", $this);

    $this->addComponent ($chart);
  }

  public function firstDrill($source, $targets, $params) {
    $source->clearChart();
    $source->setLabels (["Jan", "Feb", "March", "April", "May"]);
    $source->addSeries ("beverages", "Beverages", [100, 200, 300, 400, 500]);
    $source->addSeries ("packaged_foods", "Packaged Foods", [13, 76, 21, 40, 33]);
  }

  public function secondDrill($source, $targets, $params) {
    $source->clearChart();
    $source->setLabels (["Sun", "Mon", "Tue"]);
    $source->addSeries ("beverages", "Beverages", [40, 20, 30]);
    $source->addSeries ("packaged_foods", "Packaged Foods", [21, 40, 33]);
  }

}

$db = new SampleDashboard();
$db->renderStandalone();
  
