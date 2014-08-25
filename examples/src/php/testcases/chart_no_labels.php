<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $chart = new ChartComponent('chart');
    $chart->setCaption("No Labels");
    $chart->setDimensions (2, 2);
    $chart->setLabels(array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'));
    $chart->addSeries("seriesA", "Series A", [1, 3, 5, 1, 9, 3, 5, 1, 9, 3, 5, 1, 9, 1, 2, 3, 1], array('seriesDisplayType' => 'line', 'numberPrefix' => '$'));
    $chart->setOption('showLabelFlag', false);

    $this->addComponent ($chart);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
