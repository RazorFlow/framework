StandaloneDashboard(function (db) {
    function addChart(first, second) {
        var c = new ChartComponent();
        c.setDimensions(3,4);
        c.setCaption(first + " - " + second);
        c.setLabels(["A", "B"]);
        c.addSeries("series1", "Default", [first, second]);
        db.addComponent(c);

        first *= 1356;
        second *= 1356;

        var c = new ChartComponent();
        c.setDimensions(3,4);
        c.setCaption(first + " - " + second);
        c.setLabels(["A", "B"]);
        c.addSeries("series1", "Default", [first, second]);
        db.addComponent(c);
    }

    addChart(10, 20);
    addChart(10, 30);
    addChart(10, 40);
    addChart(10, 50);
    addChart(10, 60);
    addChart(10, 70);
    addChart(10, 100);
    addChart(10, 120);
    addChart(10, 130);
    addChart(10, 160);
    addChart(10, 190);
    addChart(10, 210);

    addChart(-20, 20);
    addChart(-30, 30);
    addChart(-40, 40);
    addChart(-50, 50);
    addChart(-60, 60);
    addChart(-70, 70);
    addChart(-100, 100);
    addChart(-120, 120);
    addChart(-130, 130);
    addChart(-160, 160);
    addChart(-190, 190);
    addChart(-210, 210);
});