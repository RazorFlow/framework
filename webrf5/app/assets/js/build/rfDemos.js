window.rfDemos = [

{


"id": "component",


"title": "Components",


"demos": [



{




"id": "chart_component_demos",




"title": "Chart Component",




"demos": [





{






"id": "chart_column",






"title": "Column Chart",






"desc": "",






"js": "chart_column",






"php": "chart_column",






"doc": "/docs/dashboard/js/guide/components/chart/index.php",






"file": true,






"jsContent": "rf.StandaloneDashboard(function(db){\n\tvar chart = new ChartComponent(\"sales\");\n\tchart.setDimensions (8, 6);\n\tchart.setCaption(\"Sales - 2013 vs 2012\");\n\tchart.setLabels ([\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"July\", \"Aug\", \"Sept\", \"Oct\", \"Nov\", \"Dec\"]);\n\tchart.addSeries (\"sales2013\", \"2013\", [22400, 24800, 21800, 21800, 24600, 27600, 26800, 27700, 23700, 25900, 26800, 24800]);\n\tchart.addSeries (\"sales2012\", \"2012\", [10000, 11500, 12500, 15000, 16000, 17600, 18800, 19700, 21700, 21900, 22900, 20800]);\n\tchart.setYAxis(\"Sales\", {numberPrefix: \"$\", numberHumanize: true});\n\tdb.addComponent (chart);\n});\n",






"phpContent": "<?php\n\nclass SampleDashboard extends StandaloneDashboard {\n  public function buildDashboard(){\n    $chart = new ChartComponent(\"sales_chart\");\n    $chart->setCaption(\"Sales - 2013 vs 2012\");\n    $chart->setDimensions (8, 6);\n    $chart->setLabels (array(\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"July\", \"Aug\", \"Sept\", \"Oct\", \"Nov\", \"Dec\"));\n    $chart->addSeries (\"2013\", \"2013\", array(22400, 24800, 21800, 21800, 24600, 27600, 26800, 27700, 23700, 25900, 26800, 24800));\n    $chart->addSeries (\"2012\", \"2012\", array(10000, 11500, 12500, 15000, 16000, 17600, 18800, 19700, 21700, 21900, 22900, 20800));\n    $chart->setYAxis('Sales', array(\"numberPrefix\"=> '$', \"numberHumanize\"=> true));\n    $this->addComponent ($chart);\n  }\n}\n\n$db = new SampleDashboard();\n$db->renderStandalone();\n  \n"





},





{






"id": "chart_pie",






"title": "Pie Chart",






"desc": "",






"js": "chart_pie",






"php": "chart_pie",






"doc": "/docs/dashboard/js/guide/components/chart/chart_basic.php",






"file": true,






"jsContent": "rf.StandaloneDashboard(function(db){\n\tvar chart = new ChartComponent();\n\tchart.setDimensions (8, 6);\n\tchart.setCaption(\"Expenditures Incurred in Publishing a Book\");\n\tchart.setLabels ([\"Paper Cost\", \"Binding\", \"Printing Cost\", \"Royality\", \"Transportation Cost\", \"Promotion Cost\"]);\n\tchart.setPieValues ([25, 20, 20, 15, 10, 10], {\n\t\tdataType: \"number\",\n\t\tnumberSuffix: \"%\"\n\t});\n\tdb.addComponent (chart);\n});",






"phpContent": "<?php\n\nclass SampleDashboard extends StandaloneDashboard {\n  public function buildDashboard(){\n    $chart = new ChartComponent();\n    $chart->setCaption(\"Expenditures Incurred in Publishing a Book\");\n    $chart->setDimensions (8, 6);\n    $chart->setLabels ([\"Paper Cost\", \"Binding\", \"Printing Cost\", \"Royality\", \"Transportation Cost\", \"Promotion Cost\"]);\n    $chart->setPieValues ([25, 20, 20, 15, 10, 10]);\n\n    $this->addComponent ($chart);\n  }\n}\n\n$db = new SampleDashboard();\n$db->renderStandalone();\n  \n"





},





{






"id": "chart_bar",






"title": "Bar Chart",






"desc": "",






"js": "chart_bar",






"php": "chart_bar",






"doc": "/docs/dashboard/js/guide/components/chart/chart_bar.php",






"file": true,






"jsContent": "StandaloneDashboard(function (db) {\n    var c1 = new ChartComponent();\n    c1.setCaption(\"Costs by division - 2013 vs 2012\");\n    c1.setDimensions(8, 6);\n    c1.setLabels([\"Manufacturing\", \"Publishing\", \"Transportation\", \"Communications\"]);\n    c1.addSeries(\"costs2013\", \"2013\", [24400, 27800, 23800, 24800], {seriesDisplayType: \"bar\"});\n    c1.addSeries(\"costs2012\", \"2012\", [15000, 15000, 17500, 20000], {seriesDisplayType: \"bar\"});\n\n    c1.setYAxis(\"\", {numberPrefix: \"$\", numberHumanize: true});\n \n    db.addComponent(c1);\n});\n",






"phpContent": "<?php\n\nclass SampleDashboard extends StandaloneDashboard {\n  public function buildDashboard(){\n    $chart = new ChartComponent('chart');\n    $chart->setCaption(\"Costs by division - 2013 vs 2012\");\n    $chart->setDimensions (8, 6);\n    $chart->setLabels (array('Manufacturing', 'Publishing', 'Transportation', 'Communications'));\n    $chart->addSeries (\"sales2013\", \"2013\", array(24400, 27800, 23800, 24800), array(\"seriesDisplayType\"=> 'bar'));\n    $chart->addSeries (\"sales2012\", \"2012\", array(15000, 15000, 17500, 20000), array(\"seriesDisplayType\"=> 'bar'));\n    $chart->setYAxis('', array(\"numberPrefix\"=> '$', \"numberHumanize\"=> true));\n    $this->addComponent ($chart);\n  }\n}\n\n$db = new SampleDashboard();\n$db->renderStandalone();\n  \n"





},





{






"id": "chart_line",






"title": "Line Chart",






"desc": "",






"js": "chart_line",






"php": "chart_line",






"doc": "/docs/dashboard/js/guide/components/chart/index.php",






"file": true,






"jsContent": "rf.StandaloneDashboard(function(db){\n\tvar chart = new ChartComponent(\"sales\");\n\tchart.setDimensions (8, 6);\n\tchart.setCaption(\"Sales - 2013 vs 2012\");\n\tchart.setLabels ([\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"July\", \"Aug\", \"Sept\", \"Oct\", \"Nov\", \"Dec\"]);\n\tchart.addSeries (\"sales2013\", \"2013\", [22400, 24800, 21800, 21800, 24600, 27600, 26800, 27700, 23700, 25900, 26800, 24800], {\n\t\tseriesDisplayType: \"line\"\n\t});\n\tchart.addSeries (\"sales2012\", \"2012\", [10000, 11500, 12500, 15000, 16000, 17600, 18800, 19700, 21700, 21900, 22900, 20800], {\n\t\tseriesDisplayType: \"line\"\n\t});\n\tchart.setYAxis(\"Sales\", {numberPrefix: \"$\", numberHumanize: true});\n\tdb.addComponent (chart);\n});\n",






"phpContent": "<?php\n\nclass SampleDashboard extends StandaloneDashboard {\n  public function buildDashboard(){\n    $chart = new ChartComponent();\n    $chart->setCaption(\"Sales - 2013 vs 2012\");\n    $chart->setDimensions (8, 6);\n    $chart->setLabels (array(\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"July\", \"Aug\", \"Sept\", \"Oct\", \"Nov\", \"Dec\"));\n    $chart->addSeries (\"2013\", \"2013\", array(22400, 24800, 21800, 21800, 24600, 27600, 26800, 27700, 23700, 25900, 26800, 24800), array(\"seriesDisplayType\"=>\"line\"));\n    $chart->addSeries (\"2012\", \"2012\", array(10000, 11500, 12500, 15000, 16000, 17600, 18800, 19700, 21700, 21900, 22900, 20800), array(\"seriesDisplayType\"=>\"line\"));\n    $chart->setYAxis('Sales', array(\"numberPrefix\"=> '$', \"numberHumanize\"=> true));\n    $this->addComponent ($chart);\n  }\n}\n\n$db = new SampleDashboard();\n$db->renderStandalone();\n  \n"





},





{






"id": "chart_area",






"title": "Area Chart",






"desc": "",






"js": "chart_area",






"php": "chart_area",






"doc": "/docs/dashboard/js/guide/components/chart/index.php",






"file": true,






"jsContent": "rf.StandaloneDashboard(function(db){\n    var chart = new ChartComponent();\n    chart.setDimensions (8, 6);\n    chart.setCaption(\"Number of monthly unique visitors on a website in 2013\");\n    chart.setLabels ([\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"July\", \"Aug\", \"Sept\", \"Oct\", \"Nov\", \"Dec\"]);\n    chart.addSeries (\"month_2013\", \"2013\", [420000, 460000, 480000, 520000, 560000, 510000, 470000, 430000, 420000, 370000, 360000, 360000], {\n        seriesDisplayType: \"area\"\n    });\n    chart.setYAxis(\"Number of visitors\", {numberHumanize: true});\n    db.addComponent (chart);\n});\n",






"phpContent": "<?php\n\nclass SampleDashboard extends StandaloneDashboard {\n  public function buildDashboard(){\n    $chart = new ChartComponent('chart');\n    $chart->setCaption(\"Number of monthly unique visitors on a website in 2013\");\n    $chart->setDimensions (8, 6);\n    $chart->setLabels (array(\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"July\", \"Aug\", \"Sept\", \"Oct\", \"Nov\", \"Dec\"));\n    $chart->addSeries (\"sales_2013\", \"2013\", array(420000, 460000, 480000, 520000, 560000, 510000, 470000, 430000, 420000, 370000, 360000, 360000), array(\n        \"seriesDisplayType\"=> \"area\"\n    ));\n    $chart->setYAxis('Number of visitors', array(\"numberPrefix\"=> '$', \"numberHumanize\"=> true));\n    $this->addComponent ($chart);\n  }\n}\n\n$db = new SampleDashboard();\n$db->renderStandalone();\n  \n"





},





{






"id": "chart_stacked_column",






"title": "Stacked Column Chart",






"desc": "",






"js": "chart_stacked_column",






"php": "chart_stacked_column",






"doc": "/docs/dashboard/js/guide/components/chart/chart_series_stacked.php",






"file": true,






"jsContent": "rf.StandaloneDashboard(function(db){\n\tvar chart = new ChartComponent();\n\tchart.setDimensions (8, 6);\n\tchart.setCaption(\"Most useful search engines for website traffic\");\t\n\tchart.setLabels ([\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"July\", \"Aug\", \"Sept\", \"Oct\", \"Nov\", \"Dec\"]);\n\tchart.setYAxis(\"no. of unique visits\", {\n\t});\n\tchart.addSeries (\"Google\", \"Google\", [3040, 2794, 3026, 3341, 2800, 2507, 3701, 2671, 2980, 2041, 1813, 1691], {\n\t\tseriesStacked: true,\n\t\tseriesDisplayType: \"column\"\n\t});\n\tchart.addSeries (\"Yahoo\", \"Yahoo\", [1200, 1124, 1006, 921, 1500, 1007, 921, 971, 1080, 1041, 1113, 1091], {\n\t\tseriesStacked: true,\n\t\tseriesDisplayType: \"column\"\n\t});\n\tchart.addSeries (\"MSN\", \"MSN\", [600, 724, 806, 621, 700, 907, 821, 671, 880, 641, 913, 691], {\n\t\tseriesStacked: true,\n\t\tseriesDisplayType: \"column\"\n\t});\n\tchart.addSeries (\"Others\", \"Others\", [965, 771, 732, 611, 700, 607, 621, 751, 800, 741, 813, 791], {\n\t\tseriesStacked: true,\n\t\tseriesDisplayType: \"column\"\n\t});\n\tdb.addComponent (chart);\n});",






"phpContent": "<?php\n\nclass SampleDashboard extends StandaloneDashboard {\n  public function buildDashboard(){\n    $chart = new ChartComponent('chart');\n    $chart->setCaption(\"Most useful search engines for website traffic\");\n    $chart->setDimensions (8, 6);\n    $chart->setLabels ([\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"July\", \"Aug\", \"Sept\", \"Oct\", \"Nov\", \"Dec\"]);\n    $chart->setYAxis(\"no. of unique visits\", array(\n        \"numberPrefix\"=> \"$\"\n    ));\n    $chart->addSeries (\"Google\", \"Google\", [3040, 2794, 3026, 3341, 2800, 2507, 3701, 2671, 2980, 2041, 1813, 1691], array(\n        \"seriesStacked\"=> true,\n        \"seriesDisplayType\"=> \"column\"\n    ));\n    $chart->addSeries (\"Yahoo\", \"Yahoo\", [1200, 1124, 1006, 921, 1500, 1007, 921, 971, 1080, 1041, 1113, 1091], array(\n        \"seriesStacked\"=> true,\n        \"seriesDisplayType\"=> \"column\"\n    ));\n    $chart->addSeries (\"MSN\", \"MSN\", [600, 724, 806, 621, 700, 907, 821, 671, 880, 641, 913, 691], array(\n        \"seriesStacked\"=> true,\n        \"seriesDisplayType\"=> \"column\"\n    ));\n    $chart->addSeries (\"Others\", \"Others\", [965, 771, 732, 611, 700, 607, 621, 751, 800, 741, 813, 791], array(\n        \"seriesStacked\"=> true,\n        \"seriesDisplayType\"=> \"column\"\n    ));\n    $this->addComponent ($chart);\n  }\n}\n\n$db = new SampleDashboard();\n$db->renderStandalone();\n  \n"





},





{






"id": "chart_stacked_bar",






"title": "Stacked Bar Chart",






"desc": "",






"js": "chart_stacked_bar",






"php": "chart_stacked_bar",






"doc": "/docs/dashboard/js/guide/components/chart/chart_series_stacked.php",






"file": true,






"jsContent": "rf.StandaloneDashboard(function(db){\n\tvar chart = new ChartComponent();\n\tchart.setDimensions (8, 6);\n\tchart.setCaption(\"Most spent on activity in a company\");\t\n\tchart.setLabels ([\"Software Development\", \"Social Networking\", \"Communication\", \"Reference\", \"Utility\"]);\n\tchart.setYAxis(\"\", {\n\t\tnumberSuffix: \"h\"\n\t});\n\tchart.addSeries (\"john\", \"John\", [1.1, 0.3, 1.3, 2.2, 1.6], {\n\t\tseriesStacked: true,\n\t\tseriesDisplayType: \"bar\"\n\t});\n\tchart.addSeries (\"mark\", \"Mark\", [2.1, 0.6, 1.8, 0.9, 1.4], {\n\t\tseriesStacked: true,\n\t\tseriesDisplayType: \"bar\"\n\t});\n\tdb.addComponent (chart);\n});",






"phpContent": "<?php\n\nclass SampleDashboard extends StandaloneDashboard {\n  public function buildDashboard(){\n    $chart = new ChartComponent();\n    $chart->setCaption(\"Most spent on activity in a company\");\n    $chart->setDimensions (8, 6);\n    $chart->setLabels (array(\"Software Development\", \"Social Networking\", \"Communication\", \"Reference\", \"Utility\"));\n    $chart->addSeries (\"john\", \"John\", array(1.1, 0.3, 1.3, 2.2, 1.6), array(\n        \"seriesStacked\"=> true,\n        \"seriesDisplayType\"=> \"bar\"\n    ));\n    $chart->addSeries (\"mark\", \"Mark\", array(2.1, 0.6, 1.8, 0.9, 1.4), array(\n        \"seriesStacked\"=> true,\n        \"seriesDisplayType\"=> \"bar\"\n    ));\n    $chart->setYAxis('', array(\"numberSuffix\"=> 'h'));\n    $this->addComponent ($chart);\n  }\n}\n\n$db = new SampleDashboard();\n$db->renderStandalone();\n"





},





{






"id": "chart_combined",






"title": "Combined Chart Types",






"desc": "Different compatible chart types can be combined in RazorFlow. This allows you to show information in a concise manner with the appropriate data visualization.",






"js": "chart_combined",






"php": "chart_combined",






"doc": "/docs/dashboard/js/guide/components/chart/index.php",






"file": true,






"jsContent": "rf.StandaloneDashboard(function(db){\n\tvar chart = new ChartComponent();\n\tchart.setDimensions (6, 4);\n\tchart.setCaption(\"Company Revenue and Profits\");\n\tchart.setLabels ([\"Aug\", \"Sept\", \"Oct\", \"Nov\", \"Dec\"]);\n\tchart.addSeries (\"revenue\", \"Revenue\", [20000, 17000, 22000, 19000, 23000], {\n\t\tnumberPrefix: \"$\"\n\t});\n\tchart.addYAxis(\"profit\", \"Profit %\", {\n\t\tnumberSuffix: \"%\"\n\t});\n\tchart.addSeries (\"profit\", \"Profit %\", [25, 5.88, 36.36, 10.52, 30.43], {\n\t\tnumberSuffix: \"%\",\n\t\tyAxis: \"profit\",\n\t\tseriesDisplayType: \"line\"\n\t});\n\n\tchart.setYAxis(\"Revenue\", {numberPrefix: \"$\", numberHumanize: true});\n\tdb.addComponent (chart);\n\n\n\tvar chart1 = new ChartComponent();\n\tchart1.setDimensions (6, 4);\n\tchart1.setCaption(\"Company Sales\");\n\tchart1.setLabels ([\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"June\"]);\n\tchart1.addSeries (\"Revenue\", \"Revenue\", [5854, 4171, 1375, 1875, 2246, 2696]);\n\tchart1.addSeries (\"Profit\", \"Profit\", [3242, 3171, 700, 1287, 1856, 1126], {\n\t\tseriesDisplayType: \"area\"\n\t});\n\tchart1.addSeries (\"Predicted_Profit\", \"Predicted Profit\", [4342, 2371, 740, 3487, 2156, 1326], {\n\t\tseriesDisplayType: \"line\"\n\t});\n\tchart1.setYAxis(\"Sales\", {numberPrefix: \"$\", numberHumanize: true});\n\tdb.addComponent (chart1);\n});\n",






"phpContent": "<?php\n\nclass SampleDashboard extends StandaloneDashboard {\n  public function buildDashboard(){\n    $chart = new ChartComponent();\n    $chart->setCaption(\"Company Revenue and Profits\");\n    $chart->setDimensions (8, 6);\n    $chart->setLabels (array(\"Aug\", \"Sept\", \"Oct\", \"Nov\", \"Dec\"));\n    $chart->addSeries (\"revenue\", \"Product A\", array(20000, 17000, 22000, 19000, 23000), array(\n        \"numberPrefix\" => \"$\"\n    ));\n\n    $chart->addYAxis(\"profit\", \"Profit %\", array(\n        \"numberSuffix\" => \"%\"\n    ));\n\n    $chart->addSeries (\"profit\", \"Profit %\", array(25, 5.88, 36.36, 10.52, 30.43), array(\n        \"seriesDisplayType\"=> \"line\",\n        \"numberSuffix\" => \"%\",\n        \"yAxis\" => \"profit\"\n    ));\n    $chart->setYAxis('Revenue', array(\"numberPrefix\"=> '$', \"numberHumanize\"=> true));\n    $this->addComponent ($chart);\n\n\n    $chart1 = new ChartComponent();\n    $chart1->setCaption(\"Company Sales\");\n    $chart1->setDimensions (6, 6);\n    $chart1->setLabels (array(\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"June\"));\n    $chart1->addSeries (\"Revenue\", \"Revenue\", array(5854, 4171, 1375, 1875, 2246, 2696));\n    $chart1->addSeries (\"Profit\", \"Profit\", array(3242, 3171, 700, 1287, 1856, 1126), array(\n        \"seriesDisplayType\"=> \"area\"\n    ));\n    $chart1->addSeries (\"Predicted_Profit\", \"Predicted Profit\", array(4342, 2371, 740, 3487, 2156, 1326), array(\n        \"seriesDisplayType\"=> \"line\"\n    ));\n    $chart1->setYAxis('Sales', array(\"numberPrefix\"=> '$', \"numberHumanize\"=> true));\n    $this->addComponent ($chart1);\n  }\n}\n\n$db = new SampleDashboard();\n$db->renderStandalone();\n  \n"





},





{






"id": "chart_dualy",






"title": "Dual Y Axes",






"desc": "",






"js": "chart_dualy",






"php": "chart_dualy",






"doc": "/docs/dashboard/js/guide/components/chart/dual_axis.php",






"file": true,






"jsContent": "rf.StandaloneDashboard(function(db){\n    var chart = new ChartComponent();\n    chart.setDimensions (8, 6);\n    chart.setYAxis(\"Sales\", {\n        numberPrefix: \"$ \",\n        numberHumanize: true\n    });\n    chart.addYAxis(\"profit\", \"Profit %\", {\n        numberSuffix: \"%\"\n    });\n    chart.setCaption(\"Showing monthly sales and profit of a retail company\");    \n    chart.setLabels ([\"March\", \"April\", \"May\", \"June\", \"July\"]);\n    chart.addSeries (\"product_A\", \"Product A\", [25601.34, 20148.82, 17372.76, 35407.15, 38105.68], {\n        numberPrefix: \"$\",\n        seriesDisplayType: \"column\"\n    });\n    chart.addSeries (\"product_B\", \"Product B\", [57401.85, 41941.19, 45263.37, 117320.16, 114845.27], {\n        numberPrefix: \"$\",\n        seriesDisplayType: \"column\"\n    });\n    chart.addSeries (\"profit\", \"Profit %\", [20, 42, 10, 23, 16], {\n        numberSuffix: \"%\",\n        seriesDisplayType: \"line\",\n        yAxis: \"profit\"\n    });\n    db.addComponent (chart);\n});\n",






"phpContent": "<?php\n\nclass SampleDashboard extends StandaloneDashboard {\n  public function buildDashboard(){\n    $chart = new ChartComponent();\n    $chart->setDimensions (8, 6);\n    $chart->setYAxis(\"Sales\", array(\n        \"numberPrefix\"=> \"$ \",\n        \"numberHumanize\"=> true\n    ));\n    $chart->addYAxis('profit', \"Profit %\", array(\n        \"numberSuffix\" => \"%\"\n    ));\n    $chart->setCaption(\"Showing monthly sales and profit of a retail company\");    \n    $chart->setLabels (array(\"March\", \"April\", \"May\", \"June\", \"July\"));\n    $chart->addSeries (\"product_A\", \"Product A\", array(25601.34, 20148.82, 17372.76, 35407.15, 38105.68), array(\n        \"numberPrefix\"=> '$',\n        \"seriesDisplayType\"=> 'column'\n    ));\n    $chart->addSeries (\"product_B\", \"Product B\", array(57401.85, 41941.19, 45263.37, 117320.16, 114845.27), array(\n        \"numberPrefix\"=> '$',\n        \"seriesDisplayType\"=> 'column'\n    ));\n    $chart->addSeries (\"profit\", \"Profit %\", array(20, 42, 10, 23, 16), array(\n        \"numberPrefix\"=> '$',\n        \"seriesDisplayType\"=> 'line',\n        \"yAxis\"=> \"profit\"\n    ));\n    $this->addComponent ($chart);\n  }\n}\n\n$db = new SampleDashboard();\n$db->renderStandalone();\n  \n"





}




]



},



{




"id": "kpi_component_demos",




"title": "KPI Component",




"demos": [





{






"id": "simple_kpi",






"title": "Simple KPI",






"desc": "A KPI is a realtime indicator of a particular metric. For example, consider your car dashboard. When you look at it, the information that you're looking for is your current speed, fuel tank status, among others.\nNotice that you're always interested in the current value of the metric like the speed. You use this information to make a decision which results in an action like slowing down or speeding up. You're always looking for the current value, and knowing the speed you were going 5 minutes ago doesn't help you now.\nThe KPI Component is similar to that in your RazorFlow Dashboard. It provides the stakeholders of the dashboard the current information used to make a decision.",






"js": "kpi_simple",






"php": "kpi_simple",






"doc": "/docs/dashboard/js/guide/components/kpi/kpi_basic.php",






"file": true,






"jsContent": "rf.StandaloneDashboard(function(db){\n    var kpi = new KPIComponent ();\n    kpi.setDimensions (3, 2);\n    kpi.setCaption (\"Sales in the last 24 hours\");\n    kpi.setValue (3145, {\n        numberPrefix: \"$\"\n    });\n\n    db.addComponent(kpi);\n});",






"phpContent": "<?php\n\nclass SampleDashboard extends StandaloneDashboard {\n  public function buildDashboard(){\n    $kpi = new KPIComponent (\"sales_kpi\");\n    $kpi->setDimensions (3, 2);\n    $kpi->setCaption (\"Sales in 24h\");\n    $kpi->setValue (3145, array(\n        \"numberPrefix\" => \"$\"\n    ));\n    \n    $this->addComponent ($kpi);\n  }\n}\n\n$db = new SampleDashboard();\n$db->renderStandalone();\n  \n"





},





{






"id": "gauge_kpi",






"title": "Gauge",






"desc": "Gauges are single value indicators that are used in dashboards, real-time monitors and reports. They are used to display Key Performance Indicators (KPIs), progress indicators and quantity indicators.",






"js": "kpi_gauge",






"php": "kpi_gauge",






"doc": "/docs/dashboard/js/guide/components/gauge/gauge_basic.php",






"file": true,






"jsContent": "rf.StandaloneDashboard(function(db){\n    var kpi = new GaugeComponent ();\n    kpi.setDimensions (6, 4);\n    kpi.setCaption (\"# Closed/Total Tickets (24h)\");\n    kpi.setLimits (0, 93);\n    kpi.setValue (33);\n\n    db.addComponent(kpi);\n});",






"phpContent": "<?php\n\nclass SampleDashboard extends StandaloneDashboard {\n  public function buildDashboard(){\n    $kpi = new GaugeComponent (\"num_tickets_closed\");\n    $kpi->setDimensions (6, 4);\n    $kpi->setCaption (\"# Closed/Total Tickets (24h)\");\n    $kpi->setLimits (0, 93);\n    $kpi->setValue (33);\n    \n    $this->addComponent ($kpi);\n  }\n}\n\n$db = new SampleDashboard();\n$db->renderStandalone();\n  \n"





},





{






"id": "group_kpi",






"title": "KPI Group",






"desc": "A KPI Group Component can be used to show a group of related KPIs together and are automatically grouped together on mobile devices.",






"js": "kpi_group",






"php": "kpi_group",






"doc": "/docs/dashboard/js/guide/components/kpigroup/kpi_group_basic.php",






"file": true,






"jsContent": "rf.StandaloneDashboard(function(db){\n    var kpi = new KPIGroupComponent ();\n    kpi.setDimensions (12, 2);\n    kpi.setCaption(\"Available food items in the warehouse\");\n\n    kpi.addKPI(\"beverages\", {\n        caption: \"Beverages\",\n        value: 559,\n        numberSuffix: \" units\"\n    });\n\n    kpi.addKPI(\"condiments\", {\n        caption: \"Condiments\",\n        value: 507,\n        numberSuffix: \" units\"\n    });\n\n    kpi.addKPI(\"confections\", {\n        caption: \"Confections\",\n        value: 386,\n        numberSuffix: \" units\"\n    });\n\n    kpi.addKPI(\"daily_products\", {\n        caption: \"Daily Products\",\n        value: 393,\n        numberSuffix: \" units\"\n    });\n    db.addComponent (kpi);\n});",






"phpContent": "<?php\n\nclass SampleDashboard extends StandaloneDashboard {\n  public function buildDashboard(){\n    $kpi = new KPIGroupComponent ('kpi');\n    $kpi->setDimensions (12, 2);\n    $kpi->setCaption('Available food items in the warehouse');\n\n    $kpi->addKPI('beverages', array(\n      'caption' => 'Beverages',\n      'value' => 559,\n      'numberSuffix' => ' units'\n    ));\n    $kpi->addKPI('condiments', array(\n      'caption' => 'Condiments',\n      'value' => 507,\n      'numberSuffix' => ' units'\n    ));\n    $kpi->addKPI('confections', array(\n      'caption' => 'Confections',\n      'value' => 386,\n      'numberSuffix' => ' units'\n    ));\n    $kpi->addKPI('daily_products', array(\n      'caption' => 'Daily Products',\n      'value' => 393,\n      'numberSuffix' => ' units'\n    ));\n\n    $this->addComponent ($kpi);\n  }\n}\n\n$db = new SampleDashboard();\n$db->renderStandalone();\n  "





}




]



},



{




"id": "table_component_demos",




"title": "Table Component",




"demos": [





{






"id": "table",






"title": "Table",






"desc": "RazorFlow Table Component allows you to display data in a tabular format.",






"js": "table",






"php": "table",






"doc": "/docs/dashboard/js/guide/components/table/index.php",






"file": true,






"jsContent": "rf.StandaloneDashboard(function(db){\n    var table = new TableComponent ();\n    table.setDimensions (12, 7);\n    table.setCaption (\"Change caption to IMDB Top 20 Movies\");\n    table.addColumn (\"rank\", \"Rank\");\n    table.addColumn (\"title\", \"Title\");\n    table.addColumn (\"year\", \"Year\");\n    table.addColumn (\"rating\", \"IMDB Rating\");\n\n    table.addRow ({\n        \"rank\": 1,\n        \"title\": \"The Shawshank Redemption\",\n        \"year\": \"1994\",\n        \"rating\": 9.2\n    });\n\n    table.addRow ({\n        \"rank\": 2,\n        \"title\": \"The Godfather\",\n        \"year\": \"1972\",\n        \"rating\": 9.2\n    });\n\n    table.addRow ({\n        \"rank\": 3,\n        \"title\": \"The Godfather part II\",\n        \"year\": \"1974\",\n        \"rating\": 9.0\n    });\n\n    table.addRow ({\n        \"rank\": 4,\n        \"title\": \"The Dark Knight\",\n        \"year\": \"2008\",\n        \"rating\": 8.9\n    });\n\n    table.addRow ({\n        \"rank\": 5,\n        \"title\": \"Pulp Fiction\",\n        \"year\": \"1994\",\n        \"rating\": 8.9\n    });\n\n    table.addRow ({\n        \"rank\": 6,\n        \"title\": \"The Good, the Bad and the Ugly\",\n        \"year\": \"1966\",\n        \"rating\": 8.9\n    });\n\n    table.addRow ({\n        \"rank\": 7,\n        \"title\": \"Schindler\\\"s List\",\n        \"year\": \"1993\",\n        \"rating\": 8.9\n    });\n\n    table.addRow ({\n        \"rank\": 8,\n        \"title\": \"Angry Men\",\n        \"year\": \"1957\",\n        \"rating\": 8.9\n    });\n\n    table.addRow ({\n        \"rank\": 9,\n        \"title\": \"The Lord of the Rings: The Return of the King\",\n        \"year\": \"2003\",\n        \"rating\": 8.9\n    });\n\n    table.addRow ({\n        \"rank\": 10,\n        \"title\": \"Fight Club\",\n        \"year\": \"1999\",\n        \"rating\": 8.8\n    });\n\n    table.addRow ({\n        \"rank\": 11,\n        \"title\": \"The Lord of the Rings: The Fellowship of the Ring\",\n        \"year\": \"2001\",\n        \"rating\": 8.8\n    });\n\n    table.addRow ({\n        \"rank\": 12,\n        \"title\": \"Star Wars: Episode V - The Empire Strikes Back\",\n        \"year\": \"1980\",\n        \"rating\": 8.8\n    });\n\n    table.addRow ({\n        \"rank\": 13,\n        \"title\": \"Inception\",\n        \"year\": \"2010\",\n        \"rating\": 8.7\n    });\n\n    table.addRow ({\n        \"rank\": 14,\n        \"title\": \"Forrest Gump\",\n        \"year\": \"1994\",\n        \"rating\": 8.7\n    });\n\n    table.addRow ({\n        \"rank\": 15,\n        \"title\": \"One Flew Over the Cuckoo\\\"s Nest\",\n        \"year\": \"1975\",\n        \"rating\": 8.7\n    });\n\n    table.addRow ({\n        \"rank\": 16,\n        \"title\": \"The Lord of the Rings: The Two Towers\",\n        \"year\": \"2002\",\n        \"rating\": 8.7\n    });\n\n    table.addRow ({\n        \"rank\": 17,\n        \"title\": \"Goodfellas\",\n        \"year\": \"1990\",\n        \"rating\": 8.7\n    });\n\n    table.addRow ({\n        \"rank\": 18,\n        \"title\": \"Star Wars: Episode IV - A New Hope\",\n        \"year\": \"1977\",\n        \"rating\": 8.7\n    });\n\n    table.addRow ({\n        \"rank\": 19,\n        \"title\": \"The Matrix\",\n        \"year\": \"1999\",\n        \"rating\": 8.7\n    });\n\n    table.addRow ({\n        \"rank\": 20,\n        \"title\": \"Seven Samurai\",\n        \"year\": \"1954\",\n        \"rating\": 8.7\n    });\n\n    db.addComponent(table);\n});\n",






"phpContent": "<?php\nclass SampleDashboard extends StandaloneDashboard {\n  public function buildDashboard(){\n    $table = new TableComponent(\"table\");\n    $table->setCaption(\"IMDB Top 20\");\n    $table->setDimensions (12, 7);\n        $table->addColumn ('rank', 'Rank');\n    $table->addColumn ('title', 'Title');\n    $table->addColumn ('year', 'Year');\n    $table->addColumn ('rating', 'IMDB Rating');\n    $table->addRow (array (\n        'rank'=> 1,\n        'title'=> 'The Shawshank Redemption',\n        'year'=> '1994',\n        'rating'=> 9.2\n    ));\n\n    $table->addRow (array (\n        'rank'=> 2,\n        'title'=> 'The Godfather',\n        'year'=> '1972',\n        'rating'=> 9.2\n    ));\n\n    $table->addRow (array (\n        'rank'=> 3,\n        'title'=> 'The Godfather part II',\n        'year'=> '1974',\n        'rating'=> 9.0\n    ));\n\n    $table->addRow (array (\n        'rank'=> 4,\n        'title'=> 'The Dark Knight',\n        'year'=> '2008',\n        'rating'=> 8.9\n    ));\n\n    $table->addRow (array (\n        'rank'=> 5,\n        'title'=> 'Pulp Fiction',\n        'year'=> '1994',\n        'rating'=> 8.9\n    ));\n\n    $table->addRow (array (\n        'rank'=> 6,\n        'title'=> 'The Good, the Bad and the Ugly',\n        'year'=> '1966',\n        'rating'=> 8.9\n    ));\n\n    $table->addRow (array (\n        'rank'=> 7,\n        'title'=> 'Schindler\\'s List',\n        'year'=> '1993',\n        'rating'=> 8.9\n    ));\n\n    $table->addRow (array (\n        'rank'=> 8,\n        'title'=> 'Angry Men',\n        'year'=> '1957',\n        'rating'=> 8.9\n    ));\n\n    $table->addRow (array (\n        'rank'=> 9,\n        'title'=> 'The Lord of the Rings: The Return of the King',\n        'year'=> '2003',\n        'rating'=> 8.9\n    ));\n\n    $table->addRow (array (\n        'rank'=> 10,\n        'title'=> 'Fight Club',\n        'year'=> '1999',\n        'rating'=> 8.8\n    ));\n\n    $table->addRow (array (\n        'rank'=> 11,\n        'title'=> 'The Lord of the Rings: The Fellowship of the Ring',\n        'year'=> '2001',\n        'rating'=> 8.8\n    ));\n\n    $table->addRow (array (\n        'rank'=> 12,\n        'title'=> 'Star Wars: Episode V - The Empire Strikes Back',\n        'year'=> '1980',\n        'rating'=> 8.8\n    ));\n\n    $table->addRow (array (\n        'rank'=> 13,\n        'title'=> 'Inception',\n        'year'=> '2010',\n        'rating'=> 8.7\n    ));\n\n    $table->addRow (array (\n        'rank'=> 14,\n        'title'=> 'Forrest Gump',\n        'year'=> '1994',\n        'rating'=> 8.7\n    ));\n\n    $table->addRow (array (\n        'rank'=> 15,\n        'title'=> 'One Flew Over the Cuckoo\\'s Nest',\n        'year'=> '1975',\n        'rating'=> 8.7\n    ));\n\n    $table->addRow (array (\n        'rank'=> 16,\n        'title'=> 'The Lord of the Rings: The Two Towers',\n        'year'=> '2002',\n        'rating'=> 8.7\n    ));\n\n    $table->addRow (array (\n        'rank'=> 17,\n        'title'=> 'Goodfellas',\n        'year'=> '1990',\n        'rating'=> 8.7\n    ));\n\n    $table->addRow (array (\n        'rank'=> 18,\n        'title'=> 'Star Wars: Episode IV - A New Hope',\n        'year'=> '1977',\n        'rating'=> 8.7\n    ));\n\n    $table->addRow (array (\n        'rank'=> 19,\n        'title'=> 'The Matrix',\n        'year'=> '1999',\n        'rating'=> 8.7\n    ));\n\n    $table->addRow (array (\n        'rank'=> 20,\n        'title'=> 'Seven Samurai',\n        'year'=> '1954',\n        'rating'=> 8.7\n    ));\n\n    $this->addComponent ($table);\n\n  }\n}\n\n$db = new SampleDashboard();\n$db->renderStandalone();\n  \n"





}




]



},



{




"id": "form_component_demos",




"title": "Form Component",




"demos": [





{






"id": "input_types",






"title": "Input Types",






"desc": "Form component allows you to build simple and effective forms which work great on mobile devices.",






"js": "form",






"php": "form",






"doc": "/docs/dashboard/js/guide/components/filter/filter_configure.php",






"file": true,






"jsContent": "StandaloneDashboard(function (db) {\n    var form = new FormComponent ();\n    form.setDimensions (8, 6);\n    form.setCaption (\"Form items in stock\");\n    form.addSelectField (\"category\", \"Select Category\", [\"No Selection\", \"Beverages\", \"Condiments\", \"Confections\", \"Dairy Products\", \"Grains/Cereal\", \"Meat/Poultry\", \"Produce\", \"Seafood\"]);\n    form.addTextField (\"contains\", \"Product Name Contains\");\n    form.addNumericRangeField(\"stock\", \"Units In Stock\");\n    form.addCheckboxField(\"discontinued\", \"Exclude Discontinued Items\", false);\n    db.addComponent(form);\n});",






"phpContent": "<?php\nclass SampleDashboard extends StandaloneDashboard {\n  public function buildDashboard(){\n    $form = new FormComponent ('form');\n    $form->setDimensions (8, 6);\n    $form->setCaption ('Form items in stock');\n    $form->addSelectField ('category', 'Select Category', ['No Selection', 'Beverages', 'Condiments', 'Confections', 'Dairy Products', 'Grains/Cereal', 'Meat/Poultry', 'Produce', 'Seafood']);\n    $form->addTextField ('contains', 'Product Name Contains');\n    $form->addNumericRangeField('stock', 'Units In Stock', array(10, 100));\n    $form->addCheckboxField('discontinued', 'Exclude Discontinued Items', false);\n    $this->addComponent ($form);\n\n  }\n}\n\n$db = new SampleDashboard();\n$db->renderStandalone();\n  \n"





}




]



}


]

},

{


"id": "features",


"title": "Features",


"demos": [



{




"id": "chart_drilldown",




"title": "Drill Down",




"desc": "Quite often, you will need to allow your user to drill-down from yearly data to quarterly, quarterly to monthly (in a chart showing sales figures) or from categories to individual items (in a chart for a retail store). RazorFlow makes this very easy with and lets you create unlimited levels of drill-down charts from a single data source in minutes.",




"js": "chart_drilldown",




"php": "chart_drilldown",




"doc": "/docs/dashboard/js/guide/components/chart/chart_drilldown.php",




"file": true,




"jsContent": "rf.StandaloneDashboard(function(db){\n    var chart = new ChartComponent (\"chart\");\n    chart.setDimensions (8, 6);\n    chart.setCaption (\"Annual Sales Summary (2010 - 2013)\");\n    chart.setLabels ([\"2010\", \"2011\", \"2012\", \"2013\"]);\n    chart.addSeries (\"sales\", \"Sales\", [1160000, 1040000, 1020000, 1160000]);\n\n    chart.setYAxis(\"Sales\", {\n        numberPrefix: \"$\",\n        numberHumanize: true\n    });\n\n    var selectedYear;\n    var labelsForQuarters = {\n        \"Q1\": [\"January\", \"February\", \"March\"],\n        \"Q2\": [\"April\", \"May\", \"June\"],\n        \"Q3\": [\"July\", \"August\", \"September\"],\n        \"Q4\": [\"October\", \"November\", \"December\"]\n    };\n    var yearData = {\n        \"2010\": {\n            \"Q1\": [110000, 76000, 88000],\n            \"Q2\": [116000, 92000, 62000],\n            \"Q3\": [114000, 86000, 11800],\n            \"Q4\": [92000, 102000, 105000],\n            data:  [274000, 270000, 318000, 299000]\n        },\n        \"2011\": {\n            \"Q1\": [370000, 290000, 320000],\n            \"Q2\": [370000, 290000, 320000],\n            \"Q3\": [370000, 290000, 320000],\n            \"Q4\": [370000, 290000, 320000],\n            data: [306000, 203000, 270000, 264000]\n        },\n        \"2012\": {\n            \"Q1\": [87000, 89000, 65000],\n            \"Q2\": [13000, 44000, 106000],\n            \"Q3\": [85000, 103000, 67000],\n            \"Q4\": [59000, 69000, 113000],\n            data: [241000, 280000, 255000, 241000]\n        },\n        \"2013\": {\n            \"Q1\": [105000, 76000, 88000],\n            \"Q2\": [116000, 92000, 62000],\n            \"Q3\": [114000, 86000, 118000],\n            \"Q4\": [92000, 102000, 105000],\n            data: [269000, 270000, 318000, 299000]\n        }\n    }\n\n    chart.addDrillStep (function (done, params, updatedComponent) {\n        var label = selectedYear = params.label;\n        updatedComponent.setLabels ([\"Q1\", \"Q2\", \"Q3\", \"Q4\"]);\n        updatedComponent.addSeries (\"sales\", \"Sales\", yearData[label].data);\n        done();\n    });\n\n    chart.addDrillStep (function (done, params, updatedComponent) {\n        var label = params.label;\n        updatedComponent.setLabels (labelsForQuarters[label]);\n        updatedComponent.addSeries (\"sales\", \"Sales\", yearData[selectedYear][label]);\n        done();\n    });\n\n    db.addComponent (chart);\n});\n",




"phpContent": "<?php\n\nclass SampleDashboard extends StandaloneDashboard {\n  public function buildDashboard() {\n    $chart = new ChartComponent ('chart');\n    $chart->setDimensions (8, 6);\n    $chart->setCaption ('Annual Sales Summary (2010 - 2013');\n    $chart->setLabels (array('2010', '2011', '2012', '2013'));\n    $chart->addSeries ('sales', 'Sales', array(1160000, 1040000, 1020000, 1160000));\n\n    $chart->setYAxis('Sales', array (\n        'numberPrefix' => '$',\n        'numberHumanize' => true\n    ));\n\n    $selectedYear;\n    \n    $chart->addDrillStep ('firstDrill', $this);\n\n    $chart->addDrillStep ('secondDrill', $this);\n\n    $this->addComponent ($chart);\n  }\n    private $labelsForQuarters = array (\n        'Q1' => array('January', 'February', 'March'),\n        'Q2' => array('April', 'May', 'June'),\n        'Q3' =>  array('July', 'August', 'September'),\n        'Q4' => array('October', 'November', 'December')\n    );\n\n    private $yearData = array (\n        '2010' => array (\n            'Q1' => array(110000, 76000, 88000),\n            'Q2' => array(116000, 92000, 62000),\n            'Q3' => array(114000, 86000, 11800),\n            'Q4' => array(92000, 102000, 105000),\n            'data' =>  array(274000, 270000, 318000, 299000)\n        ),\n        '2011' => array (\n            'Q1' => array(370000, 290000, 320000),\n            'Q2' => array(370000, 290000, 320000),\n            'Q3' => array(370000, 290000, 320000),\n            'Q4' => array(370000, 290000, 320000),\n            'data' => array(306000, 203000, 270000, 264000)\n        ),\n        '2012' => array (\n            'Q1' => array(87000, 89000, 65000),\n            'Q2' => array(13000, 44000, 106000),\n            'Q3' => array(85000, 103000, 67000),\n            'Q4' => array(59000, 69000, 113000),\n            'data' => array(241000, 280000, 255000, 241000)\n        ),\n        '2013' => array (\n            'Q1' => array(105000, 76000, 88000),\n            'Q2' => array(116000, 92000, 62000),\n            'Q3' => array(114000, 86000, 118000),\n            'Q4' => array(92000, 102000, 105000),\n            'data' => array(269000, 270000, 318000, 299000)\n        )\n    );\n\n    private $selectedYear;\n\n    public function firstDrill ($source, $targets, $params) {\n        $label = $params[\"label\"];\n        $this->selectedYear = $label;\n        $source->setLabels (array('Q1', 'Q2', 'Q3', 'Q4'));\n        $source->addSeries ('sales', 'Sales', $this->yearData[$label][\"data\"]);\n    }\n\n    public function secondDrill ($source, $targets, $params) {\n        $label = $params[\"label\"];\n        $source->setLabels ($this->labelsForQuarters[$label]);\n        $source->addSeries ('sales', 'Sales', $this->yearData[$params['drillLabelList'][0]][$label]);\n    }\n}\n\n$db = new SampleDashboard();\n$db->renderStandalone();"



},



{




"id": "component_kpi",




"title": "Component KPIs",




"desc": "The Component KPIs are smaller indicators and metrics associated with a component, and are shown below it. This enables you to see related metrics in a quick and easy manner.",




"js": "kpi_component_kpi",




"php": "kpi_component_kpi",




"doc": "/docs/dashboard/js/guide/components/common/component_kpis.php",




"file": true,




"jsContent": "rf.StandaloneDashboard(function(db){\n    var chart = new ChartComponent(\"sales\");\n    chart.setDimensions (8, 6);\n    chart.setCaption(\"Sales - 2013 vs 2012\");\n    chart.setLabels ([\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"July\", \"Aug\", \"Sept\", \"Oct\", \"Nov\", \"Dec\"]);\n    chart.addSeries (\"sales2013\", \"2013\", [22400, 24800, 21800, 21800, 24600, 27600, 26800, 27700, 23700, 25900, 26800, 24800]);\n    chart.addSeries (\"sales2012\", \"2012\", [10000, 11500, 12500, 15000, 16000, 17600, 18800, 19700, 21700, 21900, 22900, 20800]);\n    chart.setYAxis(\"Sales\", {numberPrefix: \"$\", numberHumanize: true});\n    chart.addComponentKPI (\"max2012\", {\n        caption: \"Maximum sales in 2012\",\n        value: 22900,\n        numberPrefix: \" $\",\n        numberHumanize: true\n    });\n\n    chart.addComponentKPI(\"min2012\", {\n        caption: \"Lowest sales in 2012\",\n        value: 10000,\n        numberPrefix: \" $\",\n        numberHumanize: true\n    });\n\n    chart.addComponentKPI(\"max2013\", {\n        caption: \"Maximum sales in 2013\",\n        value: 27700,\n        numberPrefix: \" $\",\n        numberHumanize: true\n    });\n\n    chart.addComponentKPI(\"min2013\", {\n        caption: \"Lowest sales in 2013\",\n        value: 21800,\n        numberPrefix: \" $\",\n        numberHumanize: true\n    });\n\n    db.addComponent (chart);\n});\n",




"phpContent": "<?php\n\nclass SampleDashboard extends StandaloneDashboard {\n  public function buildDashboard(){\n    $chart = new ChartComponent();\n    $chart->setCaption(\"Sales - 2013 vs 2012\");\n    $chart->setDimensions (8, 6);\n    $chart->setLabels (array(\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"July\", \"Aug\", \"Sept\", \"Oct\", \"Nov\", \"Dec\"));\n    $chart->addSeries (\"sales2013\", \"2013\", array(22400, 24800, 21800, 21800, 24600, 27600, 26800, 27700, 23700, 25900, 26800, 24800));\n    $chart->addSeries (\"sales2012\", \"2012\", array(10000, 11500, 12500, 15000, 16000, 17600, 18800, 19700, 21700, 21900, 22900, 20800));\n    $chart->setYAxis('Sales', array(\"numberPrefix\"=> '$', \"numberHumanize\"=> true));\n    $chart->addComponentKPI('beverages', array(\n      'caption' => 'Maximum sales in 2012',\n      'value' => 22900,\n      'numberPrefix' => '$',\n      'numberHumanize' => true\n    ));\n    $chart->addComponentKPI('condiments', array(\n      'caption' => 'Lowest sales in 2012',\n      'value' => 10000,\n      'numberPrefix' => '$',\n      'numberHumanize' => true\n    ));\n    $chart->addComponentKPI('confections', array(\n      'caption' => 'Maximum sales in 2013',\n      'value' => 27700,\n      'numberPrefix' => '$',\n      'numberHumanize' => true\n    ));\n    $chart->addComponentKPI('daily_products', array(\n      'caption' => 'Lowest sales in 2013',\n      'value' => 21800,\n      'numberPrefix' => '$',\n      'numberHumanize' => true\n    ));\n    $this->addComponent ($chart);\n  }\n}\n\n$db = new SampleDashboard();\n$db->renderStandalone();\n  \n"



},



{




"id": "real_time",




"title": "Real Time",




"desc": "",




"js": "real_time",




"php": "real_time",




"doc": "/docs/dashboard/js/guide/components/chart/chart_update.php",




"file": true,




"jsContent": "rf.StandaloneDashboard(function(db){\n    var kpi = new GaugeComponent ();\n    kpi.setDimensions (4, 3);\n    kpi.setCaption (\"Current server load. In %\");\n    kpi.setLimits (0, 100);\n    kpi.setValue (Math.floor((Math.random() * 10)) + 40);\n\n    db.addComponent(kpi);\n\n\n    var chart = new ChartComponent(\"hashtags\");\n\tchart.setDimensions (8, 6);\n\tchart.setCaption(\"Number of tweets on top 5 hashtags\");\n\tchart.setLabels ([\"#android\", \"#ipad\", \"#news\", \"#salute\", \"#nowplaying\"]);\n\tchart.addSeries (\"tweets\", \"No. of tweets\", [220, 240, 218, 218, 246]);\n\tchart.setYAxis(\"\", {numberHumanize: true});\n\tdb.addComponent (chart);\n\n\tdb.setInterval(function () {\n\t\tkpi.setValue(Math.floor((Math.random() * 10)) + 40);\n        var data = [];\n        for(var i = 0; i < 5; i++) {\n            data.push(Math.floor((Math.random() * 200)) + 200);\n        }\n        chart.updateSeries (\"tweets\", data);\n    }, 1500);\n});",




"phpContent": "<?php\n\n// Adding real time support soon.\n"



}


]

}
];