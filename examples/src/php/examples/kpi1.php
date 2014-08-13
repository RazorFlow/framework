<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
  	$kpi = new KPIComponent ('kpi');
  	$kpi->setCaption ('Sales');
  	$kpi->setDimensions (3, 3);
  	$kpi->setValue (42, array(
  		'numberPrefix' => '$',
  		'valueTextColor' => '#ff000d'
	));

    $this->addComponent ($kpi);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  