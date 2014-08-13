<?php
    
    $Authors = new PerchBlog_Authors($API);

    $HTML = $API->get('HTML');

    if (!$CurrentUser->has_priv('perch_blog.authors.manage')) {
        PerchUtil::redirect($API->app_path());
    }

    $authors = $Authors->all();
    
   

?>