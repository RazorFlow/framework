<?php
class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    
    $categories = ['Beverages', 'Condiments', 'Confections', 'Dairy Products', 'Grains/Cereal', 'Meat/Poultry', 'Produce', 'Seafood'];
    $c1 = new TableComponent("table1");
    $c1->setCaption("List of items in stock");
    $c1->setDimensions (6, 6);
    $c1->addColumn('ProductID', 'Product ID');
    $c1->addColumn('ProductName', 'Product Name');
    $c1->addColumn('CategoryName', 'Category');
    $c1->addColumn('UnitPrice', 'Price', array(
      'dataType' => 'number',
      'numberPrefix' => '$',
      'numberForceDecimals' => true,
      'numberDecimalPoints' => 2
    ));
    $c1->addColumn('UnitsInStock', 'Stock');
    $c1->addColumn('Discontinued', 'Discontinued?');

    $this->addComponent($c1);

    $c2 = new FormComponent('form1');
    $c2->setCaption("Form items in stock");
    $c2->setDimensions (6, 6);
    $c2->addTextField('contains', 'Product Name Contains');
    $c2->addNumericRangeField ('stock', 'Units In Stock', array(10, 100));
    $c2->addCheckboxField ('discontinued', 'Exclude Discontinued Items', false);

    $this->addComponent($c2);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
