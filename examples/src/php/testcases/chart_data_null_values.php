<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $chart = new ChartComponent("my_first_chart");
    $chart->setCaption("Expenses incurred on Food Consumption by Year");
    $chart->setDimensions (8, 6);
    $chart->setLabels (array(
      "2014-09-01",
      "2014-09-02",
      "2014-09-03",
      "2014-09-04",
      "2014-09-05",
      "2014-09-06",
      "2014-09-07",
      "2014-09-08",
      "2014-09-09",
      "2014-09-10",
      "2014-09-11",
      "2014-09-12",
      "2014-09-13",
      "2014-09-14",
      "2014-09-15",
      "2014-09-16",
      "2014-09-17",
      "2014-09-18",
      "2014-09-19",
      "2014-09-20",
      "2014-09-21",
      "2014-09-22",
      "2014-09-23",
      "2014-09-24",
      "2014-09-25",
    ));
    $chart->addSeries ("spending", "Spending", array(
      3890,
      2837,
      2551,
      2482,
      2903,
      2517,
      2359,
      1888,
      1711,
      1782,
      1551,
      1564,
      1730,
      1324,
      1391,
      1376,
      1365,
      1226,
      1213,
      NULL,
      "NULL1",
      NULL,
      NULL,
      NULL,
      NULL + "1000"
    ), array('seriesDisplayType' => 'area', 'numberHumanize' => true));
    $chart->addSeries ("beverages", "Beverages", array(
      3890,
      2837,
      2551,
      2482,
      2903,
      2517,
      2359,
      1888,
      1711,
      1782,
      1551,
      1564,
      1730,
      1324,
      1391,
      1376,
      1365,
      1226,
      1213,
      NULL,
      "NULL2",
      NULL,
      NULL,
      NULL,
      NULL + "1000"
    ), array('seriesDisplayType' => 'line', 'numberHumanize' => true));

    $this->addComponent ($chart);
  }

}

$db = new SampleDashboard();
$db->renderStandalone();
  
