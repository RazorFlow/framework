<?php

class SampleDashboard extends StandaloneDashboard {

  public function buildDashboard() {
    $kpi = new KPIComponent('kpi');
    $kpi->setDimensions(4, 4);
    $kpi->setCaption('Downloads');
    $kpi->setValue(42);

    $this->addComponent($kpi);
  }

}

$db = new SampleDashboard();
$db->renderStandalone();
