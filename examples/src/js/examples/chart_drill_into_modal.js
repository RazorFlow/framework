rf.StandaloneDashboard(function(db){
	var sourceChart = new ChartComponent();
    sourceChart.setDimensions (4, 4);
    sourceChart.setCaption("2011 Sales"); 
    sourceChart.setLabels (["Beverages", "Vegetables"])
    sourceChart.addSeries ("sales", "Sales", [1343, 7741]);
    sourceChart.addSeries ("quantity", "Quantity", [76, 119]);
    db.addComponent (sourceChart);

	var targetChart = new ChartComponent();
    targetChart.hideComponent();
    db.addComponent (targetChart);

	sourceChart.onItemClick(function(params) {
        targetChart.lock();
        targetChart.setCaption ("Zone-wise breakdown of " + params.label);
        // You can form/process the data as required.
        targetChart.setLabels (["North Zone", "South Zone"]);
        targetChart.addSeries ("sales", "Sales", [21, 46]);
        targetChart.showAsModal();
        targetChart.unlock();
    });
});
