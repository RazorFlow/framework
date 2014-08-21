<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $chart = new ChartComponent("pie_chart");
    $chart->setCaption("Monthly Unit Distribution");
    $chart->setDimensions (4, 4);
    $chart->setLabels (["Jan", "Feb", "Mar"]);
    $chart->setOption ('showPieValues', false);
    $chart->setPieValues ([10, 14, 13]);

    $this->addComponent ($chart);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
