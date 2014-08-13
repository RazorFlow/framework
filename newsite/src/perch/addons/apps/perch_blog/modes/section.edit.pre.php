<?php
    
    $Sections = new PerchBlog_Sections($API);

    $HTML = $API->get('HTML');
    $Form = $API->get('Form');
	
    $message = false;

    if (!$CurrentUser->has_priv('perch_blog.sections.manage')) {
        PerchUtil::redirect($API->app_path());
    }
    
    
    if (isset($_GET['id']) && $_GET['id']!='') {
        $sectionID = (int) $_GET['id'];    
        $Section = $Sections->find($sectionID);
        $details = $Section->to_array();
    }else{
        $sectionID = false;
        $Section = false;
        $details = array();
    }


    $Template   = $API->get('Template');
    $Template->set('blog/section.html', 'blog');
    $tags = $Template->find_all_tags();

          

    $Form->require_field('sectionTitle', 'Required');
    $Form->set_required_fields_from_template($Template);

    if ($Form->submitted()) {
		$postvars = array('sectionTitle');
		
    	$data = $Form->receive($postvars);

        $prev = false;

        if (isset($details['sectionDynamicFields'])) {
            $prev = PerchUtil::json_safe_decode($details['sectionDynamicFields'], true);
        }
        
        $dynamic_fields = $Form->receive_from_template_fields($Template, $prev);
        $data['sectionDynamicFields'] = PerchUtil::json_safe_encode($dynamic_fields);
    	
        if (!is_object($Section)) {
            $data['sectionSlug'] = PerchUtil::urlify($data['sectionTitle']);
            $Section = $Sections->create($data);
            PerchUtil::redirect($API->app_path() .'/sections/edit/?id='.$Section->id().'&created=1');
        }


        $Section->update($data);
    	
        if (is_object($Section)) {
            $message = $HTML->success_message('Your section has been successfully edited. Return to %ssection listing%s', '<a href="'.$API->app_path() .'/sections">', '</a>');
        }else{
            $message = $HTML->failure_message('Sorry, that section could not be edited.');
        }
        
        // clear the caches
        PerchBlog_Cache::expire_all();
        
        $details = $Section->to_array();
    }

    if (isset($_GET['created']) && !$message) {
        $message = $HTML->success_message('Your section has been successfully created. Return to %ssection listing%s', '<a href="'.$API->app_path() .'/sections">', '</a>');
    }

?>