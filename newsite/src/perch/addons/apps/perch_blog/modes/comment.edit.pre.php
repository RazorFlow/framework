<?php
    
    $HTML = $API->get('HTML');

	$Form = $API->get('Form');

    $message = false;

    $Comments = new PerchBlog_Comments;
    $Posts = new PerchBlog_Posts;
    include(realpath('.').'/../../PerchBlog_Akismet.class.php');


    if (!$CurrentUser->has_priv('perch_blog.comments.moderate')) {
        PerchUtil::redirect($API->app_path());
    }


     if (isset($_GET['id']) && $_GET['id']!='') {
         $commentID = (int) $_GET['id'];    
         $Comment = $Comments->find($commentID);
         $details = $Comment->to_array();
     }else{
         $message = $HTML->failure_message('Sorry, that comment could not be found.');
     }


    $Template   = $API->get('Template');
    $Template->set('blog/comment.html', 'blog');
    $tags = $Template->find_all_tags();

    $Form->set_required_fields_from_template($Template);

     if ($Form->submitted()) {
 		$postvars = array('perch_commentName', 'perch_commentEmail', 'perch_commentHTML', 'commentStatus', 'perch_commentDateTime', 'perch_commentURL');

     	$data = $Form->receive($postvars);

        if (PerchUtil::count($data)) 
        foreach($data as $key=>$val) {
            if (strpos($key, 'perch_')===0) {
                $data[str_replace('perch_', '', $key)] = $val;
                unset($data[$key]);
            }
        }

        $dynamic_fields = $Form->receive_from_template_fields($Template, $details);
        $data['commentDynamicFields'] = PerchUtil::json_safe_encode($dynamic_fields);

        if ($Comment->commentStatus()!=$data['commentStatus']) {
            // status has changed
            
            // was the comment live? If so update the post's comment count.
            if ($Comment->commentStatus()=='LIVE') {
                $Post = $Posts->find($Comment->postID());
                if ($Post) $Post->update_comment_count();
            }


            $Comment->set_status($data['commentStatus']);           
            
        }

        PerchUtil::debug($data);

        $Comment->update($data);

        if (is_object($Comment)) {
            $message = $HTML->success_message('The comment has been successfully edited.');
        }else{
            $message = $HTML->failure_message('Sorry, that comment could not be edited.');
        }

        
        
     }

     $details = $Comment->to_array();
 
?>