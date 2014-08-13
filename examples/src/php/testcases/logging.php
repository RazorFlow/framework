<?php

class SampleDashboard extends StandaloneDashboard {
    public function buildDashboard () {
        $kpi = new KPIComponent("kpi1");
        $kpi->setCaption("Hello world");
        $kpi->setValue(42);
        $kpi->setDimensions(4, 4);
        $kpi->setSparkValues(
          array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'),
          array(20, 32, 34, 12, 4, 16)
        );

        $kpi2 = new KPIComponent("kpi2");
        $kpi2->setCaption("Hello world");
        $kpi2->setValue(42);
        $kpi2->setDimensions(4, 4);
        $kpi2->setSparkValues(
          array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'),
          array(20, 32, 34, 12, 4, 16)
        );

        $this->log('KPI Object', "hello");
        $this->log('KPI', "I am a kpi object");

        $kpi->bindToEvent ("kpiClick", array($kpi), "handleKPIClick", $this);
        $kpi2->bindToEvent ("kpiClick", array($kpi2), "handleKPIClick2", $this);
        $this->addComponent ($kpi);
        $this->addComponent ($kpi2);

    }

    public function handleKPIClick ($source, $targets, $params) {
        $kpi2 = $this->getComponentByID("kpi1");
        $kpi2->setValue (55);
        $kpi2->setCaption ("Hello to you too");
        $this->log('A', $params);
    }

    public function handleKPIClick2 ($source, $targets, $params) {
        $this->log('Yo', 44);
        // $kpi2 = $this->getComponentByID("kpi1");
        // $kpi2->setValue (55);
        // $kpi2->setCaption ("Hello to you too");
        hello();
        $this->log('A', $params);
    }
}

$db = new SampleDashboard();
$db->renderStandalone();
