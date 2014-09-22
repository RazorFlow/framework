<?php

class SampleDashboard extends StandaloneDashboard {

    public function buildDashboard () {

        $table = new TableComponent('table1');
        $table->setCaption("Movies & Ratings");
        $table->setDimensions (6,6);
        $table->setRowsPerPage (8);
        $table->addColumn('rank', "Rank");
        $table->addColumn('title', "Title");
        $table->addColumn('rating', "Rating");

        $table->addRow(array('rank' => 1, 'title' =>'The Shawshank Redemption', 'rating' => 9.2));
        $table->addRow(array('rank' => 2, 'title' =>'The Godfather', 'rating' => 9.2));
        $table->addRow(array('rank' => 3, 'title' =>'The Godfather part II', 'rating' => 9));
        $table->addRow(array('rank' => 4, 'title' =>'The Dark Knight', 'rating' => 8.9));
        $table->addRow(array('rank' => 5, 'title' =>'Pulp Fiction', 'rating' => 8.9));
        $table->addRow(array('rank' => 6, 'title' =>'The Good, the Bad and the Ugly', 'rating' => 8.9));
        $table->addRow(array('rank' => 7, 'title' =>'Schindler"s List', 'rating' => 8.9));
        $table->addRow(array('rank' => 8, 'title' =>'Angry Men', 'rating' => 8.9));

        $filter = new FormComponent('form');
        $filter->setCaption('Filter');
        $filter->setDimensions(5, 3);
        $filter->addSelectField('rating_filter', 'Rating Greater Than', array(5, 6, 7, 8));

        $filter->onApplyClick(array($table), 'handleApplyClick', $this);

        $this->addComponent ($table);
        $this->addComponent ($filter);

    }

    public function handleApplyClick($source, $targets, $values) {
      $inputValues = $source->getAllInputValues();

      //Handle Rest of the logic here.

    }
}

$db = new SampleDashboard();
$db->renderStandalone();
