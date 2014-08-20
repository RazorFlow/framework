--
title: "Getting Started with KPI Table Component"
subtitle: ""
id: "kpi_table_basic"
index: 0
--


### Adding a KPI Table Component to the dashboard

In order to add a KPI Table component to the dashboard follow these steps:
1. Create an instance of the `KPITableComponent`.
2. Add a KPI to the table using {{ linkApi('js', 'MultiKPIComponent', 'addKPI') }} method.
3. Finally add the `KPITableComponent` instance to the dashboard..

### Create an instance of KPITableComponent

~~~
var kpi = new KPITableComponent ();
kpi.setCaption('Sales by region 2013');
kpi.setDimensions (12, 2);
~~~

### Adding Individual KPIs

In order to add individual KPI to this group use the {{ linkApi('js', 'MultiKPIComponent', 'addKPI') }} method. 

* The first paramater is a `id`, this `id` will be used to update or delete a KPI which is described in the following sections.
* The second paramter is a list of options. 

~~~
kpi.addKPI('firstKPI', {
    caption: 'Texas',
    value: 2766,
    numberPrefix: '$'
});
~~~

### Update a KPI

You can use the {{ linkApi('js', 'MultiKPIComponent', 'updateKPI') }} method to update a specific KPI by `id`.

~~~~
kpi.updateKPI('firstKPI', {
    value: 2391,
});
~~~

### Deleting a KPI

To delete a KPI you can use the {{ linkApi('js', 'MultiKPIComponent', 'deleteKPI') }} method by passing an `id` as the parameter.

~~~
kpi.deleteKPI('firstKPI');
~~~

### Setting KPI Caption color

In order to set the caption color for a specific KPI, you can use the {{ linkApi('js', 'MultiKPIComponent', 'setKPICaptionColor') }}. This method takes two parameters:

* The `id` of the KPI.
* The `color` for KPI caption.

~~~
kpi.setKPICaptionColor('firstKPI', '#006699');
~~~

### Setting KPI Value Color

In order to set the value color for a specific KPI, you can use the {{ linkApi('js', 'MultiKPIComponent', 'setKPIValueColor') }}. This method takes two parameters:

* The `id` of the KPI.
* The `color` for KPI value.

~~~
kpi.setKPIValueColor('firstKPI', '#339933');
~~~

### Available Options that you can set for individual KPIs

* **caption**: The caption of the KPI.
* **value**: The value for the KPI.
* All options pertainiing to number formatter can be applied here. See {{ linkArticle('number_formatting') }}.

### A Complete example

<%- embedExample ('js', 'kpi_table') %>

