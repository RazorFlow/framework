<meta>
{
	"title": "Customizing KPI Display value",
	"subtitle": "",
	"id": "php_value_format",
	"index": 1
}
</meta>

### Formatting the number

You can format the number displayed in the KPI by passing an option to  the {{ linkApi("php", "KPIComponent", "setValue") }} function like this:

~~~
$kpi->setValue (19136, array(
	"numberPrefix" => "$"
));
~~~

All the standard number formatting features are available. For a full list of available parameters and examples with their usage, see "Number formatting in razorflow"

### Changing the color of the text

You can change the value color of the KPI that is displayed by setting the `valueTextColor` parameter

~~~
$kpi->setValue (42, array(
	"valueTextColor" => "#ff0000"
));
~~~

### A Complete example

{{ embedExample ('php', 'kpi1' )}}