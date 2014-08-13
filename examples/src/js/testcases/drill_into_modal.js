rf.StandaloneDashboard(function(db) {

  var chart = new ChartComponent('chart1');
  chart.setDimensions (4, 4);
  chart.setCaption("Expenses incurred on Food Consumption by Year");
  chart.setLabels (["2009", "2010", "2011"]);
  chart.addSeries ("beverages", "Beverages", [1355, 1916, 1150]);

  var chart2 = new ChartComponent('chart2');
  chart2.hideComponent();

  db.addComponent (chart);
  db.addComponent (chart2);

  chart.onItemClick(function(params) {
    chart2.lock();
    chart2.setLabels(['A', 'B', 'C']);
    chart2.addSeries ("food", params.label, [params.value + 10, params.value + 100, params.value + 150]);
    chart2.showAsModal();
    chart2.unlock();
  });

});