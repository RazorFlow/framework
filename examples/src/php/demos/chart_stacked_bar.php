<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $chart = new ChartComponent();
    $chart->setCaption("Most spent on activity in a company");
    $chart->setDimensions (8, 6);
    $chart->setLabels (array("Software Deveplopemt", "Social Networking", "Communication", "Reference", "Utility"));
    $chart->addSeries ("john", "John", array(1.1, 0.3, 1.3, 2.2, 1.6), array(
        "seriesStacked"=> true,
        "seriesDisplayType"=> "bar"
    ));
    $chart->addSeries ("mark", "Mark", array(2.1, 0.6, 1.8, 0.9, 1.4), array(
        "seriesStacked"=> true,
        "seriesDisplayType"=> "bar"
    ));
    $chart->setYAxis('', array("numberSuffix"=> 'h'));
    $this->addComponent ($chart);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
