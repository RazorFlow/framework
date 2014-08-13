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
    

    if (PerchUtil::count($files)) {

        echo $Form->form_start('import', 'magnetic-save-bar');

        $values = array();
        $opts   = array();
        $opts[] = array('label'=>$Lang->get('Please select'),'value'=>'');
        if(is_array($files)) {
            foreach($files as $file) {
                $opts[] = array('label'=>$file,'value'=>urlencode($file));
            }

            echo $Form->select_field('file', 'Import file', $opts, '');
        }


        $values = array();
        $opts   = array();
        $opts[] = array('label'=>'WordPress','value'=>'wordpress');
        $opts[] = array('label'=>'Posterous','value'=>'posterous');
        
        echo $Form->select_field('type', 'File type', $opts, '');
        

        $values = array();
        $opts   = array();
        $opts[] = array('label'=>'HTML','value'=>'html');
        $opts[] = array('label'=>'Textile','value'=>'textile');
        
        
echo $Form->hint('If you have a lot of content to import, you expect this to take a little while.');
        
        echo $Form->select_field('format', 'Format posts as', $opts, '');


        $Sections = new PerchBlog_Sections;
        $sections = $Sections->all();
        if (PerchUtil::count($sections)>1) {
            $opts = array();
            foreach($sections as $section) {
                $opts[] = array('label'=>$section->sectionTitle(), 'value'=>$section->id());        
            }  
            echo $Form->select_field('section', 'Section', $opts, '');  
        }

        


        echo $Form->submit_field('btnSubmit', 'Import', $API->app_path());


        echo $Form->form_end();



    }else{

        echo $HTML->para('Place your blog export file in %s/addons/apps/perch_blog/import_data%s', '<code>'.PERCH_LOGINPATH, '</code>');
    }


    
     
    echo $HTML->main_panel_end();


?>