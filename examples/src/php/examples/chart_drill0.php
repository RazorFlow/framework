<?php

class SampleDashboard extends StandaloneDashboard {
    public function buildDashboard(){
		$chart = new ChartComponent ("chart1");
		$chart->setCaption ("Country wide sales");
		$chart->setLabels (["Country A", "Country B", "Country C"]);
		$chart->setDimensions (6, 6);
		$chart->addSeries ("sales", "Sales", [10, 7, 11]);
		$chart->addDrillStep ("drill_states", $this);
		$chart->addDrillStep ("drill_countries", $this);
		$this->addComponent($chart);
    }

    public function drill_states ($source, $target, $params) {
    	$source->setCaption("States in ".$params["label"]);
	    $source->setLabels (["State A", "State B"]);
	    $source->addSeries ("sales", "Sales", [4, 3]);
    }

    public function drill_countries ($source, $target, $params) {
    	$source->setCaption("Cities in ".$params["label"]);
	    $source->setLabels ([ "City A", "City B", "City C", "City D"]);
	    $source->addSeries ("sales", "Sales", [3, 1, 4, 2]);
	}
}

$db = new SampleDashboard();
$db->renderStandalone();
  