--
title: "Number Formatting"
subtitle: ""
id: "php_number_formatting"
index: 0
--


{{ anchor("phpNumberFormatting", "Number Formatting Parameters") }}

You can configure how numbers in your dashboard are displayed in a variety of places. For example, while displaying a column of data in a table. Formatting numbers adds more meaning to them. For instance - adding a "$" or a similar currency symbol before a value indicates that this is a currency figure.

### How to format your number?

Usually, you will need to specify the number formatting using an API specific to the component itself. But the convention of number formatting is identical across the RazorFlow Dashboard Framework.

<table class="table table-bordered">
<thead>
<tr>
<th>Option Name</th><th>Description</th><th>Example Value</th><th>Before</th><th>After</th>
</tr>
</thead>
<tbody>
<tr>
	<td><code>numberPrefix</code></td>
	<td>Prefixes a number with a string. Adds it to the beginning of the number.</td>
	<td><code>"$"</code></td>
	<td>42</td>
	<td>$42</td>
</tr>
<tr>
	<td><code>numberSuffix</code></td>
	<td>Suffix a number with a string. Adds it to the end of the number.</td>
	<td><code>"%"</code></td>
	<td>42</td>
	<td>42%</td>
</tr>
<tr>
	<td><code>numberHumanize</code></td>
	<td>boolean flag to format a number with the convention of using "K" to refer to thousands and "M" to refer to millions</td>
	<td><code>true</code></td>
	<td>42134</td>
	<td>42.13K</td>
</tr>
<tr>
	<td><code>numberForceDecimals</code></td>
	<td>boolean flag to show decimal points even if the number doesn't have decimal places.</td>
	<td><code>true</code></td>
	<td>42</td>
	<td>42.00</td>
</tr>
<tr>
	<td><code>numberDecimalPoints</code></td>
	<td>specify the number of decimal points to display on the numbers.</td>
	<td><code>2</code></td>
	<td>42.13531</td>
	<td>42.13</td>
</tr>
<tr>
	<td><code>numberThousandsSeparator</code></td>
	<td>The string used to separate thousands in a large number.</td>
	<td><code>.</code></td>
	<td>41355421</td>
	<td>41.355.421</td>
</tr>
<tr>
	<td><code>numberDecimalsSeparator</code></td>
	<td>The string used to separate decimals from the whole number.</td>
	<td><code>,</code></td>
	<td>3.14159</td>
	<td>3,14159</td>
</tr>
</tbody>
</table>
