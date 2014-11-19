<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $chart = new ChartComponent("sales_chart");
    $chart->setCaption("Sales - 2013 vs 2012");
    $chart->setDimensions (8, 6);
    $chart->setLabels (array("Jan", "Feb", "Mar", "Apr", "May"));
    $chart->addSeries ("2013", "2013", array(1, 3, -1, 1, 9), array("seriesStacked" => true));
    $chart->addSeries ("2012", "2012", array(2, 1, -3, 3, 1), array("seriesStacked" => true));
    $chart->setYAxis('Sales', array("numberPrefix"=> '$', "numberHumanize"=> true));
    $chart->setOption("stackedTotalDisplay", true);
    $this->addComponent ($chart);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
