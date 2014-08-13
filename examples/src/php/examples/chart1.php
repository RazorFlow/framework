<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $chart = new ChartComponent("2011_sales");
    $chart->setCaption("2011 Sales");
    $chart->setDimensions (4, 4);
    $chart->setLabels (["Beverages", "Vegetables"]);
    $chart->addSeries ("sales", "Sales", [1343, 7741]);
    $chart->addSeries ("quantity", "Quantity", [76, 119]);

    $this->addComponent ($chart);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
