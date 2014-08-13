<meta>
{
    "title": "Chart Drill into Modal",
    "subtitle": "",
    "index": 9,
    "id": "php_chart_drill_into_modal"
}
</meta>

### Show drill/detail chart in modal

You may encounter a situation where you have one chart having high-level summarized data, and wish to show more detail about an individual item when one of them have been clicked. You can do this by opening a secondary detail chart in a modal window.

The steps involving this are:

1. Create the **source** chart, this is going to contain the summary and will be displayed on the dashboard.
2. Create the **target** chart. This will be hidden by default, and opened only when the **source** is clicked.
3. Listen to the click event on the **source** chart to show the **target**.


### Step 1: Create Source chart

You can create a regular chart component and add it to the dashboard.

~~~
    $sourceChart = new ChartComponent("sourceChart");
    $sourceChart->setDimensions (4, 4);
    $sourceChart->setCaption("2011 Sales"); 
    $sourceChart->setLabels (["Beverages", "Vegetables"]);
    $sourceChart->addSeries ("sales", "Sales", [1343, 7741]);
    $sourceChart->addSeries ("quantity", "Quantity", [76, 119]);
    $this->addComponent ($sourceChart);
~~~

### Step 2: Create the target chart.

You can create the target chart, but since we don't know what data to put in it, we can hide the chart temporarily {{ linkApi("php", "Component", "hideComponent") }} function. This will ensure that the chart is not visibile on the dashboard when it's loaded. Don't forget to add this chart to the dashboard. Also note that you don't need to set the dimensions of this chart. 

~~~
    $targetChart = new ChartComponent("targetChart");
    $targetChart->hideComponent();
    $this->addComponent ($targetChart);
~~~

### Step 3: Show the target on click

You can listen to when the chart plot items are clicked using the {{ linkApi("php", "ChartComponent", "onItemClick") }} event handler. Within this callback we need to show the chart in the modal, by using the {{ linkApi("php", "Component", "showAsModal") }}.

You can also use the parameters in the ``params`` variable to customize the data in the chart.

~~~
    $sourceChart->onItemClick (array($sourceChart, $targetChart), "handleItemClick", $this);

    public function handleItemClick ($source, $targets, $params) {
        $targetChart = $this->getComponentByID('targetChart');
        $targetChart->setCaption ("Zone-wise breakdown of " . $params['label']);
        // You can filter/process the data as required.
        $targetChart->setLabels (["North Zone", "South Zone"]);
        $targetChart->addSeries ("sales", "Sales", [21, 46]);
        $targetChart->showAsModal();
    }
~~~

### Complete example

{{embedExample("php", "chart_drill_into_modal")}}

