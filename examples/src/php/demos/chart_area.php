<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $chart = new ChartComponent('chart');
    $chart->setCaption("Number of monthly unique visitors on a website in 2013");
    $chart->setDimensions (8, 6);
    $chart->setLabels (array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"));
    $chart->addSeries ("sales_2013", "2013", array(420000, 460000, 480000, 520000, 560000, 510000, 470000, 430000, 420000, 370000, 360000, 360000), array(
        "seriesDisplayType"=> "area"
    ));
    $chart->setYAxis('Number of visitors', array("numberPrefix"=> '$', "numberHumanize"=> true));
    $this->addComponent ($chart);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
