<meta>
{
    "title": "Bar Charts",
    "subtitle": "",
    "index": 7,
    "id": "php_chart_bar"
}
</meta>

### Bar Charts

You can create a bar chart by specifying the 'seriesDisplayType' property as `'bar'` in your series configuration.

~~~
    $chart->addSeries ("beverages", "Beverages", [1355, 1916, 1150], array(
        'seriesDisplayType' => "bar"
    ));
    $chart->addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321], array(
        'seriesDisplayType' => "bar"
    ));
~~~

{{ notice ('warning', '', "You cannot mix bar charts with other types of charts, like line and column" )}}

### Stacked Bar charts

You can also create a stacked bar chart by setting the `seriesStacked` property to `true` as described here {{ linkArticle('php_chart_series_stacked') }}

### Complete example

{{embedExample("php", "chart_bar")}}