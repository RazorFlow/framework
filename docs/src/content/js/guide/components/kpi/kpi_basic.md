--
title: "Getting Started with KPI Component"
subtitle: ""
id: "kpi_basic"
index: 0
--


### Adding a KPI Component to the dashboard

In order to add a KPI component to the dashboard, you need to create an instance of the component and add it to the dashboard.

~~~
var kpi = new KPIComponent ();
kpi.setDimensions (4, 4);
~~~

### Setting the caption

The caption is the text that will be displayed on the KPI. You can set the caption using the {{ linkApi("js", "Component", "setCaption") }} function.

~~~
kpi.setCaption ("Sales");
~~~

### Setting the current value

You can show the current value of the KPI that will be displayed as a number using the {{ linkApi("js", "KPIComponent", "setValue") }} function.

~~~
kpi.setValue (42);
~~~

For more examples on using {{ linkApi("js", "KPIComponent", "setValue") }} and information on formatting the value, see "Customizing KPI Display Value"

### A Complete example

<%- embedExample ('js', 'kpi0') %>

