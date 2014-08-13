<meta>
{
	"title": "Getting Started with the form component",
	"subtitle": "",
	"index": 0,
	"id": "form_configure"
}
</meta>
### Add a form component to the dashboard

You can add a form component to the dashboard by creating an instance of the {{ linkApi("js", "FormComponent", "") }} object in your code.

~~~
var form = new FormComponent();
form.setDimensions(4, 4);

// Configure the form

db.addComponent(form);
~~~

### Add form elements to form component

A Form Component is made up of one or more fields. Each field is a form element to be displayed on the form.

Each field in the form component will have a unique key. This key is used to retrieve the data from the form.

#### Text Field

A text field allows the user to enter text. To add a text field, use the {{ linkApi("js", "FormComponent", "addTextField") }} function

~~~
form.addTextField ("product_name", "Product Name");
~~~

There are 2 parameters:

1. The key of the field (`"product_name"`).
2. The label of the field (`"Product Name"`)

You can specify a default value of the text to be filled in by passing a configuration object as an extra parameter

~~~
form.addTextField ("product_name", "Product Name", {
	defaultText: "Potato Chips"
});
~~~

#### Drop-Down/Select Field

You can add a Drop-Down select element to your form using the {{ linkApi("js", "FormComponent", "addSelectField") }}.

~~~
form.addSelectField ("delivery_status", "Delivery Status", [
	"Delivered",
	"Refunded",
	"Cancelled"
]);
~~~

There are 3 parameters:

1. The key of the field (`"delivery_status"`).
2. The label of the field (`"Delivery Status"`)
3. An array of options

By default, the first option is always selected. But you can set another option to be selected like this:

~~~
form.addSelectField ("delivery_status", "Delivery Status", [
	"Delivered",
	"Refunded",
	"Cancelled"
], {
	defaultSelectedIndex: 1
});
~~~

This selects index `1` in the array. Note that since the array starts from 0, "Refunded" is selected by default.

#### Multi Select field

Multi select field allows your users to select more than one option.

~~~
form.addMultiSelectField ("item_category", "Item Category", [
	"Beverages",
	"Condiments",
	"Snacks",
	"Groceries"
]);
~~~

There are 3 parameters:

1. The key of the field (`"item_category"`).
2. The label of the field (`"Item Category"`)
3. An array of options 

By default, no options are selected. You can specify the defaults:

~~~
form.addMultiSelectField ("item_category", "Item Category", [
	"Beverages",
	"Condiments",
	"Snacks",
	"Groceries"
], {
	defaultSelectedOptions: [1, 2]
});
~~~

This selects indices `1` and `2` in the array. Note that since the array starts from 0, "Condiments" and "Snacks" are selected.

#### Date Field

A date field allows your users to pick a single date, use the {{ linkApi("js", "FormComponent", "addDateField") }} function.

~~~
form.addDateField ("sale_date", "Sale Date");
~~~

There are 2 parameters:

1. The key of the field (`"sale_date"`).
2. The label of the field (`"Sale Date"`)

By default, the current date is displayed. You can specify another date to be shown as default by passing a configuration object as an extra parameter.

~~~
form.addDateField ("sale_date", "Sale Date", {
	defaultDate: "2013-12-03"
});
~~~

#### Date Range Field

A date range field allows your users to select a range of dates by specifying a start and end date, use the {{ linkApi("js", "FormComponent", "addDateRangeField") }} function.

~~~
form.addDateRangeField ("sale_period", "Sale Period");
~~~

There are 2 parameters:

1. The key of the field (`"sale_period"`).
2. The label of the field (`"Sale Period"`)

By default, the end date is the current date, and the start date is 1 month behind the current date. For Example, if today is 8th August 2013:

* Start Date: 8th July 2013
* End Date: 8th August 2013

You can specify different defaults:

~~~
form.addDateRangeField ("sale_date", "Sale Date", {
	defaultStartDate: "2013-07-08",
	defaultEndDate: "2013-08-08"
});
~~~

If the default start date is not provided, the current date is used. If the default end date is not provided, the current date is used.


#### Numeric Range Field

A numeric range field allows your users to select a range of numbers by specifying a start and end values, use the {{ linkApi("js", "FormComponent", "addNumericRangeField") }} function.

~~~
form.addNumericRangeField ("sale_amount", "Sale Amount", [0, 100], {
	smallStep: 1
});
~~~

There are 4 parameters:

1. The key of the field (`"sale_amount"`).
2. The label of the field (`"Sale Amount"`)
3. An array with 2 elements containing start and end amounts
4. The options consist of 1 option called `smallStep` which indicates the number of step on each drag. This defaults to 1.

### What's next?

Learn to use the field component to actually extract values.