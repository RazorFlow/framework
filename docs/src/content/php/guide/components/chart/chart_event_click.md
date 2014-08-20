--
title: "Chart click events"
subtitle: ""
index: 5
id: "php_chart_event_click"
--


You can execute a PHP function when an item on the chart has been clicked, by using the {{ linkApi("php", "ChartComponent", "onItemClick") }} function. This function is executed whenever an item (like a line chart circle, column chart rectangle, etc.) is clicked.

~~~
  public function buildDashboard(){
    $chart = new ChartComponent("chart");
    $chart->setCaption("Click Me");
    $chart->setDimensions (4, 4);
    $chart->setLabels (["2009", "2010", "2011"]);
    $chart->addSeries ("beverages", "Beverages", [1355, 1916, 1150], array('numberPrefix' => '$'));
    $chart->addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321], array('numberPrefix' => '$'));
    $this->addComponent ($chart);

    $kpi = new KPIComponent("kpi");
    $kpi->setCaption("Click on the chart");
    $kpi->setValue(0, array('numberPrefix' => '$'));
    $kpi->setDimensions(4, 4);
    $this->addComponent ($kpi);

    $chart->onItemClick (array($kpi), 'handleClick');
  }

  public function handleClick ($source, $targets, $params) {
  	$kpi = $this->getComponentById ('kpi');
  	$kpi->setCaption ("Year: ".$params['label']);
  	$kpi->setValue ($params['value'], array('numberPrefix' => '$'));
  }
~~~

In your function, declare three arguments called `$source`, `$target` and `$params` The `$params` contains the  properties:

* **value**: The value of the item that was clicked (purely numeric, this will not contain formatted values like number prefix/suffix, etc)
* **label**: The x-axis label that corresponds to the item that was clicked.
* **labelIndex**: The index of the label (starting from 0) that corresponds to the item that was clicked.

{{ embedExample ('php', 'chart_event') }}
