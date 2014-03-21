<?php

require "../src/razorflow.php";

class SampleDashboard extends StandaloneDashboard {
  public function initialize(){
    $c1 = new FilterComponent("c1");
    $c1->setCaption("Test Filter Component");
    $c1->setDimensions (6, 6);
    $c1->addTextFilter('name', 'Name');
    $c1->addSelectFilter('products', 'Products', array('Beverages', 'Chips', 'Cookies', 'Cakes', 'Dairy Products', 'Poultry'), array());
    $c1->addMultiSelectFilter('cities', 'Cities', array('Bangalore', 'San Fransisco', 'New York', 'Melbourne', 'London', 'Rio De Jeneiro'), array());
    $c1->addDateFilter('delivery_date', 'Delivery Date', array());
    $c1->addDateRangeFilter('grace_period', 'Grace Period', array());
    $c1->addNumericRangeFilter('units', 'Units in Stock', array(1, 2, 3));

    $this ->addComponent ($c1);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
