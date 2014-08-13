<?php

class SampleDashboard extends StandaloneDashboard {
    public function buildDashboard () {
        $table = new TableComponent('table1');
        $table->setCaption("Regional Sales");
        $table->setDimensions (4, 4);
        $table->setRowsPerPage (8);
        $table->addColumn('zone', "Zone");
        $table->addColumn('name', "Store Name");
        $table->addColumn('sale', "Sales Amount");
        
        $data = array(
          array("zone" => "North", "name" => "Northern Stores", "sale" => 4000),
          array("zone" => "South", "name" => "Southern Stores", "sale" => 4500)
        );

        $table->addMultipleRows($data);

        $this->addComponent ($table);
    }
}

$db = new SampleDashboard();
$db->renderStandalone();
