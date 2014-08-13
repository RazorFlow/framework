<?php
require $_SERVER['DOCUMENT_ROOT']."/static/transfer/build/razorflow_php/razorflow.php";
class StockDashboard extends Dashboard {
  
  protected $pdo;

  public function initialize () {
    $this->pdo = new PDO("sqlite:".$_SERVER['DOCUMENT_ROOT']."/static/fixtures/Northwind.sqlite");
  }

  public function buildDashboard(){
    $this->setDashboardTitle("Stock Dashboard");
    $this->setActionPath("/static/transfer/build/tour/motherboard_stock_action.php");
    $kpi = new KPIGroupComponent('kpi');
    $kpi->setDimensions(12, 2);
    $kpi->setCaption('Units stock by Category');
    $Units = $this->get_units(true);
    foreach ($Units as $key => $value) {
      $kpi->addKPI($value['id'], array(
        'caption' => $value['CategoryName'],
        'value' => $value['Quantity'],
        'numberSuffix' => ' units',
        'numberHumanize' => true
      )); 
    }
    $this->addComponent($kpi);

    $table = new TableComponent('table');
    $table->setCaption("List of Item in Stock");
    $table->setDimensions(6,5);
    $stock = $this->get_stock();
    $table->addColumn('id', 'Product Id');
    $table->addColumn('name','Product Name');
    $table->addColumn('category','Category');
    $table->addColumn('price','Price', array("numberPrefix"=> "$", "dataType"=> "number"));
    $table->addColumn('stock','Stock');
    $table->addMultipleRows($this->PolulateData($stock));

    $this->addComponent($table);

    $c12 = new FormComponent('filter');
    $c12->setDimensions(6, 5);
    $c12->setCaption('Filter items in stock');
    $category = $this->get_category();
    $c12->addSelectField('category', 'Select Category', array_merge(['no selection'], ArrayUtils::pluck($category, 'CategoryName')));
    $c12->addTextField('contains', 'Product Name Contains');
    $c12->addNumericRangeField('stock', 'Units In Stock' , array(0, 100));
    $this->addComponent($c12);
    $c12->onApplyClick(array($table), 'handleApply', $this);
  }

  public function PolulateData ($stock) {
    $data = array();
    for($i=0; $i<count($stock);$i++){
      $d = array(
        'id' => $stock[$i]['Id'],
        'name' => $stock[$i]['ProductName'],
        'category' => $stock[$i]['CategoryName'],
        'price' => floor($stock[$i]['UnitPrice']),
        'stock' => floor($stock[$i]['UnitsInStock'])
      );

      $data []= $d;
    }
    return $data;
  }

  public function handleApply($source, $target, $params) {
    $table = $this->getComponentByID('table');
    $filter = $this->getComponentByID('filter');
    $category = $filter->getInputValue('category')['text'];
    $contains = $filter->getInputValue('contains');
    $stock = $filter->getInputValue('stock');
    $data = $this->get_data($category, $contains, $stock);
    $table->clearRows();
    $table->addMultipleRows($this->PolulateData($data));
  }

  public function get_data($category, $contains, $stock) {
    $query = "Select Product.Id, ProductName, CategoryName, UnitPrice, UnitsInStock from Product, Category where Product.Categoryid = Category.Id and Product.UnitsInStock > 0";
    $andFlag = false;
    if($category != 'no selection') {
      $query .= " and CategoryName='".$category."'";
      $andFlag = true;
    }
    if ($contains != '') {
      $query .=  " and ProductName LIKE '%".$contains."%'";
      $andFlag = true;
    }

    if ($stock != '') {
      $query .=  " and UnitPrice between ".$stock[0]." and ".$stock[1].";";
    }
    return $this->pdo->query($query)->fetchAll(PDO::FETCH_ASSOC);
  }

  public function get_units ($pos) {
    $yearData = $this->pdo->query('Select c.Id as id, SUM(UnitsInStock)as Quantity, CategoryName from Product as p, Category as c where c.Id = p.CategoryId group by CategoryName order by Quantity DESC LIMIT 5;');
    return $yearData->fetchAll(PDO::FETCH_ASSOC);
  }

  public function get_stock () {
    $yearData = $this->pdo->query('Select Product.Id, ProductName, CategoryName, UnitPrice, UnitsInStock from Product, Category where Product.Categoryid = Category.Id and Product.UnitsInStock > 0;');
    return $yearData->fetchAll(PDO::FETCH_ASSOC);
  }

  public function get_category () {
    $yearData = $this->pdo->query('Select CategoryName from Category group by CategoryName;');
    return $yearData->fetchAll(PDO::FETCH_ASSOC);
  }
}
