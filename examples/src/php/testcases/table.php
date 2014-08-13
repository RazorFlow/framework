<?php

class SampleDashboard extends StandaloneDashboard {
    public function buildDashboard () {
        $table = new TableComponent('table1');
        $table->setCaption("Table 1");
        $table->setDimensions (6,6);
        $table->setRowsPerPage (8);
        $table->addColumn('colA', "Column A");
        $table->addColumn('colB', "Column B");

        for ($i = 0; $i < 10; $i ++) {
            // Single Row
            $table->addRow(array('colA' => $i * 2, 'colB' => $i * 2 + 1));
        }

        // Multiple Rows
        $rows = array(
          array('colA' => 111, 'colB' => 22),
          array('colA' => 222, 'colB' => 33),
          array('colA' => 333, 'colB' => 44)
        );
        $table->addMultipleRows($rows);

        $this->addComponent ($table);
    }
}

$db = new SampleDashboard();
$db->renderStandalone();

