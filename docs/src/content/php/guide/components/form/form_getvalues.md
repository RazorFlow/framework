<meta>
{
	"title": "Get the values entered by users",
	"subtitle": "",
	"id": "php_form_getvalues",
	"index": 3
}
</meta>

### Access the input values in a form component

You can access the input values of a form component 

You can access the input values that the user has input into the form component at any time, by calling the {{ linkApi("php", "FormComponent", "getInputValue") }} function on the FormComponent object.

#### Get a single input value

You can get a single value that the user has currently entered into the form by using the {{ linkApi("php", "FormComponent", "getInputValue") }} function. Note that {{ linkApi("php", "FormComponent", "getInputValue") }} **only returns a value if the user input something**.

~~~
$selected_product = $form->getInputValue ('product_name');
$selected_status = $form->getInputValue ('delivery_date');
~~~

#### Text Field

Calling {{ linkApi("php", "FormComponent", "getInputValue") }} with a text field returns a string which is the user's input.

~~~
$form->getInputValue ("product_name");

// Returns:
// "Potato Chips"
~~~

#### Drop-Down/Select Field

Calling {{ linkApi("php", "FormComponent", "getInputValue") }} returns an object with 2 items:

* `text` - which is the text of the selected item
* `index` - which is the index of the seleted item (starting from 0)

~~~
$form->getInputValue("delivery_status");

// Returns:
// array(
//   'text' => "Refunded",
//   'index' => 1
// )
~~~


#### Multi Select field

Calling {{ linkApi("php", "FormComponent", "getInputValue") }} returns an array with 2 items:

* `text` - which is an array containing texts of selected items
* `index` - which is the an array containing indices of the seleted items (starting from 0)

~~~
$form->getInputValue("item_category");

// Returns:
// array(
//   'text' => ["Condiments", "Snacks"]
//   'index' => [1, 2]
// )
~~~

#### Date Field

Calling {{ linkApi("php", "FormComponent", "getInputValue") }} returns a string with date formatted in "YYYY-MM-DD" format.

~~~
$form->getInputValue ("sale_date");

// Returns:
// "2013-08-18"
~~~

#### Date Range Field

Calling {{ linkApi("php", "FormComponent", "getInputValue") }} returns an array with two strings. The first string is starting date, and second string is the ending date.

~~~
$form->getInputValue ("sale_period");

// Returns:
// ["2013-07-18", "2013-08-18"]
~~~

#### Numeric Range Field

Calling {{ linkApi("php", "FormComponent", "getInputValue") }} returns an array with two numbers. The first string is starting value, and second string is the ending value.

~~~
$form->getInputValue ("sale_amount");

// Returns:
// [42, 55]
~~~

### Example for using this API

{{ embedExample("php", "form") }}