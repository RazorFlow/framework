<?php
	
	PerchScheduledTasks::register_task('perch_blog', 'delete_spam_comments', 1440, 'scheduled_blog_delete_spam_comments');

	function scheduled_blog_delete_spam_comments($last_run)
	{
		$API  = new PerchAPI(1.0, 'perch_blog'); 
		$Settings = $API->get('Settings');

		$days = $Settings->get('perch_blog_max_spam_days')->val();

		if (!$days) return array(
				'result'=>'OK',
				'message'=> 'Spam message deletion not configured.'
			);

		$count = perch_blog_delete_old_spam($days);

		if ($count == 1) {
			$comments = 'comment';
		}else{
			$comments = 'comments';
		}

		return array(
				'result'=>'OK',
				'message'=>$count.' old spam '.$comments.' deleted.'
			);
	}
