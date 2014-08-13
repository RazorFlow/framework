
StandaloneDashboard(function (db) {
    var c1 = new ChartComponent();
    c1.setCaption("Wide Chart");
    c1.setDimensions(9, 4);
    c1.setLabels(['January', 'February', 'March', 'April', 'May'])
    c1.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9])
    c1.addSeries("seriesB", "Series B", [3, 1, 9, 2, 3])
    db.addComponent(c1);

    var c2 = new ChartComponent();
    c2.setCaption("Narrow Chart");
    c2.setDimensions(3, 4);
    c2.setLabels(['January', 'February', 'March', 'April', 'May'])
    c2.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9])
    c2.addSeries("seriesB", "Series B", [3, 1, 9, 2, 3])
    db.addComponent(c2);

    var c3 = new ChartComponent();
    c3.setCaption("long labels short words");
    c3.setDimensions(4, 4);
    c3.setLabels(['The quick brown fox jumps', 'over the lazy dogs while', 'the tiny cars are going', 'all over the road in', 'May'])
    c3.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9])
    c3.addSeries("seriesB", "Series B", [3, 1, 9, 2, 3])
    db.addComponent(c3);

    var c3 = new ChartComponent();
    c3.setCaption("short words but one long one");
    c3.setDimensions(4, 4);
    c3.setLabels(['The quick brown fox jumps', 'over mountaineeringistic while', 'the tiny cars are going', 'all over the road in', 'May'])
    c3.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9])
    c3.addSeries("seriesB", "Series B", [3, 1, 9, 2, 3])
    db.addComponent(c3);

    var c4 = new ChartComponent();
    c4.setCaption("Multiple long words");
    c4.setDimensions(4, 4);
    c4.setLabels(['The quick creamdachshund jumps', 'over mountaineeringistic while', 'the tiny cars are going', 'all over the road in', 'May'])
    c4.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9])
    c4.addSeries("seriesB", "Series B", [3, 1, 9, 2, 3])
    db.addComponent(c4);

    var c5 = new ChartComponent();
    c5.setCaption("Long series names");
    c5.setDimensions(4, 4);
    c5.setLabels(['January', 'February', 'March', 'April', 'May'])
    c5.addSeries("seriesA", "Enterprise factory sales of product XYZ in 2010 to teenagers with dandruff powered by node.js", [1, 3, 5, 1, 9])
    c5.addSeries("seriesB", "Series B", [3, 1, 9, 2, 3])
    db.addComponent(c5);

    var c6 = new ChartComponent();
    c6.setCaption("Multiple series");
    c6.setDimensions(4, 4);
    c6.setLabels(['January', 'February', 'March', 'April', 'May'])
    c6.addSeries("series1", "Series B", [3, 1, 9, 2, 3])
    c6.addSeries("series2", "Series B", [3, 1, 9, 2, 3])
    c6.addSeries("series3", "Series B", [3, 1, 9, 2, 3])
    c6.addSeries("series4", "Series B", [3, 1, 9, 2, 3])
    c6.addSeries("series5", "Series B", [3, 1, 9, 2, 3])
    db.addComponent(c6);

    var c7 = new ChartComponent();
    c7.setCaption("Multiple long series names");
    c7.setDimensions(4, 4);
    c7.setLabels(['January', 'February', 'March', 'April', 'May'])
    c7.addSeries("series1", "Enterprise factory sales of product XYZ", [1, 3, 5, 1, 9])
    c7.addSeries("series2", "Enterprise factory sales of product XYZ", [1, 3, 5, 1, 9])
    c7.addSeries("series3", "Enterprise factory sales of product XYZ", [1, 3, 5, 1, 9])
    c7.addSeries("series4", "Enterprise factory sales of product XYZ", [1, 3, 5, 1, 9])
    c7.addSeries("series5", "Enterprise factory sales of product XYZ", [1, 3, 5, 1, 9])
    db.addComponent(c7);
});