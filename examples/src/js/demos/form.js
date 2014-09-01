StandaloneDashboard(function (db) {
    var form = new FormComponent ();
    form.setDimensions (8, 6);
    form.setCaption ('Form items in stock');
    form.addSelectField ('category', 'Select Category', ['No Selection', 'Beverages', 'Condiments', 'Confections', 'Dairy Products', 'Grains/Cereal', 'Meat/Poultry', 'Produce', 'Seafood']);
    form.addTextField ('contains', 'Product Name Contains');
    form.addNumericRangeField('stock', 'Units In Stock');
    form.addCheckboxField('discontinued', 'Exclude Discontinued Items', false);
    db.addComponent(form);
});