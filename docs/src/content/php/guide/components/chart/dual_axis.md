--
title: "Dual Y Axes Charts"
subtitle: ""
index: 8
id: "php_dual_axis"
--


Sometimes you might need to show some multiple series of data on the same chart, but with very different scales. For example, you want to show the number of car sales with the total revenue.

Take a look at this example. You can't even **see** the second series because it's so small:

{{ embedExample ('php', 'chart_dual_bad') }}

However, we still want to see some correlation. For this we use RazorFlow's Dual Axis system.

You can create a dual axes chart by calling the {{ linkApi("php", "ChartComponent", "addYAxis") }} function on the chart component. Currently, only column, line and area charts can have dual axes. By default, the chart has a left axis, when the `addYAxis` is called it adds a right axis to the chart. The `addYAxis` function is similar to the {{ linkApi("php", "ChartComponent", "setYAxis") }} function with one exception. The `addYAxis` function has an extra parameter `id` associated with it. It looks like this,

~~~
    $chart->addYAxis("quantity", "Quantity", array(
    ));
~~~

1. The first parameter is the id of the axis.
2. The second parameter is the name of the Y Axis.
3. The third optional parameter is an object containing **Standard number formatting properties**.

To tell a series to use the new axis instead of the `primary` axis, set the unique id of new axis for the yAxis parameter in the config options in the `addSeries` function.

~~~
    $chart->addSeries ("car_quantity", "Quantity", [14, 19, 17], array(
      "yAxis" => "quantity"
    ));
~~~

### Complete example

{{ embedExample ('php', 'chart_dual_axes') }}
