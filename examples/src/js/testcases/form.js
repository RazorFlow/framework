StandaloneDashboard(function (db) {
    var c1 = new FormComponent();
    c1.setDimensions(6, 6);
    c1.setCaption('Test Form Component');

    c1.addTextField('name', 'Name', {
        defaultText: "hello"
    });
    c1.addSelectField('products', 'Products', ['Beverages', 'Chips', 'Cookies', 'Cakes', 'Dairy Products', 'Poultry'], {defaultSelectedIndex: 2});
    c1.addMultiSelectField('cities', 'Cities', ['Bangalore', 'San Fransisco', 'New York', 'Melbourne', 'London', 'Rio De Jeneiro'], { defaultSelectedOptions: [2, 4] });
    c1.addDateField('delivery_date', 'Delivery Date', {});
    c1.addDateRangeField('grace_period', 'Grace Period', {});
    c1.addCheckboxField('international', 'International', {});
    c1.addNumericRangeField('units', 'Units in Stock');

    db.addComponent(c1);

    c1.onApplyClick(function() {
        console.log(c1.getAllInputValues());
    });

});