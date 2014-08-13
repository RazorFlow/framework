<meta>
{
  "title": "A DrillDown SQL Dashboard with PHP",
  "subtitle": "",
  "id": "php_sql_breadcrumbs",
  "index": 1
}
</meta>

## See a live demo of this example

* [See the full dashboard in action](http://examples.razorflow.com/dashboard/php/examples/sql_breadcrumbs)
* [View the full code on github](https://github.com/RazorFlow/examples/blob/master/src/php/examples/sql_breadcrumbs.php)

## Steps to build this dashboard

### Create an empty dashboard

~~~
<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard () {

  }
}

$db = new SampleDashboard();
$db->renderStandalone();
?>
~~~

### Add an "initialize" function

The `initialize` function in a dashboard is called before any action on the dashboard is executed. We use this to open a connection to a SQLite Database. In this example, we will be using a SQLite database. SQLite is a database with a syntax similar to MySQL but the entire database is stored as a file. The SQLite database that we are using is Birt open source database.

~~~
  protected $pdo;
  public function initialize () {
    $this->pdo = new PDO("sqlite:fixtures/databases/birt.sqlite");
  }
~~~

Before really going into fetching the data, clearly define what data that you would like to see in your dashboard. For our dashboard, we wish to show two charts:

* Sales by Region.
* Sales by Time.

## Sales by Region

By looking at the database structure, we can find the SQL Query to find the Sales by Country is:

~~~
SELECT SUM(amount) as total_amount, country
FROM Payments NATURAL JOIN Customers
GROUP BY country;
~~~

Now let's add a function to perform the query:

~~~
  public function get_country () {
    $cityData = $this->pdo->query("SELECT SUM(amount) as total_amount, country FROM Payments NATURAL JOIN Customers GROUP BY country;");
    return $cityData->fetchAll(PDO::FETCH_ASSOC);
  }
~~~

### Display the Sales by Region chart

~~~
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
  }
~~~

In this code, to add a drill step we use the function called {{ linkApi ('php', "Component", "addDrillStep")}}.

### Add functions to fetch the sales based on state of particular country

Similar to the way we fetched the Sales by Country, let's fetch the Sales by State, which is called when an particular country item is clicked.

~~~
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
~~~

### Add functions to fetch the sales based on city of particular state

let's fetch the Sales by City, which is called when an particular state item is clicked.

~~~
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
~~~

## Sales by Time

By looking at the database structure, we can find the SQL Query to find the Sales by Year is:

~~~
SELECT SUM(amount) as total_amount, strftime('%Y', paymentDate) as payment_year
FROM Payments NATURAL JOIN Customers
GROUP BY payment_year;
~~~

Now let's add a function to perform the query:

~~~
  public function get_year () {
    $yearData = $this->pdo->query("SELECT SUM(amount) as total_amount, strftime('%Y', paymentDate) as payment_year FROM Payments NATURAL JOIN Customers GROUP BY payment_year;");
    return $yearData->fetchAll(PDO::FETCH_ASSOC);
  }
~~~

### Display the Sales by Year chart

~~~
  public function buildDashboard () {
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
~~~

In this code, to add a drill step we use the function called {{ linkApi ('php', "Component", "addDrillStep")}}.

### Add functions to fetch the sales based on month of particular country

Similar to the way we fetched the Sales by Year, let's fetch the Sales by Month, which is called when an particular year item is clicked.

~~~
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
~~~

### Add functions to fetch the sales based on Day of particular month.

let's fetch the Sales by Day, which is called when an particular month item is clicked.

~~~
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
~~~

Notice these steps:

1. We're getting the current selected item name using the `$params['label']`
2. We're getting the history of selected item name using the `$params['labelList']`
3. We call {{ linkApi ('php', 'ChartComponent', 'clearChart') }} to clear the chart.
4. We set the labels and add a new series with the data.


### Completed example

{{ embedExample ('php', 'sql_breadcrumbs') }}