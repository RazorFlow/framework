<?php
class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $kpi1 = new KPIComponent("kpi1");
    $kpi1->setCaption("Average Monthly Sales");
    $kpi1->setDimensions (4, 2);
    $kpi1->setValue(513.22, array(
      'numberPrefix' => '$'
    ));

    $this->addComponent ($kpi1);

    $kpi2 = new KPIComponent("kpi2");
    $kpi2->setCaption("Average Monthly Units");
    $kpi2->setDimensions (4, 2);
    $kpi2->setValue(22);
    $kpi2->setSparkValues(
      ['Jan', "Feb", 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      [12.31, 10.34, 10.26, 9, 8.21, 13.41, 14.43, 23.31, 13.41, 11.4, 28.34, 29.21]
    );

    $this->addComponent ($kpi2);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
