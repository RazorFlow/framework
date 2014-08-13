<?php
    
    $Blog       = new PerchBlog_Posts($API);
    $Categories = new PerchBlog_Categories($API);
    $Authors    = new PerchBlog_Authors($API);

    $HTML = $API->get('HTML');
    $Form = $API->get('Form');
	
	$message = false;

    if (!$CurrentUser->has_priv('perch_blog.post.delete')) {
        PerchUtil::redirect($API->app_path());
    }
	
	if (isset($_GET['id']) && $_GET['id']!='') {
	    $Post = $Blog->find($_GET['id'], true);
	}
	
	
	if (!is_object($Post)) PerchUtil::redirect($API->app_path());
	
	
	$Form->set_name('delete');

    if ($Form->submitted()) {
    	if (is_object($Post)) {
    	    $Post->delete();
            $Categories->update_post_counts();
            $Authors->update_post_counts();
    	    
    	    if ($Form->submitted_via_ajax) {
    	        echo $API->app_path().'/';
    	        exit;
    	    }else{
    	       PerchUtil::redirect($API->app_path().'/'); 
    	    }
    	    
            
        }else{
            $message = $HTML->failure_message('Sorry, that post could not be deleted.');
        }
    }

    
    
    $details = $Post->to_array();



?>