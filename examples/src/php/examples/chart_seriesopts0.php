<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $chart = new ChartComponent("my_first_chart");
    $chart->setCaption("Expenses incurred for Food Consumption by Month");
    $chart->setDimensions (4, 4);
    $chart->setLabels (["Jan", "Feb", "Mar"]);
    $chart->addSeries ("beverages", "Beverages", [1355, 1916, 1150], array(
      "seriesDisplayType" => "line",
      "seriesColor" => "#a4c9f3"
    ));
    $chart->addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321], array(
      "numberPrefix" => "$ ",
      "numberForceDecimals" => TRUE
    ));

    $this->addComponent ($chart);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
