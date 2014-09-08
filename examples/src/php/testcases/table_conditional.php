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

        $table->cellConditionalFormat("colA", "value>300", array("cellBackgroundColor"=>"#000", "cellTextColor"=> "#fff"));

        $this->addComponent ($table);
    }
}

$db = new SampleDashboard();
$db->renderStandalone();

