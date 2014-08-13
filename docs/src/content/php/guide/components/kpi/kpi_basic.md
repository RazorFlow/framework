<meta>
{
	"title": "Getting Started with KPI Component",
	"subtitle": "",
	"id": "php_kpi_basic",
	"index": 0
}
</meta>

### Adding a KPI Component to the dashboard

In order to add a KPI component to the dashboard, you need to create an instance of the component and add it to the dashboard.

~~~
$kpi = new KPIComponent ("kpi1");
$kpi->setDimensions (4, 4);
~~~

### Setting the caption

The caption is the text that will be displayed on the KPI. You can set the caption using the {{ linkApi("php", "Component", "setCaption") }} function.

~~~
$kpi->setCaption ("Open Suport Tickets");
~~~

### Setting the current value

You can show the current value of the KPI that will be displayed as a number using the {{ linkApi("php", "KPIComponent", "setValue") }} function.

~~~
$kpi->setValue (19);
~~~

For more examples on using {{ linkApi("php", "KPIComponent", "setValue") }} and information on formatting the value, see "Customizing KPI Display Value"

### A Complete example

{{ embedExample ('php', 'kpi0' )}}