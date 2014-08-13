
<?php
require $_SERVER['DOCUMENT_ROOT']."/static/transfer/build/razorflow_php/razorflow.php";
class SalesDashboard extends Dashboard {
  
  protected $pdo;

  protected $monthName = array(
      "01" => "Jan",
      "02" => "Feb",
      "03" => "Mar",
      "04" => "Apr",
      "05" => "May",
      "06" => "Jun",
      "07" => "July",
      "08" => "Aug",
      "09" => "Sept",
      "10" => "Oct",
      "11" => "Nov",
      "12" => "Dec"
  );

  public function initialize () {
    $this->pdo = new PDO("sqlite:".$_SERVER['DOCUMENT_ROOT']."/static/fixtures/Northwind.sqlite");
  }

  public function buildDashboard() {

    $this->setDashboardTitle("Sales Dashboard");
    $this->setActionPath("/static/transfer/build/tour/motherboard_action.php");

    // $yearwise = new ChartComponent ('yearly_sales');
    // $yearwise->setCaption ("Yearly Sales");
    // $yearwise->setDimensions (6, 6);
    // $yearData = $this->get_year();
    // $yearwise->setLabels(ArrayUtils::pluck($yearData, 'payment_year'));
    // $yearwise->setYAxis("Sales", array(
    //   "numberHumanize" => true,
    //   'numberPrefix' => "$"
    // ));
    // $totalSalesArr = ArrayUtils::pluck($yearData, "total_amount");
    // $yearwise->addSeries ("sales", "Sales", $totalSalesArr, array(
    //   'numberPrefix' => "$"
    // ));
    // $yearwise->addDrillStep("get_monthwise", $this);
    // $yearwise->addDrillStep("get_daywise", $this);
    // $totalSales = 0;
    // foreach ($totalSalesArr as $key => $value) {
    //   $totalSales += $value;
    // }
    // $yearwise->addComponentKPI("sales", array(
    //   "caption" => "Total Sales",
    //   "value" => $totalSales,
    //   "numberPrefix" => "$",
    //   "numberHumanize" => true
    // ));
    // $yearwise->addComponentKPI("second", array(
    //   "caption" => "Revenue",
    //   "value" => $totalSales,
    //   "numberPrefix" => "$",
    //   "numberHumanize" => true
    // ));
    // $this->addComponent ($yearwise);


    $category = new ChartComponent('category');
    $category->setCaption("Category wise Sales");
    $category->setDimensions(6,6);
    $categoryData = $this->get_category();
    $quantityData = $this->get_units();
    $category->setLabels(ArrayUtils::pluck($categoryData, 'CategoryName'));
    $category->setYAxis("Sales", array(
      "numberHumanize" => true,
      'numberPrefix' => "$"
    ));
    $totalSalesArr = ArrayUtils::pluck($categoryData, "total_amount");
    $category->addSeries ("sales", "Sales", $totalSalesArr, array(
      'numberPrefix' => "$"
    ));

    $category->addYAxis('unitsAx', "Units in Inventory", array());

    $totalUnitsArr = ArrayUtils::pluck($quantityData, "total_quantity");
    $category->addSeries ("units", "Units in Inventory", $totalUnitsArr, array(
      "seriesDisplayType" => "line",
      "yAxis" => 'unitsAx'
    ));

    $category->addDrillStep("get_prod", $this);

    $category->addComponentKPI("cost", array(
      "caption" => "Total Sales",
      "value" => $this->get_cost_inventory(),
      "numberPrefix" => "$"
    ));
    $category->addComponentKPI("units", array(
      "caption" => "Total Units in Inventory",
      "value" => $this->get_unit_inventory()
    ));

    $this->addComponent ($category);


    $chart = new ChartComponent("Customer_satisfaction");
    $chart->setCaption("Customer Satisfaction");
    $chart->setDimensions (6, 6);
    $chart->setLabels (["Very Unsatisfied", "UnSatisfied", "Neutral", "Satisfied", "Very Satisfied"]);
    $chart->setPieValues ([4, 10, 25, 25, 36], array(
      "numberSuffix" => "%"
    ));
    $this->addComponent ($chart);


    $table = new TableComponent('table');
    $table->setCaption("Average Shipping Time");
    $table->setDimensions(6,6);
    $ship = $this->get_shipping();
    $table->addColumn('country', 'Country');
    $table->addColumn('avg_time','Average Time', array("textAlign" => "right"));
    $table->addMultipleRows($this->PolulateData($ship));
    $table->setRowsPerPage(12);
    $this->addComponent($table);

    $goods = new ChartComponent('goods_sold');
    $goods->setCaption("Cost of Goods Sold");
    $goods->setDimensions(6,6);
    $yearArr = $this->get_yearName();
    $goods->setLabels(ArrayUtils::pluck($yearArr, 'payment_year'));
    $goods->setYAxis("Sales", array(
      "numberHumanize" => true,
      'numberPrefix' => "$"
    ));

    $goodsSoldData = $this->get_goodsSold();
    foreach ($goodsSoldData as $key => $value) {
      $goods->addSeries ($key, $key, ArrayUtils::pluck($value, "total_amount"), array(
        'numberPrefix' => "$",
        'seriesStacked' => true
      ));  
    }
    $this->addComponent ($goods);
  }

  public function get_shipping () {
    $yearData = $this->pdo->query('SELECT AVG(JULIANDAY(ShippedDate) - JULIANDAY(OrderDate)) as Time, ShipCountry FROM "Order" group by ShipCountry;');
    return $yearData->fetchAll(PDO::FETCH_ASSOC);
  }

  public function PolulateData ($shipping) {
    $data = array();
    for($i=0; $i<count($shipping);$i++){
      $d = array(
        'country' => $shipping[$i]['ShipCountry'],
        'avg_time' => floor($shipping[$i]['Time']). " days"
      );

      $data []= $d;
    }
    return $data;
  }

  public function get_yearName () {
    return $this->pdo->query("SELECT strftime('%Y', OrderDate) as payment_year  FROM 'Order' group by payment_year;")->fetchAll(PDO::FETCH_ASSOC);
  }

  public function get_goodsSold () {
    $categorylist = $this->pdo->query('Select CategoryName from Category group by CategoryName;')->fetchAll(PDO::FETCH_ASSOC);
    $data=[];
    foreach ($categorylist as $key => $value) {
      $yearDataQuery = $this->pdo->prepare("SELECT strftime('%Y', OrderDate) as payment_year,SUM(od.UnitPrice * od.Quantity)  as total_amount, c.CategoryName  FROM 'Order' as o, 'OrderDetail' as od, 'Category' as c, 'Product' as p where o.Id = od.OrderId and c.Id = p.CategoryId and  od.ProductId = p.Id and c.CategoryName = :category group by payment_year;");
    $yearDataQuery->execute(array('category' => $value['CategoryName']));
    $yearData = $yearDataQuery->fetchAll(PDO::FETCH_ASSOC);
    $data[$value['CategoryName']] = $yearData;
    }
    return $data;
  }

  public function get_category () {
    $catData = $this->pdo->query("select SUM(o.UnitPrice * o.Quantity) as total_amount, CategoryName from Product as p, Category as c, OrderDetail as o where c.Id = p.CategoryId and o.ProductId = p.Id group by CategoryName;");
    return $catData->fetchAll(PDO::FETCH_ASSOC);
  }

  public function get_units () {
    $unitData = $this->pdo->query("select SUM(p.UnitsInStock) as total_quantity, CategoryName from Product as p, Category as c where c.Id = p.CategoryId group by CategoryName;");
    return $unitData->fetchAll(PDO::FETCH_ASSOC);
  }

  public function get_prod ($source, $target, $params) {
    $prodData = $this->pdo->prepare("select SUM(o.UnitPrice * o.Quantity) as total_amount, ProductName from Product as p, Category as c, OrderDetail as o where c.Id = p.CategoryId and o.ProductId = p.Id  and categoryName=:catName group by ProductName;");
    $prodData->execute(array('catName' => $params['label']));
    $prodWise = $prodData->fetchAll(PDO::FETCH_ASSOC);
    $source->clearChart();
    $labelArr = ArrayUtils::pluck($prodWise, 'ProductName');
    $source->setLabels($labelArr);
    $totalSalesArr = ArrayUtils::pluck($prodWise, "total_amount");
    $source->addSeries ("sales", "Sales", $totalSalesArr, array(
      'numberPrefix' => "$"
    ));

    $unitData = $this->pdo->prepare("select p.UnitsInStock as total_quantity, ProductName from Product as p, Category as c where c.Id = p.CategoryId and categoryName=:catName group by ProductName;");
    $unitData->execute(array('catName' => $params['label']));
    $unitArr = ArrayUtils::pluck($unitData, "total_quantity");
    $source->addSeries ("units", "Units in Inventory", $unitArr, array(
      "seriesDisplayType" => "line",
      "yAxis" => 'unitsAx'
    ));

    $source->addComponentKPI("cost", array(
      "caption" => "Total Sales",
      "value" => array_sum($totalSalesArr),
      "numberPrefix" => "$"
    ));
    $source->addComponentKPI("units", array(
      "caption" => "Total Units in Inventory",
      "value" => array_sum($unitArr)
    ));
  }

  public function get_cost_inventory() {
    $yearData = $this->pdo->query("select SUM(p.UnitPrice * p.UnitsInStock) as total_amount from Product as p;");
    $data = $yearData->fetchAll(PDO::FETCH_ASSOC);
    return floor($data[0]['total_amount']);
  }

  public function get_unit_inventory() {
    $yearData = $this->pdo->query("select SUM(p.UnitsInStock) as total_amount from Product as p;");
    $data = $yearData->fetchAll(PDO::FETCH_ASSOC);
    return floor($data[0]['total_amount']);
  }

  // public function get_year () {
  //   $yearData = $this->pdo->query("SELECT SUM(UnitPrice * Quantity) as total_amount, strftime('%Y', OrderDate) as payment_year  FROM 'Order' as o, 'OrderDetail' as od where o.Id = od.OrderId group by payment_year;");
  //   return $yearData->fetchAll(PDO::FETCH_ASSOC);
  // }

  // public function get_monthwise($source, $target, $params) {
  //   print_r("dfsd");
  //   die();
  //   $monthwiseQuery = $this->pdo->prepare("SELECT SUM(UnitPrice * Quantity) as total_amount, strftime('%m', OrderDate) as payment_month FROM 'Order' as o, 'OrderDetail' as od where o.Id = od.OrderId and strftime('%Y', OrderDate)=:paymentYear GROUP BY payment_month;");
  //   $monthwiseQuery->execute(array('paymentYear' => $params['label']));
  //   $monthwise = $monthwiseQuery->fetchAll(PDO::FETCH_ASSOC);
  //   $source->clearChart();
  //   $monthArr = ArrayUtils::pluck($monthwise, 'payment_month');
  //   for ($i = 0; $i < count($monthArr); $i++) {
  //     $monthArr[$i] = $this->monthName[$monthArr[$i]];
  //   }
  //   $source->setLabels($monthArr);
  //   $totalSalesArr = ArrayUtils::pluck($monthwise, "total_amount");
  //   $source->addSeries ("sales", "Sales", $totalSalesArr, array(
  //     'numberPrefix' => "$"
  //   ));
  //   $totalSales = 0;
  //   foreach ($totalSalesArr as $key => $value) {
  //     $totalSales += $value;
  //   }
  //   $source->addComponentKPI("sales", array(
  //     "caption" => "Total Sales",
  //     "value" => $totalSales,
  //     "numberPrefix" => "$",
  //     "numberHumanize" => true
  //   ));
  //   $source->addComponentKPI("second", array(
  //     "caption" => "Revenue",
  //     "value" => $totalSales,
  //     "numberPrefix" => "$",
  //     "numberHumanize" => true
  //   ));
  // }

  public function get_daywise($source, $target, $params) {
    $month = array_search($params['label'], $this->monthName);
    $daywiseQuery = $this->pdo->prepare("SELECT SUM(UnitPrice * Quantity) as total_amount, strftime('%d', OrderDate) as payment_day FROM 'Order' as o, 'OrderDetail' as od where o.Id = od.OrderId and strftime('%Y', OrderDate)=:paymentYear and strftime('%m', OrderDate)=:paymentMonth GROUP BY payment_day;");
    $daywiseQuery->execute(array('paymentYear' => $params['drillLabelList'][0], 'paymentMonth' => $month));
    $daywise = $daywiseQuery->fetchAll(PDO::FETCH_ASSOC);
    $source->clearChart();
    $source->setLabels(ArrayUtils::pluck($daywise, 'payment_day'));
    $totalSalesArr = ArrayUtils::pluck($daywise, "total_amount");
    $source->addSeries ("sales", "Sales", $totalSalesArr, array(
      'numberPrefix' => "$"
    ));
    $totalSales = 0;
    foreach ($totalSalesArr as $key => $value) {
      $totalSales += $value;
    }
    $source->addComponentKPI("sales", array(
      "caption" => "Total Sales",
      "value" => $totalSales,
      "numberPrefix" => "$",
      "numberHumanize" => true
    ));
    $source->addComponentKPI("second", array(
      "caption" => "Revenue",
      "value" => $totalSales,
      "numberPrefix" => "$",
      "numberHumanize" => true
    ));
  }
}

require 'motherboard_stock.php';


class SampleDashboard extends TabbedDashboard {

  public function buildDashboard() {
    $sales = new SalesDashboard();
    $stock = new StockDashboard();

    $this->addDashboardTab($sales);
    $this->addDashboardTab($stock);
  }

}
