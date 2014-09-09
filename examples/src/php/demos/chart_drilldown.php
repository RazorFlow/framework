<?php

class SampleDashboard extends StandaloneDashboard {
  public function buildDashboard() {
    $chart = new ChartComponent ('chart');
    $chart->setDimensions (8, 6);
    $chart->setCaption ('Annual Sales Summary (2010 - 2013');
    $chart->setLabels (array('2010', '2011', '2012', '2013'));
    $chart->addSeries ('sales', 'Sales', array(1160000, 1040000, 1020000, 1160000));

    $chart->setYAxis('Sales', array (
        'numberPrefix' => '$',
        'numberHumanize' => true
    ));

    $selectedYear;
    
    $chart->addDrillStep ('firstDrill', $this);

    $chart->addDrillStep ('secondDrill', $this);

    $this->addComponent ($chart);
  }
    private $labelsForQuarters = array (
        'Q1' => array('January', 'February', 'March'),
        'Q2' => array('April', 'May', 'June'),
        'Q3' =>  array('July', 'August', 'September'),
        'Q4' => array('October', 'November', 'December')
    );

    private $yearData = array (
        '2010' => array (
            'Q1' => array(110000, 76000, 88000),
            'Q2' => array(116000, 92000, 62000),
            'Q3' => array(114000, 86000, 11800),
            'Q4' => array(92000, 102000, 105000),
            'data' =>  array(274000, 270000, 318000, 299000)
        ),
        '2011' => array (
            'Q1' => array(370000, 290000, 320000),
            'Q2' => array(370000, 290000, 320000),
            'Q3' => array(370000, 290000, 320000),
            'Q4' => array(370000, 290000, 320000),
            'data' => array(306000, 203000, 270000, 264000)
        ),
        '2012' => array (
            'Q1' => array(87000, 89000, 65000),
            'Q2' => array(13000, 44000, 106000),
            'Q3' => array(85000, 103000, 67000),
            'Q4' => array(59000, 69000, 113000),
            'data' => array(241000, 280000, 255000, 241000)
        ),
        '2013' => array (
            'Q1' => array(105000, 76000, 88000),
            'Q2' => array(116000, 92000, 62000),
            'Q3' => array(114000, 86000, 118000),
            'Q4' => array(92000, 102000, 105000),
            'data' => array(269000, 270000, 318000, 299000)
        )
    );

    private $selectedYear;

    public function firstDrill ($source, $targets, $params) {
        $label = $params["label"];
        $this->selectedYear = $label;
        $source->setLabels (array('Q1', 'Q2', 'Q3', 'Q4'));
        $source->addSeries ('sales', 'Sales', $this->yearData[$label]["data"]);
    }

    public function secondDrill ($source, $targets, $params) {
        $label = $params["label"];
        $source->setLabels ($this->labelsForQuarters[$label]);
        $source->addSeries ('sales', 'Sales', $this->yearData[$params['drillLabelList'][0]][$label]);
    }
}

$db = new SampleDashboard();
$db->renderStandalone();