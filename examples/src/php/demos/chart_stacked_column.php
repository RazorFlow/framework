<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $chart = new ChartComponent('chart');
    $chart->setCaption("Most useful search engines for website traffic");
    $chart->setDimensions (8, 6);
    $chart->setLabels (["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]);
    $chart->setYAxis("no. of unique visits", array(
        "numberPrefix"=> "$"
    ));
    $chart->addSeries ("Google", "Google", [3040, 2794, 3026, 3341, 2800, 2507, 3701, 2671, 2980, 2041, 1813, 1691], array(
        "seriesStacked"=> true,
        "seriesDisplayType"=> "column"
    ));
    $chart->addSeries ("Yahoo", "Yahoo", [1200, 1124, 1006, 921, 1500, 1007, 921, 971, 1080, 1041, 1113, 1091], array(
        "seriesStacked"=> true,
        "seriesDisplayType"=> "column"
    ));
    $chart->addSeries ("MSN", "MSN", [600, 724, 806, 621, 700, 907, 821, 671, 880, 641, 913, 691], array(
        "seriesStacked"=> true,
        "seriesDisplayType"=> "column"
    ));
    $chart->addSeries ("Others", "Others", [965, 771, 732, 611, 700, 607, 621, 751, 800, 741, 813, 791], array(
        "seriesStacked"=> true,
        "seriesDisplayType"=> "column"
    ));
    $this->addComponent ($chart);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
