<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard(){
    $chart = new ChartComponent("my_first_chart");
    $chart->setCaption("Expenses incurred on Food Consumption by Year");
    $chart->setDimensions (6, 6);
    $chart->setLabels (["2009", "2010", "2011"]);
    $chart->addSeries ("beverages", "Beverages", [1355, 1916, 1150]);
    $chart->addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321]);

    $chart->addComponentKPI("first", array(
      "caption" => "Number Formatter",
      "value" => 4200000,
      "numberPrefix" => "$",
      "numberHumanize" => true
    ));
    $chart->addComponentKPI("second", array(
      "caption" => "Long Text with blah blah blah",
      "value" => 200,
      "numberForceDecimals" => true
    ));
    $chart->addComponentKPI("third", array(
      "caption" => "new",
      "value" => 20,
      "numberSuffix" => "%"
    ));
    $chart->addComponentKPI("forth", array(
      "caption" => "again",
      "value" => 100
    ));

    $chart2 = new ChartComponent("my_second_chart");
    $chart2->setCaption("Update Chart");
    $chart2->setDimensions (6, 6);
    $chart2->setLabels (["2009", "2010", "2011"]);
    $chart2->addSeries ("beverages", "Beverages", [1355, 1916, 1150]);
    $chart2->addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321]);

    $chart2->addComponentKPI("first", array(
      "caption" => "Number Formatter",
      "value" => 4200000,
      "numberPrefix" => "$",
      "numberHumanize" => true
    ));
    $chart2->addComponentKPI("second", array(
      "caption" => "Long Text with blah blah blah",
      "value" => 200,
      "numberForceDecimals" => true
    ));
    $chart2->addComponentKPI("third", array(
      "caption" => "new",
      "value" => 20,
      "numberSuffix" => "%"
    ));

    $chart3 = new ChartComponent("my_third_chart");
    $chart3->setCaption("Update Chart");
    $chart3->setDimensions (6, 6);
    $chart3->setLabels (["2009", "2010", "2011"]);
    $chart3->addSeries ("beverages", "Beverages", [1355, 1916, 1150]);
    $chart3->addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321]);

    $chart3->addComponentKPI("first", array(
      "caption" => "Number Formatter",
      "value" => 4200000,
      "numberPrefix" => "$",
      "numberHumanize" => true
    ));
    $chart3->addComponentKPI("second", array(
      "caption" => "Long Text with blah blah blah",
      "value" => 200,
      "numberForceDecimals" => true
    ));
    $chart3->addComponentKPI("third", array(
      "caption" => "new",
      "value" => 20,
      "numberSuffix" => "%"
    ));

    $chart2->onItemClick(array($chart2), 'handleClick', $this);
    $chart3->onItemClick(array($chart3), 'handleClickRemove', $this);
    $this->addComponent ($chart);
    $this->addComponent ($chart2);
    $this->addComponent ($chart3);
  }

  public function handleClick($source, $targets, $params) {
    $chart2 = $this->getComponentByID('my_second_chart');
    $chart2->updateComponentKPI('first', array(
      'caption' => $params['label'],
      'value' => $params['value']
    ));
  }

  public function handleClickRemove($source, $target, $params) {
    $chart3 = $this->getComponentByID('my_third_chart');
    $chart3->removeComponentKPI('first');
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
