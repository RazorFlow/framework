<?php
     
    # Side panel
    echo $HTML->side_panel_start();

    echo $HTML->para('Edit the author details');

    echo $HTML->side_panel_end();
    
    
    # Main panel
    echo $HTML->main_panel_start(); 

    include('_subnav.php');


    # Title panel
    echo $HTML->heading1('Editing Author ‘%s’', trim($details['authorGivenName']. ' '.$details['authorFamilyName']));


    
    if ($message) echo $message;


    $template_help_html = $Template->find_help();
    if ($template_help_html) {
        echo $HTML->heading2('Help');
        echo '<div id="template-help">' . $template_help_html . '</div>';
    }

    
    echo $HTML->heading2('Author details');
        
    
    echo $Form->form_start('edit', 'magnetic-save-bar');
    
        echo $Form->text_field('authorGivenName', 'Given name', $details['authorGivenName']);
        echo $Form->text_field('authorFamilyName', 'Family name', $details['authorFamilyName']);
        echo $Form->text_field('authorSlug', 'Slug', $details['authorSlug']);
        echo $Form->text_field('authorEmail', 'Email address', $details['authorEmail']);

        echo $Form->fields_from_template($Template, $details, $Authors->static_fields);
       
        

        echo $Form->submit_field('btnSubmit', 'Save', $API->app_path().'/categories/');

    
    echo $Form->form_end();
    
    echo $HTML->main_panel_end();

?>