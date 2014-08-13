StandaloneDashboard(function (tdb) {
    var _ = rf._;
	tdb.setTabbedDashboardTitle("Tabbed Dashboard");

	// Dashboard 1 
	var db1 = new Dashboard();
	db1.setDashboardTitle('Table In Razorfow');
    
    var c1 = new TableComponent();
    c1.setDimensions(12, 6);
    c1.setCaption('List of items in stock');
    c1.addColumn('ProductID', 'Product ID');
    c1.addColumn('ProductName', 'Product Name');
    c1.addColumn('CategoryName', 'Category');
    c1.addColumn('UnitPrice', 'Price', {
        dataType: "number",
        numberPrefix: "$",
        numberForceDecimals: true,
        numberDecimalPoints: 2
    });
    c1.addColumn('UnitsInStock', 'Stock', {
        dataType: "number"
    });
    c1.addColumn('Discontinued', 'Discontinued?');
    c1.lock();
    db1.addComponent(c1);

    $.ajax({
        url: '/static/fixtures/products.json',
        type: 'GET',
        success: function(products) {
            if (_.isString(products)) {
                products = JSON.parse(products);
            }
            for(var i=-1; ++i<products.length;) {
                c1.addRow(products[i], {});
            }
            c1.unlock();
        }
    });


	// Dashboard 2
    var db2 = new Dashboard('db2');

    db2.setDashboardTitle('KPI Types Supported in RazorFlow');

    var c2 = new KPIComponent();
    c2.setDimensions(4, 2);
    c2.setCaption('Average Monthly Sales');
    c2.setValue(513.22, {
        numberPrefix: '$'
    });
    db2.addComponent(c2);

    var c3 = new KPIComponent();
    c3.setDimensions(4, 2);
    c3.setCaption('Average Monthly Units');
    c3.setValue(22);
    c3.setSparkValues(['Jan', "Feb", 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], 
                        [12.31, 10.34, 10.26, 9, 8.21, 13.41, 14.43, 23.31, 13.41, 11.4, 28.34, 29.21]);
    db2.addComponent(c3);


	tdb.addDashboardTab(db1, {
        title: 'Table Dashboard'
    });
	tdb.addDashboardTab(db2, {
        active: true
    });

}, {tabbed: true});