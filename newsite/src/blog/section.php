<?php include('../perch/runtime.php'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Sections - Blog Example</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="alternate" type="application/rss+xml" title="RSS" href="rss.php" />
	<?php perch_get_css(); ?>
	<link rel="stylesheet" href="blog.css" type="text/css" />
</head>
<body>
	<header class="layout-header">
		<div class="wrapper">
			<div class="company-name">Perch Blog App - Company Name</div>
			<img src="<?php perch_path('feathers/quill/img/logo.gif'); ?>" alt="Your Logo Here" class="logo"/>
		</div>
		<nav class="main-nav">
			<?php perch_pages_navigation(array(
					'levels'=>1
				));
			?>
		</nav>
	</header>
	
	<!--  change cols2-nav-right to cols2-nav-left if you want the sidebar on the left -->
	<div class="wrapper cols2-nav-right">
	
		<div class="primary-content">
		   
		    
		    <div class="post">
		    	<?php perch_blog_section(perch_get('s')); ?>

		    	<?php perch_blog_custom([
		    		'section'=>perch_get('s'),
		    	]); ?>

		    </div>
		</div>
		
		<nav class="sidebar">
		    <h2>Filter archive</h2>
		    <!--  By category listing -->
		    <?php perch_blog_categories(array('section'=>perch_get('s'))); ?>
		    <!--  By tag -->
		    <?php perch_blog_tags(array('section'=>perch_get('s'))); ?>
		    <!--  By year -->
		    <?php perch_blog_date_archive_years(array('section'=>perch_get('s'))); ?>
    	</nav>
	</div>
	<footer class="layout-footer">
		<div class="wrapper">
			<ul class="social-links">
				<li class="twitter"><a href="#" rel="me">Twitter</a></li>
				<li class="facebook"><a href="#" rel="me">Facebook</a></li>
				<li class="flickr"><a href="#" rel="me">Flickr</a></li>
				<li class="linkedin"><a href="#" rel="me">LinkedIn</a></li>
				<li class="rss"><a href="#">RSS</a></li>
			</ul>
			<small>Copyright &copy; <?php echo date('Y'); ?></small>
		</div>
	</footer>
	<?php perch_get_javascript(); ?>
</body>
</html>