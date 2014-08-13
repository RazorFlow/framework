
StandaloneDashboard(function (db) {
    var index = 0;
    function addKPI(w, h) {
        var c = new KPIComponent();
        c.setDimensions(w,h);
        c.setCaption("#" + index);
        index++;
        c.setValue (10);
        db.addComponent(c);
    }

    addKPI(2, 2);
    addKPI(4, 4);
    addKPI(2, 4);
    addKPI(4, 2);
    addKPI(4, 2);
    addKPI(4, 2);
    addKPI(4, 2);
    addKPI(2, 2);
});
