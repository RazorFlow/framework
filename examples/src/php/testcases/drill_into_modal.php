<?php

class SampleDashboard extends StandaloneDashboard {
    public function buildDashboard () {
        $chart1 = new ChartComponent('my_chart1');
        $chart1->setDimensions(6,4);
        $chart1->setCaption('Top 10 Genres by sales');
        $chart1->setLabels(['Rock', 'Latin', 'Metal', 'Alternative & Punk', 'TV Shows', 'Jazz', 'Blues', 'Drama', 'R&B/Soul', 'Classical']);
        $chart1->addSeries('sales', 'Sales', [826.25, 382.14, 261.36, 241.56, 93.53, 79.20, 60.39, 57.71, 40.59, 40.59]);
        $chart1->setYAxis('', array('numberPrefix' => '$'));

        $c2 = new ChartComponent('my_chart2');
        $c2->setDimensions(6,4);
        $c2->setCaption('Units By Year');
        $c2->hideComponent();

        $chart1->onItemClick(array($chart1, $c2), 'handleClick', $this);
        $this->addComponent($chart1);
        $this->addComponent($c2);
        
    }

    public function handleClick($source, $target, $params) {
        $chart = $this->getComponentByID('my_chart2');
        $chart->clearChart();
        $chart->setLabels(['2007', '2008', '2009', '2010']);
        $chart->addSeries('units', 'Currency', [45, 45, 23, 19]);
        $chart->showAsModal();
    }
}

$db = new SampleDashboard();
$db->renderStandalone();

