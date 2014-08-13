<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){

    // $kpi1 = new KPIGroupComponent('kpi1');
    // $kpi1->setDimensions(3, 2);
    // $kpi1->setCaption('Click Update');
    // $kpi1->setValue(40);

    // $kpi2 = new KPIComponent('kpi2');
    // $kpi2->setDimensions(3, 2);
    // $kpi2->setCaption('Click Remove');
    // $kpi2->setValue(44);

    $kpi = new KPIGroupComponent('kpi');
    $kpi->setDimensions(12, 2);
    $kpi->setCaption('Sales by region 2013');

    $kpi->addKPI('first', array(
      'caption' => 'Bangalore',
      'value' => 2766,
      'numberPrefix' => '$'
    ));

    $kpi->addKPI('second', array(
      'caption' => 'Chennai',
      'value' => 1988,
      'numberPrefix' => '$'
    ));

    $kpi->addKPI('third', array(
      'caption' => 'Delhi',
      'value' => 1988,
      'numberHumanize' => true
    ));

    $kpi->setKPIValueColor('first', 'green');
    $kpi->setKPICaptionColor('second', 'red');

    // $kpi1->bindToEvent('valueClick', array($kpi), 'handleUpdate', $this);
    // $kpi2->bindToEvent('valueClick', array($kpi), 'handledelete', $this);

    $this->addComponent($kpi);
    // $this->addComponent($kpi1);
    // $this->addComponent($kpi2);
  }

  public function handleUpdate($source, $targets, $params) {
    $kpi = $this->getComponentByID('kpi');
    $kpi->updateKPI('first', array(
      'caption' => 'Kochi',
      'value' => 4000
    ));
    $kpi->setKPIValueColor('first', 'red');
  }

  public function handleDelete($source, $targets, $params) {
    $kpi = $this->getComponentByID('kpi');
    $kpi->deleteKPI('second');
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
