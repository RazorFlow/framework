rf.StandaloneDashboard(function(db){
    var c1 = new KPIComponent();
    c1.setDimensions(3,2);
    c1.setCaption('Number of checkouts in 24h');
    c1.setValue(1, {numberPrefix: '$'});
    db.addComponent(c1);

    var button = $('<button/>').text('update').on('click', function() {
        c1.setValue(1200);
    });

    $('body').append(button);

});