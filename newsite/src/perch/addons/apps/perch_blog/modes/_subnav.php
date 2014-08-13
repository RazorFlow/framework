<?php

	$Comments = new PerchBlog_Comments($API);
	$pending_comment_count =$Comments->get_count('PENDING');

	echo $HTML->subnav($CurrentUser, array(
		array('page'=>array(
					'perch_blog',
					'perch_blog/delete',
					'perch_blog/edit'
			), 'label'=>'Add/Edit'),
		array('page'=>array(
					'perch_blog/categories',
					'perch_blog/categories/edit',
					'perch_blog/categories/delete',
			), 'label'=>'Categories', 'priv'=>'perch_blog.categories.manage'),
		array('page'=>array(
					'perch_blog/comments',
					'perch_blog/comments/edit'

			), 'label'=>'Comments', 'badge'=>$pending_comment_count, 'priv'=>'perch_blog.comments.moderate'),
		array('page'=>array(
					'perch_blog/authors',
					'perch_blog/authors/edit',
					'perch_blog/authors/delete'

			), 'label'=>'Authors', 'priv'=>'perch_blog.authors.manage'),
		array('page'=>array(
					'perch_blog/sections',
					'perch_blog/sections/edit',
					'perch_blog/sections/delete'

			), 'label'=>'Sections', 'priv'=>'perch_blog.sections.manage'),
	));
?>