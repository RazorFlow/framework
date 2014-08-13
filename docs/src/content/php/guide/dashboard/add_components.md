<meta>
{
    "title": "Add components to your dashboard",
    "subtitle": "",
    "id": "php_add_components",
    "index": 3
}
</meta>

### What is a component object?

A component object is an instance of a component class like {{ linkApi("php", "ChartComponent", "") }}, etc. For example, if you have the code:

~~~
$chart1 = new ChartComponent();
~~~

here, `$chart1` is the component object. Calling functions on this `$chart1` object like `$chart1->setCaption()` will only affect this component and not any other component.

### Adding components to the dashboard

Once you have created a dashboard, and configured the components, you can add components to the dashboard using `$this->addComponent`. So to summarize, the process is:

1. Create a new file.
2. Create a class extending `StandaloneDashboard`
3. Create a public function `buildDashboard`
4. Add a component object inside the `buildDashboard` function
5. Configure the component
6. Use `addComponent` to add the component to the dash board.
7. Create an object of the class that was defined
8. Open the PHP page in your browser

~~~
<?php
require('path/to/razorflow.php');
class SampleDasboard extends StandaloneDashboard{
  public function buildDashboard(){
    $chart = new ChartComponent("chart_1");
    $chart->setCaption ("Chart Caption goes Here");

    $this->addComponent($chart);
  }
}

$db = new SampleDasboard();
$db->renderStandalone();
?>
~~~

### Overriding component order in the dashboard

You can change the order of the components displayed in the dashboard by calling the `overrideDisplayOrderIndex` function on the component and specifying an index. like this,

~~~
    $chart->overrideDisplayOrderIndex (3);
~~~
#### Example

{{ embedExample("php", "component_order_index") }}