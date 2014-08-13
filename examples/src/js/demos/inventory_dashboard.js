StandaloneDashboard(function (db) {
    var _ = rf._;

    var randomGen = function(num, max) {
        var arr = [];
        for(var i=-1; ++i<num;) arr.push(Math.floor(Math.random() * max));
        return arr;
    };


    var getProductInventory = function(list, category) {
        var products = _.where(list, {'CategoryName': category});
        var total = _.reduce(products, function(mem, num) {
            var _mem = typeof mem === 'object' ? +mem.UnitsInStock : mem; 
            return _mem + (+num.UnitsInStock);
        });
        return total;
    };

    var getProductValue = function(list, category) {
        var products = _.where(list, {'CategoryName': category});
        var total = _.reduce(products, function(mem, num) {
            var _mem = typeof mem === 'object' ? +mem.UnitsInStock * +mem.UnitPrice : mem; 
            return Math.floor(_mem + (+num.UnitsInStock * +num.UnitPrice));
        });
        return total;
    };
    
    var categories = ['Beverages', 'Condiments', 'Confections', 'Dairy Products', 'Grains/Cereal', 'Meat/Poultry', 'Produce', 'Seafood'];
    // db.setDashboardTitle('Inventory Dashboard');

    var c1 = new KPIComponent();
    c1.setDimensions(3,2);
    c1.setCaption('Beverages');
    db.addComponent(c1);
    c1.lock();

    var c2 = new KPIComponent();
    c2.setDimensions(3,2);
    c2.setCaption('Condiments');
    db.addComponent(c2);
    c2.lock();

    var c3 = new KPIComponent();
    c3.setDimensions(3,2);
    c3.setCaption('Confections');
    db.addComponent(c3);
    c3.lock();

    var c4 = new KPIComponent();
    c4.setDimensions(3,2);
    c4.setCaption('Dairy Products');
    db.addComponent(c4);
    c4.lock();

    var c5 = new KPIComponent();
    c5.setDimensions(3,2);
    c5.setCaption('Grains/Cereals');
    db.addComponent(c5);
    c5.lock();

    var c6 = new KPIComponent();
    c6.setDimensions(3,2);
    c6.setCaption('Meat/Poultry');
    db.addComponent(c6);
    c6.lock();

    var c7 = new KPIComponent();
    c7.setDimensions(3,2);
    c7.setCaption('Produce');
    db.addComponent(c7);
    c7.lock();

    var c8 = new KPIComponent();
    c8.setDimensions(3,2);
    c8.setCaption('Seafood');
    db.addComponent(c8);
    c8.lock();

    var c9 = new ChartComponent();
    c9.setDimensions(6,6);
    c9.setCaption('Distribution of inventory by units');
    c9.setLabels(categories);
    c9.lock();
    db.addComponent(c9);

    var c10 = new ChartComponent();
    c10.setDimensions(6,6);
    c10.setCaption('Distribution of inventory by value');
    c10.setLabels(categories);
    c10.lock();
    db.addComponent(c10);

    var c11 = new TableComponent();
    c11.setDimensions(6, 6);
    c11.setCaption('List of items in stock');
    c11.addColumn('ProductID', 'Product ID');
    c11.addColumn('ProductName', 'Product Name');
    c11.addColumn('CategoryName', 'Category');
    c11.addColumn('UnitPrice', 'Price', {
        dataType: "number",
        numberPrefix: "$",
        numberForceDecimals: true,
        numberDecimalPoints: 2
    });
    c11.addColumn('UnitsInStock', 'Stock');
    c11.addColumn('Discontinued', 'Discontinued?');
    c11.lock();
    db.addComponent(c11);

    var c12 = new FormComponent();
    c12.setDimensions(6, 6);
    c12.setCaption('Form items in stock');
    c12.addSelectField('category', 'Select Category', ['No Selection'].concat(categories));
    c12.addTextField('contains', 'Product Name Contains');
    c12.addNumericRangeField('stock', 'Units In Stock');
    c12.addCheckboxField('discontinued', 'Exclude Discontinued Items', false);
    db.addComponent(c12);

    $.ajax({
        url: '/static/fixtures/products.json',
        type: 'GET',
        success: function(products) {
            if (_.isString(products)) {
                products = JSON.parse(products);
            }
            var inventory = [getProductInventory(products, 'Beverages'), getProductInventory(products, 'Condiments'),
                                getProductInventory(products, 'Confections'), getProductInventory(products, 'Dairy Products'),
                                getProductInventory(products, 'Grains/Cereals'), getProductInventory(products, 'Meat/Poultry'),
                                getProductInventory(products, 'Produce'), getProductInventory(products, 'Seafood')];
            var value = [getProductValue(products, 'Beverages'), getProductValue(products, 'Condiments'),
                                getProductValue(products, 'Confections'), getProductValue(products, 'Dairy Products'),
                                getProductValue(products, 'Grains/Cereals'), getProductValue(products, 'Meat/Poultry'),
                                getProductValue(products, 'Produce'), getProductValue(products, 'Seafood')];

            c1.setValue(inventory[0], {
                numberSuffix: ' units'
            });
            c1.unlock();

            c2.setValue(inventory[1], {
                numberSuffix: ' units'
            });
            c2.unlock();

            c3.setValue(inventory[2], {
                numberSuffix: ' units'
            });
            c3.unlock();

            c4.setValue(inventory[3], {
                numberSuffix: ' units'
            });
            c4.unlock();

            c5.setValue(inventory[4], {
                numberSuffix: ' units'
            });
            c5.unlock();

            c6.setValue(inventory[5], {
                numberSuffix: ' units'
            });
            c6.unlock();

            c7.setValue(inventory[6], {
                numberSuffix: ' units'
            });
            c7.unlock();

            c8.setValue(inventory[7], {
                numberSuffix: ' units'
            });
            c8.unlock();

            c9.addSeries('inventory', 'Inventory', inventory, {seriesDisplayType: 'pie'});
            c9.unlock();
            

            c10.addSeries('inventory', 'Inventory', value, {seriesDisplayType: 'pie'});
            c10.unlock();


            for(var i=-1; ++i<products.length;) {
                c11.addRow(products[i], {});
            }
            
            c11.unlock();

            c12.onApplyClick(function() {
                var values = c12.getAllInputValues();
                var rows = products;
                
                if(values.category.index != 0) {
                    rows = _.where(rows, {'CategoryName': values.category.text});
                }

                if(values.contains !== '') {
                    rows = _.filter(rows, function(item) {
                        return item.ProductName.match(values.contains) !== null;
                    });
                }

                if(values.discontinued) {
                    rows = _.where(rows, {'Discontinued': '0'});
                }

                if(_.isNumber(values.stock[0]) && _.isNumber(values.stock[1])) {
                    rows = _.filter(rows, function(item) {
                        return (+item.UnitsInStock) >= values.stock[0] && (+item.UnitsInStock) <= values.stock[1]; 
                    });
                }

                c11.clearRows();
                
                for(var i=-1; ++i<rows.length;) {
                    c11.addRow(rows[i], {});
                }

            });
        }
    });
    
});