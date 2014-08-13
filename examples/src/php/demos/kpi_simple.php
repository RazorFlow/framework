<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $kpi = new KPIComponent ("sales_kpi");
    $kpi->setDimensions (3, 2);
    $kpi->setCaption ("Sales in 24h");
    $kpi->setValue (3145, array(
        "numberPrefix" => "$"
    ));
    
    $this->addComponent ($kpi);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
