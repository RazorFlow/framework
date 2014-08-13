<meta>
{
    "title": "Chart click events",
    "subtitle": "",
    "index": 5,
    "id": "chart_event_click"
}
</meta>

You can execute a JavaScript callback when an item on the chart has been clicked, by using the {{ linkApi("js", "ChartComponent", "onItemClick") }} function. This callback is executed whenever an item (like a line chart circle, column chart rectangle, etc.) is clicked.

~~~
chart_object.onItemClick(function(params) {
	// Params contain the parameters of the chart.
	alert("The value you clicked was ", params.value);
	alert("The label you clicked was ", params.label);
});
~~~

In your callback, declare an argument called `params` which is a JavaScript object which contains the following keys:

* **value**: The value of the item that was clicked (purely numeric, this will not contain formatted values like number prefix/suffix, etc)
* **label**: The x-axis label that corresponds to the item that was clicked.
* **labelIndex**: The index of the label (starting from 0) that corresponds to the item that was clicked.