<?php

class SampleDashboard extends StandaloneDashboard{
  public function buildDashboard () {
    $chart = new ChartComponent("chart1");
    $chart->setDimensions (4, 4);
    $chart->setCaption ("Series Formatting");
    $chart->setLabels (array("Jan", "Feb", "Mar"));
    $chart->addSeries ("beverages", "Beverages", array(1355, 1916, 1150), array(
      "seriesDisplayType" => "line",
      "seriesColor" => "#a4c9f3" 
    ));
    $chart->addSeries ("packaged_foods", "Packaged Foods", array(1513, 976, 1321), array(
      "numberPrefix" => "$",
      "numberForceDecimals" => true
    ));

    $this->addComponent($chart);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();