<meta>
{
    "title": "Stacked Charts",
    "subtitle": "",
    "index": 6,
    "id": "php_chart_series_stacked"
}
</meta>

### Stacked Column Charts

You can create a stacked column chart by creating a regular column chart and passing an extra property `seriesStacked:true` in your series configuration. You also need to specify the `seriesDisplayType`.

~~~
	$chart->addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321], array(
		'numberPrefix' => "$",
		'seriesStacked' => true,
		'seriesDisplayType' => "column"
	));
	$chart->addSeries ("vegetables", "Vegetables", [1313, 1976, 924], array(
		'numberPrefix' => "$",
		'seriesStacked' => true,
		'seriesDisplayType' => "column"
	));
~~~

{{ notice ('warning', '', "You currently cannot mix stacked series columns with other types, like line, or make multiple stacks, although this functionality is going to be available soon" )}}

### Adding number prefixes and suffixes

Since multiple stacked series share similar number formatting properties, you will have to set the number formatting properties using the {{linkApi("php", "ChartComponent", "setYAxis")}} function. 

~~~
	$chart->setYAxis ("Sales", array(
		'numberPrefix' => "$"
	));
~~~

### Complete example

{{embedExample("php", "chart_stacked_series")}}