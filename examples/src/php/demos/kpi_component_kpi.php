<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $chart = new ChartComponent("Sales - 2013 v 2012");
    $chart->setCaption("Sales - 2013 v 2012");
    $chart->setDimensions (8, 6);
    $chart->setLabels (["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]);
    $chart->addSeries ("2013", "2013", [22400, 24800, 21800, 21800, 24600, 27600, 26800, 27700, 23700, 25900, 26800, 24800]);
    $chart->addSeries ("2012", "2012", [10000, 11500, 12500, 15000, 16000, 17600, 18800, 19700, 21700, 21900, 22900, 20800]);
    $chart->setYAxis('', array("numberPrefix"=> '$', "numberHumanize"=> true));
    $chart->addComponentKPI('beverages', array(
      'caption' => 'Beverages',
      'value' => 559,
      'numberSuffix' => ' units'
    ));
    $chart->addComponentKPI('condiments', array(
      'caption' => 'Condiments',
      'value' => 507,
      'numberSuffix' => ' units'
    ));
    $chart->addComponentKPI('confections', array(
      'caption' => 'Confections',
      'value' => 386,
      'numberSuffix' => ' units'
    ));
    $chart->addComponentKPI('daily_products', array(
      'caption' => 'Daily Products',
      'value' => 393,
      'numberSuffix' => ' units'
    ));
    $this->addComponent ($chart);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
