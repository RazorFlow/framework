--
title: "Updating chart data"
subtitle: ""
index: 4
id: "php_chart_update"
--


## In place update

If the labels on the X-Axis are not changing, then you can perform an "in-place-update" of chart data. This has the advantage of smoothly scaling the chart so that your users clearly understand how much it changes.

You can update a chart's data anytime after it's rendered using the {{ linkApi("php", "ChartComponent", "updateSeries") }} function. Remember to use the correct series ID, the same one you used while creating the series with {{ linkApi("php", "ChartComponent", "addSeries") }} For example:

~~~
  public function buildDashboard () { 
    // ... Configure two charts $chart1 and $chart2
    $chart->onItemClick (array($chart2), "handleItemClick");
  }

  public function handleItemClick ($source, $targets, $params) {
    $chart2 = $this->getComponentByID("chart2");
    $chart2->updateSeries("series_1", [3, 5, 2]);
  }
~~~

### Complete Example

{{ embedExample ('php', 'chart_updatevals') }}

## Full chart update

If you are re-drawing new data on the chart, you will need to first clear out the contents of the chart. To do so, use the {{ linkApi("php", "ChartComponent", "clearChart") }} function. Using this function it is almost like creating a new chart altogether, because this clears out all the series. Note that this doesn't reset other properties like the Y Axis name, etc.

~~~
  public function buildDashboard () { 
    // ... Configure two charts $chart1 and $chart2
    $chart->onItemClick (array($chart2), "handleItemClick");
  }

  public function handleItemClick ($source, $targets, $params) {
    $chart2 = $this->getComponentByID("chart2");
    $chart2->clearChart ();
    $chart2->setLabels (array ("E", "F", "G", "H", "I"));
    $chart2->addSeries ("series_3", "Series 3", [3, 5, 2, 1, 6]);
  }
~~~

### Complete Example

{{ embedExample ('php', 'chart_updatechart') }}
