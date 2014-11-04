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
  db.addComponent (satisfactionGauge);

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
});
