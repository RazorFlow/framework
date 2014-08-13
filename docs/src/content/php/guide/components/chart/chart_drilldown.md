<meta>
{
    "title": "Drill-Down data using breadcrumbs",
    "subtitle": "",
    "index": 10,
    "id": "php_chart_drilldown"
}
</meta>

Drill-downs allow your users to explore data by clicking on one item in your chart to reveal more data about the item that they have selected. For example, a drill-down might allow you to drill from Country-wide data to seeing data for an individual state. Drill-downs can also be used for navigating time-based records like drilling down from yearly data to monthly data.

Let's consider an example, where we're drilling from *Country* to *State* to *City*. We initially start off showing the *Country*-wide data, and once the user clicks on one country, it activates the next **drill step** which shows the states. Once the user clicks on the name of any sate, it activates a **drill step** which shows the cities in that state. Note that you would normally have to do a bit of filtering and aggregation but we will not be covering that here.

The basic concept here is to use the `addDrillStep` function to add one drill step at a time. Let's consider this basic skeleton of a dashboard:


~~~
    public function buildDashboard(){
        $chart = new ChartComponent ("chart1");
        $chart->setCaption ("Country wide sales");
        $chart->setLabels ([ /* list of countries */]);
        $chart->addSeries ("sales", "Sales", [/* country-wise sales */]);
        $chart->addDrillStep ("drill_states", $this);
        $chart->addDrillStep ("drill_cities", $this);
        $this->addComponent($chart);
    }

    public function drill_states ($source, $targets, $params) {
        $source->setCaption("States in ".$params["label"]);
        $source->setLabels ([ /* list of states */]);
        $source->addSeries ("sales", "Sales", [/* state-wise sales */]);
    }

    public function drill_cities ($source, $targets, $params) {
        $source->setCaption("Cities in ".$params["label"]);
        $source->setLabels ([ /* list of cities */]);
        $source->addSeries ("sales", "Sales", [/* city-wise sales */]);
    }
}
~~~

#### Concept 1: Your chart data gets reset after every drill step

Notice that though you called `addSeries` every time in the drill step, it didn't add a new series, but rather replaced it. Technically, operating on a chart after a drill step is like working on a new chart object.

**Why is this happening?** When you are drilling down the chart, you normally show new data, with completely new labels and charts. This is similar to calling the {{ linkApi ("php", "ChartComponent", "clearChart")}} function.

#### Concept 2: You have to create a function to handle drill downs

Since the code to perform the drill down has to be done after the user clicks on a chart item, it needs to be written in a different function which accepts the usual format of parameters: `$source`, `$targets` and `$params`

#### Concept 3: The `$source` is component in which the drill down is happening

The `$source` and `$target` parameters


**Why is this here?** If you have to perform some asynchronous functionality like fetching data using AJAX, you can call `done` only after the data is available, and the chart is ready for display.

#### Concept 4: The params include everything from onItemClick

The parameters of the item `$params` is a key-value array which includes information about what was clicked on by the user.

* **value**: The value of the item that was clicked (purely numeric, this will not contain formatted values like number prefix/suffix, etc)
* **label**: The x-axis label that corresponds to the item that was clicked.
* **labelIndex**: The index of the label (starting from 0) that corresponds to the item that was clicked.

### Full Example

{{ embedExample ("php", "chart_drill0") }}

## Additional notes


### Get values of previous drill 

For example, while filtering cities, you might need to perform a query which also knows the country and state. In other words, you need to know the entire history of the drilldown. For this, the `params` object includes a separate key called `drillLabelList`. 

~~~
    public function drill_countries ($source, $targets, $params) {
        $source->setCaption("Cities in ".$params["label"]." of country ".$params['drillLabelList'][0]);
        $source->setLabels ([ /* list of cities */]);
        $source->addSeries ("sales", "Sales", [/* city-wise sales */]);
    }
~~~

