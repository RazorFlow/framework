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
        $table->addSparkColumn('customer', "Customers");
        
        $data = array(
          array("zone" => "North", "name" => "Northern Stores", "sale" => 4000, "customer" => array(5, 3, 4, 8)),
          array("zone" => "South", "name" => "Southern Stores", "sale" => 4500, "customer" => array(10, 6, 15, 8))
        );

        $table->addMultipleRows($data);

        $this->addComponent ($table);
    }
}

$db = new SampleDashboard();
$db->renderStandalone();
