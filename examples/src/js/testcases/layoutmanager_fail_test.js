StandaloneDashboard(function (db) {
    var createTable = function (width, height) {
        var table1 = new TableComponent ();
        table1.setCaption ("Table Component");
        table1.setDimensions (width, height);
        table1.addColumn("foo", "Foo", {});
        table1.addColumn("bar", "Bar", {});
        table1.addColumn("str", "Stringlike");

        for(var i = 0; i < 20; i++) {
            table1.addRow ({foo: i * 2, bar: i * 2 + 1, str: "Item # " + i});
        }

        return table1;
    }

    var table = createTable(6, 6);
    table.addComponentKPI("foo", {
        caption: "Hello",
        value: 42
    });
    table.addComponentKPI("bar", {
        caption: "World",
        value: 45000
    });

    db.addComponent(table);
});
