StandaloneDashboard(function (db) {
	var table = new TableComponent ('test');
	table.setCaption ("Regional Sales");
	table.setDimensions(4, 4);
	table.addColumn ('zone', "Zone");
	table.addColumn ('name', "Store Name");
	table.addColumn ('sale', "Sales amount");
	table.addColumn ('empty', "empty");
	var data = [
		{zone: "North", name: "Northern Stores", sale: 4000, empty: "Empty"},
		{zone: "South", name: "Southern Stores", sale: 4500, empty: "Empty"},
	];
	table.addMultipleRows (data);
	table.cellConditionalFormat("sale", "4000<value<5000", {"cellBackgroundColor":"#000", "cellTextColor": "#fff"});
	table.cellConditionalFormat("empty", "value == \'Empty\'", {"cellBackgroundColor":"red", "cellTextColor": "#fff"});
	db.addComponent(table);
});