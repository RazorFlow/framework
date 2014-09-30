var tdb = new TabbedDashboard(),
    db1 = new Dashboard(),
    db2 = new Dashboard();

db1.setDashboardTitle('Drill down Chart');
db2.setDashboardTitle('Column Chart');

var chart = new ChartComponent ('chart');
chart.setDimensions (4, 4);
chart.setCaption ('Annual Sales Summary (2010 - 2013)');
chart.setLabels (['2010', '2011', '2012', '2013']);
chart.addSeries ('sales', 'Sales', [1160000, 1040000, 1020000, 1160000]);

chart.setYAxis('Sales', {
    numberPrefix: '$',
    numberHumanize: true
});

var selectedYear;
var labelsForQuarters = {
    'Q1': ['January', 'February', 'March'],
    'Q2': ['April', 'May', 'June'],
    'Q3': ['July', 'August', 'September'],
    'Q4': ['October', 'November', 'December']
};
var yearData = {
    '2010': {
        'Q1': [110000, 76000, 88000],
        'Q2': [116000, 92000, 62000],
        'Q3': [114000, 86000, 11800],
        'Q4': [92000, 102000, 105000],
        data:  [274000, 270000, 318000, 299000]
    },
    '2011': {
        'Q1': [370000, 290000, 320000],
        'Q2': [370000, 290000, 320000],
        'Q3': [370000, 290000, 320000],
        'Q4': [370000, 290000, 320000],
        data: [306000, 203000, 270000, 264000]
    },
    '2012': {
        'Q1': [87000, 89000, 65000],
        'Q2': [13000, 44000, 106000],
        'Q3': [85000, 103000, 67000],
        'Q4': [59000, 69000, 113000],
        data: [241000, 280000, 255000, 241000]
    },
    '2013': {
        'Q1': [105000, 76000, 88000],
        'Q2': [116000, 92000, 62000],
        'Q3': [114000, 86000, 118000],
        'Q4': [92000, 102000, 105000],
        data: [269000, 270000, 318000, 299000]
    }
}

chart.addDrillStep (function (done, params, updatedComponent) {
    var label = selectedYear = params.label;
    updatedComponent.setLabels (['Q1', 'Q2', 'Q3', 'Q4']);
    updatedComponent.addSeries ('sales', 'Sales', yearData[label].data);
    done();
});

chart.addDrillStep (function (done, params, updatedComponent) {
    var label = params.label;
    updatedComponent.setLabels (labelsForQuarters[label]);
    updatedComponent.addSeries ('sales', 'Sales', yearData[selectedYear][label]);
    done();
});

var chart1 = new ChartComponent();
chart1.setCaption("Column Chart");
chart1.setDimensions(4, 4);
chart1.setLabels(['January', 'February', 'March', 'April', 'May']);
chart1.addSeries("seriesA", "Series A", [1, 3, 5, 1, 9], {numberPrefix: '$'});

db1.addComponent (chart);
db2.addComponent(chart1);

tdb.addDashboardTab(db1);
tdb.addDashboardTab(db2);

tdb.embedTo("dbTarget");