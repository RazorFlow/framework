<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $kpi = new KPITableComponent ('kpi');
    $kpi->setDimensions (4, 6);
    $kpi->setCaption('Food Units Available');

    $kpi->addKPI('grains_cereals', array(
      'caption' => 'Grains/Cereals',
      'value' => 308,
      'numberSuffix' => ' units'
    ));
    $kpi->addKPI('meat_poultry', array(
      'caption' => 'Meat/Poultry',
      'value' => 165,
      'numberSuffix' => ' units'
    ));
    $kpi->addKPI('produce', array(
      'caption' => 'Produce',
      'value' => 100,
      'numberSuffix' => ' units'
    ));
    $kpi->addKPI('seafood', array(
      'caption' => 'Sea Food',
      'value' => 701,
      'numberSuffix' => ' units'
    ));

    $this->addComponent ($kpi);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  