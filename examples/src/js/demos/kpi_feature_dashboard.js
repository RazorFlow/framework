StandaloneDashboard(function (db) {
    db.setDashboardTitle('KPI Types Supported in RazorFlow');

    var c1 = new KPIComponent();
    c1.setDimensions(4, 2);
    c1.setCaption('Average Monthly Sales');
    c1.setValue(513.22, {
        numberPrefix: '$'
    });
    db.addComponent(c1);

    var c2 = new KPIComponent();
    c2.setDimensions(4, 2);
    c2.setCaption('Average Monthly Units');
    c2.setValue(22);
    c2.setSparkValues(['Jan', "Feb", 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], 
                        [12.31, 10.34, 10.26, 9, 8.21, 13.41, 14.43, 23.31, 13.41, 11.4, 28.34, 29.21]);
    db.addComponent(c2);
});