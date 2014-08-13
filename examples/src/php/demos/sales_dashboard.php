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
    $kpi1->setValue(324);

    $this->addComponent ($kpi1);

    $kpi2 = new KPIComponent("kpi2");
    $kpi2->setCaption("Sales in last 24h");
    $kpi2->setDimensions (3, 2);
    $kpi2->setValue(47, array(
      'numberPrefix' => '$'
    ));

    $this->addComponent ($kpi2);

    $kpi3 = new KPIComponent("kpi3");
    $kpi3->setCaption("Number of checkouts this week");
    $kpi3->setDimensions (3, 2);
    $kpi3->setValue(1024);

    $this->addComponent ($kpi3);

    $kpi4 = new KPIComponent("kpi4");
    $kpi4->setCaption("Total sales this week");
    $kpi4->setDimensions (3, 2);
    $kpi4->setValue(245, array(
      'numberPrefix' => '$'
    ));

    $this->addComponent ($kpi4);

    $chart1 = new ChartComponent("chart1");
    $chart1->setCaption("Sales per product category");
    $chart1->setDimensions (6, 6);
    $chart1->setLabels (['Beverages', 'Condiments', 'Dairy Products', 'Grains / Cereal', 'Meat / Poultry']);
    $sales = $this->randomGen(5, 4000);
    $chart1->addSeries('sales', 'Sales', $sales, array(
      'numberPrefix' => '$'
    ));
    $chart1->setYAxis('', array(
      'numberPrefix' => '$'
    ));

    $this->addComponent ($chart1);

    $chart2 = new ChartComponent("chart2");
    $chart2->setCaption("Sales per employee");
    $chart2->setDimensions (6, 6);
    $chart2->setLabels (['Robert', 'Margaret', 'Nancy', 'Andrew', 'Janet']);
    $chart2->addSeries ('sales', 'Sales', [56500, 57590, 65820, 79960, 82030], array(
      'seriesDisplayType' => 'column'
    ));
    $chart2->setYAxis ('', array(
      'numberPrefix' => '$'
    ));

    $this->addComponent ($chart2);

    $chart3 = new ChartComponent("chart3");
    $chart3->setCaption("Gender distribution of shoppers");
    $chart3->setDimensions (6, 6);
    $chart3->setLabels (['Female', 'Male']);
    $chart3->addSeries ('gender', 'Gender', [58, 42], array(
      'seriesDisplayType' => 'pie'
    ));

    $this->addComponent ($chart3);

    $chart4 = new ChartComponent("chart4");
    $chart4->setCaption("Age group of shoppers");
    $chart4->setDimensions (6, 6);
    $chart4->setLabels (['Under 15', '15-30', '30-45', '45-60', '60+']);
    $chart4->addSeries ('age', 'Age', [8, 28, 32, 22, 10], array(
      'seriesDisplayType' => 'column'
    ));

    $this->addComponent ($chart4);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
