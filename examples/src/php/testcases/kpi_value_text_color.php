<?php

class SampleDashboard extends StandaloneDashboard {
    public function buildDashboard () {
        $kpi = new KPIComponent("kpi1");
        $kpi->setCaption("Hello world");
        $kpi->setValue(42, array('valueTextColor' => 'red'));
        $kpi->setDimensions(4, 4);

        $kpi->bindToEvent ("kpiClick", array($kpi), "handleKPIClick", $this);

        $this->addComponent ($kpi);
    }

    public function handleKPIClick($source, $target, $params) {
      $source->setValue(76);
    }
}

$db = new SampleDashboard();
$db->renderStandalone();
