<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $chart = new ChartComponent();
    $chart->setDimensions (8, 6);
    $chart->setYAxis("Sales", array(
        "numberPrefix"=> "$ ",
        "numberHumanize"=> true
    ));
    $chart->addYAxis('profit', "Profit %", array(
        "numberSuffix" => "%"
    ));
    $chart->setCaption("Showing monthly sales and profit of a retail company");    
    $chart->setLabels (array("March", "April", "May", "June", "July"));
    $chart->addSeries ("product_A", "Product A", array(25601.34, 20148.82, 17372.76, 35407.15, 38105.68), array(
        "numberPrefix"=> '$',
        "seriesDisplayType"=> 'column'
    ));
    $chart->addSeries ("product_B", "Product B", array(57401.85, 41941.19, 45263.37, 117320.16, 114845.27), array(
        "numberPrefix"=> '$',
        "seriesDisplayType"=> 'column'
    ));
    $chart->addSeries ("profit", "Profit %", array(20, 42, 10, 23, 16), array(
        "numberPrefix"=> '$',
        "seriesDisplayType"=> 'line',
        "yAxis"=> "profit"
    ));
    $this->addComponent ($chart);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
