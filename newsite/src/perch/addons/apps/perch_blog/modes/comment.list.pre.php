<?php
    
    $HTML = $API->get('HTML');
    
    
    $Paging = $API->get('Paging');
    $Paging->set_per_page(20);
    
    $Comments = new PerchBlog_Comments($API);
    $Posts = new PerchBlog_Posts($API);


	$Form = $API->get('Form');

    if ($Form->posted() && $Form->validate()) {

        $comments = $Form->find_items('comment-', true);
        if (PerchUtil::count($comments)) {
            $status = $_POST['commentStatus'];
            foreach($comments as $commentID) {

                $Comment = $Comments->find($commentID);

                if ($status == 'DELETE') {
                    
                    // was the comment live? If so update the post's comment count.
                    if ($Comment->commentStatus()=='LIVE') {
                        $Post = $Posts->find($Comment->postID());
                        if ($Post) $Post->update_comment_count();
                    }

                    $Comment->delete();
                }else{
                    $Comment->set_status($status);
                }
                
                
            }


        }

    }


	
	$pending_comment_count = $Comments->get_count('PENDING');

    $comments = array();
	
	$status = 'pending';

    if (isset($_GET['status']) && $_GET['status'] != '') {
        $status = $_GET['status'];
    }
    
    $comments = $Comments->get_by_status($status, $Paging);
 
?>