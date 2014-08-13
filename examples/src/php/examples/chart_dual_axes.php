<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $chart = new ChartComponent("my_first_chart");
    $chart->setCaption("Car Sales figures");
    $chart->setYAxis("Sales", array(
      "numberPrefix" => "$",
      "numberHumanize" => true
    ));
    $chart->addYAxis("quantity", "Quantity", array(
    ));
    $chart->setDimensions (4, 4);
    $chart->setLabels (["Jan", "Feb", "Mar"]);
    $chart->addSeries ("sales", "Sales", [1355340, 2214134, 1854313], array(
      "seriesDisplayType" => "column",
      "numberPrefix" => "$"
    ));
    $chart->addSeries ("car_quantity", "Quantity", [14, 19, 17], array(
      "yAxis" => "quantity"
    ));

    $this->addComponent ($chart);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
