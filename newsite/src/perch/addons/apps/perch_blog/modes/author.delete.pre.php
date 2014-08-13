<?php
    
    $Authors = new PerchBlog_Authors($API);

    $HTML = $API->get('HTML');
    $Form = $API->get('Form');

    $Form->set_name('delete');

    if (!$CurrentUser->has_priv('perch_blog.authors.manage')) {
        PerchUtil::redirect($API->app_path());
    }
	
	$message = false;
	
	if (isset($_GET['id']) && $_GET['id']!='') {
	    $Author = $Authors->find($_GET['id']);
	}else{
	    PerchUtil::redirect($API->app_path());
	}
	

    if ($Form->submitted()) {
	
    	if (is_object($Author)) {
    	    $Author->delete();
    
            // clear the caches
            PerchBlog_Cache::expire_all();


    	    if ($Form->submitted_via_ajax) {
    	        echo $API->app_path().'/authors/';
    	        exit;
    	    }else{
    	       PerchUtil::redirect($API->app_path().'/authors/'); 
    	    }



        }else{
            $message = $HTML->failure_message('Sorry, that author could not be deleted.');
        }
    }

    
    
    $details = $Author->to_array();



?>