<?php
class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){

    $c1 = new KPIComponent('kpi1');
    $c1->setDimensions (3, 2);
    $c1->setCaption ('KPI 1');
    $c1->setValue (42);

    $this->addComponent ($c1);

    $c2 = new KPIComponent('kpi2');
    $c2->setDimensions (3, 2);
    $c2->setCaption ('KPI 2');
    $c2->setValue (43);
    $this->addComponent ($c2);

    $c3 = new KPIComponent('kpi3');
    $c3->setDimensions (3, 2);
    $c3->setCaption ('KPI 3');
    $c3->setValue (44);
    $this->addComponent ($c3);

    $c1->overrideDisplayOrderIndex (2);
    $c2->overrideDisplayOrderIndex (1);
    $c3->overrideDisplayOrderIndex (0);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
