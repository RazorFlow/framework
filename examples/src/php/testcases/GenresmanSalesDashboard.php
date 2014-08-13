<?php

class SampleDashboard extends StandaloneDashboard {
  protected $pdo;
  public function initialize(){
    try {
    $this->pdo = new PDO('mysql:host=127.0.0.1;dbname=genresman', 'root', '');
    $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch(PDOException $e) {
        echo 'ERROR: ' . $e->getMessage();
    }
  }

  private function getDailySales ($dateStartString, $dateEndString) {
    $query = $this->pdo->query("SELECT DATE_FORMAT(TARIH, '%d/%m %W') as tarih2,tarih,SUM(KISISAYISI) as kisisayisi,sum(cikis) as cikis FROM GENHAR WHERE tarih between '".$dateStartString."' and '".$dateEndString."' GROUP BY TARIH order by tarih");
    return  $query->fetchAll(PDO::FETCH_ASSOC);
  }

  private function getMonthlySales () {
    $query = $this->pdo->query("SELECT DATE_FORMAT(TARIH, '%m') as tarih2, DATE_FORMAT(TARIH, '%M') as ay, SUM(KISISAYISI) as kisisayisi,sum(cikis) as cikis FROM GENHAR WHERE (tarih between  DATE_FORMAT(NOW() ,'%Y-01-01') AND NOW() )  GROUP BY DATE_FORMAT(TARIH, '%m') order by tarih ;");
    return  $query->fetchAll(PDO::FETCH_ASSOC);
  }

  private function getMonthlySalesFood () {
    $query = $this->pdo->query("select DATE_FORMAT(TARIH, '%m') AS TARIH, hamanagrup, sum(cikisfiyat) as cikis from stokhar where (tarih between  DATE_FORMAT(NOW() ,'%Y-01-01') AND NOW() ) and hamanagrup='FOOD' group by DATE_FORMAT(TARIH, '%m'),hamanagrup;");
    return  $query->fetchAll(PDO::FETCH_ASSOC);
  }

  private function getDailySalesFood ($dateStartString, $dateEndString) {
    $query = $this->pdo->query("select tarih, hamanagrup, sum(cikisfiyat) as cikis from stokhar WHERE tarih between '".$dateStartString."' and '".$dateEndString."' and hamanagrup='FOOD' group by tarih,hamanagrup;");
    return  $query->fetchAll(PDO::FETCH_ASSOC);
  }

  private function getClerkSales ($dateStartString, $dateEndString) {
    $query = $this->pdo->query("select garson,sum(cikisfiyat) as cikis from stokhar where tarih between '".$dateStartString."' and '".$dateEndString."' and cikisfiyat != 0 group by garson order by sum(cikisfiyat) desc limit 15");
    return  $query->fetchAll(PDO::FETCH_ASSOC);
  }

  private function getItemCategories ($dateStartString, $dateEndString) {
    $query = $this->pdo->query("select grupadi,sum(cikisfiyat) as cikis from stokhar where  tarih between '".$dateStartString."' and '".$dateEndString."' and cikisfiyat != 0 group by grupadi order by sum(cikisfiyat) desc limit 15");
    return  $query->fetchAll(PDO::FETCH_ASSOC);
  }

  private function getHourlySales ($dateStartString, $dateEndString) {
    $query = $this->pdo->query("select DATE_FORMAT(SAAT,'%H') AS SAAT,SUM(CIKIS) AS CIKIS from GENHAR where  tarih between '".$dateStartString."' and '".$dateEndString."'  GROUP BY DATE_FORMAT(SAAT,'%H') ");
    return  $query->fetchAll(PDO::FETCH_ASSOC);
  }



  public function buildDashboard () {
    $this->setDashboardTitle ("Genresman Dashboard");

    $form = new FormComponent('form1');
    $form->setCaption ("Form Employees");
    $form->setDimensions (12, 3);
    $form->addDateRangeField('datebtw', 'Select Date', array(
        "defaultStartDate" => "2014-04-23",
        "defaultEndDate" => "2014-05-01"
    ));

    $this->addComponent($form);

  	$dailySales = new ChartComponent ('c1');
    $dailySales->setDimensions (7, 6);
    $dailySales->setCaption ("Daily Sales");
    $dailySalesData = $this->getDailySales('2014-04-23','2014-05-01');
    $dailySales->setYAxis("Revenue", array(
      "numberHumanize" => true
    ));
    $dailySales->addYAxis("covers", "Covers", array(
    ));
    $dailySales->setLabels (ArrayUtils::pluck($dailySalesData, "tarih2"));
    $dailySales->addSeries ('food', "Food", ArrayUtils::pluck($dailySalesData, "cikis"));
    $dailySalesFoodData = $this->getDailySalesFood('2014-04-23','2014-05-01');
    $dailySales->addSeries ('covers', "Covers", ArrayUtils::pluck($dailySalesFoodData, "cikis"), array(
      "yAxis" => "covers",
      "seriesDisplayType" => "line"
    ));
    $this->addComponent($dailySales);


    $monthlySales = new ChartComponent ('c2');
    $monthlySales->setDimensions (5, 6);
    $monthlySales->setCaption ("Monthly Sales");
    $monthlySalesData = $this->getMonthlySales();
    $monthlySales->setYAxis("Revenue", array(
      "numberHumanize" => true
    ));
    $monthlySales->addYAxis("covers", "Covers", array(
    ));
    $monthlySales->setLabels (ArrayUtils::pluck($monthlySalesData, "ay"));
    $monthlySales->addSeries ('food', "Food", ArrayUtils::pluck($monthlySalesData, "cikis"));
    $monthlySalesFood = $this->getMonthlySalesFood();
    $monthlySales->addSeries ('covers', "Covers", ArrayUtils::pluck($monthlySalesFood, "cikis"), array(
      "yAxis" => "food",
      "seriesDisplayType" => "line"
    ));
    $this->addComponent($monthlySales);


    $item = new ChartComponent('c3');
    $item->setDimensions(7,6);
    $item->setCaption("Item Categories");
    $item->setYAxis("", array(
      "numberHumanize" => true
    ));
    $itemCategories = $this->getItemCategories('2014-04-23','2014-05-01');
    $item->setLabels (ArrayUtils::pluck($itemCategories, "grupadi"));
    $item->addSeries ('items', "Items", ArrayUtils::pluck($itemCategories, "cikis"));
    $this->addComponent ($item);

    $chart = new ChartComponent("pie_chart");
    $chart->setCaption("Clerk Sales");
    $chart->setDimensions (5, 6);
    $clerkData = $this->getClerkSales('2014-04-23','2014-05-01');
    $chart->setLabels (ArrayUtils::pluck($clerkData, "garson"));
    $chart->setPieValues (ArrayUtils::pluck($clerkData, "cikis"), array(
      "numberHumanize" => true
    ));

    $this->addComponent ($chart);

    $hour = new ChartComponent('c4');
    $hour->setDimensions(12,6);
    $hour->setCaption("Hourly Sales");
    $hour->setYAxis("", array(
      "numberHumanize" => true
    ));
    $hourlySales = $this->getHourlySales('2014-04-23','2014-05-01');
    $hour->setLabels (ArrayUtils::pluck($hourlySales, "SAAT"));
    $hour->addSeries ('items', "Items", ArrayUtils::pluck($hourlySales, "CIKIS"));
    $this->addComponent ($hour);

    $form->onApplyClick (array($dailySales, $item, $chart, $hour), "handleForm", $this);
  }

  public function handleForm ($source, $target, $params) {
    $Date = $source->getInputValue('datebtw');
    $dateStartArray = date_parse ( $Date[0] );
    $dateEndArray = date_parse ( $Date[1] );
    $dailySales = $this->getComponentByID("c1");
    $item = $this->getComponentByID("c3");
    $chart = $this->getComponentByID("pie_chart");
    $hour = $this->getComponentByID("c4");

    $dateStartString = $dateStartArray['year'].'-'.$dateStartArray['month'].'-'.$dateStartArray['day'];

    $dateEndString = $dateEndArray['year'].'-'.$dateEndArray['month'].'-'.$dateEndArray['day'];

    $dailySalesData = $this->getDailySales($dateStartString, $dateEndString);
    $dailySales->setLabels (ArrayUtils::pluck($dailySalesData, "tarih2"));
    $dailySales->addSeries ('food', "Food", ArrayUtils::pluck($dailySalesData, "cikis"), array(
      "numberHumanize" => true,
    ));
    $dailySalesFoodData = $this->getDailySalesFood($dateStartString, $dateEndString);
    $dailySales->addSeries ('covers', "Covers", ArrayUtils::pluck($dailySalesFoodData, "cikis"), array(
      "numberHumanize" => true,
      "yAxis" => "covers"
    ));

    $itemCategories = $this->getItemCategories($dateStartString, $dateEndString);
    $item->setLabels (ArrayUtils::pluck($itemCategories, "grupadi"));
    $item->addSeries ('items', "Items", ArrayUtils::pluck($itemCategories, "cikis"), array(
      "numberHumanize" => true
    ));

    $clerkData = $this->getClerkSales($dateStartString, $dateEndString);
    $chart->setLabels (ArrayUtils::pluck($clerkData, "garson"));
    $chart->setPieValues (ArrayUtils::pluck($clerkData, "cikis"));

    $hourlySales = $this->getHourlySales($dateStartString, $dateEndString);
    $hour->setLabels (ArrayUtils::pluck($hourlySales, "SAAT"));
    $hour->addSeries ('items', "Items", ArrayUtils::pluck($hourlySales, "CIKIS"), array(
      "numberHumanize" => true
    ));
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
  
