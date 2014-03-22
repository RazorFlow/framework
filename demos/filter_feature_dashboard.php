
<?php

require "../src/razorflow.php";

class SampleDashboard extends StandaloneDashboard {
  public function initialize(){
    
    $categories = ['Beverages', 'Condiments', 'Confections', 'Dairy Products', 'Grains/Cereal', 'Meat/Poultry', 'Produce', 'Seafood'];
    $c1 = new TableComponent("table1");
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

    $c2 = new FilterComponent('filter1');
    $c2->setDimensions (6, 6);
    $c2->addTextFilter('contains', 'Product Name Contains');
    $c2->addNumericRangeFilter ('stock', 'Units In Stock');
    $c2->addCheckboxFilter ('discontinued', 'Exclude Discontinued Items', false);

    $this->addComponent($c2);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
