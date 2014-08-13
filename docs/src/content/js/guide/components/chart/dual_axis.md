<meta>
{
    "title": "Dual Y Axes Charts",
    "subtitle": "",
    "index": 8,
    "id": "dual_axis"
}
</meta>

Sometimes you might need to show some multiple series of data on the same chart, but with very different scales. For example, you want to show the number of car sales with the total revenue.

Take a look at this example. You can't even **see** the second series because it's so small:

{{ embedExample ('js', 'chart_dual_bad') }}

However, we still want to see some correlation. For this we use RazorFlow's Dual Axis system.

You can create a dual axes chart by calling the {{ linkApi("js", "ChartComponent", "addYAxis") }} function on the chart component. Currently, only column, line and area charts can have dual axes. By default, the chart has a left axis, when the `addYAxis` is called it adds a right axis to the chart. The `addYAxis` function is similar to the {{ linkApi("js", "ChartComponent", "setYAxis") }} function with one exception. It function has an extra parameter `id` associated with it. it looks like this:

~~~
    chart.addYAxis("quantity", "Quantity", {
        // Any options will go here.
    });
~~~
1. The first parameter is the id of the axis.
1. The second parameter is the name of the Y Axis.
2. The third optional parameter is an object containing **Standard number formatting properties**.

To tell a series to use the new axis instead of the `primary` axis, set the unique id of new axis for the yAxis parameter in the config options in the `addSeries` function.

~~~
    chart.addSeries ("quantity", "Quantity", [14, 19, 17], {
        seriesDisplayType: 'column',
        yAxis: "quantity"
    });
~~~

### Complete example

{{ embedExample ('js', 'chart_dual_axes') }}
