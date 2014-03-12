<?php

require "../../src/razorflow.php";

class SampleDashboard extends StandaloneDashboard {
    public function initialize () {
        $kpi = new KPIComponent("foo");
        $kpi->setCaption("Hello world");
        $kpi->setValue(42);
        $kpi->setDimensions(4, 4);
        $this->addComponent ($kpi);

        // $table = new TableComponent('table1');
        // $table->setCaption("Table 1");
        // $table->setDimensions (6,6);
        // $table->addColumn('colA', "Column A");
        // $table->addColumn('colB', "Column B");
        // for ($i = 0; $i < 10; $i ++) {
        //     $table->addRow(array('colA' => $i * 2, 'colB' => $i * 2 + 1));
        // }
        // $this->addComponent ($table);

        $kpi2 = new KPIComponent("kpi2");
        $kpi2->setCaption("KPI 2");
        $kpi2->setValue(45);
        $kpi2->setDimensions(4, 4);
        $this->addComponent ($kpi2);

        $kpi->bindToEvent ("kpiClick", array($kpi2), "handleKPIClick");
    }

    public function handleKPIClick ($source, $target, $params) {
        die ("Handling kpi click");
    }
}

$db = new SampleDashboard();
$db->setStaticRoot("http://localhost:9090");
$db->renderStandalone();

