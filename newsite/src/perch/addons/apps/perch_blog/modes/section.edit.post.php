<?php
     
    # Side panel
    echo $HTML->side_panel_start();

    echo $HTML->para('Give the section a new name.');

    echo $HTML->side_panel_end();
    
    
    # Main panel
    echo $HTML->main_panel_start(); 

    include('_subnav.php');


    # Title panel
    if (is_object($Section)) {
        echo $HTML->heading1('Editing ‘%s’ Section', $details['sectionTitle']);
    }else{
        echo $HTML->heading1('Creating a New Section');
    }
        
    if ($message) echo $message;
    

    $template_help_html = $Template->find_help();
    if ($template_help_html) {
        echo $HTML->heading2('Help');
        echo '<div id="template-help">' . $template_help_html . '</div>';
    }


    echo $HTML->heading2('Section details');
        
    
    echo $Form->form_start();
    
        echo $Form->text_field('sectionTitle', 'Title', (isset($details['sectionTitle']) ? $details['sectionTitle'] : ''));
		echo $Form->hidden('sectionID', (isset($details['sectionID']) ? $details['sectionID'] : ''));
        
        echo $Form->fields_from_template($Template, $details, $Sections->static_fields);
        

        echo $Form->submit_field('btnSubmit', 'Save', $API->app_path().'/sections/');

    
    echo $Form->form_end();
    
    echo $HTML->main_panel_end();

?>