--
title: "Basic ChartComponent Functionality"
subtitle: ""
index: 1
id: "php_chart_basic"
--


Here is an example chart component:

Here is the code for a complete dashboard containing a single chart component:
~~~
<?php

class SampleDashboard extends StandaloneDashboard{
  public function buildDashboard () {
    $chart = new ChartComponent("chart1");
    $chart->setDimensions (4, 4);
    $chart->setCaption ("My First Chart");
    $chart->setLabels (array("Jan", "Feb", "Mar"));
    $chart->addSeries ("beverages", "Beverages", array(1355, 1916, 1150));
    $chart->addSeries ("packaged_foods", "Packaged Foods", array(1513, 976, 1321));

    $this->addComponent($chart);
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
?>
~~~

The steps taken to build this dashboard are:

1. {{ linkArticle('php_create_standalone') }}
2. Add a new component instance of type {{ linkApi('php', 'ChartComponent') }}
3. Set a `caption` to the component using {{ linkApi ('php', 'ChartComponent', 'setCaption') }}.
5. Set the labels (which are shown on the X-Axis) using the {{ linkApi ('php', 'ChartComponent', 'setLabels') }} function, pass an array of strings which will be displayed.
6. Add multiple series to the chart, using the {{ linkApi ('php', 'ChartComponent', 'addSeries') }} function which takes 3 arguments:
   * An **ID String** (`beverages`, `packaged_foods`, etc) which is used later to refer to this series to update it, etc.
   * The **Title** of the series, which will be displayed on the chart.
   * An array of **Data Values** which will be the actual values plotted on the chart.
7. **Add the component** to the dashboard using the **addComponent** function.
8. Render the dashboard by calling the **renderStandalone()** of the SampleDasboard class.


## Pie Charts

To create a pie chart, use the {{ linkApi ('php', 'ChartComponent', 'setPieValues') }} function instead of {{ linkApi ('php', 'ChartComponent', 'addSeries') }}. Since a pie chart can only have a single set of values, you can call this function only once.

<%- embedExample ('php', 'chart_pie') %>

### Notes:

* By default, all chart series are Column Charts. Changing the series type is covered in {{ linkArticle ('php_series_config') }}
* Please ensure that the number of data points in each series is the same number of items in  your Label Array.
