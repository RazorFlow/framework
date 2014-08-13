<meta>
{
	"title": "Get the values entered by users",
	"subtitle": "",
	"id": "form_getvalues",
	"index": 1
}
</meta>

### Access the input values in a form component

You can access the input values that the user has input into the form component at any time, by calling the {{ linkApi("js", "FormComponent", "getInputValue") }} function on the FormComponent object.

#### Get a single input value

You can get a single value that the user has currently entered into the form by using the {{ linkApi("js", "FormComponent", "getInputValue") }} function. Note that {{ linkApi("js", "FormComponent", "getInputValue") }} **only returns a value if the user input something**.

~~~
var selected_product = form.getInputValue ('product_name');
var selected_status = form.getInputValue ('delivery_date');
~~~
{{ anchor ("getAllInputValues", "Get all input values") }}
#### Get all input values

You can get all the input values at one go using {{ linkApi("js", "FormComponent", "getAllInputValues") }}:

~~~
var values = form.getAllInputValues ();

// Returns:
// {
//   'product_name': "Some Product",
//   'delivery_date': "2013-05-13"
// }
~~~

### Value format of different field types

#### Text Field

Calling {{ linkApi("js", "FormComponent", "getInputValue") }} with a text form returns a string which is the user's input.

~~~
form.getInputValue ("product_name");

// Returns:
// "Potato Chips"
~~~

#### Drop-Down/Select Field

Calling {{ linkApi("js", "FormComponent", "getInputValue") }} returns an object with 2 items:

* `text` - which is the text of the selected item
* `index` - which is the index of the seleted item (starting from 0)

~~~
form.getInputValue("delivery_status");

// Returns:
// {
//   'text': "Refunded",
//   'index': 1
// }
~~~


#### Multi Select form

Calling {{ linkApi("js", "FormComponent", "getInputValue") }} returns an object with 2 items:

* `text` - which is an array containing texts of selected items
* `index` - which is the an array containing indices of the seleted items (starting from 0)

~~~
form.getInputValue("item_category");

// Returns:
// {
//   'text': ["Condiments", "Snacks"]
//   'index': [1, 2]
// }
~~~

#### Date Field

Calling {{ linkApi("js", "FormComponent", "getInputValue") }} returns a string with date formatted in "YYYY-MM-DD" format.

~~~
form.getInputValue ("sale_date");

// Returns:
// "2013-08-18"
~~~

#### Date Range Field

Calling {{ linkApi("js", "FormComponent", "getInputValue") }} returns an array with two strings. The first string is starting date, and second string is the ending date.

~~~
form.getInputValue ("sale_period");

// Returns:
// ["2013-07-18", "2013-08-18"]
~~~

#### Numeric Range Field

Calling {{ linkApi("js", "FormComponent", "getInputValue") }} returns an array with two numbers. The first string is starting value, and second string is the ending value.

~~~
form.getInputValue ("sale_amount");

// Returns:
// [42, 55]
~~~
