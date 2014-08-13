<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
  	$kpi = new KPIComponent ('kpi');
  	$kpi->setCaption ('Open support tickets');
  	$kpi->setDimensions (3, 3);
  	$kpi->setValue (19);

    $this->addComponent ($kpi);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  