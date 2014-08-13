// describe ("Propertybase Validation", function () {
//   var properties = require("prop/properties");
//   beforeEach(function () {
//   });

//   it("Should detect empty series", function () {
//     var chart = new ChartComponent('someid');
//     var errors = chart.validate ();

//     expect(errors).toEqual([1000]);
//   });

//   it("Should detect Bar is mixed with other Series", function () {
//     var chart = new ChartComponent('someid');
//     chart.setDimensions (4, 4);
//     chart.setCaption("Expenses incurred on Food Consumption by Year");
//     chart.setLabels (["2009", "2010", "2011"]);
//     chart.addSeries ("beverages", "Beverages", [1355, 1916, 1150]);
//     chart.addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321], {seriesDisplayType: 'Bar'});
//     var errors = chart.validate ();

//     expect(errors).toEqual([1002]);
//   });

//   it("Should detect Pie is mixed with other Series", function () {
//     var chart = new ChartComponent('someid');
//     chart.setDimensions (4, 4);
//     chart.setCaption("Expenses incurred on Food Consumption by Year");
//     chart.setLabels (["2009", "2010", "2011"]);
//     chart.addSeries ("beverages", "Beverages", [1355, 1916, 1150]);
//     chart.addSeries ("packaged_foods", "Packaged Foods", [1513, 976, 1321], {seriesDisplayType: 'Pie'});
//     var errors = chart.validate ();

//     expect(errors).toEqual([1003]);
//   });

//   it("Should detect Component Kpi Exceding 30 characters", function () {
//     var chart = new ChartComponent('someid');
//     chart.setDimensions (8, 8);
//     chart.setCaption("2011 Sales"); 
//     chart.setLabels (["Beverages", "Vegetables"])
//     chart.addSeries ("sales", "Sales", [1343, 7741]);
//     chart.addSeries ("quantity", "Quantity", [76, 119]);

//     chart.addComponentKPI("first", {
//       caption: "hello hello hello hello hello hello hello hello hello hello ",
//       value: "20"
//     });

//     var errors = chart.validate ();

//     expect(errors).toEqual([1001]);
//   });

// });
