StandaloneDashboard(function (db) {
    var pieChart = new ChartComponent();
    pieChart.setDimensions(4,4);
    pieChart.setCaption('Pie Chart');
    pieChart.setOption('showPieValues', false);
    pieChart.setLabels (["2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020"]);
    pieChart.addSeries ("beverages", "Beverages", [1355, 1916, 1150, 1355, 1916, 1150, 1355, 1916, 1150, 1355, 1916, 1150], {seriesDisplayType: 'pie', numberSuffix: ' KB', numberHumanize: true});
    db.addComponent(pieChart);   
});