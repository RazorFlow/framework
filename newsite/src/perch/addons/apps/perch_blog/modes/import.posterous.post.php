<?php 
    # Side panel
    echo $HTML->side_panel_start();
 
    echo $HTML->para('This page lists the data files you have available to import.');
    
    echo $HTML->side_panel_end();
     
    # Main panel
    echo $HTML->main_panel_start();

	include ('_subnav.php');

	# Title panel
    echo $HTML->heading1('Importing Data');
    

    if ($file) {

        $results = $BlogUtil->import_from_posterous($file, null, null, $sectionID);

        if (PerchUtil::count($results)) {
            echo '<ul class="importables">';
            foreach($results as $result) {
                echo '<li class="icon '.$result['type'].'">';
                echo implode(' &mdash; ', $result['messages']);
                echo '</li>';
            }
            echo '</ul>';
        }

    }

    
     
    echo $HTML->main_panel_end();


?>