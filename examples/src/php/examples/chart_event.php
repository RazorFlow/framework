<?php

class SampleDashboard extends StandaloneDashboard {

  public function buildDashboard(){
    $chart = new ChartComponent("chart");
    $chart->setCaption("Expenses incurred for Food Consumption by Year");
    $chart->setDimensions (4, 4);
    $chart->setLabels (array("2009", "2010", "2011"));
    $chart->addSeries ("beverages", "Beverages", [1355, 1916, 1150], array('numberPrefix' => '$'));
    $chart->addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321], array('numberPrefix' => '$'));
    $this->addComponent ($chart);

    $kpi = new KPIComponent("kpi");
    $kpi->setValue(0, array('numberPrefix' => '$'));
    $kpi->setDimensions(4, 4);
    $this->addComponent ($kpi);

    $chart->onItemClick (array($kpi), 'handleClick', $this);
  }

  public function handleClick ($source, $targets, $params) {
  	$kpi = $this->getComponentById ('kpi');
  	$kpi->setValue ($params['value']);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
