<meta>
{
	"title": "Adding data to the table",
	"subtitle": "",
	"id": "table_add_data",
	"index": 1
}
</meta>

You can add a table component to the dashboard by creating an intance of the {{ linkApi("js", "TableComponent", "") }} class in your dashboard code.

~~~
var table = new TableComponent ();
table.setCaption ("Regional Sales");
table.setDimensions(4, 4);

// Configure the table

db.addComponent(table);
~~~

## Add data to the table

For adding the data, there are two steps:

1. Add one or more column definitions to the table.
2. Add rows of data to the table.

### Adding columns

To add columns to the table, you can use the {{ linkApi("js", "TableComponent", "addColumn") }} function. The first parameter to the {{ linkApi("js", "TableComponent", "addColumn") }} function is a unique string key for the column.

~~~
table.addColumn ('storeName', "Store Name");
table.addColumn ('salesAmount', "Sales");
~~~


### Adding rows

Let's say a table has 3 columns like this:

~~~
var table = new TableComponent ();
table.addColumn ('zone', "Store Zone Name");
table.addColumn ('name', "Store Name");
table.addColumn ('sale', "Sales amount");
~~~

You can add a row by passing a JavaScript object like this:

~~~
table.addRow ({zone: "North", name: "Northern Stores", saleAmount: 5000});
~~~

### Add multiple rows at once

~~~
var data = [
	{zoneName: "North", name: "Northern Stores", sale: 4000},
	{zoneName: "South", name: "Southern Stores", sale: 4500},
];
table.addMultipleRows (data);
~~~

{{ embedExample ('js', "table0") }}