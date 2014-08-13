<?php

class SampleDashboard extends StandaloneDashboard {

  private $dimensions, $kpiComponents;

  public function __construct(){
    $this->dimensions = array(
      array(1, 2),
      array(2, 2),
      array(3, 2),
      array(6, 2)
    );
  }

  public function buildDashboard () {
    $this->setDashboardTitle('KPI Basic Test Cases');

    $kpiComponents1 = $this->fillData("kpi1", 42, "Small Label");
    $kpiComponents2 = $this->fillData("kpi2", 421315, "A long label which is also quite common in applications");
    $kpiComponents3 = $this->fillData("kpi3", 415, "Hello World", array(
      "spark" => array(
        array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'),
        array(20, 32, 34, 12, 4, 16)
      )
    ));

    $this->kpiComponents = array(
      $kpiComponents1,
      $kpiComponents2,
      $kpiComponents3
    );

    $this->buildAll();
  }

  private function fillData($id, $kpiValue, $caption, $options=array()){
    $components = [];

    foreach($this->dimensions as $key=>$value){
      $kpi = new KPIComponent("kpi".$id.$key);
      $kpi->setDimensions ($value[0], $value[1]);
      $kpi->setCaption ($caption);
      $kpi->setValue ($kpiValue);

      if(array_key_exists('spark', $options)){
        $spark = $options['spark'];
        $kpi->setSparkValues ($spark[0], $spark[1]);
      }

      $components []= $kpi;
    }

    return $components;
  }

  private function buildAll(){
    foreach($this->kpiComponents as $kpiComponent){
      foreach($kpiComponent as $kpi){
        $this->addComponent($kpi);
      }
    }
  }

}

$db = new SampleDashboard();
$db->renderStandalone();
