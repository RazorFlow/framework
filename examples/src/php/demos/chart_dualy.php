<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $chart = new ChartComponent();
    $chart->setCaption("Visits from search engines");
    $chart->setDimensions (8, 6);
    $chart->setYAxis("Revenue", array(
        "numberPrefix"=> "$ ",
        "numberHumanize"=> true
    ));
    $chart->addYAxis('quantity', "Quantity", array());
    $chart->setCaption("Sales");    
    $chart->setLabels (["March", "April", "May", "June", "July"]);
    $chart->addSeries ("product_A", "Product A", [25601.34, 20148.82, 17372.76, 35407.15, 38105.68], array(
        "numberPrefix"=> '$',
        "seriesDisplayType"=> 'column'
    ));
    $chart->addSeries ("product_B", "Product B", [57401.85, 41941.19, 45263.37, 117320.16, 114845.27], array(
        "numberPrefix"=> '$',
        "seriesDisplayType"=> 'column'
    ));
    $chart->addSeries ("total_quantity", "Total Quantity", [45000, 44835, 42835, 77557, 92633], array(
        "numberPrefix"=> '$',
        "seriesDisplayType"=> 'line',
        "yAxis"=> "quantity"
    ));
    $this->addComponent ($chart);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
