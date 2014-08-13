<?php
    
    $Categories = new PerchBlog_Categories($API);

    $HTML = $API->get('HTML');

    if (!$CurrentUser->has_priv('perch_blog.categories.manage')) {
        PerchUtil::redirect($API->app_path());
    }

    $categories = $Categories->all();
    
   

?>