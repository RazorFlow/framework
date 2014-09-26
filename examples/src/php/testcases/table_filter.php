<?php

class SampleDashboard extends StandaloneDashboard {

    private $rows;

    // This method is automatically called by the RazorFlow framework before calling the buildDashboard method. This acts like a constructor for RazorFlow framework.
    public function initialize() {
        $this->rows = array(
            array('rank' => 1, 'title' =>'The Shawshank Redemption', 'rating' => 5.2),
            array('rank' => 2, 'title' =>'The Godfather', 'rating' => 9.2),
            array('rank' => 3, 'title' =>'The Godfather part II', 'rating' => 3.4),
            array('rank' => 4, 'title' =>'The Dark Knight', 'rating' => 8.9),
            array('rank' => 5, 'title' =>'Pulp Fiction', 'rating' => 5.9),
            array('rank' => 6, 'title' =>'The Good, the Bad and the Ugly', 'rating' => 6.9),
            array('rank' => 7, 'title' =>'Schindler"s List', 'rating' => 8.9),
            array('rank' => 8, 'title' =>'Angry Men', 'rating' => 4.9)
        );
    }

    public function buildDashboard () {

        $table = new TableComponent('table1');
        $table->setCaption("Movies & Ratings");
        $table->setDimensions (6,6);
        $table->setRowsPerPage (8);
        $table->addColumn('rank', "Rank");
        $table->addColumn('title', "Title");
        $table->addColumn('rating', "Rating");

        $table->addMultipleRows($this->rows); // Adding multiple rows at once

        $filter = new FormComponent('form');
        $filter->setCaption('Filter');
        $filter->setDimensions(5, 3);
        $filter->addSelectField('rating_filter', 'Rating Greater Than', array(5, 6, 7, 8, 9));


        $filter->onApplyClick(array($table), 'handleApplyClick', $this);

        $this->addComponent ($table);
        $this->addComponent ($filter);

    }

    public function handleApplyClick($source, $targets, $values) {
      $inputValues = $source->getAllInputValues();
      $rating_filter = $inputValues['rating_filter'];

      $table = $this->getComponentByID('table1');
      $table->clearRows(); //Clear all the table rows



     $table->addMultipleRows($this->filterByRating($rating_filter['text'])); 

    }

    private function filterByRating($rating) {
        $rows = array();

        foreach ($this->rows as $value) {
            if($value['rating'] > $rating) {
                $rows []= $value;
            }
        }

        return $rows;
    }
}

$db = new SampleDashboard();
$db->renderStandalone();
