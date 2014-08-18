--
title: "Basic ChartComponent Functionality"
id: "chart_basic"
--

Here is an example chart component:

Here is the code for a complete dashboard containing a single chart component:
~~~
rf.StandaloneDashboard(function(db){
    var chart = new ChartComponent();
    chart.setDimensions (4, 4);
    chart.setCaption("My First Chart"); 
    chart.setLabels (["Jan", "Feb", "Mar"]);
    chart.addSeries ("beverages", "Beverages", [1355, 1916, 1150]);
    chart.addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321]);
    db.addComponent (chart);
});
~~~

The steps taken to build this dashboard are:

1. Create an empty dashboard
2. Add a new component instance of type {{ linkApi ('js', 'ChartComponent', '') }}
3. Set the **Component Dimensions** as 4x4
4. Set a **caption** to the component.
5. Set the labels (which are shown on the X-Axis) using the {{ linkApi ('js', 'ChartComponent', 'setLabels') }} function, pass an array of strings which will be displayed.
6. Add multiple series to the chart, using the {{ linkApi ('js', 'ChartComponent', 'addSeries') }} function which takes 3 arguments:
   * An **ID String** (`beverages`, `packaged_foods`, etc) which is used later to refer to this series to update it, etc.
   * The **Title** of the series, which will be displayed on the chart.
   * An array of **Data Values** which will be the actual values plotted on the chart.
7. **Add the component** to the dashboard using the **addComponent** function.

## Pie Charts

To create a pie chart, use the {{ linkApi('js', 'ChartComponent', 'setPieValues') }} function instead of {{ linkApi ('js', 'ChartComponent', 'addSeries') }}. Since a pie chart can only have a single set of values, you can call this function only once.

<%- embedExample ('js', 'chart_pie') %>

### Notes:

* By default, all chart series are Column Charts. Changing the series type is covered in {{ linkArticle ('series_config') }}
* Please ensure that the number of data points in each series is the same number of items in  your Label Array.
