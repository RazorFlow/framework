StandaloneDashboard(function (db) {

    // The test uses random values to test the performance of the chart

    var aMax = Math.random() * 1000,
        bMax = Math.random() * 1000,
        aData = [],
        bData = [];

    for(var i=-1; ++i<5;) {
        aData[i] = Math.floor(Math.random() * aMax);
        bData[i] = Math.floor(Math.random() * bMax);
    }

    var negate = function(arr) {
        return _.map(arr, function(item) {
            return -item;
        });
    }

    var mix = function(arr) {
        return _.map(arr, function(item) {
            var val = Math.random() * 100 > 50 ? -1 : 1;
            return item * val;
        });
    }

    console.log(aData, bData);

    var c1 = new ChartComponent();
    c1.setCaption("Both +ve");
    c1.setDimensions(4, 4);
    c1.setLabels(['January', 'February', 'March', 'April', 'May']);
    c1.addSeries("seriesA", "Series A", aData, {seriesDisplayType: 'column', numberPrefix: '$'});
    c1.addSeries("seriesB", "Series B", bData, {seriesDisplayType: 'column', numberPrefix: '$', yAxis: 'quantity'});
    c1.setYAxis("Stock", {
        numberPrefix: '$'
    });
    c1.addYAxis('quantity', "Quantity", {
        numberPrefix: '#'
    });
 
    db.addComponent(c1);

    var c2 = new ChartComponent();
    c2.setCaption("left -ve");
    c2.setDimensions(4, 4);
    c2.setLabels(['January', 'February', 'March', 'April', 'May']);
    c2.addSeries("seriesA", "Series A", negate(aData), {seriesDisplayType: 'column', numberPrefix: '$'});
    c2.addSeries("seriesB", "Series B", bData, {seriesDisplayType: 'column', numberPrefix: '$', yAxis: 'quantity'});
    c2.setYAxis("Stock", {
        numberPrefix: '$'
    });
    c2.addYAxis('quantity', "Quantity", {
        numberPrefix: '#'
    });
 
    db.addComponent(c2);

    var c3 = new ChartComponent();
    c3.setCaption("right -ve");
    c3.setDimensions(4, 4);
    c3.setLabels(['January', 'February', 'March', 'April', 'May']);
    c3.addSeries("seriesA", "Series A", aData, {seriesDisplayType: 'column', numberPrefix: '$'});
    c3.addSeries("seriesB", "Series B", negate(bData), {seriesDisplayType: 'column', numberPrefix: '$', yAxis: 'quantity'});
    c3.setYAxis("Stock", {
        numberPrefix: '$'
    });
    c3.addYAxis('quantity', "Quantity", {
        numberPrefix: '#'
    });
 
    db.addComponent(c3);

    var c4 = new ChartComponent();
    c4.setCaption("both -ve");
    c4.setDimensions(4, 4);
    c4.setLabels(['January', 'February', 'March', 'April', 'May']);
    c4.addSeries("seriesA", "Series A", negate(aData), {seriesDisplayType: 'column', numberPrefix: '$'});
    c4.addSeries("seriesB", "Series B", negate(bData), {seriesDisplayType: 'column', numberPrefix: '$', yAxis: 'quantity'});
    c4.setYAxis("Stock", {
        numberPrefix: '$'
    });
    c4.addYAxis('quantity', "Quantity", {
        numberPrefix: '#'
    });
 
    db.addComponent(c4);

    var c5 = new ChartComponent();
    c5.setCaption("Mixed");
    c5.setDimensions(4, 4);
    c5.setLabels(['January', 'February', 'March', 'April', 'May']);
    c5.addSeries("seriesA", "Series A", mix(aData), {seriesDisplayType: 'column', numberPrefix: '$'});
    c5.addSeries("seriesB", "Series B", mix(bData), {seriesDisplayType: 'column', numberPrefix: '$', yAxis: 'quantity'});
    c5.setYAxis("Stock", {
        numberPrefix: '$'
    });
    c5.addYAxis('quantity', "Quantity", {
        numberPrefix: '#'
    });
 
    db.addComponent(c5);
});
