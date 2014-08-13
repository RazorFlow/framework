StandaloneDashboard(function (db) {
    db.setDashboardTitle('KPI Types Supported in RazorFlow');

    var c1 = new KPIComponent();
    c1.setDimensions(4, 2);
    c1.setCaption('Average Monthly Sales');
    c1.setValue(513.22, {
        numberPrefix: '$'
    });
    c1.setValueIcon('arrow-circle-o-up', {color: '#2a2'});
    db.addComponent (c1);

    var c2 = new ChartComponent();
    c2.setCaption ("Column Chart");
    c2.setComponentIcon("star");
    c2.setDimensions(4,4);
    c2.setLabels(['January', 'February', 'March', 'April', 'May']);
    c2.addSeries("seriesA", 4234, [1, 3, 5, 1, 9])
    c2.addSeries("seriesB", "Series B", [3, 1, 9, 2, 3])
    
    db.addComponent(c2);


    var c3 = new TableComponent();
    c3.setDimensions(12, 6);
    c3.setCaption('List of items in stock');
    c3.addColumn('ProductID', 'Product ID');
    c3.addColumn('ProductName', 'Product Name');
    c3.addColumn('CategoryName', 'Category');
    c3.addColumn('UnitPrice', 'Price', {
        dataType: "number",
        numberPrefix: "$",
        numberForceDecimals: true,
        numberDecimalPoints: 2
    });
    c3.addColumn('UnitsInStock', 'Stock');
    c3.addColumn('Discontinued', 'Discontinued?', {
        dataType: "icon"
    });
    c3.lock();
    db.addComponent(c3);

    $.ajax({
        url: '/static/fixtures/products.json',
        type: 'GET',
        success: function(products) {
            if (_.isString(products)) {
                products = JSON.parse(products);
            }
            for(var i=-1; ++i<products.length;) {
                products[i].Discontinued = products[i].Discontinued > 0 ? 'check' : 'times';
                c3.addRow(products[i], {});
            }
            c3.unlock();
        }
    }); 
});