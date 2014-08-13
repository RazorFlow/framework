<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $sourceChart = new ChartComponent("sourceChart");
    $sourceChart->setDimensions (4, 4);
    $sourceChart->setCaption("2011 Sales"); 
    $sourceChart->setLabels (["Beverages", "Vegetables"]);
    $sourceChart->addSeries ("sales", "Sales", [1343, 7741]);
    $sourceChart->addSeries ("quantity", "Quantity", [76, 119]);
    $this->addComponent ($sourceChart);

    $targetChart = new ChartComponent("targetChart");
    $targetChart->hideComponent();
    $this->addComponent ($targetChart);

    $sourceChart->onItemClick (array($sourceChart, $targetChart), "handleItemClick", $this);
  }

  public function handleItemClick ($source, $targets, $params) {
    $targetChart = $this->getComponentByID('targetChart');
    $targetChart->setCaption ("Zone-wise breakdown of " . $params['label']);
    // You can form/process the data as required.
    $targetChart->setLabels (["North Zone", "South Zone"]);
    $targetChart->addSeries ("sales", "Sales", [21, 46]);
    $targetChart->showAsModal();
  }

}

$db = new SampleDashboard();
$db->renderStandalone();

