
### Creating a Gauge Component

You can create a Gauge Component by creating an instance of the {{ linkApi("<%= lang %>", "GaugeComponent", "") }}.

<% if(lang === 'js') { %>
~~~
var gauge = new GaugeComponent ();
gauge.setDimensions (3, 2);
~~~
<% } else if(lang === 'php') { %>
~~~
$gauge = new GaugeComponent ();
$gauge->setDimensions (3, 2);
~~~
<% } %>


### Configuring the gauge

A Gauge has two parameters which needs to be set.

1. `Limits` : The minimum and maximum values of the gauge
2. `Value` : The current value of the gauge

These two parameters can be configured by calling the {{ linkApi("<%= lang %>", "GaugeComponent", "setLimits") }} function and the  {{ linkApi("<%= lang %>", "GaugeComponent", "setValue") }} function respectively.


#### Setting the limits

You can set the limits by calling the {{ linkApi("<%= lang %>", "GaugeComponent", "setLimits") }} function which takes two parameters.

* `Minimum`: The lower bound of the gauge range
* `Maximum` : The upper bound of the gauge range

<% if(lang === 'js') { %>
~~~
gauge.setLimits(0, 120);
~~~
<% } else if(lang === 'php') { %>
~~~
$gauge->setLimits(0, 120);
~~~
<% } %>

#### Setting the value

You can set the value by calling the  {{ linkApi("<%= lang %>", "GaugeComponent", "setValue") }} function. The setValue takes two parameters,

1. `Value` : The value of the gauge in the range of min - max.
<% if(lang === 'js') { %>
2. {{ linkArticle("number_formatting") }} : The number formatting properties.    
<% } else if(lang === 'php') { %>
2. {{ linkArticle("php_number_formatting") }} : The number formatting properties.
<% } %>


<% if(lang === 'js') { %>
~~~
gauge.setValue(42, {
    numberPrefix: '$'
});
~~~
<% } else if(lang === 'php') { %>
~~~
$gauge->setValue(42, array(
    "numberPrefix" => "$"
));
~~~
<% } %>

Finally add the gauge to the dasboard by calling the `addComponent` function.

<% if(lang === 'js') { %>
~~~
db.addComponent(gauge);
~~~
<% } else if(lang === 'php') { %>
~~~
$db->addComponent($gauge);
~~~
<% } %>

### Complete Example

{{ embedExample ('<%= lang %>', 'gauge') }}