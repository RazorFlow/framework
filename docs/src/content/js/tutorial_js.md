--
title: "Tutorial"
subtitle: ""
id: "tutorial_js"
--

Welcome to RazorFlow Framework, in this article, we will build a complete interactive dashboard consisting of several components. Before you go through this article, we reccomend you're familiar with the [Getting Started](#) article.

# Creating a chart

To create a chart you need to create a `ChartComponent` object and add it to the dashboard. Set up the dashboard quickstart, replace the contents of `dashboard.js` file with this and reload the browser.

```
StandaloneDashboard(function(db){
  var quarterlySales = new ChartComponent();
  quarterlySales.setDimensions (6, 6);
  quarterlySales.setCaption("Quarterly Sales");
  quarterlySales.setLabels (["Q1", "Q2", "Q3", "Q4"]);
  quarterlySales.addSeries([13122, 41312, 46132, 51135]);
  db.addComponent (quarterlySales);
});
```

What just happened here? Let's take a closer look line by line:

```
StandaloneDashboard(function(db){
```

This told RazorFlow Framework to create a new dashboard which occupies the entire page, known as a **Standalone Dashboard** and passes the dashboard object `db` to the function. Any operation on the dashboard must be made on the `db` object.

```
  var quarterlySales = new ChartComponent();
```

This line creates a new **Component Object**. This object is used to interact with the chart component and configure all the parameters of it.

```
  quarterlySales.setDimensions (6, 6);
```

This calls the `setDimensions` and configures the component to be 6 units wide and 6 units tall. While we'll be discussing more about the dimensions and layout system in detail, the summary of RazorFlow Framework's dimensions system is this:

> The dashboard is rendered on a 12-column grid. Since the size of browsers vary the exact pixel values of the components vary significantly as well. But the end result is that a layout looks the same even if the browser is resized slightly (however the framework adjusts the layout for better viewing experience on mobile and small tablet devices)

What this means is that the width of the chart will always be about 1/2 the size of the full dashboard. Also the height and width of the component will always be the same so the chart will be a square for consistency of layouts.


```
  quarterlySales.setCaption("Quarterly Sales");
```

This sets the caption of the component. The caption is the text that's displayed in the top of the component.

```
  quarterlySales.setLabels (["Q1", "Q2", "Q3", "Q4"]);
```

`setLabels` is a function that accepts an array and sets the labels which are displayed on the X Axis.

```
  quarterlySales.addSeries([13122, 41312, 46132, 51135]);
```
`addSeries` is a function that adds a single series of data to the chart. This is the data that will actually be displayed on the chart. Note that you can call the function with just an array if you're using a single series, but if you are adding multiple series, then you need to provide a series ID (described in the next section).

```
  db.addComponent (quarterlySales);
});
```

This statement adds the chart to the dashboard. If you do not add the component then it won't be displayed on the dashboard at all.

### Add new series

Let's say along with the sales in each quarter, we wish to also display the quantity that was sold in each quarter.

```
  quarterlySales.setLabels (["Q1", "Q2", "Q3", "Q4"]);
  quarterlySales.addSeries('sales', "Sales", [13122, 41312, 46132, 51135]);
  quarterlySales.addSeries('quantity', "Quantity", [121, 392, 420, 489]);
  db.addComponent (quarterlySales);
```

Most of the lines are the same as explained before. However when we are adding the series using `addSeries` there's something considerably different happening.

```
  quarterlySales.addSeries('sales', "Sales", [13122, 41312, 46132, 51135]);
  quarterlySales.addSeries('quantity', "Quantity", [121, 392, 420, 489]);
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
quarterlySales.addYAxis('quantity', "Quantity");
quarterlySales.addSeries('sales', "Sales", [13122, 41312, 46132, 51135]);
quarterlySales.addSeries('quantity', "Quantity", [121, 392, 420, 489], {
  yAxis: 'quantity'
});
```

1. We used the `addYAxis` function to add a secondary Y Axis. Note that even here, the first parameter is the ID which is used internally for all references, and the second parameter is the name that is displayed to the dashboard viewer.
2. In the `addSeries` function while adding the `quantity` series, we pass a JavaScript object with `yAxis` set to `'quantity'`. This tells RazorFlow framework to associate the quantity series with the quantity axis.

Now reloading the browser, the chart looks significantly better and more useful.

### Configuring the series

However, there is still a problem with the chart. The sales figures represent a value in US Dollars, and without some more information on the chart, it can be confusing for anyone who is reading the chart. For this, we will specify that the sales are currency by writing "$" before each number.

```
quarterlySales.addSeries('sales', "Sales", [13122, 41312, 46132, 51135], {
  numberPrefix: "$ "
});
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

```
StandaloneDashboard(function(db){
  var quarterlySales = new ChartComponent();
  quarterlySales.setDimensions (6, 6);
  quarterlySales.setCaption("Quarterly Sales");
  quarterlySales.setLabels (["Q1", "Q2", "Q3", "Q4"]);
  quarterlySales.addYAxis('quantity', "Quantity");
  quarterlySales.addSeries('sales', "Sales", [13122, 41312, 46132, 51135], {
    numberPrefix: "$ "
  });
  quarterlySales.addSeries('quantity', "Quantity", [121, 392, 420, 489], {
    yAxis: 'quantity'
  });
  db.addComponent (quarterlySales);

  // ====== New components will come here ========
});
```

# KPI Components

### What is a KPI

A KPI stands for **Key Performance Indicator**. This is also called "metric" and "value" in some dashboards. It usually contains a single numeric value which is indicative of how well something is performing at the given time.

### A simple KPI: Number of support tickets

Let's say you'd like to have a KPI to keep track of the number of support tickets fetched through an API or database. Adding a KPI to track the number of open support tickets is quite simple and straight forward.

```
var numTickets = new KPIComponent ();
numTickets.setDimensions (3, 3);
numTickets.setCaption ("Open Support Tickets");
numTickets.setValue (42);
db.addComponent (numTickets);
```

Let's break this down line by line:

```
var numTickets = new KPIComponent ();
```

Create a new **Component Object** of type `KPIComponent` called `numTickets`. This will be used to configure the component in the future

```
numTickets.setDimensions (3, 3);
```
Set the dimensions of the component to be 3x3 meaning it will take about 1/4th of the width of the dashboard, and will be a square component.

```
numTickets.setCaption ("Open Support Tickets");
```

Set the caption of the KPI which will be displayed on the dashboard.

```
numTickets.setValue (42);
```

Set the value of the KPI. This is the value that you'd normally fetch from your database/API to display.

```
db.addComponent (numTickets);
```
And finally, add the component to the dashboard otherwise it would not be visible on the dashboard.

### Displaying a gauge component

Now let's add another component to the dashboard, which is a gauge component. RazorFlow Framework supports 2 types of gauges right now: Angular gauges and Solid gauges. Solid gauges are the default, and we will go into the details and differences in another article.

However, let's add a gauge to the dashboard. Add this code right after adding the `numTickets` component to the dashboard. We will now add a "Customer Satisfaction" gauge which shows the current customer satisfaction rating from 0 to 10.

```
var satisfactionGauge = new GaugeComponent();
satisfactionGauge.setDimensions(3,3);
satisfactionGauge.setCaption('Customer Satisfaction');
satisfactionGauge.setValue(8);
satisfactionGauge.setLimits(0, 10);
db.addComponent(satisfactionGauge);
```

Again, let's break this down line by line:

```
var satisfactionGauge = new GaugeComponent();
```

Create a new **Component Object** for the gauge component used to modify the gauge later.

```
satisfactionGauge.setDimensions(3,3);
```
Set the dimensions similar to the dimensions of the KPI component that we had built earlier.

```
satisfactionGauge.setCaption('Customer Satisfaction');
```
Set the caption of the gauge which is displayed in the dashboard within the gauge.

```
satisfactionGauge.setValue(8);
```
Set the current value that the gauge should display which also specifies the value it should be pointing to.

```
satisfactionGauge.setLimits(0, 10);
```
Set the limits of the gauge. Note that the gauge can show values from 0 to 10, so we set the limits using `setLimits` specifying the minimum and maximum values respectively.

```
db.addComponent(satisfactionGauge);
```

### Group of KPIs

Sometimes several related metrics and KPIs must be presented together. For this we can use the KPI group component. For example, along with the support tickets, we wish to see a breakdown how many support tickets are high priority and normal priority.

For this we add a new component to the dashboard, which is called the "KPI Group Component". To do this add the following code:

```
var ticketPriorities = new KPIGroupComponent ();
ticketPriorities.setDimensions (6, 3);
ticketPriorities.setCaption('Ticket Priorities');
ticketPriorities.addKPI('high', {
    caption: 'High Priority',
    value: 6,
});
ticketPriorities.addKPI('normal', {
    caption: 'Normal Priority',
    value: 36,
});
db.addComponent (ticketPriorities);
```

Again, let's break this down:

```
var ticketPriorities = new KPIGroupComponent ();
ticketPriorities.setDimensions (6, 3);
ticketPriorities.setCaption('Ticket Priorities');
```
Here we create a new component object called `ticketPriorites` of type `KPIGroupComponent` and set the dimensions to be 6x3. You can see that this will be a rectangle but will fit in cleanly into the existing layout of the dashboard.

Also the `setCaption` function is a caption for the entire component and set of KPIs but not for individual KPIs. Here you're setting a caption for the entire component but you'll also be setting captions for the individual KPIs as part of the group.

```
ticketPriorities.addKPI('high', {
    caption: 'High Priority',
    value: 6,
});
```
We use the `addKPI` to add an individual KPI to the KPI group. Note that this isn't being added to the dashboard directly but to the KPI Group component `ticketPriorities`. For this, we pass 2 parameters:

1. An ID for the KPI which will be used for modifying, updating or removing the KPI from the component.
2. An object containing a `caption` and a `value` which will be used to display on the dashboard.

```
ticketPriorities.addKPI('normal', {
    caption: 'Normal Priority',
    value: 36,
});
```
This is another KPI that we are adding to the KPI Group using the `addKPI` function exactly as described above.

```
db.addComponent (ticketPriorities);
```

### Adding KPIs to a component

One unique feature of the RazorFlow Framework is "Component KPIs" which allows you to have KPIs which are attached to a component.

This is a common requirement to show some additional custom data along with the component. For example, let's go back to the chart that we built in the beginning. Along with the sales we would like to show the total sales for 3 categories: Beverages, Groceries and Dairy.

For this, we will go back to the original code for the Quarterly Sales chart. Before adding the component to the dashboard add this code:

```
quarterlySales.addComponentKPI ('beverage', {
    caption: 'Beverages',
    value: 22900,
    numberPrefix: ' $',
    numberHumanize: true
});
quarterlySales.addComponentKPI('vegetable', {
    caption: 'Vegetables',
    value: 10401,
    numberPrefix: ' $',
    numberHumanize: true
});
quarterlySales.addComponentKPI('dairy', {
    caption: 'Dairy',
    value: 27700,
    numberPrefix: ' $',
    numberHumanize: true
});
db.addComponent (quarterlySales);
```

Note that we are calling `addComponentKPI` on the **component object** of the chart, which is `quarterlySales`. Since we're using the function in a very similar way 3 times, we will just see how the `beverage` KPI is added and dissect that.

```
quarterlySales.addComponentKPI ('beverage', {
    caption: 'Beverages',
    value: 22900,
    numberPrefix: ' $',
    numberHumanize: true
});
```
As you may already have noticed, the function `addComponentKPI` is very similar to KPI Groups.

1. The first argument to be passed is the ID of the component KPI which will be used to modify, update and remove the component KPI. In this case the ID is `'beverage'`.
2. To specify the KPI value, we are passing an object which contains:
   * `caption` - which is the caption that will be displayed
   * `value` - the number that will be displayed for the KPI
   * `numberPrefix` - Since the sales are currency we can pass the `numberPrefix` configuration parameter and the number will be prefixed with a "$" sign.
   * `numberHumanize` - This is a configuration parameter available in many other places. What this does is make the number more "human". Instead of `1321421`, it will display it as `1.32M`, which makes it vastly more readable and takes up less space.

# Table Components

Tables are quite useful for displaying large quantities of Data, and RazorFlow framework includes native default support for tables along with useful functionality like pagination and conditional formatting.

### Add a table

Before we add the real table, we will just create a object to conveniently hold our data, called `tableData`.

```
var tableData = [
{name: "Broccoli", category: "Vegetables", price: 14},
{name: "Cheese", category: "Dairy", price: 18},
{name: "Tomatoes", category: "Vegetables", price: 8},
{name: "Orange Juice", category: "Beverages", price: 12},
{name: "Root Beer", category: "Beverages", price: 13},
];
```

Now we create a table component and populate it with this data using this code:

```
var productsTable = new TableComponent ();
productsTable.setDimensions (6, 6);
productsTable.setCaption ('Products');
productsTable.addColumn ('name', 'Name');
productsTable.addColumn ('category', 'Category');
productsTable.addColumn ('price', 'Price');
productsTable.addMultipleRows (tableData);
db.addComponent(productsTable);
```

Let's break this down:

```
var productsTable = new TableComponent ();
productsTable.setDimensions (6, 6);
productsTable.setCaption ('Products');
```
This creates a new component object of the type `TableComponent`, sets the dimensions and the caption. You know the drill by now!

```
productsTable.addColumn ('name', 'Name');
productsTable.addColumn ('category', 'Category');
productsTable.addColumn ('price', 'Price');
```

Next, we're adding 3 columns to the table. Note that we're specifying an ID (`'name'`) and the column name (`"Name"`). The column name is visible to the users and can be any string, but the ID should be a simple alphanumeric string.

After we added 3 columns we add the data. There are many functions to add data to the table. Either you can add each row individually using `addRow` which is described in the documentation. You can also use `addMultipleRows` to add an array of rows.

```
productsTable.addMultipleRows (tableData);
```

If you notice something about `tableData` you'll see that `tableData` is an array of JavaScript objects. Now the keys of the objects have the same name as the IDs of the columns. Namely `name`, `category` and `price`. This isn't a coincidence but RazorFlow Framework automatically picks up the right values using the column IDs.

Reload the page and you should see your table component with a few rows. Note that if you added several rows - too many to display then pagination would automatically activate.

### Configuring table columns

You can notice 2 major problems in the table we just built.

1. A tomato is not a vegetable, it's a fruit.
2. The price is displayed like a regular number but it needs to be displayed with a "$" sign and aligned to the right which is the correct way of displaying a price in a table.

For this, we simply need to configure the column. While we're adding the `price` column in the earlier table, we simply need to pass a configuration object like this:

```
productsTable.addColumn ('price', 'Price', {
  dataType: "number",
  numberPrefix: "$",
  textAlign: "right",
  numberDecimalPlaces: 2,
  numberForceDecimals: true
});
```

There's plenty of new concepts here, so let's break it down line by line:

```
dataType: "number",
```
We tell the table to understand that the value is a number, which would have additional functionality.

```
numberPrefix: "$",
```
All the numbers in the column should be prefixed by "$" to indicate currency.

```
textAlign: "right",
```
Text should be right-aligned to make it easier to read. This is the standard way of printing price lists, and RazorFlow Framework makes it easy to follow standards.

```
numberDecimalPlaces: 2,
numberForceDecimals: true
```
Setting these two parameters ensure that 2 decimal places are always shown. So after applying all these rules, the number "14" is displayed as "$14.00"

# The full dashboard

Congratulations you built your first full dashboard! It includes several but not all components of the RazorFlow framework. To recap, this is how the code should be looking like after building the entire dashboard.

```
StandaloneDashboard(function(db){
  var quarterlySales = new ChartComponent();
  quarterlySales.setDimensions (6, 6);
  quarterlySales.setCaption("Quarterly Sales");
  quarterlySales.setLabels (["Q1", "Q2", "Q3", "Q4"]);
  quarterlySales.addYAxis('quantity', "Quantity");
  quarterlySales.addSeries('sales', "Sales", [13122, 41312, 46132, 51135], {
    numberPrefix: "$ "
  });
  quarterlySales.addSeries('quantity', "Quantity", [121, 392, 420, 489], {
    yAxis: 'quantity'
  });
  quarterlySales.addComponentKPI ('beverage', {
      caption: 'Beverages',
      value: 22900,
      numberPrefix: ' $',
      numberHumanize: true
  });
  quarterlySales.addComponentKPI('vegetable', {
      caption: 'Vegetables',
      value: 10401,
      numberPrefix: ' $',
      numberHumanize: true
  });
  quarterlySales.addComponentKPI('dairy', {
      caption: 'Dairy',
      value: 27700,
      numberPrefix: ' $',
      numberHumanize: true
  });
  db.addComponent (quarterlySales);

  var numTickets = new KPIComponent ();
  numTickets.setDimensions (3, 3);
  numTickets.setCaption ("Open Support Tickets");
  numTickets.setValue (42);
  db.addComponent (numTickets);

  var satisfactionGauge = new GaugeComponent();
  satisfactionGauge.setDimensions(3 ,3);
  satisfactionGauge.setCaption('Customer Satisfaction');
  satisfactionGauge.setValue(8);
  satisfactionGauge.setLimits(0, 10);
  db.addComponent(satisfactionGauge);

  var ticketPriorities = new KPIGroupComponent ();
  ticketPriorities.setDimensions (6, 3);
  ticketPriorities.setCaption('Ticket Priorities');
  ticketPriorities.addKPI('high', {
      caption: 'High Priority',
      value: 6,
  });
  ticketPriorities.addKPI('normal', {
      caption: 'Normal Priority',
      value: 36,
  });
  db.addComponent (ticketPriorities);

  var tableData = [
  {name: "Broccoli", category: "Vegetables", price: 14},
  {name: "Cheese", category: "Dairy", price: 18},
  {name: "Tomatoes", category: "Vegetables", price: 8},
  {name: "Orange Juice", category: "Beverages", price: 12},
  {name: "Root Beer", category: "Beverages", price: 13},
  ];

  var productsTable = new TableComponent ();
  productsTable.setDimensions (6, 6);
  productsTable.setCaption ('Products');
  productsTable.addColumn ('name', 'Name');
  productsTable.addColumn ('category', 'Category');
  productsTable.addColumn ('price', 'Price', {
    dataType: "number",
    numberPrefix: "$",
    textAlign: "right",
    numberDecimalPlaces: 2,
    numberForceDecimals: true
  });
  productsTable.addMultipleRows (tableData);
  db.addComponent(productsTable);
});
```

Note that even as we go forward we'll be building on top of the same dashboard which will enable us to explore the functionality of RazorFlow Framework but also see it in a real-world use-case context.

### View on mobile devices

# Add form for filtering data

While RazorFlow works great for displaying data in a static dashboard, where it really shines is when you build a dashboard which is interactive and can be used by the user to explore the data.

There are many ways of doing this. One of the most common ways you'd allow your user to explore the data is using a form to filter the data

### Forms v/s Filters

One thing that you should keep in mind is that adding the form does not automatically filter the data in the components. However the form component does save you a lot of time by building the form, adding widgets and even taking the data and providing the values in a ready to use object.

While RazorFlow Framework might in the future include functionality to filter the components without any extra code, currently you will have to write the code to filter the data yourself. But don't worry! It's quite simple and small and we provide an example of how to do it in this very article.

### Add a form component

```
var productFilterForm = new FormComponent ();
productFilterForm.setDimensions (6, 6);
productFilterForm.setCaption ('Filter Products');
productFilterForm.addMultiSelectField ('category', 'Select Category', ['Vegetables', 'Diary', 'Beverages']);
productFilterForm.addTextField ('name', 'Product Name Contains');
productFilterForm.addNumericRangeField('price', 'Price', [5, 20]);
db.addComponent(productFilterForm);
```

As usual, let's break the code down and examine it line by line.

```
var productFilterForm = new FormComponent ();
productFilterForm.setDimensions (6, 6);
productFilterForm.setCaption ('Filter Products');
```

Create a component object of type `FormComponent` and set the dimensions and caption as required. This form will be used to filter the products table.

```
productFilterForm.addMultiSelectField ('category', 'Select Category', ['Vegetables', 'Diary', 'Beverages']);
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
productFilterForm.addTextField ('name', 'Product Name Contains');
```

This function call to `addTextField` adds a text field that is displayed in the form like a traditional text input function.

```
productFilterForm.addNumericRangeField('price', 'Price', [5, 20]);
```

This function call to `addNumericRangeField` adds a slider allowing users to select a range of values between 5 and 20 allowing a specific range to be easily selected.

```
db.addComponent(productFilterForm);
```
And of course, we add the component. If you load the dashboard and try and click "Submit" then nothing will happen. This is because we will have to filter the data ourselves.

### Filtering table data

Based on the user's inputs to the form, we will filter the table data to correspond to the user's input. To filter the data, there are essentially 3 steps:

1. Listen to the event when the user selects "Submit". Get the user's selected values.
2. Filter the data on the `tableData` variable
3. Update the table's data with the filtered data.

This might seem quite simple, and it is.

#### Part 1: Listen to the filter submit event

To use this event, we use a function called `onApplyClick`, and pass a callback which is called automatically whenever the user clicks on the submit button. Go ahead and add the following code to your dashboard. This uses a function on the `FormComponent` object called `getAllInputValues` which returns the list of values entered by the user.

```
productFilterForm.onApplyClick(function() {
  var inputValues = productFilterForm.getAllInputValues();

  console.log(inputValues);
});
```

Make sure you have your Developer Console open, if you have access to one, so you can see the output of `console.log` (if you haven't used `console.log` [here's a good link](http://stackoverflow.com/questions/4539253/what-is-console-log) to find out more about it).

Enter some data in the form and click the "Submit" button. You should see an object printed which looks something like this (We converted the object `inputValues` to JSON to make it easier to read):

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
If you have a multi select field, RazorFlow Framework would return a structure like this. If you check `inputValues['category']` this gives you two options: `text` and `index`. The reason for this is convenience. Sometimes you might need the text to do filters, but sometimes when you are performing database lookups simply the index of the category numbers can be used.

In this example, I had selected "Vegetables" and "Diary" which is the first and second indices (or 0 and 1 if you count from 0, like arrays are)

So if you want to get the list of items that are selected for filtering, you can simply use the statement `inputValues['category']['text']`.

```
  "name":"Test",
```

The `inputValues['name']` field gives you a straight forward text string when used with `addTextField`.

```
  "price":[7,19]
}
```

The `inputValues['price']` gives you an array with 2 values - the minimum and maximum as selected by the user.

#### updating the table data

Even though you'd normally filter the data first, it's important to know how the table data is updated in order to see the fliter working.

Modify your callback code with this:

```
productFilterForm.onApplyClick(function() {
  var inputValues = productFilterForm.getAllInputValues();
  // Create a fresh copy of the products table data
  var filteredValues = tableData;

  productsTable.clearRows ();
  productsTable.addMultipleRows (filteredValues);
});
```

Now reload the page and click submit again. There isn't any change in the behaviour or the data of the table but something interesting did happen here. Let's break this down line-by-line.

```
productFilterForm.onApplyClick(function() {
  var inputValues = productFilterForm.getAllInputValues();
```
We get the input values as before.
```  
  // Create a fresh copy of the products table data
  var filteredValues = tableData;
```
We create a copy of the original `tableData` data called `filteredValues` but don't actually do any filtering.

```
  productsTable.clearRows ();
  productsTable.addMultipleRows (filteredValues);
});
```
You are calling a function called `clearRows` which removes all the rows from the table, and once you call `addMultipleRows` with the filtered values, the data which is filtered is displayed on the table. Since we aren't filtering anything yet you aren't seeing any changes.

#### Filtering the name

Now comes the fun part - filtering the actual data. Now we can do this in simple JavaScript, but we are big fans of the [underscore.js](http://underscorejs.org/) library which helps you filter arrays much easier. Underscore is an open source (MIT Licensed) library. You might have even used it before.

You can use `rf._` as a way to get the underscore library bundled along with RazorFlow Framework. Let's modify the `onApplyClick` function add add a few lines of code in the middle

```
productFilterForm.onApplyClick(function() {
  var inputValues = productFilterForm.getAllInputValues();
  // Create a fresh copy of the products table data
  var filteredValues = tableData;

  // Filter the rows which contain product name requested
  if(productFilterForm.isFieldSet ('name')) {
    filteredValues = rf._.filter(filteredValues, function (row) {
      return row['name'].search(inputValues['name']) !== -1;
    })
  }
  productsTable.clearRows ();
  productsTable.addMultipleRows (filteredValues);
});
```

Let's break down the code that actually does the filtering:
```
// Filter the rows which contain product name requested
if(productFilterForm.isFieldSet ('name')) {
```

On the form component object, we call a function called `isFieldSet` to check whether the user has entered a value or interacted with the field. If the user hasn't actually entered anything for the `name` field, then it doesn't make sense in actually filtering it

```
  filteredValues = rf._.filter(filteredValues, function (row) {
    return row['name'].search(inputValues['name']) !== -1;
  })
}
```

Here, we use the [underscore.filter](http://underscorejs.org/#filter) function to filter the array of `filteredValues`. What actually happens is that underscore takes each row and calls a "validation function". If the validation function returns `true` then the row is included, if it returns `false` the row is filtered out.

In our case the validation function is:

```
function (row) {
  return row['name'].search(inputValues['name']) !== -1;
}
```
Given a row, it extracts the `name` from it and checks whether the `inputValues['name']` (which has been entered by the user) is a substring of the original row value by checking whether the `search` function returns `-1` (if it returns `-1` then the row name doesn't contain the input value, and hence must be filtered out)

A good way to check whether this is working is searching for the string `"ee"` which will match the rows "Cheese" and "Root Beer".

#### Filtering the price

```
  // Filter rows which fall between a range of prices
  if(productFilterForm.isFieldSet ('price')) {
    filteredValues = rf._.filter(filteredValues, function (row) {
      return row['price'] >= inputValues['price'][0] && row['price'] <= inputValues['price'][1]
    })
  }
```

Similar to how we filtered out the name we use `rf._.filter` to filter out the price which is between the high/low values which was returned earlier.

#### Filtering the category
```
  // Filter only valid categories
  if(productFilterForm.isFieldSet ('category')) {
    filteredValues = rf._.filter(filteredValues, function (row) {
      return rf._.contains(inputValues['category']['text'], row['category'])
    })
  }
```

To filter the category we use another underscore.js function, which is [underscore.contains](http://underscorejs.org/#contains). We simply check whether the list of categories selected by the user contains the original category that is along with the data.

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

```
  var quarterlyData = {
    'Q1': {
      labels: ["Jan", "Feb", "March"],
      data: {
        quantity: [19, 46, 56],
        sales: [3747, 3318, 6057]
      }
    },
    'Q2': {
      labels: ["April", "May", "June"],
      data: {
        sales: [11857, 17435, 12020],
        quantity: [82, 163, 147]
      }
    },
    'Q3': {
      labels: ["July", "Aug", "Sep"],
      data: {
        sales: [12714, 15418, 18000],
        quantity: [102, 156, 162]
      }
    },
    'Q4': {
      labels: ["Oct", "Nov", "Dec"],
      data: {
        sales: [14342, 21721, 15072],
        quantity: [145, 207, 137]
      }
    }
  };

  quarterlySales.addDrillStep (function (done, params) {
    var drillData = quarterlyData[params.label];
    quarterlySales.setLabels (drillData.labels);
    quarterlySales.addSeries('sales', "Sales", drillData.data.sales, {
      numberPrefix: "$ "
    });
    quarterlySales.addSeries('quantity', "Quantity", drillData.data.quantity, {
      yAxis: 'quantity'
    });
    done();
  });
```

Ok, so there's a large chunk of code added to the dashboard at one go. But no worries, it's all quite straightforward and we'll break it down. First, let's examine the `quarterlyData` variable.

```
var quarterlyData = {
    'Q1': {
      labels: ["Jan", "Feb", "March"],
      data: {
        quantity: [19, 46, 56],
        sales: [3747, 3318, 6057]
      }
    }
    // 3 more labels similar to this [...]
  };
```

This object doesn't have any RazorFlow Framework specific API or functionality. In fact, it's just a regular JavaScript object. However, we've kept it here to make it easy to look up the updated data. In a real world use case you'd probably query a database or another similar internal function to get the resulted drill down data.

As always, in RazorFlow Framework - how you get the data isn't as important as what you do with it. But let's take a look at the following facets of `quarterlyData`:

* `quarterlyData['Q1'].labels` - contains the labels for the months of Quarter 1. (Usually the first quarter of the year)
* `quarterlyData['Q1'].data['quantity']` and `quarterlyData['Q1'].data['sales'] - contains a series of data with quantities and sales corresponding to the months/labels discussed earlier.

So it's quite clear that `quarterlyData` is just an object to enable the user to access information about the filtered data in an easier manner.

Now let's look at the function that's actually performing the drill down:

```
  quarterlySales.addDrillStep (function (done, params) {
    var drillData = quarterlyData[params.label];
    quarterlySales.setLabels (drillData.labels);
    quarterlySales.addSeries('sales', "Sales", drillData.data.sales, {
      numberPrefix: "$ "
    });
    quarterlySales.addSeries('quantity', "Quantity", drillData.data.quantity, {
      yAxis: 'quantity'
    });
    done();
  });
```

And break it down bit by bit

```
  quarterlySales.addDrillStep (function (done, params) {
```

On the component object, we call a function called `addDrillStep` which accepts a function. This anonymous function is called whenever the user starts the drill down by clicking on an item in the chart.

The function contains two arguments passed to it:

* `done` - The `done()` function should be called when the drill down process is complete. This enables you to perform AJAX requests and update the chart asynchronously. We will be discussing more detail about this parameter.
* `params` - the parameters about the item that has been clicked.

```
    var drillData = quarterlyData[params.label];
```

`params.label` contains the label of the item that was just clicked. So for example if the user clicked `"Q1"`, then, `quarterlyData['Q1']` will be selected.

```
    quarterlySales.setLabels (drillData.labels);
    quarterlySales.addSeries('sales', "Sales", drillData.data.sales, {
      numberPrefix: "$ "
    });
    quarterlySales.addSeries('quantity', "Quantity", drillData.data.quantity, {
      yAxis: 'quantity'
    });
```

We re-configure the chart by setting the labels and adding 2 series exactly how we did it in the first part of this tutorial. Except this time we add the new data for the chart. 

Interestingly, you can also change the series completely, or even a different chart type. This gives you full freedom to show the kind of data that is most appropriate. In our current scenario, we wish to only show the same series because it's relavant to the data.

```
    done();
  });
```

Now we finally come to the `done()` function. Note that you **must** call the `done()` function at the end, otherwise the drill down will not work. 

Why is this necessary? Because of AJAX requests. Let's assume that `done()` didn't exist. Let's say for example, you have to make an AJAX Query, and update the chart with the new values. You would do something like:

```
  quarterlySales.addDrillStep (function (done, params) {
    $.ajax({
      method: "GET",
      url: "/path/to/endpoint?label=" + params.label,
      success: function () {
        // The data might be updated asynchronously.
        // But RazorFlow isn't expecting new data here.
        quarterlySales.addSeries ();
      }
    });

    // By the time the "drilldown" functionality is finished, 
    // RazorFlow has no idea what to do next, because there's no updated data,
    // and the user interface needs to be updated.
  });
```

Instead, by calling `done()` you're telling RazorFlow Framework "Ok, I've updated the data on my drill down and I'm ready to display it to the user"
```
  quarterlySales.addDrillStep (function (done, params) {
    $.ajax({
      method: "GET",
      url: "/path/to/endpoint?label=" + params.label,
      success: function () {
        // RazorFlow is still expecting new data here, since it knows
        // that the drill down isn't over until you say it's over
        quarterlySales.addSeries ();

        // Call `done` after everything is finished. This tells RazorFlow
        // that the drill down is ready to be displayed to the user.
        done ();
      }
    });
    // When the code reaches here, the `done` function hasn't been called yet.
    // RazorFlow knows now the drill hasn't completed yet, so it avoids trying 
    // to update the UI
  });
```

# Tabbed Dashboards

Sometimes your dashboards have multiple parts which need not all be displayed in the same part. For example in our current dashboard that we have built, we have 2 different categories of components - sales related components, and inventory related components. What if we could show them as 2 separate tabs. That's what we can do with tabbed dashboards.

Before we modify our dashboard and make it tabbed, let's examine how tabbed dashboards work. 

To make a tabbed dashboard, you have to supply `{tabbed:true}` to the `StandaloneDashboard` function. Roughly your dashboard skeleton will look like this.

```
StandaloneDashboard (function (db) {
  var tab1 = new Dashboard ();
  var tab2 = new Dashboard ();

  // Add components to tab1:
  tab1.addComponent (foo);
  tab1.addComponent (bar);

  // Add components to tab2:
  tab2.addComponent (foo);
  tab2.addComponent (bar);

  // Now actually add the dashboards to the main dashboard.
  db.addDashboardTab (tab1, {
    title: "Tab 1 Title",
    active: true // this tab should be active by default.
  });
  db.addDashboardTab (tab2, {
    title: "Tab 2 Title"
  });
}, {tabbed:true});
```

**Before we begin modifying our existing dashboard, you will have to remove all existing references to `db.addComponent`**.

Towards the end of your dashboard, you will create 2 new dashboard objects, and add the components to those dashboards:

```
  var sales_dashboard = new Dashboard ();
  var inventory_dashboard = new Dashboard ();

  sales_dashboard.addComponent (quarterlySales);
  sales_dashboard.addComponent (numTickets);
  sales_dashboard.addComponent (satisfactionGauge);
  sales_dashboard.addComponent (ticketPriorities);

  inventory_dashboard.addComponent (productsTable);
  inventory_dashboard.addComponent (productFilterForm);

  db.setTabbedDashboardTitle ("RazorFlow Tutorial Dashboard");
  db.addDashboardTab (sales_dashboard, {
    title: "Sales Dashboard",
    active: true
  });
  db.addDashboardTab (inventory_dashboard, {
    title: "Inventory Dashboard"
  });
}, {tabbed: true});
```

Here we are doing multiple things:

1. We are creating new dashboard objects using the `new Dashboard` statements for the sales and inventory dashboards.
2. We add all the components to the corresponding dashboards using the `addComponent` function
3. We set the title of the tabbed dashboard.
4. We use `addDashboardTab` to make sure that the tab is added to the primary dashboard, thus ensuring all the components are displayed.

## Real time updating of components

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

After we've built the entire different components of the dashboards one by one this is what the code should finally look like when finished:

```
StandaloneDashboard(function(db){
  var quarterlySales = new ChartComponent();
  quarterlySales.setDimensions (6, 6);
  quarterlySales.setCaption("Quarterly Sales");
  quarterlySales.setLabels (["Q1", "Q2", "Q3", "Q4"]);
  quarterlySales.addYAxis('quantity', "Quantity");
  quarterlySales.addSeries('sales', "Sales", [13122, 41312, 46132, 51135], {
    numberPrefix: "$ "
  });
  quarterlySales.addSeries('quantity', "Quantity", [121, 392, 420, 489], {
    yAxis: 'quantity'
  });
  quarterlySales.addComponentKPI ('beverage', {
      caption: 'Beverages',
      value: 22900,
      numberPrefix: ' $',
      numberHumanize: true
  });
  quarterlySales.addComponentKPI('vegetable', {
      caption: 'Vegetables',
      value: 10401,
      numberPrefix: ' $',
      numberHumanize: true
  });
  quarterlySales.addComponentKPI('dairy', {
      caption: 'Dairy',
      value: 27700,
      numberPrefix: ' $',
      numberHumanize: true
  });

  var quarterlyData = {
    'Q1': {
      labels: ["Jan", "Feb", "March"],
      data: {
        quantity: [19, 46, 56],
        sales: [3747, 3318, 6057]
      }
    },
    'Q2': {
      labels: ["April", "May", "June"],
      data: {
        sales: [11857, 17435, 12020],
        quantity: [82, 163, 147]
      }
    },
    'Q3': {
      labels: ["July", "Aug", "Sep"],
      data: {
        sales: [12714, 15418, 18000],
        quantity: [102, 156, 162]
      }
    },
    'Q4': {
      labels: ["Oct", "Nov", "Dec"],
      data: {
        sales: [14342, 21721, 15072],
        quantity: [145, 207, 137]
      }
    }
  }
  quarterlySales.addDrillStep (function (done, params) {
    var drillData = quarterlyData[params.label];
    quarterlySales.setLabels (drillData.labels);
    quarterlySales.addSeries('sales', "Sales", drillData.data.sales, {
      numberPrefix: "$ "
    });
    quarterlySales.addSeries('quantity', "Quantity", drillData.data.quantity, {
      yAxis: 'quantity'
    });
    done();
  });


  var numTickets = new KPIComponent ();
  numTickets.setDimensions (3, 3);
  numTickets.setCaption ("Open Support Tickets");
  numTickets.setValue (42);

  var satisfactionGauge = new GaugeComponent();
  satisfactionGauge.setDimensions(3 ,3);
  satisfactionGauge.setCaption('Customer Satisfaction');
  satisfactionGauge.setValue(8);
  satisfactionGauge.setLimits(0, 10);

  var ticketPriorities = new KPIGroupComponent ();
  ticketPriorities.setDimensions (6, 3);
  ticketPriorities.setCaption('Ticket Priorities');
  ticketPriorities.addKPI('high', {
      caption: 'High Priority',
      value: 6,
  });
  ticketPriorities.addKPI('normal', {
      caption: 'Normal Priority',
      value: 36,
  });

  var tableData = [
  {name: "Broccoli", category: "Vegetables", price: 14},
  {name: "Cheese", category: "Dairy", price: 18},
  {name: "Tomatoes", category: "Vegetables", price: 8},
  {name: "Orange Juice", category: "Beverages", price: 12},
  {name: "Root Beer", category: "Beverages", price: 13},
  ];

  var productsTable = new TableComponent ();
  productsTable.setDimensions (6, 6);
  productsTable.setCaption ('Products');
  productsTable.addColumn ('name', 'Name');
  productsTable.addColumn ('category', 'Category');
  productsTable.addColumn ('price', 'Price', {
    dataType: "number",
    numberPrefix: "$",
    textAlign: "right",
    numberForceDecimals: true
  });
  productsTable.addMultipleRows (tableData);

  var productFilterForm = new FormComponent ();
  productFilterForm.setDimensions (6, 6);
  productFilterForm.setCaption ('Filter Products');
  productFilterForm.addMultiSelectField ('category', 'Select Category', ['Vegetables', 'Diary', 'Beverages']);
  productFilterForm.addTextField ('name', 'Product Name Contains');
  productFilterForm.addNumericRangeField('price', 'Price', [5, 20]);


  productFilterForm.onApplyClick(function() {
    var inputValues = productFilterForm.getAllInputValues();
    // Create a fresh copy of the products table data
    var filteredValues = tableData;

    // Filter the rows which contain product name requested
    if(productFilterForm.isFieldSet ('name')) {
      filteredValues = rf._.filter(filteredValues, function (row) {
        return row['name'].search(inputValues['name']) !== -1;
      })
    }

    // Filter rows which fall between a range of prices
    if(productFilterForm.isFieldSet ('price')) {
      filteredValues = rf._.filter(filteredValues, function (row) {
        return row['price'] >= inputValues['price'][0] && row['price'] <= inputValues['price'][1]
      })
    }

    // Filter only valid categories
    if(productFilterForm.isFieldSet ('category')) {
      filteredValues = rf._.filter(filteredValues, function (row) {
        return rf._.contains(inputValues['category']['text'], row['category'])
      })
    }
    
    productsTable.clearRows ();
    productsTable.addMultipleRows (filteredValues);

  });

  var sales_dashboard = new Dashboard ();
  var inventory_dashboard = new Dashboard ();

  sales_dashboard.addComponent (quarterlySales);
  sales_dashboard.addComponent (numTickets);
  sales_dashboard.addComponent (satisfactionGauge);
  sales_dashboard.addComponent (ticketPriorities);

  inventory_dashboard.addComponent (productsTable);
  inventory_dashboard.addComponent (productFilterForm);

  db.setTabbedDashboardTitle ("RazorFlow Tutorial Dashboard");
  db.addDashboardTab (sales_dashboard, {
    title: "Sales Dashboard",
    active: true
  });
  db.addDashboardTab (inventory_dashboard, {
    title: "Inventory Dashboard"
  });
}, {tabbed: true});
```