StandaloneDashboard(function (db) {

    console.log('RUnnign');
    var _ = rf._;

    var randomGen = function(num, max) {
        var arr = [];
        for(var i=-1; ++i<num;) arr.push(Math.floor(Math.random() * max));
        return arr;
    };

    function average (arr)
    {
        return _.reduce(arr, function(memo, num)
        {
            return memo + num;
        }, 0) / arr.length;
    }
    function sum (arr)
    {
        return _.reduce(arr, function(memo, num)
        {
            return memo + num;
        }, 0);
    }

    db.setDashboardTitle('Sales Dashboard');

    var c1 = new KPIComponent();
    c1.setDimensions(3,2);
    c1.setCaption('Number of checkouts in 24h');
    c1.setValue(324);
    db.addComponent(c1);

    var c2 = new KPIComponent();
    c2.setDimensions(3,2);
    c2.setCaption('Sales in last 24h');
    c2.setValue(47, {numberPrefix: '$'});
    db.addComponent(c2);

    var c3 = new KPIComponent();
    c3.setDimensions(3,2);
    c3.setCaption('Number of checkouts this week');
    c3.setValue(1024);
    db.addComponent(c3);

    var c4 = new KPIComponent();
    c4.setDimensions(3,2);
    c4.setCaption('Total sales this week');
    c4.setValue(245, {numberPrefix: '$'});
    db.addComponent(c4);


    var c5 = new ChartComponent();
    c5.setDimensions(6, 6);
    c5.setCaption('Sales per product category');
    c5.setLabels(['Beverages', 'Condiments', 'Dairy Products', 'Grains / Cereal', 'Meat / Poultry']);
    var salesData = randomGen(5, 40000).sort(function(a, b) {return a < b;});
    c5.addSeries('sales', 'Sales', salesData, {numberPrefix: "$"});
    c5.setYAxis('', {numberPrefix: '$'});
    c5.addComponentKPI ("average", {
        caption: "Average",
        value: average(salesData),
        numberPrefix: "$",
        numberHumanize: true,
        numberDecimalPoints: 1
    });

    c5.addComponentKPI ("total", {
        caption: "Total",
        value: sum(salesData),
        numberPrefix: "$",
        numberHumanize: true,
        numberDecimalPoints: 1
    });

    db.addComponent(c5);

    var employeeSalesData = [56500, 57590, 65820, 79960, 82030];
    var c6 = new ChartComponent();
    c6.setDimensions(6, 6);
    c6.setCaption('Sales per employee');
    c6.setLabels(['Robert', 'Margaret', 'Nancy', 'Andrew', 'Janet']);
    c6.addSeries('sales', 'Sales', employeeSalesData, {seriesDisplayType: 'column'});
    c6.setYAxis('', {numberPrefix: '$'});
    var avVal = average(employeeSalesData);
    c6.addComponentKPI ("average", {
        caption: "Average",
        value: avVal,
        numberPrefix: "$",
        numberHumanize: true,
        numberDecimalPoints: 1
    });

    c6.addComponentKPI ("total", {
        caption: "Total",
        value: sum(employeeSalesData),
        numberPrefix: "$",
        numberHumanize: true,
        numberDecimalPoints: 1
    });
    db.addComponent(c6);
    
    var c7 = new ChartComponent();
    c7.setCaption('Gender distribution of shoppers');
    c7.setDimensions(6, 6);
    c7.setLabels(['Female', 'Male']);
    c7.addSeries('gender', 'Gender', [58, 42], {
        seriesDisplayType: 'pie'
    }); 
    db.addComponent(c7);

    var c8 = new ChartComponent();
    c8.setCaption('Age group of shoppers');
    c8.setDimensions(6, 6);
    c8.setLabels(['Under 15', '15-30', '30-45', '45-60', '60+']);
    c8.addSeries('age', 'Age Group', [ 8, 28, 32, 22, 10], {seriesDisplayType: 'pie'});
    db.addComponent(c8);
 });