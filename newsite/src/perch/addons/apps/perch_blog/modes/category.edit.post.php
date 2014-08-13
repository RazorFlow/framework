<?php
     
    # Side panel
    echo $HTML->side_panel_start();

    echo $HTML->para('Give the category a new name.');

    echo $HTML->side_panel_end();
    
    
    # Main panel
    echo $HTML->main_panel_start(); 

    include('_subnav.php');


    # Title panel
    if (is_object($Category)) {
        echo $HTML->heading1('Editing ‘%s’ Category', $details['categoryTitle']);
    }else{
        echo $HTML->heading1('Creating a New Category');
    }
        
    if ($message) echo $message;
    

    $template_help_html = $Template->find_help();
    if ($template_help_html) {
        echo $HTML->heading2('Help');
        echo '<div id="template-help">' . $template_help_html . '</div>';
    }


    echo $HTML->heading2('Category details');
        
    
    echo $Form->form_start();
    
        echo $Form->text_field('categoryTitle', 'Title', (isset($details['categoryTitle']) ? $details['categoryTitle'] : ''));
		echo $Form->hidden('categoryID', (isset($details['categoryID']) ? $details['categoryID'] : ''));
        
        echo $Form->fields_from_template($Template, $details, $Categories->static_fields);
        

        echo $Form->submit_field('btnSubmit', 'Save', $API->app_path().'/categories/');

    
    echo $Form->form_end();
    
    echo $HTML->main_panel_end();

?>