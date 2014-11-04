<?php

class SampleDashboard extends StandaloneDashboard {
	protected $tableData = array(
		array('name'=> "Broccoli", 'category'=> "Vegetables", 'price' => 14),
		array('name'=> "Cheese", 'category'=> "Dairy", 'price' => 18),
		array('name'=> "Tomatoes", 'category'=> "Vegetables", 'price' => 8),
		array('name'=> "Orange Juice", 'category'=> "Beverages", 'price' => 12),
		array('name'=> "Root Beer", 'category'=> "Beverages", 'price' => 13)
	);
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
		$quarterlySales->addComponentKPI ('beverage', array(
			'caption'=> 'Beverages',
			'value' => 22900,
			'numberPrefix' => ' $',
			'numberHumanize' => true
		));
		$quarterlySales->addComponentKPI('vegetable', array(
			'caption'=> 'Vegetables',
			'value' => 10401,
			'numberPrefix' => ' $',
			'numberHumanize' => true
		));
		$quarterlySales->addComponentKPI('dairy', array(
			'caption'=> 'Dairy',
			'value' => 27700,
			'numberPrefix' => ' $',
			'numberHumanize' => true
		));
		$this->addComponent ($quarterlySales);


		$numTickets = new KPIComponent ('numTickets');
		$numTickets->setDimensions (3, 3);
		$numTickets->setCaption ("Open Support Tickets");
		$numTickets->setValue (42);
		$this->addComponent ($numTickets);

		$satisfactionGauge = new GaugeComponent('satisfactionGauge');
		$satisfactionGauge->setDimensions(3, 3);
		$satisfactionGauge->setCaption('Customer Satisfaction');
		$satisfactionGauge->setValue(8);
		$satisfactionGauge->setLimits(0, 10);
		$this->addComponent($satisfactionGauge);

		$ticketPriorities = new KPIGroupComponent ('ticketPriorities');
		$ticketPriorities->setDimensions (6, 3);
		$ticketPriorities->setCaption('Ticket Priorities');
		$ticketPriorities->addKPI('high', array(
			'caption' => 'High Priority',
			'value' => 6
		));
		$ticketPriorities->addKPI('normal', array(
			'caption' => 'Normal Priority',
			'value' => 36
		));
		$this->addComponent ($ticketPriorities);
    }
}

$db = new SampleDashboard();
$db->renderStandalone();

