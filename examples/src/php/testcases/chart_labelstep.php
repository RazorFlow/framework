<?php

class SampleDashboard extends StandaloneDashboard {
    public function buildDashboard () {
        $labels = [];
        $data = [];
        $data2 = [];

        for($i=-1; ++$i<30;) {
            $labels[$i] = ($i+1) . ' Nov 2014';
            $data[$i] = rand(1, 20000);
            $data2[$i] = rand(1, 20000);
        }

        // $c1 = new ChartComponent("c1");
        // $c1->setCaption("Sales");
        // $c1->setDimensions(4, 4);
        // $c1->setLabels($labels);
        // $c1->addSeries("sales", "Sales", $data, array ("seriesDisplayType"=> 'column', "numberPrefix"=> '$'));
        // $this->addComponent ($c1);

        $c2 = new ChartComponent("c2");
        $c2->setCaption("Sales");
        $c2->setDimensions(6, 4);
        $c2->setLabels($labels);
        $c2->setYAxis ("Hello");
        $c2->addYAxis("quantity", "Quantity", array(
          "numberPrefix" => "#",
          'numberHumanize' => true
          ));
        $c2->addSeries("sales", "Sales", $data, array ("seriesDisplayType"=> 'column', "numberPrefix"=> '$', 'numberHumanize' => true));
        $c2->addSeries("sales2", "Sales", $data2, array ("seriesDisplayType"=> 'column', "numberPrefix"=> '$', 'yAxis' => 'quantity', 'numberHumanize' => true));
        $c2->setLabelStep (5);
        $this->addComponent ($c2);
    }
}

$db = new SampleDashboard();
$db->renderStandalone();
