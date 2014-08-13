<?php

class StockDashboard extends Dashboard {
  
  protected $pdo;

  public function initialize () {
    $this->pdo = new PDO("sqlite:fixtures/databases/Northwind.sqlite");
  }

  public function buildDashboard(){
    $this->setDashboardTitle("Stock Dashboard");
    $kpi = new KPIGroupComponent('kpi');
    $kpi->setDimensions(12, 2);
    $kpi->setCaption('Units stock by Category');
    $Units = $this->get_units(true);
    foreach ($Units as $key => $value) {
      $kpi->addKPI($value['id'], array(
        'caption' => $value['CategoryName'],
        'value' => $value['Quantity']/10,
        'numberSuffix' => ' units',
        'numberHumanize' => true
      )); 
    }
    $this->addComponent($kpi);

    $kpi1 = new KPIGroupComponent('kpi1');
    $kpi1->setDimensions(12, 2);
    // $kpi1->setCaption('Units stock by Category');
    $Units = $this->get_units(false);
    foreach ($Units as $key => $value) {
      $kpi1->addKPI($value['id'], array(
        'caption' => $value['CategoryName'],
        'value' => $value['Quantity'],
        'numberSuffix' => ' units',
        'numberHumanize' => true
      )); 
    }
    $this->addComponent($kpi1);

    $table = new TableComponent('table');
    $table->setCaption("List of Item in Stock");
    $table->setDimensions(6,4);
    $stock = $this->get_stock();
    $table->addColumn('id', 'Product Id');
    $table->addColumn('name','Product Name');
    $table->addColumn('category','Category');
    $table->addColumn('price','Price', array(
      "dataType"=> "number",
      "numberPrefix"=> "$"
    ));
    $table->addColumn('stock','Stock');
    $table->addMultipleRows($this->PolulateData($stock));

    $this->addComponent($table);

    $c12 = new FormComponent('form');
    $c12->setDimensions(6, 6);
    $c12->setCaption('Form items in stock');
    $category = $this->get_category();
    $c12->addSelectField('category', 'Select Category', array_merge(['no selection'], ArrayUtils::pluck($category, 'CategoryName')));
    $c12->addTextField('contains', 'Product Name Contains');
    $c12->addNumericRangeField('stock', 'Units In Stock');
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
    $form = $this->getComponentByID('form');
    $category = $form->getInputValue('category')['text'];
    $contains = $form->getInputValue('contains');
    $stock = $form->getInputValue('stock');
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
    if ($pos) {
      $yearData = $this->pdo->query('Select c.Id as id, SUM(UnitsInStock)as Quantity, CategoryName from Product as p, Category as c where c.Id = p.CategoryId group by CategoryName order by Quantity DESC LIMIT 3;');
    } else {
      $yearData = $this->pdo->query('Select c.Id as id, SUM(UnitsInStock)as Quantity, CategoryName from Product as p, Category as c where c.Id = p.CategoryId group by CategoryName order by Quantity LIMIT 3;');
    }
    return $yearData->fetchAll(PDO::FETCH_ASSOC);
  }

  public function get_stock ($pos) {
    $yearData = $this->pdo->query('Select Product.Id, ProductName, CategoryName, UnitPrice, UnitsInStock from Product, Category where Product.Categoryid = Category.Id and Product.UnitsInStock > 0;');
    return $yearData->fetchAll(PDO::FETCH_ASSOC);
  }

  public function get_category () {
    $yearData = $this->pdo->query('Select CategoryName from Category group by CategoryName;');
    return $yearData->fetchAll(PDO::FETCH_ASSOC);
  }
}
