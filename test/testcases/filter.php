<?php

require "../../src/razorflow.php";

class SampleDashboard extends StandaloneDashboard {
    public function initialize () {
        $filter = new FilterComponent("filter");
        $filter->setCaption("Test Filter Component");
        $filter->setDimensions(4, 4);

        $filter->addTextFilter('name', 'Name');
        $filter->addSelectFilter('products', 'Products', array('Beverages', 'Chips', 'Cookies', 'Cakes', 'Dairy Products', 'Poultry'), array());
        $filter->addMultiSelectFilter('cities', 'Cities', array('Bangalore', 'San Fransisco', 'New York', 'Melbourne', 'London', 'Rio De Jeneiro'), array());
        $filter->addDateFilter('delivery_date', 'Delivery Date', array());
        $filter->addDateRangeFilter('grace_period', 'Grace Period', array());
        $filter->addNumericRangeFilter('units', 'Units in Stock', array(1, 2, 3));

        $this ->addComponent ($filter);

    }
}

$db = new SampleDashboard();
$db->setStaticRoot("http://localhost:9090");
$db->renderStandalone();

