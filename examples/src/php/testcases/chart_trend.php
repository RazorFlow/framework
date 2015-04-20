<?php

class SampleDashboard extends StandaloneDashboard {
    public function buildDashboard () {
        $c2 = new ChartComponent('b');
        $c2->setDimensions(6,4);
        $c2->setCaption('Units By Year');
        $c2->setLabels(['2007', '2008', '2009', '2010', '2011']);
        $c2->addSeries('units', 'Units', [454, 455, 236, 195, 442], array('seriesDisplayType' => 'line'));
        $c2->addTrendLine (250, "Average");
        $this->addComponent($c2);
    }
}

$db = new SampleDashboard();
$db->renderStandalone();
