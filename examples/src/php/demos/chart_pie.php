<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $chart = new ChartComponent();
    $chart->setCaption("Expenditures Incurred in Publishing a Book");
    $chart->setDimensions (8, 6);
    $chart->setLabels (["Paper Cost", "Binding", "Printing Cost", "Royality", "Transportation Cost", "Promotion Cost"]);
    $chart->setPieValues ([25, 20, 20, 15, 10, 10]);

    $this->addComponent ($chart);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
