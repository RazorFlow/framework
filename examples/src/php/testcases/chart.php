<?php

class SampleDashboard extends StandaloneDashboard {
    public function buildDashboard () {
        $chart1 = new ChartComponent('c');
        $chart1->setDimensions(6,4);
        $chart1->setCaption('Top 10 Genres by sales');
        $chart1->setLabels(['Rock', 'Latin', 'Metal', 'Alternative & Punk', 'TV Shows', 'Jazz', 'Blues', 'Drama', 'R&B/Soul', 'Classical']);
        $chart1->addSeries('sales', 'Sales', [826.25, 382.14, 261.36, 241.56, 93.53, 79.20, 60.39, 57.71, 40.59, 40.59]);
        $chart1->setYAxis('', array('numberPrefix' => '$'));
        $this->addComponent($chart1);
        $chart1->setComponentOrderIndex(4);

        $c2 = new ChartComponent('b');
        $c2->setDimensions(6,4);
        $c2->setCaption('Units By Year');
        $c2->setLabels(['2007', '2008', '2009', '2010', '2011']);
        $c2->addSeries('units', 'Units', [454, 455, 236, 195, 442], array('seriesDisplayType' => 'line'));
        $this->addComponent($c2);
        $c2->setComponentOrderIndex(3);

        $c3 = new ChartComponent('a');
        $c3->setDimensions(6,4);
        $c3->setCaption('Unit Distribution By Genre');
        $c3->setLabels(['Rock', 'Jazz', 'Blues', 'Metal', 'Latin']);
        $c3->addSeries('sales', 'Sales', [46.16, 4.42, 13.49, 14.59, 21.34], array('seriesDisplayType' => 'pie','numberSuffix' => '%'));
        $this->addComponent($c3, 2);

        $c4 = new ChartComponent('d');
        $c4->setDimensions(6, 4);
        $c4->setCaption('Yearly Sales for Top 5 Genres');
        $c4->setLabels(['2007', '2008', '2009', '2010', '2011']);
        $c4->addSeries('rock', 'Rock', [178.20, 155.43, 161.37, 157.41, 174.24], array('numberPrefix' => "$"));
        $c4->addSeries('latin', 'Latin', [82.17, 77.22, 80.19, 63.36, 79.20], array('numberPrefix' => "$"));
        $c4->addSeries('metal', 'Metal', [61.38, 53.46, 30.69, 80.39, 44.45], array('numberPrefix' => "$"));
        $c4->addSeries('blues', 'Blues', [62.37, 59.60, 45.54, 38.61, 5.94], array('numberPrefix' => "$"));
        $c4->addSeries('jazz', 'Jazz', [174.24, 79.20, 55.45, 55.44, 21.78], array('numberPrefix' => "$"));
        $c4->setYAxis('', array('numberPrefix' => '$'));
        $this->addComponent($c4, 1);

        $c5 = new ChartComponent('e');
        $c5->setDimensions(6, 4);
        $c5->setCaption('Revenue by year');
        $c5->setLabels(['2007', '2008', '2009', '2010', '2011']);
        $c5->addSeries('revenueUS', 'Revenue in US', [449.46, 481.45, 483.44, 463.67, 450.58], array('numberPrefix' => '$'));
        $c5->addSeries('revenueUK', 'Revenue in UK', [454, 455, 456, 433, 442], array('seriesDisplayType' => 'line','numberPrefix' => '$'));
        $c5->setYAxis('', array('numberPrefix' => '$'));
        $this->addComponent($c5, 0);
    }
}

$db = new SampleDashboard();
$db->renderStandalone();
