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
		$quarterlySales->addDrillStep ('drillIntoMonths', $this);
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

		$productsTable = new TableComponent ('productsTable');
		$productsTable->setDimensions (6, 6);
		$productsTable->setCaption ('Products');
		$productsTable->addColumn ('name', 'Name');
		$productsTable->addColumn ('category', 'Category');
		$productsTable->addColumn ('price', 'Price', array(
			'dataType' => "number",
			'numberPrefix' => "$",
			'textAlign' => "right",
			'numberForceDecimals' => true
		));
		$productsTable->addMultipleRows ($this->tableData);
		$this->addComponent($productsTable);

		$productFilterForm = new FormComponent ('productFilterForm');
		$productFilterForm->setDimensions (6, 6);
		$productFilterForm->setCaption ('Filter Products');
		$productFilterForm->addMultiSelectField ('category', 'Select Category', array('Vegetables', 'Dairy', 'Beverages'));
		$productFilterForm->addTextField ('name', 'Product Name Contains');
		$productFilterForm->addNumericRangeField('price', 'Price', array(5, 20));
		$this->addComponent($productFilterForm);

        $productFilterForm->onApplyClick(array($productsTable), 'handleApplyClick', $this);
    }

	public function handleApplyClick ($source, $targets, $params) {
		$inputValues = $source->getAllInputValues();
		$productsTable = $this->getComponentById ('productsTable');
		$productsTable->clearRows ();
		$filtered_rows = array();

		foreach($this->tableData as $row) {
			if(isset($inputValues['name']) && strpos($row['name'], $inputValues['name']) === FALSE)
				continue;
			if(isset($inputValues['price']) && !($row['price'] >= $inputValues['price'][0] && $row['price'] <= $inputValues['price'][1]))
				continue;
			if(isset($inputValues['category']) && array_search($row['category'], $inputValues['category']['text']) === FALSE)
				continue;

			$filtered_rows []= $row;
		}

		$productsTable->addMultipleRows ($filtered_rows);
	}

	public function drillIntoMonths ($source, $target, $params) {
		$quarterlyData = array(
			'Q1'=> array(
				'labels' => array("Jan", "Feb", "March"),
				'data' => array(
					'quantity' => array(19, 46, 56),
					'sales' => array(3747, 3318, 6057)
				)
			),
			'Q2'=> array(
				'labels' => array("April", "May", "June"),
				'data' => array(
					'sales' => array(11857, 17435, 12020),
					'quantity' => array(82, 163, 147)
				)
			),
			'Q3'=> array(
				'labels' => array("July", "Aug", "Sep"),
				'data' => array(
					'sales' => array(12714, 15418, 18000),
					'quantity' => array(102, 156, 162)
				)
			),
			'Q4'=> array(
				'labels' => array("Oct", "Nov", "Dec"),
				'data' => array(
					'sales' => array(14342, 21721, 15072),
					'quantity' => array(145, 207, 137)
				)
			)
		);

		$quarterlySales = $this->getComponentById('quarterlySales');
		$drillData = $quarterlyData[$params['label']];
		$quarterlySales->setLabels ($drillData['labels']);
		$quarterlySales->addSeries('sales', "Sales", $drillData['data']['sales'], array(
			'numberPrefix' => "$ "
		));
		$quarterlySales->addSeries('quantity', "Quantity", $drillData['data']['quantity'], array(
			'yAxis' => 'quantity'
		));	
	}
}

$db = new SampleDashboard();
$db->renderStandalone();

