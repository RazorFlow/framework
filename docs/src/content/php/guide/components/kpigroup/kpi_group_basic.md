--
title: "Getting Started with KPI Group Component"
subtitle: ""
id: "php_kpi_group_basic"
index: 0
--


### Adding a KPI Group Component to the dashboard

In order to add a KPI Group component to the dashboard follow these steps:
1. Create an instance of the `KPIGroupComponent`.
2. Add a KPI to the group using {{ linkApi('php', 'MultiKPIComponent', 'addKPI') }} method.
3. Finally add the `KPIGroupComponent` instance to the dashboard..

### Create an instance of KPIGroupComponent

~~~
$kpi = new KPIGroupComponent ('kpi_group');
$kpi->setCaption('Sales by region 2013');
$kpi->setDimensions (12, 2);
~~~

### Adding Individual KPIs

In order to add individual KPI to this group use the {{ linkApi('php', 'MultiKPIComponent', 'addKPI') }} method. 

* The first paramater is a `id`, which will be used to update or delete a KPI which is described in the following sections.
* The second paramter is a list of options. 

~~~
$kpi->addKPI('firstKPI', array(
    'caption' =>  'Texas',
    'value' => 2766,
    'numberPrefix' => '$'
));
~~~

### Update a KPI

You can use the {{ linkApi('php', 'MultiKPIComponent', 'updateKPI') }} method to update a specific KPI by `id`.

~~~~
$kpi->updateKPI('firstKPI', array(
    'value' => 2391,
));
~~~

### Deleting a KPI

To delete a KPI you can use the {{ linkApi('php', 'MultiKPIComponent', 'deleteKPI') }} method by passing an `id` as the parameter.

~~~
$kpi->deleteKPI('firstKPI');
~~~

### Setting KPI Caption color

In order to set the caption color for a specific KPI, you can use the {{ linkApi('php', 'MultiKPIComponent', 'setKPICaptionColor') }}. This method takes two parameters:

* The `id` of the KPI.
* The `color` for KPI caption.

~~~
$kpi->setKPICaptionColor('firstKPI', '#006699');
~~~

### Setting KPI Value Color

In order to set the value color for a specific KPI, you can use the {{ linkApi('php', 'MultiKPIComponent', 'setKPIValueColor') }}. This method takes two parameters:

* The `id` of the KPI.
* The `color` for KPI value.

~~~
$kpi->setKPIValueColor('firstKPI', '#339933');
~~~

### Available Options that you can set for individual KPIs

* **caption**: The caption of the KPI.
* **value**: The value for the KPI.
* All options pertainiing to number formatter can be applied here. See {{ linkArticle('php_number_formatting') }}.

### A Complete example

<%- embedExample ('php', 'kpi_group') %>

