StandaloneDashboard(function (tdb) {
	tdb.setTabbedDashboardTitle("Tabbed Dashboard");

	var db1 = new Dashboard('db1');
	db1.setDashboardTitle('Dashboard 1');
	var kpi1 = new KPIComponent();
    kpi1.setDimensions(3,2);
    kpi1.setCaption('KPI normal test');
    kpi1.setValue(244);
    db1.addComponent(kpi1);

	var db2 = new Dashboard('db2');
	db2.setDashboardTitle('Dashboard 2');
	var chart = new ChartComponent('someid');
	chart.setDimensions (4, 4);
	chart.setCaption("Expenses incurred on Food Consumption by Year");
	chart.setLabels (["2009", "2010", "2011"])
	chart.addSeries ("beverages", "Beverages", [1355, 1916, 1150]);
	chart.addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321]);
	db2.addComponent (chart);

	var db3 = new Dashboard('db3');
	db3.setDashboardTitle('Dashboard 3');
	var chart = new ChartComponent();
	chart.setDimensions (4, 4);
	chart.setCaption("2011 Sales");	
	chart.setLabels (["Beverages", "Vegetables"])
	chart.addSeries ("sales", "Sales", [1343, 7741]);
	chart.addSeries ("quantity", "Quantity", [76, 119]);
	db3.addComponent (chart);

	var db4 = new Dashboard('db4');
	db4.setDashboardTitle('Dashboard 4');
	var table = new TableComponent ('test');
	table.setCaption ("Regional Sales");
	table.setDimensions(4, 4);
	table.addColumn ('zone', "Zone");
	table.addColumn ('name', "Store Name");
	table.addColumn ('sale', "Sales amount");
	var data = [
		{zone: "North", name: "Northern Stores", sale: 4000},
		{zone: "South", name: "Southern Stores", sale: 4500},
	];
	table.addMultipleRows (data);
	db4.addComponent(table);

	var db5 = new Dashboard('db5');
	db5.setDashboardTitle('Dashboard 4');
	var table = new TableComponent ('test');
	table.setCaption ("Regional Sales");
	table.setDimensions(4, 4);
	table.addColumn ('zone', "Zone");
	table.addColumn ('name', "Store Name");
	table.addColumn ('sale', "Sales amount");
	var data = [
		{zone: "North", name: "Northern Stores", sale: 4000},
		{zone: "South", name: "Southern Stores", sale: 4500},
	];
	table.addMultipleRows (data);
	db5.addComponent(table);

	var db6 = new Dashboard('db6');
	db6.setDashboardTitle('Dashboard 4');
	var table = new TableComponent ('test');
	table.setCaption ("Regional Sales");
	table.setDimensions(4, 4);
	table.addColumn ('zone', "Zone");
	table.addColumn ('name', "Store Name");
	table.addColumn ('sale', "Sales amount");
	var data = [
		{zone: "North", name: "Northern Stores", sale: 4000},
		{zone: "South", name: "Southern Stores", sale: 4500},
	];
	table.addMultipleRows (data);
	db6.addComponent(table);

	var db7 = new Dashboard('db7');
	db7.setDashboardTitle('Dashboard 4');
	var table = new TableComponent ('test');
	table.setCaption ("Regional Sales");
	table.setDimensions(4, 4);
	table.addColumn ('zone', "Zone");
	table.addColumn ('name', "Store Name");
	table.addColumn ('sale', "Sales amount");
	var data = [
		{zone: "North", name: "Northern Stores", sale: 4000},
		{zone: "South", name: "Southern Stores", sale: 4500},
	];
	table.addMultipleRows (data);
	db7.addComponent(table);

	var db8 = new Dashboard('db8');
	db8.setDashboardTitle('Dashboard 4');
	var table = new TableComponent ('test');
	table.setCaption ("Regional Sales");
	table.setDimensions(4, 4);
	table.addColumn ('zone', "Zone");
	table.addColumn ('name', "Store Name");
	table.addColumn ('sale', "Sales amount");
	var data = [
		{zone: "North", name: "Northern Stores", sale: 4000},
		{zone: "South", name: "Southern Stores", sale: 4500},
	];
	table.addMultipleRows (data);
	db8.addComponent(table);

	var db9 = new Dashboard('db9');
	db9.setDashboardTitle('Dashboard 4');
	var table = new TableComponent ('test');
	table.setCaption ("Regional Sales");
	table.setDimensions(4, 4);
	table.addColumn ('zone', "Zone");
	table.addColumn ('name', "Store Name");
	table.addColumn ('sale', "Sales amount");
	var data = [
		{zone: "North", name: "Northern Stores", sale: 4000},
		{zone: "South", name: "Southern Stores", sale: 4500},
	];
	table.addMultipleRows (data);
	db9.addComponent(table);

	var db10 = new Dashboard('db10');
	db10.setDashboardTitle('Dashboard 4');
	var table = new TableComponent ('test');
	table.setCaption ("Regional Sales");
	table.setDimensions(4, 4);
	table.addColumn ('zone', "Zone");
	table.addColumn ('name', "Store Name");
	table.addColumn ('sale', "Sales amount");
	var data = [
		{zone: "North", name: "Northern Stores", sale: 4000},
		{zone: "South", name: "Southern Stores", sale: 4500},
	];
	table.addMultipleRows (data);
	db10.addComponent(table);


	tdb.addDashboardTab(db1);
	tdb.addDashboardTab(db2);
	tdb.addDashboardTab(db3, {
		"active" : true
	});
	tdb.addDashboardTab(db4);
	tdb.addDashboardTab(db5);

	tdb.addDashboardTab(db6);
	tdb.addDashboardTab(db7);
	tdb.addDashboardTab(db8);
	tdb.addDashboardTab(db9);
	tdb.addDashboardTab(db10);

}, {tabbed: true});
