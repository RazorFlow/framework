
### In-Place Update

When you want to update the gauge component you can simply call the {{ linkApi("<%= lang %>", "GaugeComponent", "setValue") }} function, It will automatically update the value of the gauge in-place with an animation.

{% if(lang === "js") { %}
~~~
gauge.setValue(42);
~~~
{% } else if(lang === "php") { %}
~~~
$gauge->setValue(42);
~~~
{% } %}