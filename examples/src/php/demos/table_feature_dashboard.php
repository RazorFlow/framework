<?php
class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $table = new TableComponent("table1");
    $table->setCaption("List of items in stock");
    $table->setDimensions (12, 6);
    $table->addColumn('ProductID', 'Product ID');
    $table->addColumn('ProductName', 'Product Name');
    $table->addColumn('CategoryName', 'Category');
    $table->addColumn('UnitPrice', 'Price', array(
      'dataType' => 'number',
      'numberPrefix' => '$',
      'numberForceDecimals' => true,
      'numberDecimalPoints' => 2
    ));
    $table->addColumn('UnitsInStock', 'Stock');
    $table->addColumn('Discounted', 'Discounted?');

    $this->addComponent ($table);

  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
