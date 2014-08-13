<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $chart = new ChartComponent("Sales - 2013 v 2012");
    $chart->setCaption("Sales - 2013 v 2012");
    $chart->setDimensions (8, 6);
    $chart->setLabels (["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]);
    $chart->addSeries ("2013", "2013", [22400, 24800, 21800, 21800, 24600, 27600, 26800, 27700, 23700, 25900, 26800, 24800], array("seriesDisplayType"=>"line"));
    $chart->addSeries ("2012", "2012", [10000, 11500, 12500, 15000, 16000, 17600, 18800, 19700, 21700, 21900, 22900, 20800], array("seriesDisplayType"=>"line"));
    $chart->setYAxis('', array("numberPrefix"=> '$', "numberHumanize"=> true));
    $this->addComponent ($chart);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
