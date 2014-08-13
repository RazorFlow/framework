<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $chart = new ChartComponent("Sales - 2013 v 2012");
    $chart->setCaption("Company Revenue");
    $chart->setDimensions (8, 6);
    $chart->setLabels (["Aug", "Sept", "Oct", "Nov", "Dec"]);
    $chart->addSeries ("prod_a", "Product A", [36000, 34300, 30000, 27800, 25000]);
    $chart->addSeries ("prod_b", "Product B", [31000, 29300, 26000, 21000, 20500]);
    $chart->addSeries ("Predicted", "Predicted", [25000, 23000, 20000, 18000, 14500], array(
        "seriesDisplayType"=> "line"
    ));
    $chart->addSeries ("avg", "2004 Avg.", [17000, 15000, 16000, 11500, 10000], array(
        "seriesDisplayType"=> "line"
    ));
    $chart->setYAxis('', array("numberPrefix"=> '$', "numberHumanize"=> true));
    $this->addComponent ($chart);


    $chart1 = new ChartComponent();
    $chart1->setCaption("Sales");
    $chart1->setDimensions (6, 6);
    $chart1->setLabels (["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]);
    $chart1->addSeries ("Revenue", "Revenue", [5854, 4171, 1375, 1875, 2246, 2696, 1287, 2140, 1603, 1628]);
    $chart1->addSeries ("Profit", "Profit", [3242, 3171, 700, 1287, 1856, 1126, 987, 1610, 903, 928], array(
        "seriesDisplayType"=> "area"
    ));
    $chart1->addSeries ("Predicted_Profit", "Predicted Profit", [4342, 2371, 740, 3487, 2156, 1326, 1087, 1710, 703, 928], array(
        "seriesDisplayType"=> "line"
    ));
    $chart1->setYAxis('', array("numberPrefix"=> '$', "numberHumanize"=> true));
    $this->addComponent ($chart1);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
