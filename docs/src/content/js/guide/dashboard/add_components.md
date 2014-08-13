<meta>
{
    "title": "Add components to your dashboard",
    "subtitle": "",
    "id": "add_components",
    "index": 1
}
</meta>

{{ anchor("component_object", "What is a component object?") }}
### What is a component object?

A component object is an instance of a component class like {{ linkApi("js", "ChartComponent", "") }}, etc. For example, if you have the code:

~~~
var chart1 = new ChartComponent();
~~~

here, `chart1` is the component object. Calling functions on this `chart1` object like `chart1.setCaption` will only affect this component and not any other function.

### Adding components to the dashboard

Once you have created a dashboard, and configured the components, you can add components to the dashboard using `db.addComponent`. So to summarize, the process is:

1. Create a component object
2. Configure the component
3. Use `addComponent` to add the component to the dashboard.


~~~
	var chart = new ChartComponent ();
	chart.setCaption ("Chart Caption goes Here");
	// ... configuration ...
	db.addComponent(chart);
~~~

### Overriding component order in the dashboard

You can change the order of the components displayed in the dashboard by calling the `overrideDisplayOrderIndex` function on the component and specifying an index. like this,

~~~
    chart.overrideDisplayOrderIndex (3);
~~~
#### Example

{{ embedExample("js", "component_order_index") }}