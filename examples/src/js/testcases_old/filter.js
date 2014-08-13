
StandaloneDashboard(function (db) {
    var c1 = new FormComponent();
    c1.setDimensions(4,4);
    c1.setCaption('Test Form Component');

    c1.addTextField('name', 'Name');
    c1.addSelectField('products', 'Products', ['Beverages', 'Chips', 'Cookies', 'Cakes', 'Dairy Products', 'Poultry'], {});
    c1.addMultiSelectField('cities', 'Cities', ['Bangalore', 'San Fransisco', 'New York', 'Melbourne', 'London', 'Rio De Jeneiro'], {});
    c1.addDateField('delivery_date', 'Delivery Date', {});
    c1.addDateRangeField('grace_period', 'Grace Period', {});
    c1.addNumericRangeField('units', 'Units in Stock');

    db.addComponent(c1);

    var button = $('<button/>').text('Test');
    $('body').append(button);
    button.on('click', function() {
        var inputValues = c1.getAllInputValues();
        debugger
    });
});