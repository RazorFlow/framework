<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $chart = new ChartComponent("2011_sales");
    $chart->setDimensions (4, 4);
	$chart->setCaption("Stacked Column Chart");	
	$chart->setYAxis ("", array(
		'numberPrefix' => "$"
	));
	$chart->setLabels (["Jan", "Feb", "Mar"]);
	$chart->addSeries ("beverages", "Beverages", [1355, 1916, 1150], array(
		'numberPrefix' => "$",
		'seriesStacked' => true,
		'seriesDisplayType' => "column"
	));
	
	$chart->addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321], array(
		'numberPrefix' => "$",
		'seriesStacked' => true,
		'seriesDisplayType' => "column"
	));
	$chart->addSeries ("vegetables", "Vegetables", [1313, 1976, 924], array(
		'numberPrefix' => "$",
		'seriesStacked' => true,
		'seriesDisplayType' => "column"
	));
    $this->addComponent ($chart);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
