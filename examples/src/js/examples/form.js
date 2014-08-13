rf.StandaloneDashboard(function (db) {
    var c1 = new FormComponent();
    c1.setDimensions(6,6);
    c1.setCaption('Test Form Component');

    c1.addTextField('name', 'Name');
    c1.addSelectField('products', 'Products', ['Beverages', 'Chips', 'Cookies', 'Cakes', 'Dairy Products', 'Poultry'], {});
    c1.addMultiSelectField('cities', 'Cities', ['Bangalore', 'San Fransisco', 'New York', 'Melbourne', 'London', 'Rio De Jeneiro'], {});
    c1.addDateField('delivery_date', 'Delivery Date', {});
    c1.addDateRangeField('grace_period', 'Grace Period', {});
    c1.addNumericRangeField('units', 'Units in Stock', [0, 50], {
      largeStep: 20
    });

    db.addComponent(c1);

    c1.onApplyClick(function() {
        console.log('Name: ' + c1.getInputValue('name'));
        console.log('Products: ' , c1.getInputValue('products'));
        console.log('Cities: ' , c1.getInputValue('cities'));
        console.log('Delivery Date: ' + c1.getInputValue('delivery_date'));
        console.log('Grace Period: ' + c1.getInputValue('grace_period'));
        console.log('Units: ' , c1.getInputValue('units'));
    });
});
