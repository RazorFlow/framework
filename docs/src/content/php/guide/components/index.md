--
title: "Component Guide"
subtitle: ""
id: "php_component_index"
--


A Dashboard Component is what is displayed to the user - a visual representation of the data that powers the component.

To add a component to the dashboard, you need to first, create a component object and add it to the dashboard.

~~~
$chart = new ChartComponent();
// [.. configure component here ..]
$this->addComponent($chart);
~~~

### Component Guides

* {{ linkArticle ('php_chart_guide')}}
* {{ linkArticle ('php_table_guide')}}
* {{ linkArticle ('php_kpi_guide')}}
* {{ linkArticle ('php_form_guide')}}
* {{ linkArticle ('php_kpi_group_guide')}}
* {{ linkArticle ('php_kpi_table_guide')}}

