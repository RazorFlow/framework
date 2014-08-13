<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $kpi = new GaugeComponent ("num_tickets_closed");
    $kpi->setDimensions (6, 4);
    $kpi->setCaption ("# Closed/Total Tickets (24h)");
    $kpi->setLimits (0, 93);
    $kpi->setValue (33);
    
    $this->addComponent ($kpi);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
