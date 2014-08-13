<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){

    $gauge = new GaugeComponent("gauge");
    $gauge->setDimensions(4,3);
    $gauge->setCaption('Points');
    $gauge->setValue(144, array("numberPrefix" => '$'));
    $gauge->setLimits(0, 200);

    $this->addComponent($gauge);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
