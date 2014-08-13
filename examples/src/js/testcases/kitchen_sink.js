StandaloneDashboard(function (db) {
    var kpi1 = new KPIComponent();
    kpi1.setDimensions(3,2);
    kpi1.setCaption('KPI normal test');
    kpi1.setValue(244);
    db.addComponent(kpi1);

    var kpi2 = new KPIComponent();
    kpi2.setDimensions(3,2);
    kpi2.setCaption('Spark test');
    kpi2.setValue(124);
    kpi2.setSparkValues(['', '', '', '', ''], [32, 23, 14, 43, 12]);
    db.addComponent(kpi2);

    var gauge = new GaugeComponent();
    gauge.setDimensions(3,2);
    gauge.setCaption('Spark test');
    gauge.setValue(128);
    gauge.setLimits(0, 200);
    db.addComponent(gauge);

    var chart1 = new ChartComponent();
    chart1.setDimensions(3, 2);
    chart1.setCaption("Small Chart");  
    chart1.setLabels (["2009", "2010", "2011"]);
    chart1.addSeries ("beverages", "Beverages", [1355, 1916, 1150]);
    chart1.addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321]);
    db.addComponent (chart1);

    var chart2 =  new ChartComponent();
    chart2.setDimensions(4,4);
    chart2.setCaption("Column Chart");  
    chart2.setLabels (["2009", "2010", "2011"]);
    chart2.addSeries ("beverages", "Beverages", [1355, 1916, 1150]);
    db.addComponent (chart2);

    var chart3 = new ChartComponent();
    chart3.setDimensions(4,4);
    chart3.setCaption("Line Chart");
    chart3.setLabels (["2009", "2010", "2011"]);
    chart3.addSeries ("beverages", "Beverages", [1355, 1916, 1150], {seriesDisplayType: 'line'});
    db.addComponent (chart3);

    var chart4 = new ChartComponent();
    chart4.setDimensions(4,4);
    chart4.setCaption("Multi-Series Chart");
    chart4.setLabels (["2009", "2010", "2011"]);
    chart4.addSeries ("beverages", "Beverages", [1355, 1916, 1150], {seriesDisplayType: 'column'});
    chart4.addSeries ("snacks", "Snacks", [1344, 2344, 1421], {seriesDisplayType: 'line'});
    db.addComponent (chart4);

    var pieChart = new ChartComponent();
    pieChart.setDimensions(4,4);
    pieChart.setCaption('Pie Chart');
    pieChart.setLabels (["2009", "2010", "2011"]);
    pieChart.addSeries ("beverages", "Beverages", [1355, 1916, 1150], {seriesDisplayType: 'pie'});
    db.addComponent(pieChart);

    var chart5 = new ChartComponent();
    chart5.setDimensions(4,4);
    chart5.setCaption('Chart Y Axis Caption');
    chart5.setYAxis("Sales", {
        numberPrefix: "$ "
    });
    chart5.setLabels (["Jan", "Feb", "Mar"]);
    chart5.addSeries ("beverages", "Beverages", [1355, 1916, 1150]);
    chart5.addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321]);
    db.addComponent (chart5);

    var chart6 = new ChartComponent();
    chart6.setDimensions(4,4);
    chart6.setCaption('Chart custom series colors');
    chart6.setLabels (["2009", "2010", "2011"]);
    chart6.addSeries ("beverages", "Beverages", [1355, 1916, 1150], {seriesColor: '#FF0'});
    chart6.addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321], {seriesColor: '#F0F'});
    db.addComponent(chart6);

    var table = new TableComponent ('test');
    table.setCaption ("Table test");
    table.setDimensions(4, 4);
    table.addColumn ('zone', "Zone");
    table.addColumn ('name', "Store Name");
    table.addColumn ('sale', "Sales amount");
    var data = [
        {zone: "North", name: "Northern Stores", sale: 4000},
        {zone: "South", name: "Southern Stores", sale: 4500},
    ];
    table.addMultipleRows (data);
    db.addComponent(table);


    var c3 = new TableComponent();
    c3.setDimensions(4, 4);
    c3.setRowsPerPage('10');
    c3.setCaption("Table large rows");
    for (var i = 0; i < 5; i++) {
        c3.addColumn("a" + i, "Column A" + i, {
            dataType: "number",
            numberPrefix: "$"
        });
        c3.addColumn("b" + i, "Column B" + i, {
            dataType: "number",
            numberSuffix: "%"
        });
    }

    for (var i = 0; i < 85; i++) {
        var obj = {};
        for (var j = 0; j < 5; j++) {
            obj["a" + j] = Math.floor(Math.random
                    () * 10000);
            obj["b" + j] = Math.floor(Math.random() * 10000);
        }

        c3.addRow(obj);
    }
    db.addComponent(c3);

    var lockingTable = new TableComponent();
    lockingTable.setDimensions(4,4);
    lockingTable.setCaption("Component Locking");
    lockingTable.lock();
    db.addComponent(lockingTable);

    setTimeout(function() {
        lockingTable.addColumn("a", "A", {dataType: "number"});
        lockingTable.addColumn("b", "B", {dataType: "number"});
        lockingTable.unlock();
    }, 1000);

    var formComponent = new FormComponent();
    formComponent.setDimensions(6,6);
    formComponent.setCaption('Test Form Component');

    formComponent.addTextField('name', 'Name');
    formComponent.addSelectField('products', 'Products', ['Beverages', 'Chips', 'Cookies', 'Cakes', 'Dairy Products', 'Poultry'], {});
    formComponent.addMultiSelectField('cities', 'Cities', ['Bangalore', 'San Fransisco', 'New York', 'Melbourne', 'London', 'Rio De Jeneiro'], {});
    formComponent.addDateField('delivery_date', 'Delivery Date', {});
    formComponent.addDateRangeField('grace_period', 'Grace Period', {});
    formComponent.addNumericRangeField('units', 'Units in Stock');

    db.addComponent(formComponent);

});