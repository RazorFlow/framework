<?php

require "../../src/razorflow.php";

class SampleDashboard extends StandaloneDashboard {
    public function initialize () {
        $kpi = new KPIComponent("foo");
        $kpi->setCaption("Hello world");
        $kpi->setValue(42);
        $kpi->setDimensions(4, 4);
        $this->addComponent ($kpi);
    }
}

$db = new SampleDashboard();
$db->setStaticRoot("http://localhost:9090");
$db->renderStandalone();

