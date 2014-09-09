<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $chart = new ChartComponent('chart');
    $chart->setCaption("Costs by division - 2013 vs 2012");
    $chart->setDimensions (8, 6);
    $chart->setLabels (array('Manufacturing', 'Publishing', 'Transportation', 'Communications'));
    $chart->addSeries ("sales2013", "2013", array(24400, 27800, 23800, 24800), array("seriesDisplayType"=> 'bar'));
    $chart->addSeries ("sales2012", "2012", array(15000, 15000, 17500, 20000), array("seriesDisplayType"=> 'bar'));
    $chart->setYAxis('', array("numberPrefix"=> '$', "numberHumanize"=> true));
    $this->addComponent ($chart);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
