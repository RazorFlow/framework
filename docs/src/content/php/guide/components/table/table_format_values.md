--
title: "Column formatting"
subtitle: ""
id: "php_table_format_values"
index: 2
--


## Column formatting

### Change the width of a column

You can change the width of a column of a table using the 'columnWidth' parameter. Simply specify the width of the column in pixels using this option

~~~
$table->addColumn("sales", "Sales Amount", array(
	"columnWidth" => 140
));
~~~

### Change the way numbers are displayed 

You can configure how number are formatted and displayed in the table using the standard {{ ref("phpNumberFormatting") }}. However, you need to also specify that the column's data type is a number for this.

~~~
$table->addColumn("sales", "Sales Amount", array(
	"dataType" => "number",
	"numberPrefix" => "$"
));
~~~

{{ embedExample ('php', "table_formatting") }}

