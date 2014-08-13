<?php include('perch/runtime.php'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Perch Quill Styleguide</title>
	<meta name="viewport" content="width=device-width, target-densitydpi=160dpi, initial-scale=1.0" />
	<?php perch_get_css(); ?>
</head>
<body>
	<header class="layout-header">
		<div class="wrapper">
			<div class="company-name">Perch Theme Style Guide - Company Name</div>
			<img src="<?php perch_path('feathers/quill/img/logo.gif'); ?>" alt="Your Logo Here" class="logo"/>
		</div>
		<nav class="main-nav">
			<ul>
				<li class="current"><a href="#">Home</a></li>
				<li><a href="#">Events</a></li>
				<li><a href="#">Gallery</a></li>
			</ul>
		</nav>
	</header>
	
	<!--  an example layout with two columns and the subnav on the left. Create by using the classes wrapper cols2-nav-left on the container, then a class of sidebar and primary-content inside. -->
	<div class="wrapper cols2-nav-left">
		<nav class="sidebar">
			<h3>Subnav</h3>
			<ul>
				<li><a href="">Page one</a></li>
				<li><a href="">Page two</a></li>
				<li><a href="">Page three</a></li>
			</ul>
		</nav>
		<div class="primary-content">		
	 		<h1>Two columns, subnav on left</h1>

    		<p>To create a two column layout with the subnav on the left and main text on the right add the classes "wrapper cols2-nav-left" to the containing element.</p>
    		<blockquote>
    		<p>This is a blockquote. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed ipsum sed orci condimentum ornare id ac orci. Suspendisse porttitor vehicula odio, vitae viverra dui fringilla in. Nulla facilisi. Pellentesque quis urna ac tellus vulputate fringilla. </p>
    		</blockquote>
		</div>
	</div>
	
	<!--  an example layout with two columns and the subnav on the right. Create by using the classes wrapper cols2-nav-right on the container, then a class of sidebar and primary-content inside. -->
	
	<div class="wrapper cols2-nav-right">
		<nav class="sidebar">
			<h3>Subnav</h3>
			<ul>
				<li><a href="">Page one</a></li>
				<li><a href="">Page two</a></li>
				<li><a href="">Page three</a></li>
			</ul>
		</nav>
		<div class="primary-content">		
	 		<h1>Two columns, subnav on right</h1>

    		<p>To create a two column layout with the subnav on the right and main text on the left add the classes "wrapper cols2-nav-right" to the containing element.</p>
    		<ul>
    			<li>This is a list</li>
    			<li>Item two</li>
    			<li>Item three</li>
    		</ul>
		</div>
	</div>
	<!--  an example layout with one centered column. Create by using the classes wrapper cols1 on the container, then a class of primary-content inside. -->
	<div class="wrapper cols1">
		
		<div class="primary-content">		
	 		<h1>One column centered</h1>

    		<p>To create a single column layout add the classes "wrapper cols1" to the containing element.</p>
    		
    		<h2>This is a level two heading</h2>
    		
    		<p>Viewing source on this style guide will demonstrate how to use the different CSS rules to build your layout.</p>
    		
    		<div class="modules">
	    		<div class="module">
	    			<h3>Module heading</h3>
	    			<p>Text modules for extra content. Display one below the other on narrow screens.</p>
	    		</div>
	    		
	    		<div class="module">
	    			<h3>Module heading</h3>
	    			<p>Text modules for extra content. Display one below the other on narrow screens.</p>
	    		</div>
	    		
	    		<div class="module">
	    			<h3>Module heading</h3>
	    			<p>Text modules for extra content. Display one below the other on narrow screens.</p>
	    		</div>
	    	</div>
	    	
	    	<h2>A figure with caption</h2>
	    	
	    	<figure>
	    		<img alt="placeholder" src="http://lorempixum.com/680/400/abstract/4" />
	    		<figcaption>
	    			<h4>Heading</h4>
	    			<p>A placeholder image that is marked up using the html5 figure and figcaption elements</p>
	    		</figcaption>
	    	</figure>
	    	
	    	<h2>An example form</h2>
	    	
	    	<form id="form1_contact" action="/" method="post">
    
    			
			    <fieldset>
			    <div>
			        <label for="form1_name">Name</label>
			        <input id="form1_name" name="name" type="text" required="required" />
			        
			    </div>
			
			    <div>
			        <label for="form1_email">Email</label>
			        <input id="form1_email" name="email" type="email" placeholder="you@company.com" required="required" />
			        
			        
			    </div>
			
			    <div>
			        <label for="form1_message">Message</label>
			        <textarea id="form1_message" name="message" cols="30" rows="4" required="required"></textarea>
			    </div>
			    
			    <div>
			    	<label for="form1_checkbox">Single checkbox</label>
			    	<label for="form1_checkbox"><input id="form1_checkbox" type="checkbox" class="checkbox" /> Label</label>
			    </div>
			
			    <div>
			        <input id="form1_submit" name="submit" value="Send" type="submit" />
			    </div>
			
			    
			    </fieldset>
			</form> 
    		
		</div>
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
			<small>Copyright &copy; <?php echo date("Y"); ?></small>
		</div>
	</footer>
	<?php perch_get_javascript(); ?>
</body>
</html>