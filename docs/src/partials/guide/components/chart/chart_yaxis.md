Some charts with a Y Axis can be configured. The aspects of the Y Axis that can be currently customized are:

1. The name of the Y-Axis
2. The number formatting of the Y AXis.

To do this, you will need to use the {{ linkApi("{%=lang%}", "ChartComponent", "setYAxis") }} function.

{% if(lang === 'js') { %}
~~~
    chart.setYAxis("Sales", {
        numberPrefix: "$ "
    });
~~~
{% } else if(lang === 'php') { %}
~~~
    $chart->setYAxis("Sales", array(
      "numberPrefix" => "$"
    ));
~~~
{% } %}


1. The first parameter is the name of the Y Axis
2. The second optional parameter is an object containing **Standard number formatting properties**.

### Complete example

{{ embedExample ('{%=lang%}', 'chart_yaxis') }}
