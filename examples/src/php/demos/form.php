<?php
class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $form = new FormComponent ('form');
    $form->setDimensions (8, 6);
    $form->setCaption ('Form items in stock');
    $form->addSelectField ('category', 'Select Category', ['No Selection', 'Beverages', 'Condiments', 'Confections', 'Dairy Products', 'Grains/Cereal', 'Meat/Poultry', 'Produce', 'Seafood']);
    $form->addTextField ('contains', 'Product Name Contains');
    $form->addNumericRangeField('stock', 'Units In Stock', array(10, 100));
    $form->addCheckboxField('discontinued', 'Exclude Discontinued Items', false);
    $this->addComponent ($form);

  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
