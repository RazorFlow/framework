<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $c1 = new FormComponent("c1");
    $c1->setCaption("Test Form Component");
    $c1->setDimensions (6, 6);
    $c1->addTextField('name', 'Name');
    $c1->addSelectField('products', 'Products', array('Beverages', 'Chips', 'Cookies', 'Cakes', 'Dairy Products', 'Poultry'), array());
    $c1->addMultiSelectField('cities', 'Cities', array('Bangalore', 'San Fransisco', 'New York', 'Melbourne', 'London', 'Rio De Jeneiro'), array());
    $c1->addDateField('delivery_date', 'Delivery Date', array());
    $c1->addDateRangeField('grace_period', 'Grace Period', array());
    $c1->addNumericRangeField('units', 'Units in Stock', array(0, 100));

    $kpi = new KPIComponent('kpi1');
    $kpi->setCaption('Stock');
    $kpi->setDimensions(4, 4);
    $kpi->setValue(24);

    $this->addComponent($kpi);
    $this->addComponent ($c1);

    $c1->onApplyClick(array($kpi), 'handleApply', $this);
  }

  public function handleApply($source, $target, $params) {
    $c1 = $this->getComponentByID('c1');
    $kpi = $this->getComponentByID('kpi1');
    $caption = $c1->getInputValue('products')['text'];
    $units = $c1->getInputValue('units');

    $kpi->setCaption($caption);
    $kpi->setValue($units[1]);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
