StandaloneDashboard(function (db) {
    db.setDashboardTitle('Form In RazorFlow');
    var _ = rf._;
    var categories = ['Beverages', 'Condiments', 'Confections', 'Dairy Products', 'Grains/Cereal', 'Meat/Poultry', 'Produce', 'Seafood'];
    var c1 = new TableComponent();
    c1.setDimensions(6, 6);
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
    c1.addColumn('UnitsInStock', 'Stock');
    c1.addColumn('Discontinued', 'Discontinued?');
    c1.lock();
    db.addComponent(c1);

    var c2 = new FormComponent();
    c2.setDimensions(6, 6);
    c2.setCaption('Form items in stock');
    c2.addSelectField('category', 'Select Category', ['No Selection'].concat(categories));
    c2.addTextField('contains', 'Product Name Contains');
    c2.addNumericRangeField('stock', 'Units In Stock');
    c2.addCheckboxField('discontinued', 'Exclude Discontinued Items', false);
    db.addComponent(c2);

    $.ajax({
        url: '/fixtures/products.json',
        type: 'GET',
        success: function(products) {
            if (_.isString(products)) {
                products = JSON.parse(products);
            }
            for(var i=-1; ++i<products.length;) {
                c1.addRow(products[i], {});
            }
            
            c1.unlock();

            c2.onApplyClick(function() {
                var values = c2.getAllInputValues();
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

                c1.clearRows();
                
                for(var i=-1; ++i<rows.length;) {
                    c1.addRow(rows[i], {});
                }

            });
        }
    });
    
});