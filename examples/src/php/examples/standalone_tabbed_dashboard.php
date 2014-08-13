<?php

class KPIDashboard extends Dashboard {
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

    $this->setDashboardTitle('KPI Dashboard');
    $this->setActive();
    $this->addComponent ($kpi2);
  }
}


class SalesDashboard extends Dashboard {
  public function buildDashboard(){
    $chart = new ChartComponent("2011_sales");
    $chart->setCaption("2011 Sales");
    $chart->setDimensions (4, 4);
    $chart->setLabels (["Beverages", "Vegetables"]);
    $chart->addSeries ("sales", "Sales", [1343, 7741]);
    $chart->addSeries ("quantity", "Quantity", [76, 119]);

    $this->setDashboardTitle('Sales Dashboard');
    $this->addComponent ($chart);
  }
}

class MyDashboard extends TabbedDashboard {
  public function buildDashboard() {
    $db1 = new KPIDashboard();
    $db2 = new SalesDashboard();

    $this->addDashboardTab($db1);
    $this->addDashboardTab($db2);
  }
}


$db = new MyDashboard();
$db->renderStandalone();
