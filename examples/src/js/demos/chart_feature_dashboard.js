StandaloneDashboard(function (db) {
    db.setDashboardTitle('Chart Types Supported in Razorflow');

    var c1 = new ChartComponent();
    c1.setDimensions(6,4);
    c1.setCaption('Top 10 Genres by sales');
    c1.setLabels(['Rock', 'Latin', 'Metal', 'Alternative & Punk', 'TV Shows', 'Jazz', 'Blues', 'Drama', 'R&B/Soul', 'Classical']);
    c1.addSeries('sales', 'Sales', [826.25, 382.14, 261.36, 241.56, 93.53, 79.20, 60.39, 57.71, 40.59, 40.59]);
    c1.setYAxis('', {numberPrefix: '$'});
    db.addComponent(c1);

    var c2 = new ChartComponent();
    c2.setDimensions(6,4);
    c2.setCaption('Units By Year');
    c2.setLabels(['2007', '2008', '2009', '2010', '2011']);
    c2.addSeries('units', 'Units', [454, 455, 236, 195, 442], {
        seriesDisplayType: 'line'
    });
    db.addComponent(c2);

    var stackedChart = new ChartComponent();
    stackedChart.setDimensions (6, 4);
    stackedChart.setCaption("Stacked category sales");   
    stackedChart.setLabels (["Jan", "Feb", "Mar"]);
    stackedChart.setYAxis("", {
        numberPrefix: "$"
    });
    stackedChart.addSeries ("beverages", "Beverages", [1355, 1916, 1150], {
        seriesStacked: true,
        seriesDisplayType: "column"
    });
    stackedChart.addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321], {
        seriesStacked: true,
        seriesDisplayType: "column"
    });
    stackedChart.addSeries ("vegetables", "Vegetables", [1313, 1976, 924], {
        seriesStacked: true,
        seriesDisplayType: "column"
    });
    db.addComponent (stackedChart);  

    var c3 = new ChartComponent();
    c3.setDimensions(6,4);
    c3.setCaption('Unit Distribution By Genre');
    c3.setLabels(['Rock', 'Jazz', 'Blues', 'Metal', 'Latin']);
    c3.addSeries('sales', 'Sales', [46.16, 4.42, 13.49, 14.59, 21.34], {
        seriesDisplayType: 'pie',
        numberSuffix: '%'
    });
    db.addComponent(c3);


    var c4 = new ChartComponent();
    c4.setDimensions(6, 4);
    c4.setCaption('Yearly Sales for Top 5 Genres');
    c4.setLabels(['2007', '2008', '2009', '2010', '2011']);
    c4.addSeries('rock', 'Rock', [178.20, 155.43, 161.37, 157.41, 174.24], {numberPrefix: "$"});
    c4.addSeries('latin', 'Latin', [82.17, 77.22, 80.19, 63.36, 79.20], {numberPrefix: "$"});
    c4.addSeries('metal', 'Metal', [61.38, 53.46, 30.69, 80.39, 44.45], {numberPrefix: "$"});
    c4.addSeries('blues', 'Blues', [62.37, 59.60, 45.54, 38.61, 5.94], {numberPrefix: "$"});
    c4.addSeries('jazz', 'Jazz', [174.24, 79.20, 55.45, 55.44, 21.78], {numberPrefix: "$"});
    // c4.setYAxis('', {numberPrefix: '$'});
    db.addComponent(c4);

    var c5 = new ChartComponent();
    c5.setDimensions(6, 4);
    c5.setCaption('Revenue by year');
    c5.setLabels(['2007', '2008', '2009', '2010', '2011']);
    c5.addSeries('revenueUS', 'Revenue in US', [449.46, 481.45, 483.44, 463.67, 450.58], {
        numberPrefix: '$'
    });
    c5.addSeries('revenueUK', 'Revenue in UK', [454, 455, 456, 433, 442], {
        seriesDisplayType: 'line',
        numberPrefix: '$'
    });
    // c5.setYAxis('', {numberPrefix: '$'});
    db.addComponent(c5);

});