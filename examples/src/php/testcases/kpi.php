<?php

class SampleDashboard extends StandaloneDashboard {

  public function buildDashboard() {
    $kpi = new KPIComponent('kpi');
    $kpi->setDimensions(4, 4);
    $kpi->setCaption('Downloads');
    $kpi->setValue(42);

    $kpi->bindToEvent ("kpiClick", array($kpi), "handleKPIClick", $this);

    $this->addComponent($kpi);
  }

  public function handleKPIClick($source, $targets, $params) {
    $source->setValue(100);
  }

}

$db = new SampleDashboard();
$db->renderStandalone();
