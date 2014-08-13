rf.StandaloneDashboard(function(db){
  var chart = new ChartComponent();
  chart.setDimensions (8, 8);
  chart.setCaption("2011 Sales"); 
  chart.setLabels (["Beverages", "Vegetables"])
  chart.addSeries ("sales", "Sales", [1343, 7741]);
  chart.addSeries ("quantity", "Quantity", [76, 119]);

  chart.addComponentKPI("quantity", {
    caption: "Average Quantity",
    value: "100",
  });

  chart.addComponentKPI("revenue", {
    caption: "Revenue",
    value: "4200000",
    numberPrefix: "$",
    numberHumanize: true
  });

  db.addComponent (chart);

});