--
title: "Component KPIs"
subtitle: ""
id: "js_component_kpis"
index: 2
--


{{ anchor("componentKPI", "Component KPIs") }}

RazorFlow Dashboard Framework includes a unique feature called "Component KPIs" which allows you to show some related metrics along with each chart and table. You can add multiple KPIs to a single component. To do this, use the {{ linkApi("js", "Component", "addComponentKPI")}} function. 

~~~
var chart = new ChartComponent ();
// Configure the chart component.

chart.addComponentKPI ("total_sales", {
	caption: "Total Sales",
	value: 41332,
	numberPrefix: "$"
});

chart.addComponentKPI ("total_profit", {
	caption: "Total Profit",
	value: 31215,
	numberPrefix: "$"
});
~~~

### Updating a component KPI

If you wish to update the value of a Component KPI you can do so using the {{ linkApi("js", "Component", "updateComponentKPI")}} function. Note that currently only updating the value is supported. Updating the caption and other parameters will be supported in a later release.

~~~
var chart = new ChartComponent ();
// Configure the chart component.

chart.updateComponentKPI ("total_sales", {
	value: 45132
});

chart.updateComponentKPI ("total_profit", {
	value: 33441
});
~~~

### Limitations

Because of the way Component KPIs work, there are certain limitations that you need to keep in mind while using them. Component KPIs are laid out horizontally on the bottom of a component. This means that there's only a certain number of KPIs that can be placed in the horizontal space available for a component. 

Also, the size of the component doesn't change when a component KPI is added. This means that there needs to be sufficient height to show both the component KPIs and the main component itself. So please keep these 2 rules in mind while adding component KPIs. Without which, they won't be displayed:

1. The number if component KPIs you can add is (Width of component / 2). For example, for a component of width 6, you can add only 3 component KPIs.
2. The component needs to have a height more than 6.

### Full example

{{ embedExample ("js", "component_kpi0") }}



