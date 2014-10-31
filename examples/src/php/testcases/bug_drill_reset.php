<?php

class CompareDB extends StandaloneDashboard {

	public function buildDashboard () {
		
		$chart = new ChartComponent('dataChart');
		$chart->setCaption("Compare data chart");
		
		$monthList = array();
		
		for($m=1; $m<=12; $m++){
			$monthList[] = date('M', mktime(0,0,0,$m,1));
		}

		$chart->setLabels($monthList);
		 
		$chart->setDimensions(12,6);
		$chart->addSeries("data_2013", "Data 2013", [1,2,3,4,5,6,7,8,9,10,11,12]);
		$chart->addSeries("data_2014", "Data 2014", [2,3,4,5,6,7,8,9,10,11,12,13]);
		$chart->addDrillStep("drill_Data", $this);
		$this->addComponent($chart);
	}
	
	public function drill_Data($source, $target, $params){
			
		$label = ["A 2013", "B 2013", "C 2013"];
		$value = [1,2,3];
		
		if ($params['seriesIndex'] == 2){
			$label = ["A 2014", "B 2014", "C 2014"];
			$value = [3,2,1];
		} 
		
		$source->clearChart();
		$source->setCaption("Data in ". $params["label"]);
		$source->setLabels($label);
		$source->addSeries("data2", "Data", $value);	
	}
}

$db = new CompareDB();
$db->renderStandalone();