StandaloneDashboard(function (db) {

    var kpi1 = new KPIComponent();
    var kpi2 = new KPIComponent();
    var kpi3 = new KPIComponent();
    var kpi4 = new KPIComponent();

    kpi1.setCaption('Big Spark');
    kpi1.setDimensions(3, 2);
    kpi1.setValue(100, {
    });
    kpi1.setSparkValues(['Jan', "Feb", 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], 
                        [12.31, 10.34, 10.26, 9, 8.21, 13.41, 14.43, 23.31, 13.41, 11.4, 28.34, 29.21]);

    kpi2.setCaption('Always Increasing');
    kpi2.setDimensions(3, 2);
    kpi2.setValue(49, {
    });
    kpi2.setSparkValues(['Jan', "Feb", 'Mar', 'Apr',], 
                        [10, 20, 30, 40, 50]);

    kpi3.setCaption('Negative Effect');
    kpi3.setDimensions(3, 2);
    kpi3.setValue(-5600, {
    });
    kpi3.setSparkValues(['Jan', "Feb", 'Mar', 'Apr',], 
                        [-10, -10, -5, -1, -1.8, -8]);

    kpi4.setCaption('Steep difference in values');
    kpi4.setDimensions(6, 2);
    kpi4.setValue(500000, {
    });
    kpi4.setSparkValues(['Jan', "Feb", 'Mar', 'Apr',], 
                        [10, 1000, 500, 10, 15000]);

    db.addComponent(kpi1);
    db.addComponent(kpi2);
    db.addComponent(kpi3);
    db.addComponent(kpi4);
});