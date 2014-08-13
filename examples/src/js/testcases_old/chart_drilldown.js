rf.StandaloneDashboard(function(db){

    var data = [];
    var startDate = new Date('1 Jan 2011');

    while(startDate.getTime() !== (new Date('1 Jan 2014')).getTime()) {
        var obj = {};
        obj['id'] = 'iphone';
        obj['name'] = 'iPhone';
        obj['sales'] = Math.floor(Math.random() * 100);
        obj['date'] = new Date(startDate.getTime());
        data.push(obj);
        startDate.setDate(startDate.getDate() + 1);
    }
    startDate = new Date('1 Jan 2011');
    while(startDate.getTime() !== (new Date('1 Jan 2014')).getTime()) {
        var obj = {};
        obj['id'] = 'ipad';
        obj['name'] = 'iPad';
        obj['sales'] = Math.floor(Math.random() * 100);
        obj['date'] = new Date(startDate.getTime());
        data.push(obj);
        startDate.setDate(startDate.getDate() + 1);
    }

    var labels = ['2011', '2012', '2013'];
    var iphone = _.filter(data, function(item) {
        return item.id === 'iphone';
    });
    var ipad = _.filter(data, function(item) {
        return item.id === 'ipad';
    });

    var aggregateYearlyData = function(rows, year) {
        var yearData = _.filter(rows, function(item) {
            return item.date.getFullYear() === year;
        });

        var yearSales = _.pluck(yearData, 'sales');

        return _.reduce(yearSales, function(mem, item) {
            return mem + item;
        }, 0);
    };

    var aggregateMonthlyData = function(rows, year, month) {
        var monthData = _.filter(rows, function(item) {
            return  item.date.getFullYear() === year && item.date.getMonth() === month;
        });

        var monthSales = _.pluck(monthData, 'sales');

        return _.reduce(monthSales, function(mem, item) {
            return mem + item;
        }, 0);
    };

    var iphoneYearly = [aggregateYearlyData(iphone, 2011), aggregateYearlyData(iphone, 2012), aggregateYearlyData(iphone, 2013)];
    var ipadYearly = [aggregateYearlyData(ipad, 2011), aggregateYearlyData(ipad, 2012), aggregateYearlyData(ipad, 2013)];
    

    // Create the chart and cofigure the starting params
    var chart = new ChartComponent('someid');
    chart.setDimensions (8, 8);
    chart.setCaption("Sales Trends");  
    chart.setLabels (labels)
    chart.addSeries("iphone", "iPhone", iphoneYearly);
    chart.addSeries("ipad", "iPad", ipadYearly); 
    
    var drillYear = null,
        drillMonth = null,
        monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Add drill step
    chart.addDrillStep(function(done, params, updatedComponent) {
        var year = +params.label;
        var iphoneData = [];
        var ipadData = [];

        for(var i=-1; ++i<12;) {
            iphoneData.push(aggregateMonthlyData(iphone, year, i));
            ipadData.push(aggregateMonthlyData(ipad, year, i));
        }
        updatedComponent.setLabels(monthLabels);
        updatedComponent.addSeries('iphone', 'iPhone', iphoneData);
        updatedComponent.addSeries('ipad', 'iPad', ipadData);
        drillYear = year;
        done();
    });

    chart.addDrillStep(function(done, params, updatedComponent) {
        var month = monthLabels.indexOf(params.label),
            year = drillYear;

        var iphoneData = _.pluck(_.filter(iphone, function(item) {
            return  item.date.getFullYear() === year && item.date.getMonth() === month;
        }), 'sales');
        var ipadData = _.pluck(_.filter(ipad, function(item) {
            return  item.date.getFullYear() === year && item.date.getMonth() === month;
        }), 'sales');

        var newLabels = [];

        for(var i=-1; ++i<iphoneData.length;) {
            newLabels.push('' + (i+1));
        }
        updatedComponent.setLabels(newLabels);
        updatedComponent.addSeries('iphone', 'iPhone', iphoneData);
        updatedComponent.addSeries('ipad', 'iPad', ipadData);
        drillMonth = month;
        done();
    });

    db.addComponent (chart);
});