<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $chart = new ChartComponent('chart');
    $chart->setCaption("Visits by Month");
    $chart->setDimensions (8, 6);
    $chart->setLabels (["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]);
    $chart->addSeries ("sales_2013", "2013", [420000, 460000, 480000, 520000, 560000, 510000, 470000, 430000, 420000, 370000, 360000, 360000], array(
        "seriesDisplayType"=> "area"
    ));
    $chart->setYAxis('', array("numberPrefix"=> '$', "numberHumanize"=> true));
    $this->addComponent ($chart);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
