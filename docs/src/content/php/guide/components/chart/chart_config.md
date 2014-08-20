--
title: "Chart Options and Advanced Configuration"
subtitle: ""
index: 11
id: "php_chart_config"
--


### Hiding the legend

You can hide the legend by setting the `showLegendFlag` to false.

~~~
$chart->setOption ('showLegendFlag', false);
~~~

### Configure the breadcrumb start string

You can change the "Start" string in the chart to something else by setting the `breadcrumbStartString` option:

~~~
$chart->setOption ('breadcrumbStartString', "Root");
~~~
