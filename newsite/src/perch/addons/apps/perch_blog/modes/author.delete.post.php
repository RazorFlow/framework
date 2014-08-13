<?php 

    # Side panel
    echo $HTML->side_panel_start();
    echo $HTML->heading3('Delete Author');
    echo $HTML->para('You normally should not need to delete an author. Think carefully before deleting an author because it will leave their posts without an author. For this reason, authors can continue to exist even once a user account has been removed.');
    echo $HTML->side_panel_end();
    
    
    # Main panel
    echo $HTML->main_panel_start(); 

    include('_subnav.php');

    echo $Form->form_start();
    
    if ($message) {
        echo $message;
    }else{
        echo $HTML->warning_message('Are you sure you wish to delete the author %s?', '<strong>'.trim($details['authorGivenName'].' '.$details['authorFamilyName']).'</strong>');
        echo $Form->form_start();
		echo $Form->submit_field('btnSubmit', 'Delete', $API->app_path().'/authors/');
        echo $Form->form_end();
    }
    
    echo $HTML->main_panel_end();

?>