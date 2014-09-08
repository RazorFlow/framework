<?php

class SampleDashboard extends StandaloneDashboard {

  public function buildDashboard() {
    $kpi = new KPIComponent('kpi');
    $kpi->setDimensions(4, 4);
    $kpi->setCaption('Downloads');
    $kpi->setValue(42);

    $kpi->valueConditionalFormat("value < 50", "green");
    $this->addComponent($kpi);

    $kpi1 = new KPIGroupComponent('kpi1');
    $kpi1->setDimensions(12, 2);
    $kpi1->setCaption('Sales by region 2013');

    $kpi1->addKPI('first', array(
      'caption' => 'Bangalore',
      'value' => 2766,
      'numberPrefix' => '$'
    ));

    $kpi1->addKPI('second', array(
      'caption' => 'Chennai',
      'value' => 1988,
      'numberPrefix' => '$'
    ));

    $kpi1->addKPI('third', array(
      'caption' => 'Delhi',
      'value' => 1988,
      'numberHumanize' => true
    ));

    $kpi1->valueConditionalFormat("value > 2000", "green");
    $kpi1->valueConditionalFormat("value <= 2000", "red");

    $kpi3 = new KPITableComponent('kpi3');
    $kpi3->setDimensions(4, 5);
    $kpi3->setCaption('Sales by region 2013');

    $kpi3->addKPI('first', array(
      'caption' => 'Bangalore',
      'value' => 2766,
      'numberPrefix' => '$'
    ));

    $kpi3->addKPI('second', array(
      'caption' => 'Chennai',
      'value' => 1988,
      'numberPrefix' => '$'
    ));

    $kpi3->addKPI('third', array(
      'caption' => 'Delhi',
      'value' => 1988,
      'numberPrefix' => '$'
    ));

    $kpi3->valueConditionalFormat("value == 1988", "green");
    $kpi3->valueConditionalFormat("value < 1988", "red");

    $this->addComponent($kpi1);
    $this->addComponent($kpi3);
  }

}

$db = new SampleDashboard();
$db->renderStandalone();
