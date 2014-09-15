<?php

class SampleDashboard extends StandaloneDashboard {
    public function buildDashboard () {
        $c1 = new ChartComponent('c1');
        $c1->setCaption("Column Chart");
        $c1->setDimensions(4, 4);
        $c1->setLabels(['January', 'February', 'March', 'April', 'May']);
        $c1->addSeries("seriesA", "Series A", [21, 33, 25, 41, 59], array('seriesDisplayType'=> 'column', 'numberPrefix' => '$'));
        $c1->setYAxis("", array(
            'minValue'=> 10,
            'maxValue'=> 60,
            'numTicks'=> 6
        ));
        $this->addComponent($c1);

        $c2 = new ChartComponent('c2');
        $c2->setCaption("Column Chart Dual Axis");
        $c2->setDimensions(4, 4);
        $c2->setLabels(['January', 'February', 'March', 'April', 'May']);
        $c2->addSeries("seriesA", "Series A", [21, 33, 25, 41, 59], array('seriesDisplayType' => 'column','numberPrefix' => '$'));
        $c2->addSeries("seriesB", "Series B", array_reverse([21, 33, 25, 41, 59]), array('seriesDisplayType' => 'column', 'numberPrefix' => '$', 'yAxis' => 'second'));
        $c2->setYAxis("", array(
            'minValue'=> 10,
            'maxValue'=> 60,
            'numTicks'=> 6
        ));

        $c2->addYAxis("second", "", array(
            'minValue'=> 10,
            'maxValue'=> 60,
            'numTicks'=> 6
        ));

        $this->addComponent($c2);

        $c3 = new ChartComponent('c3');
        $c3->setCaption("Column Chart Stacked");
        $c3->setDimensions(4, 4);
        $c3->setLabels(['January', 'February', 'March', 'April', 'May']);
        $c3->addSeries("seriesA", "Series A", [21, 33, 25, 41, 59], array('seriesDisplayType'=> 'column', 'numberPrefix'=> '$', 'seriesStacked'=> true));
        $c3->addSeries("seriesB", "Series B", array_reverse([21, 33, 25, 41, 59]), array('seriesDisplayType'=> 'column', 'numberPrefix'=> '$', 'seriesStacked'=> true));
        $c3->setYAxis("", array(
            'minValue'=> 21,
            'maxValue'=> 81,
            'numTicks'=> 6
        ));
        $this->addComponent($c3);

        $c4 = new ChartComponent('c4');
        $c4->setCaption("Column Chart Negative");
        $c4->setDimensions(4, 4);
        $c4->setLabels(['January', 'February', 'March', 'April', 'May']);
        $c4->addSeries("seriesA", "Series A", [21, 33, -25, 41, 59], array('seriesDisplayType'=> 'column', 'numberPrefix'=> '$'));
        $c4->setYAxis("", array(
            'minValue'=> -30,
            'maxValue'=> 60,
            'numTicks'=> 10
        ));
        $this->addComponent($c4);

        $c5 = new ChartComponent('c5');
        $c5->setCaption("Column Chart Dual Axis Negative");
        $c5->setDimensions(4, 4);
        $c5->setLabels(['January', 'February', 'March', 'April', 'May']);
        $c5->addSeries("seriesA", "Series A", [21, 33, -25, 41, 59], array('seriesDisplayType'=> 'column', 'numberPrefix'=> '$'));
        $c5->addSeries("seriesB", "Series B", array_reverse([21, 33, -25, 41, 59]), array('seriesDisplayType'=> 'column', 'numberPrefix'=> '$', 'yAxis'=> 'second'));
        $c5->setYAxis("", array(
            'minValue'=> -30,
            'maxValue'=> 60,
            'numTicks'=> 10
        ));

        $c5->addYAxis("second", "", array(
            'minValue'=> -30,
            'maxValue'=> 60,
            'numTicks'=> 10
        ));

        $this->addComponent($c5);

        $c6 = new ChartComponent('c6');
        $c6->setCaption("Column Chart Stacked Negative");
        $c6->setDimensions(4, 4);
        $c6->setLabels(['January', 'February', 'March', 'April', 'May']);
        $c6->addSeries("seriesA", "Series A", [21, 33, -25, 41, 59], array('seriesDisplayType'=> 'column', 'numberPrefix'=> '$', 'seriesStacked'=> true));
        $c6->addSeries("seriesB", "Series B", array_reverse([21, 33, -25, 41, 59]), array('seriesDisplayType'=> 'column', 'numberPrefix'=> '$', 'seriesStacked'=> true));
        $c6->setYAxis("", array(
            'minValue'=> -50,
            'maxValue'=> 90,
            'numTicks'=> 15
        ));
        $this->addComponent($c6);

        $c7 = new ChartComponent('c7');
        $c7->setCaption("Bar Chart");
        $c7->setDimensions(4, 4);
        $c7->setLabels(['January', 'February', 'March', 'April', 'May']);
        $c7->addSeries("seriesA", "Series A", [21, 33, 25, 41, 59], array('seriesDisplayType'=> 'bar', 'numberPrefix'=> '$'));
        $c7->setXAxis("", array(
            'minValue'=> 10,
            'maxValue'=> 60,
            'numTicks'=> 6
        ));
        $this->addComponent($c7);

        $c8 = new ChartComponent('c8');
        $c8->setCaption("Bar Chart Negative");
        $c8->setDimensions(4, 4);
        $c8->setLabels(['January', 'February', 'March', 'April', 'May']);
        $c8->addSeries("seriesA", "Series A", [21, 33, -25, 41, 59], array('seriesDisplayType'=> 'bar', 'numberPrefix'=> '$'));
        $c8->setXAxis("", array(
            'minValue'=> -30,
            'maxValue'=> 60,
            'numTicks'=> 10
        ));
        $this->addComponent($c8);

        $c9 = new ChartComponent('c9');
        $c9->setCaption("Bar Chart Stacked");
        $c9->setDimensions(4, 4);
        $c9->setLabels(['January', 'February', 'March', 'April', 'May']);
        $c9->addSeries("seriesA", "Series A", [21, 33, 25, 41, 59], array('seriesDisplayType'=> 'bar', 'numberPrefix'=> '$', 'seriesStacked'=> true));
        $c9->addSeries("seriesB", "Series B", array_reverse([21, 33, 25, 41, 59]), array('seriesDisplayType'=> 'bar', 'numberPrefix'=> '$', 'seriesStacked'=> true));
        $c9->setXAxis("", array(
            'minValue'=> 21,
            'maxValue'=> 81,
            'numTicks'=> 6
        ));
        $this->addComponent($c9);

        $c10 = new ChartComponent('c10');
        $c10->setCaption("Bar Chart Stacked Negative");
        $c10->setDimensions(4, 4);
        $c10->setLabels(['January', 'February', 'March', 'April', 'May']);
        $c10->addSeries("seriesA", "Series A", [21, 33, -25, 41, 59], array('seriesDisplayType'=> 'bar', 'numberPrefix'=> '$', 'seriesStacked'=> true));
        $c10->addSeries("seriesB", "Series B", array_reverse([21, 33, 25, 41, 59]), array('seriesDisplayType'=> 'bar', 'numberPrefix'=> '$', 'seriesStacked'=> true));
        $c10->setXAxis("", array(
            'minValue'=> -50,
            'maxValue'=> 90,
            'numTicks'=> 15
        ));
        $this->addComponent($c10);
    }
}

$db = new SampleDashboard();
$db->renderStandalone();