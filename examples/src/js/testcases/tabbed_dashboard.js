StandaloneDashboard(function (tdb) {
	tdb.setTabbedDashboardTitle("Tabbed Dashboard");

	var db1 = new Dashboard('db1');
	db1.setDashboardTitle('Dashboard 1');
	var kpi1 = new KPIComponent();
    kpi1.setDimensions(3,2);
    kpi1.setCaption('KPI normal test');
    kpi1.setValue(244);
    db1.addComponent(kpi1);
    var c1 = new ChartComponent();
    c1.setCaption("Column Chart");
    c1.setDimensions(4, 4);
    c1.setLabels(['January', 'February', 'March', 'April', 'May']);
    c1.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'area', numberPrefix: '$'});
 
    db1.addComponent(c1);

    var c2 = new ChartComponent();
    c2.setCaption("Column Chart multi-series");
    c2.setDimensions(4, 4);
    c2.setLabels(['January', 'February', 'March', 'April', 'May']);
    c2.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'area', numberPrefix: '$'});
    c2.addSeries("seriesB", "Series B", [9, 1, 5, 3, 1], {seriesDisplayType: 'area', numberPrefix: '$'});

    db1.addComponent(c2);

    var c3 = new ChartComponent();
    c3.setCaption("Column Chart multi-series");
    c3.setDimensions(4, 4);
    c3.stacked();
    c3.setLabels(['January', 'February', 'March', 'April', 'May']);
    c3.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'area', numberPrefix: '$', seriesStacked: true});
    c3.addSeries("seriesB", "Series B", [9, 1, 5, 3, 1], {seriesDisplayType: 'area', numberPrefix: '$', seriesStacked: true});
 
    db1.addComponent(c3);

	var db2 = new Dashboard('db2');
	db2.setDashboardTitle('Dashboard 2');
	var chart = new ChartComponent ('chart');
    chart.setDimensions (8, 6);
    chart.setCaption ('Annual Sales Summary (2010 - 2013)');
    chart.setLabels (['2010', '2011', '2012', '2013']);
    chart.addSeries ('sales', 'Sales', [1160000, 1040000, 1020000, 1160000]);

    chart.setYAxis('Sales', {
        numberPrefix: '$',
        numberHumanize: true
    });

    var selectedYear;
    var labelsForQuarters = {
        'Q1': ['January', 'February', 'March'],
        'Q2': ['April', 'May', 'June'],
        'Q3': ['July', 'August', 'September'],
        'Q4': ['October', 'November', 'December']
    };
    var yearData = {
        '2010': {
            'Q1': [110000, 76000, 88000],
            'Q2': [116000, 92000, 62000],
            'Q3': [114000, 86000, 11800],
            'Q4': [92000, 102000, 105000],
            data:  [274000, 270000, 318000, 299000]
        },
        '2011': {
            'Q1': [370000, 290000, 320000],
            'Q2': [370000, 290000, 320000],
            'Q3': [370000, 290000, 320000],
            'Q4': [370000, 290000, 320000],
            data: [306000, 203000, 270000, 264000]
        },
        '2012': {
            'Q1': [87000, 89000, 65000],
            'Q2': [13000, 44000, 106000],
            'Q3': [85000, 103000, 67000],
            'Q4': [59000, 69000, 113000],
            data: [241000, 280000, 255000, 241000]
        },
        '2013': {
            'Q1': [105000, 76000, 88000],
            'Q2': [116000, 92000, 62000],
            'Q3': [114000, 86000, 118000],
            'Q4': [92000, 102000, 105000],
            data: [269000, 270000, 318000, 299000]
        }
    }

    chart.addDrillStep (function (done, params, updatedComponent) {
        var label = selectedYear = params.label;
        updatedComponent.setLabels (['Q1', 'Q2', 'Q3', 'Q4']);
        updatedComponent.addSeries ('sales', 'Sales', yearData[label].data);
        done();
    });

    chart.addDrillStep (function (done, params, updatedComponent) {
        var label = params.label;
        updatedComponent.setLabels (labelsForQuarters[label]);
        updatedComponent.addSeries ('sales', 'Sales', yearData[selectedYear][label]);
        done();
    });

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
	tdb.addDashboardTab(db1);
	tdb.addDashboardTab(db2);
	tdb.addDashboardTab(db3, {
		title: "my looooooong title which goes on and on and on and on"
	});
	tdb.addDashboardTab(db4, {
		active: true,
		title: "my modified title"
	});

}, {tabbed: true});