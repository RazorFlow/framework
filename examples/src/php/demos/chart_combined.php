<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $chart = new ChartComponent();
    $chart->setCaption("Company Revenue and Profits");
    $chart->setDimensions (8, 6);
    $chart->setLabels (array("Aug", "Sept", "Oct", "Nov", "Dec"));
    $chart->addSeries ("revenue", "Product A", array(20000, 17000, 22000, 19000, 23000), array(
        "numberPrefix" => "$"
    ));

    $chart->addYAxis("profit", "Profit %", array(
        "numberSuffix" => "%"
    ));

    $chart->addSeries ("profit", "Profit %", array(25, 5.88, 36.36, 10.52, 30.43), array(
        "seriesDisplayType"=> "line",
        "numberSuffix" => "%",
        "yAxis" => "profit"
    ));
    $chart->setYAxis('Revenue', array("numberPrefix"=> '$', "numberHumanize"=> true));
    $this->addComponent ($chart);


    $chart1 = new ChartComponent();
    $chart1->setCaption("Company Sales");
    $chart1->setDimensions (6, 6);
    $chart1->setLabels (array("Jan", "Feb", "Mar", "Apr", "May", "June"));
    $chart1->addSeries ("Revenue", "Revenue", array(5854, 4171, 1375, 1875, 2246, 2696));
    $chart1->addSeries ("Profit", "Profit", array(3242, 3171, 700, 1287, 1856, 1126), array(
        "seriesDisplayType"=> "area"
    ));
    $chart1->addSeries ("Predicted_Profit", "Predicted Profit", array(4342, 2371, 740, 3487, 2156, 1326), array(
        "seriesDisplayType"=> "line"
    ));
    $chart1->setYAxis('Sales', array("numberPrefix"=> '$', "numberHumanize"=> true));
    $this->addComponent ($chart1);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
