
StandaloneDashboard(function (db) {
    var c1 = new TableComponent();
    c1.setCaption('Sales')
    c1.setDimensions(8, 6);
    c1.addColumn('name', 'Name', {

    });
    c1.addColumn('branch', 'Branch', {

    });
    c1.addColumn('unitsSold', 'Units Sold which is sold and sold', {
        textAlign: 'right'
    });
    c1.addColumn('sales', 'Sales', {
        dataType: 'number',
        numberPrefix: '$',
        textAlign: 'right',
        subCaption: true
    });
    c1.addColumn('inventory', 'Inventory', {
        "dataType": "number"
    });
    c1.addColumn('date', 'Date', {

    }); 
    c1.addSparkColumn ("spark", "spark", {

    });

    var c2 = new TableComponent();
    c2.setCaption('Sales')
    c2.setDimensions(4, 4);
    c2.addColumn('name', 'Name', {

    });
    c2.addColumn('branch', 'Branch', {

    });
    c2.addColumn('unitsSold', 'Units Sold which is sold and sold', {

    });
    c2.addColumn('sales', 'Sales', {
        numberPrefix: '$'
    });
    c2.addColumn('inventory', 'Inventory', {

    });
    c2.addColumn('date', 'Date', {

    }); 
    c2.addSparkColumn ("spark", "spark", {

    });

    var products = ['long title which goes on and on and on','iPod', 'iPhone 4s', 'iPhone 5', 'iPad mini', 'iPad 3', 'Macbook pro', 'Mac mini', 'iMac'];

    var prices = [50000000000000000, 1.20000, 449, 699, 499, 799, 1299, 899, 1499];

    var branches = ['JP Nagar which is big', 'JP Nagar', 'Kormanagala', 'Jayanagar', 'ECity', 'Madiwala', 'WhiteField', 'Shivajinagar'];

    var today = (new Date()).getDate();

    var multiple = [];

    for(var i=-1; ++i<1;) { 
        for(var j=-1; ++j<branches.length;) {
            var branch = branches[j];
            for(var k=-1; ++k<products.length;) {
                var product = products[k];
                var _units = Math.floor(Math.random() * 300);
                var _sales = prices[k] * _units;
                c1.addRow({
                    name: product,
                    branch: branch,
                    unitsSold: _units,
                    sales: _sales,
                    inventory: Math.floor(Math.random() * 300),
                    date: '2014-1-' + (i+1),
                    spark: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
                });

                multiple.push({
                    name: product,
                    branch: branch,
                    unitsSold: _units,
                    sales: _sales,
                    inventory: Math.floor(Math.random() * 300),
                    date: '2014-1-' + (i+1),
                    spark: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
                });
            }
        }
    }

    c1.setRowsPerPage(20);
    c2.addMultipleRows(multiple);

    db.addComponent(c1);
    db.addComponent(c2);
});