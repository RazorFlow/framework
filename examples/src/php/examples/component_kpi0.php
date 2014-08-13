<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $chart = new ChartComponent("my_first_chart");
    $chart->setCaption("Expenses incurred on Food Consumption by Year");
    $chart->setDimensions (6, 6);
    $chart->setLabels (["2009", "2010", "2011"]);
    $chart->addSeries ("beverages", "Beverages", [13552, 19126, 12150]);
    $chart->addSeries ("packaged_foods", "Packaged Foods", [13152, 13126, 14150]);

    $chart->addComponentKPI ("total_sales", array(
		'caption' => "Total Sales",
		'value' => 41332,
		'numberPrefix' => "$"
	));

	$chart->addComponentKPI ("total_profit", array(
		'caption' => "Total Profit",
		'value' => 31215,
		'numberPrefix' => "$",
		'numberHumanize' => true,
		'numberDecimalPoints' => 0
	));

    $this->addComponent ($chart);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
