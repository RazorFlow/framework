--
title: "Updating chart data"
id: "chart_update"
--

## In place update

If the labels on the X-Axis are not changing, then you can perform an "in-place-update" of chart data. This has the advantage of smoothly scaling the chart so that your users clearly understand how much it changes.

You can update a chart's data anytime after it's rendered using the {{ linkApi("js", "ChartComponent", "updateSeries") }} function. Remember to use the correct series ID, the same one you used while creating the series with {{ linkApi("js", "ChartComponent", "addSeries") }} For example:

~~~
	chart.onItemClick (function (params) {
		chart2.updateSeries ("series_1", [3, 5, 2]);
	});
~~~

### Complete Example

{{ embedExample ('js', 'chart_updatevals') }}

## Full chart update

If you are re-drawing new data on the chart, you will need to first clear out the contents of the chart. To do so, use the {{ linkApi("js", "ChartComponent", "clearChart") }} function. Using this function it is almost like creating a new chart altogether, because this clears out all the series. Note that this doesn't reset other properties like the Y Axis name, etc.

{{ notice ('warning', '', "Be sure to call `lock` and `unlock` before modifying the component. This prevents the component from getting redrawn before the new parameters are available.")}}

~~~
	chart.onItemClick (function (params) {
		chart2.lock();
		chart2.clearChart ();
		chart2.setLabels (["D", "E", "F", "G"]);
		chart2.addSeries("another_series", "Another Series", [13, 5, 9, 12]);
		chart2.unlock();
	});
~~~

### Complete Example

{{ embedExample ('js', 'chart_updatechart') }}
