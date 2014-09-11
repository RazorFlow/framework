StandaloneDashboard(function (db) {
    var labels = [];
    var data = [];

    for(var i=-1; ++i<31;) {
        labels[i] = (i+1) + ' Nov 2014';
        data[i] = Math.floor(Math.random() * 200);
    }

    var c1 = new ChartComponent();
    c1.setCaption("Sales");
    c1.setDimensions(4, 4);
    c1.setLabels(labels);
    c1.addSeries("sales", "Sales", data, {seriesDisplayType: 'column', numberPrefix: '$'});
    db.addComponent (c1);

    var c2 = new ChartComponent();
    c2.setCaption("Sales");
    c2.setDimensions(4, 4);
    c2.setLabels(labels);
    c2.addSeries("sales", "Sales", data, {seriesDisplayType: 'column', numberPrefix: '$'});
    c2.setLabelStep (5);
    db.addComponent (c2);
});
