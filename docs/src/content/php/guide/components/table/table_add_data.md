--
title: "Adding data to the table"
subtitle: ""
id: "php_table_add_data"
index: 1
--


You can add a table component to the dashboard by creating an intance of the {{ linkApi("php", "TableComponent", "") }} class in your dashboard code.

~~~
$table = new TableComponent ();
$table->setCaption ("Regional Sales");
$table->setDimensions(4, 4);

// Configure the table

$this->addComponent($table);
~~~

## Add data to the table

For adding the data, there are two steps:

1. Add one or more column definitions to the table.
2. Add rows of data to the table.

### Adding columns

To add columns to the table, you can use the {{ linkApi("php", "TableComponent", "addColumn") }} function. The first parameter to the {{ linkApi("php", "TableComponent", "addColumn") }} function is a unique string key for the column.

~~~
$table->addColumn ('storeName', "Store Name");
$table->addColumn ('salesAmount', "Sales");
~~~


### Adding rows

Let's say a table has 3 columns like this:

~~~
$table = new TableComponent ("table1");
$table->addColumn ('zone', "Store Zone Name");
$table->addColumn ('name', "Store Name");
$table->addColumn ('sale', "Sales amount");
~~~

You can add a row by passing a JavaScript object like this:

~~~
$table->addRow (array("zone" => "North", "name" => "Northern Stores", "saleAmount" => 5000));
~~~

### Add multiple rows at once

~~~
$data = array(
	array("zoneName" => "North", "name" => "Northern Stores", "sale" => 4000),
	array("zoneName" => "South", "name" => "Southern Stores", "sale" => 4500)
);
$table->addMultipleRows ($data);
~~~

{{ embedExample ('php', "table0") }}
