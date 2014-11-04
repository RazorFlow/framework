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

  db.addComponent(quarterlySales);
});
