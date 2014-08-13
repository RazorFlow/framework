<?php
	include('PerchBlog_Posts.class.php');
	include('PerchBlog_Post.class.php');
	include('PerchBlog_Authors.class.php');
	include('PerchBlog_Author.class.php');
	include('PerchBlog_Comments.class.php');
    include('PerchBlog_Comment.class.php');

    $API   = new PerchAPI(1, 'perch_blog');
    $Lang  = $API->get('Lang');
    $Posts = new PerchBlog_Posts($API);
    $posts = $Posts->get_recent(5);

    $Comments = new PerchBlog_Comments($API);
    
    $comment_count = $Comments->get_count();

    $comments = array();
    $comments['Pending'] = $Comments->get_count('PENDING');
    $comments['Live'] = $Comments->get_count('LIVE');
    $comments['Rejected'] = $Comments->get_count('REJECTED');
    $comments['Spam'] = $Comments->get_count('SPAM');
?>
<div class="widget">
	<h2>
		<?php echo $Lang->get('Blog'); ?>
		<a href="<?php echo PerchUtil::html(PERCH_LOGINPATH.'/addons/apps/perch_blog/edit/'); ?>" class="add button"><?php echo $Lang->get('Add Post'); ?></a>
	</h2>
	<div class="bd">
		<?php
			if (PerchUtil::count($posts)) {
				echo '<ul>';
				foreach($posts as $Post) {
					echo '<li>';
						if ($Post->postStatus()=='Draft') {
							echo PerchUtil::html(strtoupper($Lang->get('Draft:'))).' ';
						}
						echo '<a href="'.PerchUtil::html(PERCH_LOGINPATH.'/addons/apps/perch_blog/edit/?id='.$Post->id()).'">';
							echo PerchUtil::html($Post->postTitle());
						echo '</a>';
					echo '</li>';
				}
				echo '</ul>';
			}
		?>

		<h3><?php echo $Lang->get('Comments'); ?> <span class="note"><?php echo PerchUtil::html($comment_count); ?></span></h3>
		<?php 
			echo '<ul class="mod">';
				foreach($comments as $label=>$count) {
					echo '<li>';
						echo '<a href="'.PerchUtil::html(PERCH_LOGINPATH.'/addons/apps/perch_blog/comments/?status='.strtolower($label)).'">';
							echo PerchUtil::html($Lang->get($label). ' ('.$count.')');
						echo '</a>';
					echo '</li>';
				}
			echo '</ul>';
		?>
	</div>
</div>