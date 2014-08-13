rf.StandaloneDashboard(function(db){
  var chart = new ChartComponent();
  chart.setDimensions (8, 8);
  chart.setCaption("2011 Sales"); 
  chart.setLabels (["Beverages", "Vegetables"])
  chart.addSeries ("sales", "Sales", [1343, 7741]);
  chart.addSeries ("quantity", "Quantity", [76, 119]);

  chart.addComponentKPI("first", {
    caption: "Looooong text with blah blah blah",
    value: "200",
    numberPrefix: '$'
  });

  chart.addComponentKPI("second", {
    caption: "Number Formatter",
    value: "4200000",
    numberPrefix: "$",
    numberHumanize: true
  });

  chart.addComponentKPI("third", {
    caption: "new",
    value: "100"
  });

  chart.addComponentKPI("fourth", {
    caption: "again",
    value: "22"
  });

  db.addComponent (chart);

  setTimeout(function () {
    chart.updateComponentKPI("first", {
      value: "10"
    });
  }, 2000);

});