--
title: "Tutorial"
subtitle: ""
id: "tutorial_php"
--

Welcome to RazorFlow Framework, in this article, we will build a complete interactive dashboard consisting of several components. Before you go through this article, we reccomend you're familiar with the [Getting Started](#) article.

# Creating a chart

To create a chart you need to create a `ChartComponent` object and add it to the dashboard. Set up the dashboard quickstart, replace the contents of `buildDashboard` function with this and reload the browser.

```
  public function buildDashboard(){
    $quarterlySales = new ChartComponent('quarterlySales');
    $quarterlySales->setDimensions (6, 6);
    $quarterlySales->setCaption("Quarterly Sales");
    $quarterlySales->setLabels (array("Q1", "Q2", "Q3", "Q4"));
    $quarterlySales->addSeries(array(13122, 41312, 46132, 51135));
    $this->addComponent ($quarterlySales);
  }
```

What just happened here? Let's take a closer look line by line:

```
  public function buildDashboard(){
```

This is the function called by the dashboard initialization process to allow you to build all the components to the dashboard. Since you're inheriting from `StandaloneDashboard`, `$this` will be the dashboard object. Any operation on the dashboard should be made on this dashboard object.

```
$quarterlySales = new ChartComponent('quarterlySales');
```

This line creates a new **Component Object**. This object is used to interact with the chart component and configure all the parameters of it.

```
$quarterlySales->setDimensions (6, 6);
```

This calls the `setDimensions` and configures the component to be 6 units wide and 6 units tall. While we'll be discussing more about the dimensions and layout system in detail, the summary of RazorFlow Framework's dimensions system is this:

> The dashboard is rendered on a 12-column grid. Since the size of browsers vary the exact pixel values of the components vary significantly as well. But the end result is that a layout looks the same even if the browser is resized slightly (however the framework adjusts the layout for better viewing experience on mobile and small tablet devices)

What this means is that the width of the chart will always be about 1/2 the size of the full dashboard. Also the height and width of the component will always be the same so the chart will be a square for consistency of layouts.


```
$quarterlySales->setCaption("Quarterly Sales");
```

This sets the caption of the component. The caption is the text that's displayed in the top of the component.

```
$quarterlySales->setLabels (array("Q1", "Q2", "Q3", "Q4"));
```

`setLabels` is a function that accepts an array and sets the labels which are displayed on the X Axis.

```
$quarterlySales->addSeries(array(13122, 41312, 46132, 51135));
```
`addSeries` is a function that adds a single series of data to the chart. This is the data that will actually be displayed on the chart. Note that you can call the function with just an array if you're using a single series, but if you are adding multiple series, then you need to provide a series ID (described in the next section).

```
$this->addComponent ($quarterlySales);
```

This statement adds the chart to the dashboard. If you do not add the component then it won't be displayed on the dashboard at all.

### Add new series

Let's say along with the sales in each quarter, we wish to also display the quantity that was sold in each quarter.

```
$quarterlySales->setLabels (array("Q1", "Q2", "Q3", "Q4"));
$quarterlySales->addSeries('sales', "Sales", array(13122, 41312, 46132, 51135));
$quarterlySales->addSeries('quantity', "Quantity", array(121, 392, 420, 489));
$this->addComponent ($quarterlySales);
```

Most of the lines are the same as explained before. However when we are adding the series using `addSeries` there's something considerably different happening.

```
$quarterlySales->addSeries('sales', "Sales", array(13122, 41312, 46132, 51135));
$quarterlySales->addSeries('quantity', "Quantity", array(121, 392, 420, 489));
```

In this case, instead of passing a single array, we are first passing 2 strings, then an array.

1. The first string `'sales'` is an ID. This string needs to be unique and an alphanumeric string. This is the key used to update, modify and remove the series.
2. The second string "Sales" is the name that is displayed to the user. Note that the ID can be anything and isn't displayed to the user.
3. The array of values that are used to display the plot data.

### Add a secondary axis

There are a few things which are wrong with the previous example. One of the most glaring mistakes is that the quantity values are so small that they're barely visible on the chart.

Now in a lot of situations you'll be comparing 2 entirely different items which have different range of values. In those cases, you would want to use a different Y Axis.

In our case, we need to use a different Y Axis. This is quite a simple and straight forward thing to do. We simply configure the chart like this (we're only listing the code that has changed, the rest of the code for configuring the chart stays the same):

```
$quarterlySales->addYAxis('quantity', "Quantity");
$quarterlySales->addSeries('sales', "Sales", array(13122, 41312, 46132, 51135));
$quarterlySales->addSeries('quantity', "Quantity", array(121, 392, 420, 489), array(
  'yAxis' => 'quantity'
));
```

1. We used the `addYAxis` function to add a secondary Y Axis. Note that even here, the first parameter is the ID which is used internally for all references, and the second parameter is the name that is displayed to the dashboard viewer.
2. In the `addSeries` function while adding the `quantity` series, we pass a JavaScript object with `yAxis` set to `'quantity'`. This tells RazorFlow framework to associate the quantity series with the quantity axis.

Now reloading the browser, the chart looks significantly better and more useful.

### Configuring the series

However, there is still a problem with the chart. The sales figures represent a value in US Dollars, and without some more information on the chart, it can be confusing for anyone who is reading the chart. For this, we will specify that the sales are currency by writing "$" before each number.

```
$quarterlySales->addSeries('sales', "Sales", array(13122, 41312, 46132, 51135), array(
  'numberPrefix' => "$"
));
```

The object that we passed to the `addSeries` function is called the **Configuration object** a lot of functions in RazorFlow Framework follow the standard pattern: they accept a configuration object to change the behaviour of the function as required.

### Different chart types

Now let's say that we want to display the sales as a line chart, instead of a column chart - which is the one by default. Simply set another parameter in the configuration object called `seriesDisplayType` and change it to `"line"`.

```
quarterlySales.addSeries('sales', "Sales", [13122, 41312, 46132, 51135], {
  numberPrefix: "$ ",
  seriesDisplayType: "line"
});
```

If you reload the browser you'll see that now the chart has 2 series - one column and one line.

### Adding more components

A dashboard will usually contain more than one component, and so will the dashboard that we are building now. Now that you've built the first component using RazorFlow Framework you'll be building on top of the same dashboard.

To recap, this is the final code that we've built so far:

<%- embedExample ('php', 'tutorial0') %>

# KPI Components

### What is a KPI

A KPI stands for **Key Performance Indicator**. This is also called "metric" and "value" in some dashboards. It usually contains a single numeric value which is indicative of how well something is performing at the given time.

### A simple KPI: Number of support tickets

Let's say you'd like to have a KPI to keep track of the number of support tickets fetched through an API or database. Adding a KPI to track the number of open support tickets is quite simple and straight forward.

```
$numTickets = new KPIComponent ('numTickets');
$numTickets->setDimensions (3, 3);
$numTickets->setCaption ("Open Support Tickets");
$numTickets->setValue (42);
$this->addComponent ($numTickets);
```

Let's break this down line by line:

```
$numTickets = new KPIComponent ('numTickets');
```

Create a new **Component Object** of type `KPIComponent` called `$numTickets`. This will be used to configure the component in the future

```
$numTickets->setDimensions (3, 3);
```
Set the dimensions of the component to be 3x3 meaning it will take about 1/4th of the width of the dashboard, and will be a square component.

```
$numTickets->setCaption ("Open Support Tickets");
```

Set the caption of the KPI which will be displayed on the dashboard.

```
$numTickets->setValue (42);
```

Set the value of the KPI. This is the value that you'd normally fetch from your database/API to display.

```
$this->addComponent ($numTickets);
```
And finally, add the component to the dashboard otherwise it would not be visible on the dashboard.

### Displaying a gauge component

Now let's add another component to the dashboard, which is a gauge component. RazorFlow Framework supports 2 types of gauges right now: Angular gauges and Solid gauges. Solid gauges are the default, and we will go into the details and differences in another article.

However, let's add a gauge to the dashboard. Add this code right after adding the `$numTickets` component to the dashboard. We will now add a "Customer Satisfaction" gauge which shows the current customer satisfaction rating from 0 to 10.

```
$satisfactionGauge = new GaugeComponent('satisfactionGauge');
$satisfactionGauge->setDimensions(3, 3);
$satisfactionGauge->setCaption('Customer Satisfaction');
$satisfactionGauge->setValue(8);
$satisfactionGauge->setLimits(0, 10);
$this->addComponent($satisfactionGauge);
```

Again, let's break this down line by line:

```
$satisfactionGauge = new GaugeComponent('satisfactionGauge');
```

Create a new **Component Object** for the gauge component used to modify the gauge later.

```
$satisfactionGauge->setDimensions(3, 3);
```
Set the dimensions similar to the dimensions of the KPI component that we had built earlier.

```
$satisfactionGauge->setCaption('Customer Satisfaction');
```
Set the caption of the gauge which is displayed in the dashboard within the gauge.

```
$satisfactionGauge->setValue(8);
```
Set the current value that the gauge should display which also specifies the value it should be pointing to.

```
$satisfactionGauge->setLimits(0, 10);
```
Set the limits of the gauge. Note that the gauge can show values from 0 to 10, so we set the limits using `setLimits` specifying the minimum and maximum values respectively.

```
$this->addComponent($satisfactionGauge);
```

### Group of KPIs

Sometimes several related metrics and KPIs must be presented together. For this we can use the KPI group component. For example, along with the support tickets, we wish to see a breakdown how many support tickets are high priority and normal priority.

For this we add a new component to the dashboard, which is called the "KPI Group Component". To do this add the following code:

```
$ticketPriorities = new KPIGroupComponent ('ticketPriorities');
$ticketPriorities->setDimensions (6, 3);
$ticketPriorities->setCaption('Ticket Priorities');
$ticketPriorities->addKPI('high', array(
  'caption' => 'High Priority',
  'value' => 6
));
$ticketPriorities->addKPI('normal', array(
  'caption' => 'Normal Priority',
  'value' => 36
));
$this->addComponent ($ticketPriorities);
```

Again, let's break this down:

```
$ticketPriorities = new KPIGroupComponent ('ticketPriorities');
$ticketPriorities->setDimensions (6, 3);
$ticketPriorities->setCaption('Ticket Priorities');
```
Here we create a new component object called `$ticketPriorites` of type `KPIGroupComponent` and set the dimensions to be 6x3. You can see that this will be a rectangle but will fit in cleanly into the existing layout of the dashboard.

Also the `setCaption` function is a caption for the entire component and set of KPIs but not for individual KPIs. Here you're setting a caption for the entire component but you'll also be setting captions for the individual KPIs as part of the group.

```
$ticketPriorities->addKPI('high', array(
  'caption' => 'High Priority',
  'value' => 6
));
```

We use the `addKPI` to add an individual KPI to the KPI group. Note that this isn't being added to the dashboard directly but to the KPI Group component `ticketPriorities`. For this, we pass 2 parameters:

1. An ID for the KPI which will be used for modifying, updating or removing the KPI from the component.
2. An object containing a `caption` and a `value` which will be used to display on the dashboard.

```
$ticketPriorities->addKPI('normal', array(
  'caption' => 'Normal Priority',
  'value' => 36
));
```

This is another KPI that we are adding to the KPI Group using the `addKPI` function exactly as described above.

### Adding KPIs to a component

One unique feature of the RazorFlow Framework is "Component KPIs" which allows you to have KPIs which are attached to a component.

This is a common requirement to show some additional custom data along with the component. For example, let's go back to the chart that we built in the beginning. Along with the sales we would like to show the total sales for 3 categories: Beverages, Groceries and Dairy.

For this, we will go back to the original code for the Quarterly Sales chart. Before adding the component to the dashboard add this code:

```
$quarterlySales->addComponentKPI ('beverage', array(
  'caption'=> 'Beverages',
  'value' => 22900,
  'numberPrefix' => ' $',
  'numberHumanize' => true
));
$quarterlySales->addComponentKPI('vegetable', array(
  'caption'=> 'Vegetables',
  'value' => 10401,
  'numberPrefix' => ' $',
  'numberHumanize' => true
));
$quarterlySales->addComponentKPI('dairy', array(
  'caption'=> 'Dairy',
  'value' => 27700,
  'numberPrefix' => ' $',
  'numberHumanize' => true
));
```

Note that we are calling `addComponentKPI` on the **component object** of the chart, which is `$quarterlySales`. Since we're using the function in a very similar way 3 times, we will just see how the `beverage` KPI is added and dissect that.

```
$quarterlySales->addComponentKPI ('beverage', array(
  'caption'=> 'Beverages',
  'value' => 22900,
  'numberPrefix' => ' $',
  'numberHumanize' => true
));
```
As you may already have noticed, the function `addComponentKPI` is very similar to KPI Groups.

1. The first argument to be passed is the ID of the component KPI which will be used to modify, update and remove the component KPI. In this case the ID is `'beverage'`.
2. To specify the KPI value, we are passing an array which contains:
   * `caption` - which is the caption that will be displayed
   * `value` - the number that will be displayed for the KPI
   * `numberPrefix` - Since the sales are currency we can pass the `numberPrefix` configuration parameter and the number will be prefixed with a "$" sign.
   * `numberHumanize` - This is a configuration parameter available in many other places. What this does is make the number more "human". Instead of `1321421`, it will display it as `1.32M`, which makes it vastly more readable and takes up less space.

This is the dashboard so far:

<%- embedExample ('php', 'tutorial1') %>

# Table Components

Tables are quite useful for displaying large quantities of Data, and RazorFlow framework includes native default support for tables along with useful functionality like pagination and conditional formatting.

### Add a table

Before we add the real table, we will just create a protected array to conveniently hold our data, called `protected $tableData`. Note that this is just for the demonstration purpose, and in real world usage, table data often comes from other sources, but in principle it is the same.

```
class SampleDashboard extends StandaloneDashboard {
  protected $tableData = array(
    array('name'=> "Broccoli", 'category'=> "Vegetables", 'price' => 14),
    array('name'=> "Cheese", 'category'=> "Dairy", 'price' => 18),
    array('name'=> "Tomatoes", 'category'=> "Vegetables", 'price' => 8),
    array('name'=> "Orange Juice", 'category'=> "Beverages", 'price' => 12),
    array('name'=> "Root Beer", 'category'=> "Beverages", 'price' => 13)
  );
```

Now we create a table component and populate it with this data using this code:

```
$productsTable = new TableComponent ('productsTable');
$productsTable->setDimensions (6, 6);
$productsTable->setCaption ('Products');
$productsTable->addColumn ('name', 'Name');
$productsTable->addColumn ('category', 'Category');
$productsTable->addColumn ('price', 'Price');
$productsTable->addMultipleRows ($this->tableData);
$this->addComponent($productsTable);
```

Let's break this down:

```
$productsTable = new TableComponent ('productsTable');
$productsTable->setDimensions (6, 6);
$productsTable->setCaption ('Products');
```

This creates a new component object of the type `TableComponent`, sets the dimensions and the caption. You know the drill by now!

```
$productsTable->addColumn ('name', 'Name');
$productsTable->addColumn ('category', 'Category');
$productsTable->addColumn ('price', 'Price');
```

Next, we're adding 3 columns to the table. Note that we're specifying an ID (`'name'`) and the column name (`"Name"`). The column name is visible to the users and can be any string, but the ID should be a simple alphanumeric string.

After we added 3 columns we add the data. There are many functions to add data to the table. Either you can add each row individually using `addRow` which is described in the documentation. You can also use `addMultipleRows` to add an array of rows.

```
$productsTable->addMultipleRows ($this->tableData);
```

If you notice something about `$this->tableData` you'll see that `$this0>tableData` is an array of other key-value arrays. Now the keys of the objects have the same name as the IDs of the columns. Namely `name`, `category` and `price`. This isn't a coincidence but RazorFlow Framework automatically picks up the right values using the column IDs.

Reload the page and you should see your table component with a few rows. Note that if you added several rows - too many to display then pagination would automatically activate.

### Configuring table columns

You can notice 2 major problems in the table we just built.

1. A tomato is not a vegetable, it's a fruit.
2. The price is displayed like a regular number but it needs to be displayed with a "$" sign and aligned to the right which is the correct way of displaying a price in a table.

For this, we simply need to configure the column. While we're adding the `price` column in the earlier table, we simply need to pass a configuration object like this:

```
$productsTable->addColumn ('price', 'Price', array(
  'dataType' => "number",
  'numberPrefix' => "$",
  'textAlign' => "right",
  'numberForceDecimals' => true
));
```

There's plenty of new concepts here, so let's break it down line by line:

```
'dataType' => "number",
```
We tell the table to understand that the value is a number, which would have additional functionality.

```
'numberPrefix' => "$",
```
All the numbers in the column should be prefixed by "$" to indicate currency.

```
'textAlign' => "right",
```
Text should be right-aligned to make it easier to read. This is the standard way of printing price lists, and RazorFlow Framework makes it easy to follow standards.

```
'numberForceDecimals' => true
```
Setting these two parameters ensure that 2 decimal places are always shown. So after applying all these rules, the number "14" is displayed as "$14.00"

# The full dashboard

Congratulations you built your first full dashboard! It includes several but not all components of the RazorFlow framework. To recap, this is how the code should be looking like after building the entire dashboard.

```
class SampleDashboard extends StandaloneDashboard {
  protected $tableData = array(
    array('name'=> "Broccoli", 'category'=> "Vegetables", 'price' => 14),
    array('name'=> "Cheese", 'category'=> "Dairy", 'price' => 18),
    array('name'=> "Tomatoes", 'category'=> "Vegetables", 'price' => 8),
    array('name'=> "Orange Juice", 'category'=> "Beverages", 'price' => 12),
    array('name'=> "Root Beer", 'category'=> "Beverages", 'price' => 13)
  );
  public function buildDashboard(){
    $quarterlySales = new ChartComponent('quarterlySales');
    $quarterlySales->setDimensions (6, 6);
    $quarterlySales->setCaption("Quarterly Sales");
    $quarterlySales->setLabels (array("Q1", "Q2", "Q3", "Q4"));
    $quarterlySales->addYAxis('quantity', "Quantity");
    $quarterlySales->addSeries('sales', "Sales", array(13122, 41312, 46132, 51135), array(
      'numberPrefix' => "$"
    ));
    $quarterlySales->addSeries('quantity', "Quantity", array(121, 392, 420, 489), array(
      'yAxis' => 'quantity'

    ));
    $this->addComponent ($quarterlySales);
    $quarterlySales->addComponentKPI ('beverage', array(
      'caption'=> 'Beverages',
      'value' => 22900,
      'numberPrefix' => ' $',
      'numberHumanize' => true
    ));
    $quarterlySales->addComponentKPI('vegetable', array(
      'caption'=> 'Vegetables',
      'value' => 10401,
      'numberPrefix' => ' $',
      'numberHumanize' => true
    ));
    $quarterlySales->addComponentKPI('dairy', array(
      'caption'=> 'Dairy',
      'value' => 27700,
      'numberPrefix' => ' $',
      'numberHumanize' => true
    ));

    // ====== New components will come here ========

    $numTickets = new KPIComponent ('numTickets');
    $numTickets->setDimensions (3, 3);
    $numTickets->setCaption ("Open Support Tickets");
    $numTickets->setValue (42);
    $this->addComponent ($numTickets);

    $satisfactionGauge = new GaugeComponent('satisfactionGauge');
    $satisfactionGauge->setDimensions(3, 3);
    $satisfactionGauge->setCaption('Customer Satisfaction');
    $satisfactionGauge->setValue(8);
    $satisfactionGauge->setLimits(0, 10);
    $this->addComponent($satisfactionGauge);

    $ticketPriorities = new KPIGroupComponent ('ticketPriorities');
    $ticketPriorities->setDimensions (6, 3);
    $ticketPriorities->setCaption('Ticket Priorities');
    $ticketPriorities->addKPI('high', array(
      'caption' => 'High Priority',
      'value' => 6
    ));
    $ticketPriorities->addKPI('normal', array(
      'caption' => 'Normal Priority',
      'value' => 36
    ));
    $this->addComponent ($ticketPriorities);

    $productsTable = new TableComponent ('productsTable');
    $productsTable->setDimensions (6, 6);
    $productsTable->setCaption ('Products');
    $productsTable->addColumn ('name', 'Name');
    $productsTable->addColumn ('category', 'Category');
    $productsTable->addColumn ('price', 'Price', array(
      'dataType' => "number",
      'numberPrefix' => "$",
      'textAlign' => "right",
      'numberForceDecimals' => true
    ));
    $productsTable->addMultipleRows ($this->tableData);
    $this->addComponent($productsTable);
  }
}
```

Note that even as we go forward we'll be building on top of the same dashboard which will enable us to explore the functionality of RazorFlow Framework but also see it in a real-world use-case context.

# Add form for filtering data

While RazorFlow works great for displaying data in a static dashboard, where it really shines is when you build a dashboard which is interactive and can be used by the user to explore the data.

There are many ways of doing this. One of the most common ways you'd allow your user to explore the data is using a form to filter the data

### Forms v/s Filters

One thing that you should keep in mind is that adding the form does not automatically filter the data in the components. However the form component does save you a lot of time by building the form, adding widgets and even taking the data and providing the values in a ready to use object.

While RazorFlow Framework might in the future include functionality to filter the components without any extra code, currently you will have to write the code to filter the data yourself. But don't worry! It's quite simple and small and we provide an example of how to do it in this very article.

### Add a form component

```
$productFilterForm = new FormComponent ('productFilterForm');
$productFilterForm->setDimensions (6, 6);
$productFilterForm->setCaption ('Filter Products');
$productFilterForm->addMultiSelectField ('category', 'Select Category', array('Vegetables', 'Diary', 'Beverages'));
$productFilterForm->addTextField ('name', 'Product Name Contains');
$productFilterForm->addNumericRangeField('price', 'Price', array(5, 20));
$this->addComponent($productFilterForm);
```

As usual, let's break the code down and examine it line by line.

```
$productFilterForm = new FormComponent ('productFilterForm');
$productFilterForm->setDimensions (6, 6);
$productFilterForm->setCaption ('Filter Products');
```

Create a component object of type `FormComponent` and set the dimensions and caption as required. This form will be used to filter the products table.

```
$productFilterForm->addMultiSelectField ('category', 'Select Category', array('Vegetables', 'Diary', 'Beverages'));
```

Here, we are adding a field. Any form contains multiple fields, and adding a field using the `FormComponent` API adds:

* The `<input>` element required. (although sometimes it might use elements like sliders and date inputs)
* The label
* Validation and help texts

Here, we are adding a *Multi Select Field* by using the `addMultiSelectField` function. This allows a user to select one or more items. These are the arguments that are being passed to the `addMultiSelectField` function:

1. The id of the field, which is `'category'`. This ID will also be used to retrive the value that the user selects.
2. The text of the field which is `'Select Category'`, which is the label that will be displayed to the user.
3. The array containing options that the user can select from.

```
$productFilterForm->addTextField ('name', 'Product Name Contains');
```

This function call to `addTextField` adds a text field that is displayed in the form like a traditional text input function.

```
$productFilterForm->addNumericRangeField('price', 'Price', array(5, 20));
```

This function call to `addNumericRangeField` adds a slider allowing users to select a range of values between 5 and 20 allowing a specific range to be easily selected.

```
$this->addComponent($productFilterForm);
```
And of course, we add the component. If you load the dashboard and try and click "Submit" then nothing will happen. This is because we will have to filter the data ourselves.

### Filtering table data

Based on the user's inputs to the form, we will filter the table data to correspond to the user's input. To filter the data, there are essentially 3 steps:

1. Listen to the event when the user selects "Submit". Get the user's selected values.
2. Filter the data on the `tableData` variable
3. Update the table's data with the filtered data.

This might seem quite simple, and it is.

#### Part 1: Listen to the filter submit event

To use this event, we use a function called `onApplyClick`, and pass a callback which is called automatically whenever the user clicks on the submit button. This uses a function on the `FormComponent` object called `getAllInputValues` which returns the list of values entered by the user.

To listen to an event in RazorFlow Framework PHP bindings, you need to add code in 2 sections: the `buildDashboard` function and create a separate function to handle the action.

Adding the event listener in `buildDashboard`:
```
$filter->onApplyClick(array($table), 'handleApplyClick', $this);
```

And creating a new function to handle it (called `handleApplyClick` in this case, but it can be named anything)

```
class SampleDashboard extends StandaloneDashboard {
    public function buildDashboard () {
      // ... build your dashboard here ... 
      $productFilterForm->onApplyClick(array($table), 'handleApplyClick', $this);
    }

    // this function is called only when the component has been clicked.
    public function handleApplyClick($source, $targets, $values) {
      // ... perform filtering and update data here ...
      $inputValues = $source->getAllInputValues();
    }
}
```

We can get the input values using `$source->getAllInputValues ()` which returns all the input values entered by the user.

Enter some data in the form and click the "Submit" button. 

```
{
  "category":{
    "text":["Vegetables","Diary"],
    "index":[0,1]
  },
  "name":"Test",
  "price":[7,19]
}
```

Note that this isn't code that should be pasted into your dashboard code, but rather just a JSON showing the structure of the input values returned from Let's break this object down.

```
{
  "category":{
    "text":["Vegetables","Diary"],
    "index":[0,1]
  },
```
If you have a multi select field, RazorFlow Framework would return a structure like this. If you check `$inputValues['category']` this gives you two options: `text` and `index`. The reason for this is convenience. Sometimes you might need the text to do filters, but sometimes when you are performing database lookups simply the index of the category numbers can be used.

In this example, I had selected "Vegetables" and "Diary" which is the first and second indices (or 0 and 1 if you count from 0, like arrays are)

So if you want to get the list of items that are selected for filtering, you can simply use the statement `$inputValues['category']['text']`.

```
  "name":"Test",
```

The `inputValues['name']` field gives you a straight forward text string when used with `addTextField`.

```
  "price":[7,19]
}
```

The `$inputValues['price']` gives you an array with 2 values - the minimum and maximum as selected by the user.

#### updating the table data

Even though you'd normally filter the data first, it's important to know how the table data is updated in order to see the fliter working.

Modify your callback code with this:

```
public function handleApplyClick ($source, $targets, $params) {
    $inputValues = $source->getAllInputValues();
    $productsTable = $this->getComponentById ('productsTable');
    $filtered_rows = array();

    foreach($this->tableData as $row) {
      $filtered_rows []= $row;
    }

    $productsTable->clearRows ();
    $productsTable->addMultipleRows ($filtered_rows);
  }
```

Now reload the page and click submit again. There isn't any change in the behaviour or the data of the table but something interesting did happen here. Let's break this down line-by-line.

```
public function handleApplyClick ($source, $targets, $params) {
    $inputValues = $source->getAllInputValues();
    $productsTable = $this->getComponentById ('productsTable');
```
We get the input values as before.
```  
    $filtered_rows = array();
```
We create a new array to hold the filtered rows. This will be used to hold the final row configuration.

```
    $productsTable->clearRows ();
    $productsTable->addMultipleRows ($filtered_rows);
```

You are calling a function called `clearRows` which removes all the rows from the table, and once you call `addMultipleRows` with the filtered values, the data which is filtered is displayed on the table. Since we aren't filtering anything yet you aren't seeing any changes.

#### Filtering the name

Now comes the fun part - filtering the actual data. Let's add a small condition to the for-loop that we had created.

```
public function handleApplyClick ($source, $targets, $params) {
    $inputValues = $source->getAllInputValues();
    $productsTable = $this->getComponentById ('productsTable');
    $productsTable->clearRows ();
    $filtered_rows = array();

    foreach($this->tableData as $row) {
      if(isset($inputValues['name']) && strpos($row['name'], $inputValues['name']) === FALSE) {
        continue;
      $filtered_rows []= $row;
    }

    $productsTable->addMultipleRows ($filtered_rows);
  }
```

Here, instead of filtering out rows that satisfy the required conditions, it's easier for us to simply discard rows that don't satisfy the given conditions.

`$inputValues['name']` is set only if the user enters a value for the name field. Otherwise it simply isn't set, and the condition is ignored.

In essence, when we say:

```
    foreach($this->tableData as $row) {
      if(isset($inputValues['name']) && strpos($row['name'], $inputValues['name']) === FALSE) 
        continue;
      $filtered_rows []= $row;
    }
```

We're saying: For each row in the input, if it doesn't match the required condition, just ignore it. 

We ignore it by using the `continue` keyword forcing the loop to continue without adding the row to the filtered row. If the string being searched for is found, then go ahead and append it to the table.

A good way to check whether this is working is searching for the string `"ee"` which will match the rows "Cheese" and "Root Beer".

#### Filtering the price

```
if(isset($inputValues['price']) && !($row['price'] >= $inputValues['price'][0] && $row['price'] <= $inputValues['price'][1]))
  continue;
```

We can filter for the price in a very similar way, rejecting anything that doesn't fall between the user's entered values.

#### Filtering the category
```
if(isset($inputValues['category']) && array_search($row['category'], $inputValues['category']['text']) === FALSE)
  continue;

```

We simply use the PHP inbuilt function `array_search` to see if the category of a given row is included in the user's selection.

Note that if the user hasn't selected something `isset($inputValues['category'])` will return `false`. This means that when a user doesn't modify anything it works as expected.

#### Final code for filtering the component

You can use this functino to filter the input data of the table, and set the final data.

```
public function handleApplyClick ($source, $targets, $params) {
  $inputValues = $source->getAllInputValues();
  $productsTable = $this->getComponentById ('productsTable');
  $productsTable->clearRows ();
  $filtered_rows = array();

  foreach($this->tableData as $row) {
    if(isset($inputValues['name']) && strpos($row['name'], $inputValues['name']) === FALSE) {
      continue;
    if(isset($inputValues['price']) && !($row['price'] >= $inputValues['price'][0] && $row['price'] <= $inputValues['price'][1]))
      continue;
    if(isset($inputValues['category']) && array_search($row['category'], $inputValues['category']['text']) === FALSE)
      continue;

    $filtered_rows []= $row;
  }

  $productsTable->addMultipleRows ($filtered_rows);
}
```

<%- embedExample ('php', 'tutorial2') %>

# Drill Downs

Sometimes, the best way to provide the right data, is to allow your users to explore the data. For example, in our Quarterly Sales Chart (which we built in part 1) - while quarterly view might be useful for most people, some people might want to see monthly data. A drill down is the perfect way to allow your users to explore their data in this regard.

Here are some other cases where drill downs are great for exploring data:

1. You've got a category of products, and clicking a category drills down into the actual products.
2. You've got country-wise data, and clicking on the country drills down into the individual states of that country.

## Breadcrumb Drill-down

The first kind of drill down is the breadcrumb drill down. Here, the new data replaces the old data and a bread crumb is displayed on the top of the component so that the user can go back to the previous data set to explore further.

There can be multiple levels of drill down in the bread-crumb drill down. Meaning you can drill from "Continent > Country > State > City > Neighbourhood" (and any more levels you can think of).

RazorFlow Framework helps you build breadcrumb drill downs faster than ever. Here's how:

1. RazorFlow Framework automatically keeps a breadcrumb trail for your users to go back. It also takes care of preserving old data, so they can go back to higher levels.
2. There's a convenient API to add new breadcrumb levels. One important thing to note is that the breadcrumb API also supports asynchronous loading quite easily allowing you to poll and request new data from the server.

#### Adding a drill down to quarterly chart

We are going to add a drill down to the quarterly sales which will show monthly sales in each quarter when the quarter is clicked.

To do this, we will call an extra function on the `quarterlySales` component object, called `addDrillStep`. Let's jump right into the code that we're going to add:

First step is to add a call to `addDrillStep` in `buildDashboard()` so the event handlers are attached properly:

```
buildDashboard () {
  // ...
  $quarterlySales->addDrillStep ('drillIntoMonths', $this);
  // ...
}
```

And next, we have a function to perform the actual drill down into months:

```
  public function drillIntoMonths ($source, $target, $params) {
    $quarterlyData = array(
      'Q1'=> array(
        'labels' => array("Jan", "Feb", "March"),
        'data' => array(
          'quantity' => array(19, 46, 56),
          'sales' => array(3747, 3318, 6057)
        )
      ),
      'Q2'=> array(
        'labels' => array("April", "May", "June"),
        'data' => array(
          'sales' => array(11857, 17435, 12020),
          'quantity' => array(82, 163, 147)
        )
      ),
      'Q3'=> array(
        'labels' => array("July", "Aug", "Sep"),
        'data' => array(
          'sales' => array(12714, 15418, 18000),
          'quantity' => array(102, 156, 162)
        )
      ),
      'Q4'=> array(
        'labels' => array("Oct", "Nov", "Dec"),
        'data' => array(
          'sales' => array(14342, 21721, 15072),
          'quantity' => array(145, 207, 137)
        )
      )
    );

    $quarterlySales = $this->getComponentById('quarterlySales');
    $drillData = $quarterlyData[$params['label']];
    $quarterlySales->setLabels ($drillData['labels']);
    $quarterlySales->addSeries('sales', "Sales", $drillData['data']['sales'], array(
      'numberPrefix' => "$ "
    ));
    $quarterlySales->addSeries('quantity', "Quantity", $drillData['data']['quantity'], array(
      'yAxis' => 'quantity'
    )); 
  }
}
```


Ok, so there's a large chunk of code added to the dashboard at one go. But no worries, it's all quite straightforward and we'll break it down. First, let's examine the `$quarterlyData` variable.

```
$quarterlyData = array(
      'Q1'=> array(
        'labels' => array("Jan", "Feb", "March"),
        'data' => array(
          'quantity' => array(19, 46, 56),
          'sales' => array(3747, 3318, 6057)
        )
      ),
    // 3 more labels similar to this [...]
```

This object doesn't have any RazorFlow Framework specific API or functionality. In fact, it's just a regular PHP Array. However, we've kept it here to make it easy to look up the updated data. In a real world use case you'd probably query a database or another similar internal function to get the resulted drill down data.

As always, in RazorFlow Framework - how you get the data isn't as important as what you do with it. But let's take a look at the following facets of `quarterlyData`:

* `quarterlyData['Q1']['labels']` - contains the labels for the months of Quarter 1. (Usually the first quarter of the year)
* `quarterlyData['Q1']['data']['quantity']` and `quarterlyData['Q1']['data']['sales']` - contains a series of data with quantities and sales corresponding to the months/labels discussed earlier.

So it's quite clear that `$quarterlyData` is just an array to enable us to access information about the filtered data in an easier manner.

Now let's look at the function that's actually performing the drill down:

```
    $quarterlySales = $this->getComponentById('quarterlySales');
    $drillData = $quarterlyData[$params['label']];
    $quarterlySales->setLabels ($drillData['labels']);
    $quarterlySales->addSeries('sales', "Sales", $drillData['data']['sales'], array(
      'numberPrefix' => "$ "
    ));
    $quarterlySales->addSeries('quantity', "Quantity", $drillData['data']['quantity'], array(
      'yAxis' => 'quantity'
    )); 
```

Let's break this down. The first thing that we see is that 

```
    $drillData = $quarterlyData[$params['label']];
```

`params.label` contains the label of the item that was just clicked. So for example if the user clicked `"Q1"`, then, `quarterlyData['Q1']` will be selected.

```
    $quarterlySales->setLabels ($drillData['labels']);
    $quarterlySales->addSeries('sales', "Sales", $drillData['data']['sales'], array(
      'numberPrefix' => "$ "
    ));
    $quarterlySales->addSeries('quantity', "Quantity", $drillData['data']['quantity'], array(
      'yAxis' => 'quantity'
    )); 
```

We re-configure the chart by setting the labels and adding 2 series exactly how we did it in the first part of this tutorial. Except this time we add the new data for the chart. 

Interestingly, you can also change the series completely, or even a different chart type. This gives you full freedom to show the kind of data that is most appropriate. In our current scenario, we wish to only show the same series because it's relavant to the data.

## Updating of components

#### Updating charts

To update a chart in real time, simply use `updateSeries` on the chart:

```
chart.updateSeries ('series_id', [data, goes, here]);
```

### Updating KPIs and other components

For most other components, simply calling a function should work as expected. For example, if you want to set a new value to a KPI, call:

```
kpi.setValue (newValue);
```

If you want to set a new caption: 

```
kpi.setCaption (newCaption);
```

Similar functionality works across all charts, tables and most other components. Calling a function on a component should automatically update the component and make sure that the final result is as expected.

# Recap: Full dashboard

<%- embedExample ('php', 'tutorial3') %>

After we've built the entire different components of the dashboards one by one this is what the code should finally look like when finished:

```
<?php

class SampleDashboard extends StandaloneDashboard {
  protected $tableData = array(
    array('name'=> "Broccoli", 'category'=> "Vegetables", 'price' => 14),
    array('name'=> "Cheese", 'category'=> "Dairy", 'price' => 18),
    array('name'=> "Tomatoes", 'category'=> "Vegetables", 'price' => 8),
    array('name'=> "Orange Juice", 'category'=> "Beverages", 'price' => 12),
    array('name'=> "Root Beer", 'category'=> "Beverages", 'price' => 13)
  );
  public function buildDashboard(){
    $quarterlySales = new ChartComponent('quarterlySales');
    $quarterlySales->setDimensions (6, 6);
    $quarterlySales->setCaption("Quarterly Sales");
    $quarterlySales->setLabels (array("Q1", "Q2", "Q3", "Q4"));
    $quarterlySales->addYAxis('quantity', "Quantity");
    $quarterlySales->addSeries('sales', "Sales", array(13122, 41312, 46132, 51135), array(
      'numberPrefix' => "$"
    ));
    $quarterlySales->addSeries('quantity', "Quantity", array(121, 392, 420, 489), array(
      'yAxis' => 'quantity'

    ));
    $quarterlySales->addComponentKPI ('beverage', array(
      'caption'=> 'Beverages',
      'value' => 22900,
      'numberPrefix' => ' $',
      'numberHumanize' => true
    ));
    $quarterlySales->addComponentKPI('vegetable', array(
      'caption'=> 'Vegetables',
      'value' => 10401,
      'numberPrefix' => ' $',
      'numberHumanize' => true
    ));
    $quarterlySales->addComponentKPI('dairy', array(
      'caption'=> 'Dairy',
      'value' => 27700,
      'numberPrefix' => ' $',
      'numberHumanize' => true
    ));
    $quarterlySales->addDrillStep ('drillIntoMonths', $this);
    $this->addComponent ($quarterlySales);


    $numTickets = new KPIComponent ('numTickets');
    $numTickets->setDimensions (3, 3);
    $numTickets->setCaption ("Open Support Tickets");
    $numTickets->setValue (42);
    $this->addComponent ($numTickets);

    $satisfactionGauge = new GaugeComponent('satisfactionGauge');
    $satisfactionGauge->setDimensions(3, 3);
    $satisfactionGauge->setCaption('Customer Satisfaction');
    $satisfactionGauge->setValue(8);
    $satisfactionGauge->setLimits(0, 10);
    $this->addComponent($satisfactionGauge);

    $ticketPriorities = new KPIGroupComponent ('ticketPriorities');
    $ticketPriorities->setDimensions (6, 3);
    $ticketPriorities->setCaption('Ticket Priorities');
    $ticketPriorities->addKPI('high', array(
      'caption' => 'High Priority',
      'value' => 6
    ));
    $ticketPriorities->addKPI('normal', array(
      'caption' => 'Normal Priority',
      'value' => 36
    ));
    $this->addComponent ($ticketPriorities);

    $productsTable = new TableComponent ('productsTable');
    $productsTable->setDimensions (6, 6);
    $productsTable->setCaption ('Products');
    $productsTable->addColumn ('name', 'Name');
    $productsTable->addColumn ('category', 'Category');
    $productsTable->addColumn ('price', 'Price', array(
      'dataType' => "number",
      'numberPrefix' => "$",
      'textAlign' => "right",
      'numberForceDecimals' => true
    ));
    $productsTable->addMultipleRows ($this->tableData);
    $this->addComponent($productsTable);

    $productFilterForm = new FormComponent ('productFilterForm');
    $productFilterForm->setDimensions (6, 6);
    $productFilterForm->setCaption ('Filter Products');
    $productFilterForm->addMultiSelectField ('category', 'Select Category', array('Vegetables', 'Diary', 'Beverages'));
    $productFilterForm->addTextField ('name', 'Product Name Contains');
    $productFilterForm->addNumericRangeField('price', 'Price', array(5, 20));
    $this->addComponent($productFilterForm);

        $productFilterForm->onApplyClick(array($productsTable), 'handleApplyClick', $this);
    }

  public function handleApplyClick ($source, $targets, $params) {
    $inputValues = $source->getAllInputValues();
    $productsTable = $this->getComponentById ('productsTable');
    $productsTable->clearRows ();
    $filtered_rows = array();

    foreach($this->tableData as $row) {
      if(isset($inputValues['name']) && strpos($row['name'], $inputValues['name']) === FALSE)
        continue;
      if(isset($inputValues['price']) && !($row['price'] >= $inputValues['price'][0] && $row['price'] <= $inputValues['price'][1]))
        continue;
      if(isset($inputValues['category']) && array_search($row['category'], $inputValues['category']['text']) === FALSE)
        continue;

      $filtered_rows []= $row;
    }

    $productsTable->addMultipleRows ($filtered_rows);
  }

  public function drillIntoMonths ($source, $target, $params) {
    $quarterlyData = array(
      'Q1'=> array(
        'labels' => array("Jan", "Feb", "March"),
        'data' => array(
          'quantity' => array(19, 46, 56),
          'sales' => array(3747, 3318, 6057)
        )
      ),
      'Q2'=> array(
        'labels' => array("April", "May", "June"),
        'data' => array(
          'sales' => array(11857, 17435, 12020),
          'quantity' => array(82, 163, 147)
        )
      ),
      'Q3'=> array(
        'labels' => array("July", "Aug", "Sep"),
        'data' => array(
          'sales' => array(12714, 15418, 18000),
          'quantity' => array(102, 156, 162)
        )
      ),
      'Q4'=> array(
        'labels' => array("Oct", "Nov", "Dec"),
        'data' => array(
          'sales' => array(14342, 21721, 15072),
          'quantity' => array(145, 207, 137)
        )
      )
    );

    $quarterlySales = $this->getComponentById('quarterlySales');
    $drillData = $quarterlyData[$params['label']];
    $quarterlySales->setLabels ($drillData['labels']);
    $quarterlySales->addSeries('sales', "Sales", $drillData['data']['sales'], array(
      'numberPrefix' => "$ "
    ));
    $quarterlySales->addSeries('quantity', "Quantity", $drillData['data']['quantity'], array(
      'yAxis' => 'quantity'
    )); 
  }
}

$db = new SampleDashboard();
$db->renderStandalone();
```