--
title: "Chart Series Configuration"
subtitle: ""
index: 2
id: "php_series_config"
--


## Change series/chart type

The series type is also sometimes called the "Chart Type". You can make a single series display as a Line or a Column. More display types like Area will be supported in later releases.

To change the chart series, set the `seriesDisplayType` property while adding a series using {{ linkApi("php", "ChartComponent", "addSeries") }} like this:

~~~
    $chart->addSeries ("beverages", "Beverages", array(1355, 1916, 1150), array(
        "seriesDisplayType" => "line"
    ));
~~~

Acceptable values are:
* `line`
* `column`

## Format the display numbers

You can change the way the numbers are displayed in the series for showing currencies, percentages, etc. You can also change the way decimals, comma-separators and other aspects are handled.

You can configure the the series formats numbers by setting properties in the {{ linkApi("php", "ChartComponent", "addSeries") }} function. For example, we will configure the number prefix to be a "$" (commonly used currency symbol) and set `numberForceDecimals` which ensures that the decimals will always be shown.

~~~
    $chart->addSeries ("packaged_foods", "Packaged Foods", array([1513, 976, 1321), array(
        "numberPrefix" => "$ ",
        "numberForceDecimals" => true 
    ));
~~~

For a full list of number formatting options, and how to use them, refer to **Number formatting options**.

## Change series color

You can change the series color using the `seriesColor` property while adding a series.

~~~
    $chart->addSeries ("beverages", "Beverages", array(1355, 1916, 1150), array(
        "seriesColor" => "a4c9f3"
    ));
~~~

## Complete example

{{ embedExample ('php', 'chart_series_config')}}

