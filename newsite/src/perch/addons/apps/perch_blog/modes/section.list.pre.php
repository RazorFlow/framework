<?php
    
    $Sections = new PerchBlog_Sections($API);

    $HTML = $API->get('HTML');

    if (!$CurrentUser->has_priv('perch_blog.sections.manage')) {
        PerchUtil::redirect($API->app_path());
    }

    $sections = $Sections->all();
    
   

?>