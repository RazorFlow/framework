
StandaloneDashboard(function (db) {
    db.setDashboardTitle('Inventory Dashboard');

    var c1 = new KPIComponent();
    c1.setDimensions(3,2);
    c1.setCaption('Beverages');
    c1.setValue(559, {
        numberSuffix: ' units'
    });
    c1.lock();
    db.addComponent(c1);

    var c2 = new KPIComponent();
    c2.setDimensions(3,2);
    c2.setCaption('Condiments');
    c2.setValue(507, {
        numberSuffix: ' units'
    });
    c2.lock();
    db.addComponent(c2);

    var c3 = new KPIComponent();
    c3.setDimensions(3,2);
    c3.setCaption('Confections');
    c3.setValue(386, {
        numberSuffix: ' units'
    });
    c3.lock();
    db.addComponent(c3);

    var c4 = new KPIComponent();
    c4.setDimensions(3,2);
    c4.setCaption('Dairy Products');
    c4.setValue(393, {
        numberSuffix: ' units'
    });
    c4.lock();
    db.addComponent(c4);

    setTimeout(function() {
        c1.unlock();
        c2.unlock();
        c3.unlock();
        c4.unlock();
    }, 3000);

    var $lock = $('<button/>').addClass('btn btn-primary').text('lock').on('click', function() {
        c1.lock();
        c2.lock();
        c3.lock();
        c4.lock();
    });
    var $unlock = $('<button/>').addClass('btn btn-primary').text('unlock').on('click', function() {
        c1.unlock();
        c2.unlock();
        c3.unlock();
        c4.unlock(); 
    });

    $('body').append($lock).append($unlock);
});