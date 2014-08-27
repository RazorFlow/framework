<?php
class SampleDashboard extends StandaloneDashboard {

  private function randomGen($num, $max){
    $arr = [];
    for($i=0; $i<$num; $i++){
      $arr[]=( rand(100, $max) );
    }

    return $arr;
  }

  public function buildDashboard(){
    $kpi1 = new KPIComponent("kpi1");
    $kpi1->setCaption("Number of checkouts in 24h");
    $kpi1->setDimensions (3, 2);
    $kpi1->setValue(rand(100, 500));

    $this->addComponent ($kpi1);

    $kpi2 = new KPIComponent("kpi2");
    $kpi2->setCaption("Sales in last 24h");
    $kpi2->setDimensions (3, 2);
    $kpi2->setValue(rand(10, 50), array(
      'numberPrefix' => '$'
    ));

    $this->addComponent ($kpi2);

    $kpi3 = new KPIComponent("kpi3");
    $kpi3->setCaption("Number of checkouts this week");
    $kpi3->setDimensions (3, 2);
    $kpi3->setValue(rand(600, 1000));

    $this->addComponent ($kpi3);

    $kpi4 = new KPIComponent("kpi4");
    $kpi4->setCaption("Total sales this week");
    $kpi4->setDimensions (3, 2);
    $kpi4->setValue(rand(100, 300), array(
      'numberPrefix' => '$'
    ));

    $this->addComponent ($kpi4);

    $chart3 = new ChartComponent("chart3");
    $chart3->setCaption("Gender distribution of shoppers");
    $chart3->setDimensions (6, 6);
    $chart3->setLabels (['Female', 'Male']);
    $chart3->addSeries ('gender', 'Gender', array(rand(0, 100), rand(0, 100)), array(
      'seriesDisplayType' => 'pie'
    ));

    $this->addComponent ($chart3);

    $chart4 = new ChartComponent("chart4");
    $chart4->setCaption("Age group of shoppers");
    $chart4->setDimensions (6, 6);
    $chart4->setLabels (['Under 15', '15-30', '30-45', '45-60', '60+']);
    $chart4->addSeries ('age', 'Age', array(rand(1, 10), rand(20, 30), rand(30, 40), rand(20, 30), rand(1, 10)), array(
      'seriesDisplayType' => 'column'
    ));

    $this->addComponent ($chart4);
  }
}

$db = new SampleDashboard();
$db->setDashboardRefreshDelay(5000);
$db->renderStandalone();
  
