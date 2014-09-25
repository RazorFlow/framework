<?php

class SampleDashboard extends StandaloneDashboard {
    public function buildDashboard () {
        $chart1 = new ChartComponent('c');
        $chart1->setDimensions(6,4);
        $chart1->setCaption('Top 10 Genres by sales');
        $chart1->setLabels(['Rock', 'Latin', 'Metal', 'Alternative & Punk', 'TV Shows', 'Jazz', 'Blues', 'Drama', 'R&B/Soul', 'Classical']);
        $chart1->addSeries('sales', 'Ȁ ȁ Ȃ ȃ Ȅ ȅ Ȇ ȇ Ȉ ȉ Ȋ ȋ Ȍ ȍ Ȏ ȏ Ȑ ȑ Ȓ ȓ Ȕ ȕ Ȗ ȗ Ș ș Ț ț Ȝ ȝ Ȟ ȟ', [826.25, 382.14, 261.36, 241.56, 93.53, 79.20, 60.39, 57.71, 40.59, 40.59]);
        $chart1->setYAxis('', array('numberPrefix' => '$'));
        $this->addComponent($chart1);
    }
}

$db = new SampleDashboard();
$db->renderStandalone();
