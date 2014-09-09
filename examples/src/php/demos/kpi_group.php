<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $kpi = new KPIGroupComponent ('kpi');
    $kpi->setDimensions (12, 2);
    $kpi->setCaption('Available food items in the warehouse');

    $kpi->addKPI('beverages', array(
      'caption' => 'Beverages',
      'value' => 559,
      'numberSuffix' => ' units'
    ));
    $kpi->addKPI('condiments', array(
      'caption' => 'Condiments',
      'value' => 507,
      'numberSuffix' => ' units'
    ));
    $kpi->addKPI('confections', array(
      'caption' => 'Confections',
      'value' => 386,
      'numberSuffix' => ' units'
    ));
    $kpi->addKPI('daily_products', array(
      'caption' => 'Daily Products',
      'value' => 393,
      'numberSuffix' => ' units'
    ));

    $this->addComponent ($kpi);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  