
<?php

require "../../src/razorflow.php";

class SampleDashboard extends StandaloneDashboard {
    public function initialize () {
        $table = new TableComponent('table1');
        $table->setCaption("Table 1");
        $table->setDimensions (6,6);
        $table->setRowsPerPage (3);
        $table->addColumn('colA', "Column A");
        $table->addColumn('colB', "Column B");
        for ($i = 0; $i < 10; $i ++) {
            $table->addRow(array('colA' => $i * 2, 'colB' => $i * 2 + 1));
        }
        $this->addComponent ($table);

    }
}

$db = new SampleDashboard();
$db->setStaticRoot("http://localhost:9090");
$db->renderStandalone();

