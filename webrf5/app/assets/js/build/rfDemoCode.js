rfDemoCode = {
"chart_column": function() {rf.StandaloneDashboard(function(db){
	var chart = new ChartComponent("sales");
	chart.setDimensions (8, 6);
	chart.setCaption("Sales - 2013 vs 2012");
	chart.setLabels (["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]);
	chart.addSeries ("sales2013", "2013", [22400, 24800, 21800, 21800, 24600, 27600, 26800, 27700, 23700, 25900, 26800, 24800]);
	chart.addSeries ("sales2012", "2012", [10000, 11500, 12500, 15000, 16000, 17600, 18800, 19700, 21700, 21900, 22900, 20800]);
	chart.setYAxis("Sales", {numberPrefix: "$", numberHumanize: true});
	db.addComponent (chart);
});
},
"chart_pie": function() {rf.StandaloneDashboard(function(db){
	var chart = new ChartComponent();
	chart.setDimensions (8, 6);
	chart.setCaption("Expenditures Incurred in Publishing a Book");
	chart.setLabels (["Paper Cost", "Binding", "Printing Cost", "Royality", "Transportation Cost", "Promotion Cost"]);
	chart.setPieValues ([25, 20, 20, 15, 10, 10], {
		dataType: "number",
		numberSuffix: "%"
	});
	db.addComponent (chart);
});},
"chart_bar": function() {StandaloneDashboard(function (db) {
    var c1 = new ChartComponent();
    c1.setCaption("Costs by division - 2013 vs 2012");
    c1.setDimensions(8, 6);
    c1.setLabels(["Manufacturing", "Publishing", "Transportation", "Communications"]);
    c1.addSeries("costs2013", "2013", [24400, 27800, 23800, 24800], {seriesDisplayType: "bar"});
    c1.addSeries("costs2012", "2012", [15000, 15000, 17500, 20000], {seriesDisplayType: "bar"});

    c1.setYAxis("", {numberPrefix: "$", numberHumanize: true});
 
    db.addComponent(c1);
});
},
"chart_line": function() {rf.StandaloneDashboard(function(db){
	var chart = new ChartComponent("sales");
	chart.setDimensions (8, 6);
	chart.setCaption("Sales - 2013 vs 2012");
	chart.setLabels (["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]);
	chart.addSeries ("sales2013", "2013", [22400, 24800, 21800, 21800, 24600, 27600, 26800, 27700, 23700, 25900, 26800, 24800], {
		seriesDisplayType: "line"
	});
	chart.addSeries ("sales2012", "2012", [10000, 11500, 12500, 15000, 16000, 17600, 18800, 19700, 21700, 21900, 22900, 20800], {
		seriesDisplayType: "line"
	});
	chart.setYAxis("Sales", {numberPrefix: "$", numberHumanize: true});
	db.addComponent (chart);
});
},
"chart_area": function() {rf.StandaloneDashboard(function(db){
    var chart = new ChartComponent();
    chart.setDimensions (8, 6);
    chart.setCaption("Number of monthly unique visitors on a website in 2013");
    chart.setLabels (["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]);
    chart.addSeries ("month_2013", "2013", [420000, 460000, 480000, 520000, 560000, 510000, 470000, 430000, 420000, 370000, 360000, 360000], {
        seriesDisplayType: "area"
    });
    chart.setYAxis("Number of visitors", {numberHumanize: true});
    db.addComponent (chart);
});
},
"chart_stacked_column": function() {rf.StandaloneDashboard(function(db){
	var chart = new ChartComponent();
	chart.setDimensions (8, 6);
	chart.setCaption("Most useful search engines for website traffic");	
	chart.setLabels (["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]);
	chart.setYAxis("no. of unique visits", {
	});
	chart.addSeries ("Google", "Google", [3040, 2794, 3026, 3341, 2800, 2507, 3701, 2671, 2980, 2041, 1813, 1691], {
		seriesStacked: true,
		seriesDisplayType: "column"
	});
	chart.addSeries ("Yahoo", "Yahoo", [1200, 1124, 1006, 921, 1500, 1007, 921, 971, 1080, 1041, 1113, 1091], {
		seriesStacked: true,
		seriesDisplayType: "column"
	});
	chart.addSeries ("MSN", "MSN", [600, 724, 806, 621, 700, 907, 821, 671, 880, 641, 913, 691], {
		seriesStacked: true,
		seriesDisplayType: "column"
	});
	chart.addSeries ("Others", "Others", [965, 771, 732, 611, 700, 607, 621, 751, 800, 741, 813, 791], {
		seriesStacked: true,
		seriesDisplayType: "column"
	});
	db.addComponent (chart);
});},
"chart_stacked_bar": function() {rf.StandaloneDashboard(function(db){
	var chart = new ChartComponent();
	chart.setDimensions (8, 6);
	chart.setCaption("Most spent on activity in a company");	
	chart.setLabels (["Software Development", "Social Networking", "Communication", "Reference", "Utility"]);
	chart.setYAxis("", {
		numberSuffix: "h"
	});
	chart.addSeries ("john", "John", [1.1, 0.3, 1.3, 2.2, 1.6], {
		seriesStacked: true,
		seriesDisplayType: "bar"
	});
	chart.addSeries ("mark", "Mark", [2.1, 0.6, 1.8, 0.9, 1.4], {
		seriesStacked: true,
		seriesDisplayType: "bar"
	});
	db.addComponent (chart);
});},
"chart_combined": function() {rf.StandaloneDashboard(function(db){
	var chart = new ChartComponent();
	chart.setDimensions (6, 4);
	chart.setCaption("Company Revenue and Profits");
	chart.setLabels (["Aug", "Sept", "Oct", "Nov", "Dec"]);
	chart.addSeries ("revenue", "Revenue", [20000, 17000, 22000, 19000, 23000], {
		numberPrefix: "$"
	});
	chart.addYAxis("profit", "Profit %", {
		numberSuffix: "%"
	});
	chart.addSeries ("profit", "Profit %", [25, 5.88, 36.36, 10.52, 30.43], {
		numberSuffix: "%",
		yAxis: "profit",
		seriesDisplayType: "line"
	});

	chart.setYAxis("Revenue", {numberPrefix: "$", numberHumanize: true});
	db.addComponent (chart);


	var chart1 = new ChartComponent();
	chart1.setDimensions (6, 4);
	chart1.setCaption("Company Sales");
	chart1.setLabels (["Jan", "Feb", "Mar", "Apr", "May", "June"]);
	chart1.addSeries ("Revenue", "Revenue", [5854, 4171, 1375, 1875, 2246, 2696]);
	chart1.addSeries ("Profit", "Profit", [3242, 3171, 700, 1287, 1856, 1126], {
		seriesDisplayType: "area"
	});
	chart1.addSeries ("Predicted_Profit", "Predicted Profit", [4342, 2371, 740, 3487, 2156, 1326], {
		seriesDisplayType: "line"
	});
	chart1.setYAxis("Sales", {numberPrefix: "$", numberHumanize: true});
	db.addComponent (chart1);
});
},
"chart_dualy": function() {rf.StandaloneDashboard(function(db){
    var chart = new ChartComponent();
    chart.setDimensions (8, 6);
    chart.setYAxis("Sales", {
        numberPrefix: "$ ",
        numberHumanize: true
    });
    chart.addYAxis("profit", "Profit %", {
        numberSuffix: "%"
    });
    chart.setCaption("Showing monthly sales and profit of a retail company");    
    chart.setLabels (["March", "April", "May", "June", "July"]);
    chart.addSeries ("product_A", "Product A", [25601.34, 20148.82, 17372.76, 35407.15, 38105.68], {
        numberPrefix: "$",
        seriesDisplayType: "column"
    });
    chart.addSeries ("product_B", "Product B", [57401.85, 41941.19, 45263.37, 117320.16, 114845.27], {
        numberPrefix: "$",
        seriesDisplayType: "column"
    });
    chart.addSeries ("profit", "Profit %", [20, 42, 10, 23, 16], {
        numberSuffix: "%",
        seriesDisplayType: "line",
        yAxis: "profit"
    });
    db.addComponent (chart);
});
},
"simple_kpi": function() {rf.StandaloneDashboard(function(db){
    var kpi = new KPIComponent ();
    kpi.setDimensions (3, 2);
    kpi.setCaption ("Sales in the last 24 hours");
    kpi.setValue (3145, {
        numberPrefix: "$"
    });

    db.addComponent(kpi);
});},
"gauge_kpi": function() {rf.StandaloneDashboard(function(db){
    var kpi = new GaugeComponent ();
    kpi.setDimensions (6, 4);
    kpi.setCaption ("# Closed/Total Tickets (24h)");
    kpi.setLimits (0, 93);
    kpi.setValue (33);

    db.addComponent(kpi);
});},
"group_kpi": function() {rf.StandaloneDashboard(function(db){
    var kpi = new KPIGroupComponent ();
    kpi.setDimensions (12, 2);
    kpi.setCaption("Available food items in the warehouse");

    kpi.addKPI("beverages", {
        caption: "Beverages",
        value: 559,
        numberSuffix: " units"
    });

    kpi.addKPI("condiments", {
        caption: "Condiments",
        value: 507,
        numberSuffix: " units"
    });

    kpi.addKPI("confections", {
        caption: "Confections",
        value: 386,
        numberSuffix: " units"
    });

    kpi.addKPI("daily_products", {
        caption: "Daily Products",
        value: 393,
        numberSuffix: " units"
    });
    db.addComponent (kpi);
});},
"table": function() {rf.StandaloneDashboard(function(db){
    var table = new TableComponent ();
    table.setDimensions (12, 7);
    table.setCaption ("Change caption to IMDB Top 20 Movies");
    table.addColumn ("rank", "Rank");
    table.addColumn ("title", "Title");
    table.addColumn ("year", "Year");
    table.addColumn ("rating", "IMDB Rating");

    table.addRow ({
        "rank": 1,
        "title": "The Shawshank Redemption",
        "year": "1994",
        "rating": 9.2
    });

    table.addRow ({
        "rank": 2,
        "title": "The Godfather",
        "year": "1972",
        "rating": 9.2
    });

    table.addRow ({
        "rank": 3,
        "title": "The Godfather part II",
        "year": "1974",
        "rating": 9.0
    });

    table.addRow ({
        "rank": 4,
        "title": "The Dark Knight",
        "year": "2008",
        "rating": 8.9
    });

    table.addRow ({
        "rank": 5,
        "title": "Pulp Fiction",
        "year": "1994",
        "rating": 8.9
    });

    table.addRow ({
        "rank": 6,
        "title": "The Good, the Bad and the Ugly",
        "year": "1966",
        "rating": 8.9
    });

    table.addRow ({
        "rank": 7,
        "title": "Schindler\"s List",
        "year": "1993",
        "rating": 8.9
    });

    table.addRow ({
        "rank": 8,
        "title": "Angry Men",
        "year": "1957",
        "rating": 8.9
    });

    table.addRow ({
        "rank": 9,
        "title": "The Lord of the Rings: The Return of the King",
        "year": "2003",
        "rating": 8.9
    });

    table.addRow ({
        "rank": 10,
        "title": "Fight Club",
        "year": "1999",
        "rating": 8.8
    });

    table.addRow ({
        "rank": 11,
        "title": "The Lord of the Rings: The Fellowship of the Ring",
        "year": "2001",
        "rating": 8.8
    });

    table.addRow ({
        "rank": 12,
        "title": "Star Wars: Episode V - The Empire Strikes Back",
        "year": "1980",
        "rating": 8.8
    });

    table.addRow ({
        "rank": 13,
        "title": "Inception",
        "year": "2010",
        "rating": 8.7
    });

    table.addRow ({
        "rank": 14,
        "title": "Forrest Gump",
        "year": "1994",
        "rating": 8.7
    });

    table.addRow ({
        "rank": 15,
        "title": "One Flew Over the Cuckoo\"s Nest",
        "year": "1975",
        "rating": 8.7
    });

    table.addRow ({
        "rank": 16,
        "title": "The Lord of the Rings: The Two Towers",
        "year": "2002",
        "rating": 8.7
    });

    table.addRow ({
        "rank": 17,
        "title": "Goodfellas",
        "year": "1990",
        "rating": 8.7
    });

    table.addRow ({
        "rank": 18,
        "title": "Star Wars: Episode IV - A New Hope",
        "year": "1977",
        "rating": 8.7
    });

    table.addRow ({
        "rank": 19,
        "title": "The Matrix",
        "year": "1999",
        "rating": 8.7
    });

    table.addRow ({
        "rank": 20,
        "title": "Seven Samurai",
        "year": "1954",
        "rating": 8.7
    });

    db.addComponent(table);
});
},
"input_types": function() {StandaloneDashboard(function (db) {
    var form = new FormComponent ();
    form.setDimensions (8, 6);
    form.setCaption ("Form items in stock");
    form.addSelectField ("category", "Select Category", ["No Selection", "Beverages", "Condiments", "Confections", "Dairy Products", "Grains/Cereal", "Meat/Poultry", "Produce", "Seafood"]);
    form.addTextField ("contains", "Product Name Contains");
    form.addNumericRangeField("stock", "Units In Stock");
    form.addCheckboxField("discontinued", "Exclude Discontinued Items", false);
    db.addComponent(form);
});},
"chart_drilldown": function() {rf.StandaloneDashboard(function(db){
    var chart = new ChartComponent ("chart");
    chart.setDimensions (8, 6);
    chart.setCaption ("Annual Sales Summary (2010 - 2013)");
    chart.setLabels (["2010", "2011", "2012", "2013"]);
    chart.addSeries ("sales", "Sales", [1160000, 1040000, 1020000, 1160000]);

    chart.setYAxis("Sales", {
        numberPrefix: "$",
        numberHumanize: true
    });

    var selectedYear;
    var labelsForQuarters = {
        "Q1": ["January", "February", "March"],
        "Q2": ["April", "May", "June"],
        "Q3": ["July", "August", "September"],
        "Q4": ["October", "November", "December"]
    };
    var yearData = {
        "2010": {
            "Q1": [110000, 76000, 88000],
            "Q2": [116000, 92000, 62000],
            "Q3": [114000, 86000, 11800],
            "Q4": [92000, 102000, 105000],
            data:  [274000, 270000, 318000, 299000]
        },
        "2011": {
            "Q1": [370000, 290000, 320000],
            "Q2": [370000, 290000, 320000],
            "Q3": [370000, 290000, 320000],
            "Q4": [370000, 290000, 320000],
            data: [306000, 203000, 270000, 264000]
        },
        "2012": {
            "Q1": [87000, 89000, 65000],
            "Q2": [13000, 44000, 106000],
            "Q3": [85000, 103000, 67000],
            "Q4": [59000, 69000, 113000],
            data: [241000, 280000, 255000, 241000]
        },
        "2013": {
            "Q1": [105000, 76000, 88000],
            "Q2": [116000, 92000, 62000],
            "Q3": [114000, 86000, 118000],
            "Q4": [92000, 102000, 105000],
            data: [269000, 270000, 318000, 299000]
        }
    }

    chart.addDrillStep (function (done, params, updatedComponent) {
        var label = selectedYear = params.label;
        updatedComponent.setLabels (["Q1", "Q2", "Q3", "Q4"]);
        updatedComponent.addSeries ("sales", "Sales", yearData[label].data);
        done();
    });

    chart.addDrillStep (function (done, params, updatedComponent) {
        var label = params.label;
        updatedComponent.setLabels (labelsForQuarters[label]);
        updatedComponent.addSeries ("sales", "Sales", yearData[selectedYear][label]);
        done();
    });

    db.addComponent (chart);
});
},
"component_kpi": function() {rf.StandaloneDashboard(function(db){
    var chart = new ChartComponent("sales");
    chart.setDimensions (8, 6);
    chart.setCaption("Sales - 2013 vs 2012");
    chart.setLabels (["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]);
    chart.addSeries ("sales2013", "2013", [22400, 24800, 21800, 21800, 24600, 27600, 26800, 27700, 23700, 25900, 26800, 24800]);
    chart.addSeries ("sales2012", "2012", [10000, 11500, 12500, 15000, 16000, 17600, 18800, 19700, 21700, 21900, 22900, 20800]);
    chart.setYAxis("Sales", {numberPrefix: "$", numberHumanize: true});
    chart.addComponentKPI ("max2012", {
        caption: "Maximum sales in 2012",
        value: 22900,
        numberPrefix: " $",
        numberHumanize: true
    });

    chart.addComponentKPI("min2012", {
        caption: "Lowest sales in 2012",
        value: 10000,
        numberPrefix: " $",
        numberHumanize: true
    });

    chart.addComponentKPI("max2013", {
        caption: "Maximum sales in 2013",
        value: 27700,
        numberPrefix: " $",
        numberHumanize: true
    });

    chart.addComponentKPI("min2013", {
        caption: "Lowest sales in 2013",
        value: 21800,
        numberPrefix: " $",
        numberHumanize: true
    });

    db.addComponent (chart);
});
},
"real_time": function() {rf.StandaloneDashboard(function(db){
    var kpi = new GaugeComponent ();
    kpi.setDimensions (4, 3);
    kpi.setCaption ("Current server load. In %");
    kpi.setLimits (0, 100);
    kpi.setValue (Math.floor((Math.random() * 10)) + 40);

    db.addComponent(kpi);


    var chart = new ChartComponent("hashtags");
	chart.setDimensions (8, 6);
	chart.setCaption("Number of tweets on top 5 hashtags");
	chart.setLabels (["#android", "#ipad", "#news", "#salute", "#nowplaying"]);
	chart.addSeries ("tweets", "No. of tweets", [220, 240, 218, 218, 246]);
	chart.setYAxis("", {numberHumanize: true});
	db.addComponent (chart);

	db.setInterval(function () {
		kpi.setValue(Math.floor((Math.random() * 10)) + 40);
        var data = [];
        for(var i = 0; i < 5; i++) {
            data.push(Math.floor((Math.random() * 200)) + 200);
        }
        chart.updateSeries ("tweets", data);
    }, 1500);
});},};