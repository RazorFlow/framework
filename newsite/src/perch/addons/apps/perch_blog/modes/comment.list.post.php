<?php
   
    # Side panel
    echo $HTML->side_panel_start();
    
    echo $HTML->para('This page lists comments that have been left by website visitors.');
    echo $HTML->para('The Pending category lists comments that are waiting approval to be published on the site.');
   
    echo $HTML->side_panel_end();
    
    
    # Main panel
    echo $HTML->main_panel_start();

	include ('_subnav.php');
	
	# Title panel
    echo $HTML->heading1('Listing Comments');
    
    
    if (isset($message)) echo $message;


    
    /* ----------------------------------------- SMART BAR ----------------------------------------- */
    ?>


    <ul class="smartbar">
        <li class="<?php echo ($status=='all'?'selected':''); ?>"><a href="<?php echo PerchUtil::html($API->app_path().'/comments/?status=all'); ?>"><?php echo $Lang->get('All'); ?></a></li>
        <li class="new <?php echo ($status=='pending'?'selected':''); ?>"><a href="<?php echo PerchUtil::html($API->app_path().'/comments/'.'?status=pending'); ?>"><?php echo $Lang->get('Pending (%s)', $pending_comment_count); ?></a></li>
        <?php

            if ($status == 'pending') {
                $Alert->set('filter', $Lang->get('You are viewing all comments pending moderation.'). ' <a href="'.$API->app_path().'/comments/?status=all'.'" class="action">'.$Lang->get('Clear Filter').'</a>');
            }
        
            $items = array();

            $items[] = array(
                    'arg'=>'status',
                    'val'=>'live',
                    'label'=>'Live',
                    'path'=>$API->app_path().'/comments/'
                );
            $items[] = array(
                    'arg'=>'status',
                    'val'=>'rejected',
                    'label'=>'Rejected',
                    'path'=>$API->app_path().'/comments/'
                );
            $items[] = array(
                    'arg'=>'status',
                    'val'=>'spam',
                    'label'=>'Spam',
                    'path'=>$API->app_path().'/comments/'
                );
            
           
            echo PerchUtil::smartbar_filter('cf', 'By Status', 'Filtered by ‘%s’', $items, 'folder', $Alert, "You are viewing ‘%s’ comments", $API->app_path().'/comments/?status=all');
        
        ?>
    </ul>

     <?php echo $Alert->output(); ?>


    <?php
    /* ----------------------------------------- /SMART BAR ----------------------------------------- */


    
    if (PerchUtil::count($comments)) {
	
		echo $Form->form_start('comments', 'bulk-edit');
?>
    <table class="d">
        <thead>
            <tr>
                <th><?php echo $Lang->get('Date'); ?></th>
				<th><?php echo $Lang->get('Post'); ?></th>
				<th><?php echo $Lang->get('Commenter'); ?></th>
                <th><?php echo $Lang->get('Email'); ?></th>
			
            </tr>
        </thead>
        <tbody>
<?php
    foreach($comments as $Comment) {
?>
            <tr>
				<td class="primary">
                    <?php echo $Form->checkbox('comment-'.$Comment->id(), '1', 0); ?>
					<a href="<?php echo $HTML->encode($API->app_path()); ?>/comments/edit/?id=<?php echo $HTML->encode(urlencode($Comment->id())); ?>" class="edit">
					<?php echo strftime(str_replace(' ', '&nbsp;', PERCH_DATE_SHORT), strtotime($Comment->commentDateTime())); ?>
					</a>
				</td>
                <td><?php echo $HTML->encode($Comment->postTitle()); ?></td>
				<td><?php echo $HTML->encode($Comment->commentName()); ?></td>
				
                <td><?php echo $HTML->encode($Comment->commentEmail()); ?></td>
              

                
                
            </tr>

<?php   
    }
?>
        </tbody>
    </table>
    <div class="controls" id="comment-controls">
<?php    
		$opts = array();
		$opts[] = array('label'=>'',          'value'=>'');
		$opts[] = array('label'=>'Live',      'value'=>'LIVE');
		$opts[] = array('label'=>'Spam',      'value'=>'SPAM');
		$opts[] = array('label'=>'Rejected',  'value'=>'REJECTED');
        $opts[] = array('label'=>'Pending',   'value'=>'PENDING');
		$opts[] = array('label'=>'Deleted',   'value'=>'DELETE');
		    		
		echo $Form->select_field('commentStatus', 'Mark selected as', $opts);
        echo $Form->submit_field('btnSubmit', 'Save');


?>
    </div>
<?php    
        if ($Paging->enabled()) {
            echo $HTML->paging($Paging);
        }

    echo $Form->form_end();
    

    } // if pages
    
    echo $HTML->main_panel_end();
?>