<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $chart = new ChartComponent("my_first_chart");
    $chart->setCaption("Expenses incurred on Food Consumption by Year");
    $chart->setDimensions (4, 4);
    $chart->setLabels (["2009", "2010", "2011"]);
    $chart->addSeries ("beverages", "Beverages", [1355, 1916, 1150], array(
        'seriesDisplayType' => "bar"
    ));
    $chart->addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321], array(
        'seriesDisplayType' => "bar"
    ));

    $this->addComponent ($chart);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
