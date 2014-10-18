StandaloneDashboard(function(db){
  var quarterlySales = new ChartComponent();
  quarterlySales.setDimensions (6, 6);
  quarterlySales.setCaption("Quarterly Sales");
  quarterlySales.setLabels (["Q1", "Q2", "Q3", "Q4"]);
  quarterlySales.addYAxis('quantity', "Quantity");
  quarterlySales.addSeries('sales', "Sales", [13122, 41312, 46132, 51135], {
    numberPrefix: "$ "
  });
  quarterlySales.addSeries('quantity', "Quantity", [121, 392, 420, 489], {
    yAxis: 'quantity'
  });
  quarterlySales.addComponentKPI ('beverage', {
      caption: 'Beverages',
      value: 22900,
      numberPrefix: ' $',
      numberHumanize: true
  });
  quarterlySales.addComponentKPI('vegetable', {
      caption: 'Vegetables',
      value: 10401,
      numberPrefix: ' $',
      numberHumanize: true
  });
  quarterlySales.addComponentKPI('dairy', {
      caption: 'Dairy',
      value: 27700,
      numberPrefix: ' $',
      numberHumanize: true
  });
  db.addComponent (quarterlySales);

  var numTickets = new KPIComponent ();
  numTickets.setDimensions (3, 3);
  numTickets.setCaption ("Open Support Tickets");
  numTickets.setValue (42);
  db.addComponent (numTickets);

  var satisfactionGauge = new GaugeComponent();
  satisfactionGauge.setDimensions(3 ,3);
  satisfactionGauge.setCaption('Customer Satisfaction');
  satisfactionGauge.setValue(8);
  satisfactionGauge.setLimits(0, 10);
  db.addComponent(satisfactionGauge);

  var ticketPriorities = new KPIGroupComponent ();
  ticketPriorities.setDimensions (6, 3);
  ticketPriorities.setCaption('Ticket Priorities');
  ticketPriorities.addKPI('high', {
      caption: 'High Priority',
      value: 6,
  });
  ticketPriorities.addKPI('normal', {
      caption: 'Normal Priority',
      value: 36,
  });
  db.addComponent (ticketPriorities);

  var tableData = [
  {name: "Broccoli", category: "Vegetables", price: 14},
  {name: "Cheese", category: "Dairy", price: 18},
  {name: "Tomatoes", category: "Vegetables", price: 8},
  {name: "Orange Juice", category: "Beverages", price: 12},
  {name: "Root Beer", category: "Beverages", price: 13},
  ];

  var productsTable = new TableComponent ();
  productsTable.setDimensions (6, 6);
  productsTable.setCaption ('Products');
  productsTable.addColumn ('name', 'Name');
  productsTable.addColumn ('category', 'Category');
  productsTable.addColumn ('price', 'Price', {
    dataType: "number",
    numberPrefix: "$",
    textAlign: "right",
    numberForceDecimals: true
  });
  productsTable.addMultipleRows (tableData);
  db.addComponent(productsTable);

  var productFilterForm = new FormComponent ();
  productFilterForm.setDimensions (6, 6);
  productFilterForm.setCaption ('Filter Products');
  productFilterForm.addMultiSelectField ('category', 'Select Category', ['Vegetables', 'Diary', 'Beverages']);
  productFilterForm.addTextField ('name', 'Product Name Contains');
  productFilterForm.addNumericRangeField('price', 'Price', [5, 20]);
  db.addComponent(productFilterForm);


  productFilterForm.onApplyClick(function() {
    var inputValues = productFilterForm.getAllInputValues();
    // Create a fresh copy of the products table data
    var filteredValues = tableData;

    // Filter the rows which contain product name requested
    if(productFilterForm.isFieldSet ('name')) {
      filteredValues = rf._.filter(filteredValues, function (row) {
        return row['name'].search(inputValues['name']) !== -1;
      })
    }

    // Filter rows which fall between a range of prices
    if(productFilterForm.isFieldSet ('price')) {
      filteredValues = rf._.filter(filteredValues, function (row) {
        return row['price'] >= inputValues['price'][0] && row['price'] <= inputValues['price'][1]
      })
    }

    // Filter only valid categories
    if(productFilterForm.isFieldSet ('category')) {
      filteredValues = rf._.filter(filteredValues, function (row) {
        return rf._.contains(inputValues['category']['text'], row['category'])
      })
    }
    
    productsTable.clearRows ();
    productsTable.addMultipleRows (filteredValues);
  });
});
