<?php

class A extends Dashboard {

  public function buildDashboard() {
    $kpi = new KPIComponent('a');
    $kpi->setDimensions(3, 3);
    $kpi->setCaption('AAA');
    $kpi->setValue(11);

    $this->setDashboardTitle('DB 1');
    $this->log('message', 'Hello');
    $this->addComponent($kpi);
  }

}

class B extends Dashboard {

  public function buildDashboard() {
    $kpi = new KPIComponent('b');
    $kpi->setDimensions(3, 3);
    $kpi->setCaption('BBB');
    $kpi->setValue(22);

    $this->setDashboardTitle('DB 2');
    $this->addComponent($kpi);
  }
}

class C extends Dashboard {

  public function buildDashboard() {
    $kpi = new KPIComponent('c');
    $kpi->setDimensions(3, 3);
    $kpi->setCaption('CCC');
    $kpi->setValue(33);
    
    $this->setDashboardTitle('DB 3');
    $this->addComponent($kpi);
  }
}

