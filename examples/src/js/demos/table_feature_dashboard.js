StandaloneDashboard(function (db) {
    var _ = rf._;
    db.setDashboardTitle('Table In Razorfow');
    
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
    db.addComponent(c1);

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
});