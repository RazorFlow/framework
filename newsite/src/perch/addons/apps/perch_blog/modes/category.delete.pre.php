<?php
    
    $Categories = new PerchBlog_Categories($API);

    $HTML = $API->get('HTML');
    $Form = $API->get('Form');

    $Form->set_name('delete');

    if (!$CurrentUser->has_priv('perch_blog.categories.manage')) {
        PerchUtil::redirect($API->app_path());
    }
	
	$message = false;
	
	if (isset($_GET['id']) && $_GET['id']!='') {
	    $Category = $Categories->find($_GET['id']);
	}else{
	    PerchUtil::redirect($API->app_path());
	}
	

    if ($Form->submitted()) {
	
    	if (is_object($Category)) {
    	    $Category->delete();
    
            // clear the caches
            PerchBlog_Cache::expire_all();


    	    if ($Form->submitted_via_ajax) {
    	        echo $API->app_path().'/categories/';
    	        exit;
    	    }else{
    	       PerchUtil::redirect($API->app_path().'/categories/'); 
    	    }



        }else{
            $message = $HTML->failure_message('Sorry, that category could not be deleted.');
        }
    }

    
    
    $details = $Category->to_array();



?>