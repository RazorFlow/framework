<?php

class SampleDashboard extends StandaloneDashboard {
    public function buildDashboard () {
        $form = new FormComponent("form");
        $form->setCaption("Test Form Component");
        $form->setDimensions(4, 4);

        $form->addTextField('name', 'Name');
        $form->addSelectField('products', 'Products', array('Beverages', 'Chips', 'Cookies', 'Cakes', 'Dairy Products', 'Poultry'), array('defaultSelectedIndex' => 2));
        $form->addMultiSelectField('cities', 'Cities', array('Bangalore', 'San Fransisco', 'New York', 'Melbourne', 'London', 'Rio De Jeneiro'), array('defaultSelectedOptions' => array(2, 4)));
        $form->addDateField('delivery_date', 'Delivery Date', array());
        $form->addDateRangeField('grace_period', 'Grace Period', array());
        $form->addNumericRangeField('units', 'Units in Stock', array(1, 2, 3));

        $this ->addComponent ($form);

    }
}

$db = new SampleDashboard();
$db->renderStandalone();

