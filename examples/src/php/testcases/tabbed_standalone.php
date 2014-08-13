<?php

require 'sample_dashboards.php';

class SampleDashboard extends TabbedDashboard {

  public function buildDashboard() {
    $a = new A();
    $b = new B();
    $c = new C();
    $b->setActive();

    $this->addDashboardTab($a);
    $this->addDashboardTab($b);
    $this->addDashboardTab($c);
  }

}

$tabbed = new SampleDashboard();
$tabbed->renderStandalone();