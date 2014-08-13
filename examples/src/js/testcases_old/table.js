
StandaloneDashboard(function (db) {
    var c1 = new TableComponent();
    c1.setCaption('Sales')
    c1.setDimensions(8, 6);
    c1.addColumn('name', 'Name', {

    });
    c1.addColumn('branch', 'Branch', {

    });
    c1.addColumn('unitsSold', 'Units Sold', {

    });
    c1.addColumn('sales', 'Sales', {
        numberPrefix: '$'
    });
    c1.addColumn('inventory', 'Inventory', {

    });
    c1.addColumn('date', 'Date', {

    }); 

    window.sampleData = [];

    var products = ['iPod', 'iPhone 4s', 'iPhone 5', 'iPad mini', 'iPad 3', 'Macbook pro Macbook pro Macbook pro Macbook pro Macbook pro', 'Mac mini', 'iMac'];

    var prices = [399, 449, 699, 499, 799, 1299, 899, 1499];

    var branches = ['JP Nagar', 'Kormanagala', 'Jayanagar', 'ECity', 'Madiwala', 'WhiteField', 'Shivajinagar'];

    var today = (new Date()).getDate();

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
                    date: '2014-1-' + (i+1)
                });
            }
        }
    }

    db.addComponent(c1);

    var c3 = new TableComponent();
    c3.setDimensions(4, 4);
    c3.setRowsPerPage('10');
    c3.setCaption("table component");
    for (var i = 0; i < 5; i++) {
        c3.addColumn("a" + i, "Column A" + i, {
            dataType: "number",
            numberPrefix: "$"
        });
        c3.addColumn("b" + i, "Column B" + i, {
            dataType: "number",
            numberSuffix: "%"
        });
    }

    for (var i = 0; i < 85; i++) {
        var obj = {};
        for (var j = 0; j < 5; j++) {
            obj["a" + j] = Math.floor(Math.random
                    () * 10000);
            obj["b" + j] = Math.floor(Math.random() * 10000);
        }

        c3.addRow(obj);
    }
    db.addComponent(c3);

    var c2 = new TableComponent();
    c2.setDimensions(8, 6);
    c2.setRowsPerPage('10');
    c2.setCaption("table component");
    for (var i = 0; i < 5; i++) {
        // c2.addColumn("a" + i, "Column A" + i, {
        //     dataType: "number",
        //     numberPrefix: "$"
        // });
        // c2.addColumn("b" + i, "Column B" + i, {
        //     dataType: "number",
        //     numberSuffix: "%"
        // });
    }

    for (var i = 0; i < 85; i++) {
        var obj = {};
        for (var j = 0; j < 5; j++) {
            obj["a" + j] = Math.floor(Math.random
                    () * 10000);
            obj["b" + j] = Math.floor(Math.random() * 10000);
        }

        c2.addRow(obj);
    }
    db.addComponent(c2);

    

    var c4 = new TableComponent();
    c4.setCaption('Sales')
    c4.setDimensions(4, 4);
    c4.addColumn('name', 'Name', {

    });
    c4.addColumn('branch', 'Branch', {

    });
    c4.addColumn('unitsSold', 'Units Sold', {

    });
    c4.addColumn('sales', 'Sales', {
        numberPrefix: '$'
    });
    c4.addColumn('inventory', 'Inventory', {

    });
    c4.addColumn('date', 'Date', {

    }); 

    window.sampleData = [];

    var products = ['iPod', 'iPhone 4s', 'iPhone 5', 'iPad mini', 'iPad 3', 'Macbook pro Macbook pro Macbook pro Macbook pro Macbook pro', 'Mac mini', 'iMac'];

    var prices = [399, 449, 699, 499, 799, 1299, 899, 1499];

    var branches = ['JP Nagar', 'Kormanagala', 'Jayanagar', 'ECity', 'Madiwala', 'WhiteField', 'Shivajinagar'];

    var today = (new Date()).getDate();

    for(var i=-1; ++i<1;) { 
        for(var j=-1; ++j<branches.length;) {
            var branch = branches[j];
            for(var k=-1; ++k<products.length;) {
                var product = products[k];
                var _units = Math.floor(Math.random() * 300);
                var _sales = prices[k] * _units;
                c4.addRow({
                    name: product,
                    branch: branch,
                    unitsSold: _units,
                    sales: _sales,
                    inventory: Math.floor(Math.random() * 300),
                    date: '2014-1-' + (i+1)
                });
            }
        }
    }

    db.addComponent(c4);
});