<?php

class SampleDashboard extends StandaloneDashboard {
    public function buildDashboard () {
        $table = new TableComponent('table1');
        $table->setCaption("Table 1");
        $table->setDimensions (6, 3);
        $table->setRowsPerPage (8);
        $table->addColumn('colA', "Column A");
        $table->addColumn('colB', "Column B");

        $table->setRowDataSource('paginate', $this);
        $table->setNumberOfRows(40);
        $table->setRowsPerPage(7);

        $this->addComponent ($table);
    }

  public function paginate($source, $targets, $params) { 
    $limit = $params['limit'];
    $take = $limit['skip'];
    $rows = array(
      array('colA' => 111 + $take, 'colB' => 22),
      array('colA' => 222 + $take, 'colB' => 33),
      array('colA' => 333 + $take, 'colB' => 44),
      array('colA' => 444 + $take, 'colB' => 55),
      array('colA' => 777 + $take, 'colB' => 88),
      array('colA' => 777 + $take, 'colB' => 88),
      array('colA' => 777 + $take, 'colB' => 88)
    );

    return $rows;
  }
}

$db = new SampleDashboard();
$db->renderStandalone();

