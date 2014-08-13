StandaloneDashboard(function (db) {
    db.setDashboardTitle('KPI Types Supported in RazorFlow');
    var c3 = new TableComponent ();
    c3.setDimensions (6, 6);
    c3.setRowsPerPage('10');
    c3.setCaption ("table component");
    c3.addColumn ("a", "Column A", {
      dataType: "number",
      numberPrefix: "$",
    });
    c3.addColumn ("b", "Column B", {
      dataType: "number",
      numberSuffix: "%"
    });
    c3.addColumn ("c", "Column C", {
      textAlign: "center"
    });

    for(var i = 0; i < 8; i++) {
        c3.addRow ({a: 2 * i, b: 2 * i + 1, c: "<a href='#'>tt</a>"});
    }
    db.addComponent(c3);

  });