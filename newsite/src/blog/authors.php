<?php include('../perch/runtime.php'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Authors - Blog Example</title>
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
		   
		   <?php perch_blog_authors(); ?>
		    
		    
		</div>
		
		<nav class="sidebar">
		    <h2>Archive</h2>
		    <!-- The following functions are different ways to display archives. You can use any or all of these. 
		    
		    All of these functions can take a parameter of a template to overwrite the default template, for example:
		    
		    perch_blog_categories('my_template.html');
		    
		    --> 
		    <!--  By category listing -->
		    <?php perch_blog_categories(); ?>
		    <!--  By tag -->
		    <?php perch_blog_tags(); ?>
		    <!--  By year -->
		    <?php perch_blog_date_archive_years(); ?>
		    <!--  By year and then month - can take parameters for two templates. The first displays the years and the second the months see the default templates for examples -->
		    <?php perch_blog_date_archive_months(); ?>
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