<?php

function custom_title () {
	return "Blog";
}

function rf_topbar () {
	return array (
		'url' => '/blog/',
		'title' => 'RazorFlow Blog'
	);
}

function extra_scripts () {
  return array(
  );
}

if(!function_exists('rf_trackpage')) {
    function rf_trackpage () {
        return array (
            'name' => "Blog",
            'opts' => array (
            )
        );
    }
}

require $_SERVER['DOCUMENT_ROOT']."/layout/header.php";
?>
<div class="container blog-container">
  <div class="col-md-4 blog-sidebar pull-right">
      <div class="col-sm-12">
        <div class="form-group">
          <?php perch_search_form(); ?>
        </div>
        <h5>TOPICS</h5>
        <?php perch_blog_categories(); ?>
      </div>
      <div class="col-sm-12 hr-divider">
        <hr>
      </div>
      <div class="col-sm-12 no-padding">
        <h5>GET UPDATES BY EMAIL</h5>
        <div class="support-text">
          <p>
            Get the latest news about new features and releases by email
          </p>
        </div>
        <form action="http://tools.razorflow.com/sendy/subscribe" method="post" accept-charset="utf-8">
         <div class="input-group">
            <input type="email" class="form-control start" name="email" placeholder="E-mail address">
            <input type="hidden" name="list" value="jrXPE9k1BN7DjK87634M5QbQ"/>
              <span class="input-group-btn">
              <input class="btn btn-secondary btn-border btn-inline" type="submit" value="Subscribe" name="submit">Subscribe!</input>
              </span>
        </div>
      </form>
      </div>
  </div>
  <div class="col-md-8 blog-body">
