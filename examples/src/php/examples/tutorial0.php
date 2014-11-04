<?php

class SampleDashboard extends StandaloneDashboard {
	public function buildDashboard(){
		$quarterlySales = new ChartComponent('quarterlySales');
		$quarterlySales->setDimensions (6, 6);
		$quarterlySales->setCaption("Quarterly Sales");
		$quarterlySales->setLabels (array("Q1", "Q2", "Q3", "Q4"));
		$quarterlySales->addYAxis('quantity', "Quantity");
		$quarterlySales->addSeries('sales', "Sales", array(13122, 41312, 46132, 51135), array(
			'numberPrefix' => "$"
		));
		$quarterlySales->addSeries('quantity', "Quantity", array(121, 392, 420, 489), array(
			'yAxis' => 'quantity'

		));
		$this->addComponent ($quarterlySales);
    }
}

$db = new SampleDashboard();
$db->renderStandalone();

