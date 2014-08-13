<?php

class LocationDrillDashboard extends StandaloneDashboard {
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

	public function get_country () {
		$cityData = $this->pdo->query("SELECT SUM(amount) as total_amount, country FROM Payments NATURAL JOIN Customers GROUP BY country;");
		return $cityData->fetchAll(PDO::FETCH_ASSOC);
	}

	public function get_year () {
		$yearData = $this->pdo->query("SELECT SUM(amount) as total_amount, strftime('%Y', paymentDate) as payment_year FROM Payments NATURAL JOIN Customers GROUP BY payment_year;");
		return $yearData->fetchAll(PDO::FETCH_ASSOC);
	}

	public function buildDashboard () {
		$chart = new ChartComponent ('sales1');
		$chart->setCaption ("Sales by Region");
		$chart->setDimensions (12, 6);
		$countryData = $this->get_country();
		$chart->setLabels(ArrayUtils::pluck($countryData, 'country'));
		$chart->addSeries ("sales", "Sales", ArrayUtils::pluck($countryData, "total_amount"), array(
			'numberPrefix' => "$"
		));
		$chart->addDrillStep ("get_states", $this);
		$chart->addDrillStep ("get_cities", $this);
		$this->addComponent ($chart);

		$yearwise = new ChartComponent('year');
		$yearwise->setCaption("Sales by Time");
		$yearwise->setDimensions(12,6);
		$yearData = $this->get_year();
		$yearwise->setLabels(ArrayUtils::pluck($yearData, 'payment_year'));
		$yearwise->addSeries ("sales", "Sales", ArrayUtils::pluck($yearData, "total_amount"), array(
			'numberPrefix' => "$"
		));
		$yearwise->addDrillStep("get_monthwise", $this);
		$yearwise->addDrillStep("get_daywise", $this);
		$this->addComponent ($yearwise);
	}

	public function get_monthwise($source, $target, $params) {
		$monthwiseQuery = $this->pdo->prepare("SELECT SUM(amount) as total_amount, strftime('%m', paymentDate) as payment_month FROM Payments NATURAL JOIN Customers where strftime('%Y', Payments.paymentDate)=:paymentYear GROUP BY payment_month;");
		$monthwiseQuery->execute(array('paymentYear' => $params['label']));
		$monthwise = $monthwiseQuery->fetchAll(PDO::FETCH_ASSOC);
		$source->clearChart();
		$monthArr = ArrayUtils::pluck($monthwise, 'payment_month');
		for ($i = 0; $i < count($monthArr); $i++) {
			$monthArr[$i] = $this->monthName[$monthArr[$i]];
		}
		$source->setLabels($monthArr);
	    $source->addSeries ("sales", "Sales", ArrayUtils::pluck($monthwise, "total_amount"), array(
			'numberPrefix' => "$"
		));
	}

	public function get_daywise($source, $target, $params) {
		$month = array_search($params['label'], $this->monthName);
		$daywiseQuery = $this->pdo->prepare("SELECT SUM(amount) as total_amount, strftime('%d', paymentDate) as payment_day FROM Payments NATURAL JOIN Customers where strftime('%Y', Payments.paymentDate)=:paymentYear and strftime('%m', Payments.paymentDate)=:paymentMonth GROUP BY payment_day;");
		$daywiseQuery->execute(array('paymentYear' => $params['drillLabelList'][0], 'paymentMonth' => $month));
		$daywise = $daywiseQuery->fetchAll(PDO::FETCH_ASSOC);
		$source->clearChart();
		$source->setLabels(ArrayUtils::pluck($daywise, 'payment_day'));
	    $source->addSeries ("sales", "Sales", ArrayUtils::pluck($daywise, "total_amount"), array(
			'numberPrefix' => "$"
		));
	}

	public function get_states ($source, $target, $params) {
		$stateDataQuery = $this->pdo->prepare("SELECT SUM(amount) as total_amount, state FROM Payments NATURAL JOIN Customers where Customers.country = :paymentCountry GROUP BY state;");
		$stateDataQuery->execute(array('paymentCountry' => $params['label']));
		$stateData = $stateDataQuery->fetchAll(PDO::FETCH_ASSOC);
		$source->clearChart();
		$source->setLabels(ArrayUtils::pluck($stateData, 'state'));
	    $source->addSeries ("sales", "Sales", ArrayUtils::pluck($stateData, "total_amount"), array(
			'numberPrefix' => "$"
		));
	}

	public function get_cities ($source, $target, $params) {
		$cityDataQuery = $this->pdo->prepare("SELECT SUM(amount) as total_amount, city FROM Payments NATURAL JOIN Customers where Customers.state = :paymentState GROUP BY city;");
		$cityDataQuery->execute(array('paymentState' => $params['label']));
		$cityData = $cityDataQuery->fetchAll(PDO::FETCH_ASSOC);
		$source->clearChart();
		$source->setLabels(ArrayUtils::pluck($cityData, 'city'));
	    $source->addSeries ("sales", "Sales", ArrayUtils::pluck($cityData, "total_amount"), array(
			'numberPrefix' => "$"
		));
	}



	public function initialize () {
		$this->pdo = new PDO("sqlite:fixtures/databases/birt.sqlite");
	}
}


$db = new LocationDrillDashboard();
$db->renderStandalone();
  
