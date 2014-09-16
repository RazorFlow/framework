StandaloneDashboard(function (db) {
  var chart = new ChartComponent ();

  chart.setDimensions (4, 4);
  chart.setCaption ('1000');
  chart.setLabels (['a', 'b', 'c', 'd', 'e']);
  chart.addSeries ('a', 'A', [1000, 800, 500, 480, 500]);

  db.addComponent (chart);
});
