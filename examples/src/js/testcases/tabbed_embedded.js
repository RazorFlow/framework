var tdb = new TabbedDashboard(),
	db1 = new Dashboard(),
	db2 = new Dashboard();

db1.setDashboardTitle('Dashboard 1');
db2.setDashboardTitle('Dashboard 2');

var c1 = new ChartComponent();
c1.setCaption("Column Chart");
c1.setDimensions(4, 4);
c1.setLabels(['January', 'February', 'March', 'April', 'May']);
c1.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'area', numberPrefix: '$'});

var c2 = new ChartComponent();
c2.setCaption("Column Chart multi-series");
c2.setDimensions(4, 4);
c2.setLabels(['January', 'February', 'March', 'April', 'May']);
c2.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {seriesDisplayType: 'area', numberPrefix: '$'});
c2.addSeries("seriesB", "Series B", [9, 1, 5, 3, 1], {seriesDisplayType: 'area', numberPrefix: '$'});

db1.addComponent(c1);
db2.addComponent(c2);

tdb.addDashboardTab(db1);
tdb.addDashboardTab(db2);

tdb.embedTo("dbTarget");