<?php 
function custom_title () {
  return "Blog";
}

function rf_topbar () {
  return array (
    'url' => '/support/sales.php',
    'title' => 'Blog'
  );
}

if(!function_exists('rf_trackpage')) {
    function rf_trackpage () {
        return array (
            'name' => "Contact Support",
            'opts' => array (
                'department' => "Sales"
            )
        );
    }
}


require $_SERVER['DOCUMENT_ROOT']."/layout/header.php";
?>
<div class="col-md-12 rfheader">
  <div class="container">
    <h2>Razorflow Blog</h2>
    <p>The team that makes this shit happen. Some other cool text to go here, obviously.</p>
  </div>
</div>
<div class="container blog-container">
  <div class="col-md-4 blog-sidebar pull-right">
    <div class="blog-divider hidden-xs hidden-sm"></div>
      <div class="col-sm-12">
        <div class="form-group">
            <form>
              <div class="input-group search-box">
                <span class="input-group-addon"><span class="glyphicon glyphicon glyphicon-search"></span></span>
                <input type="text" class="form-control" id="search" name="search" placeholder="SEARCH IN BLOG">
              </div>
            </form>
        </div>
        <h5>TOPICS</h5>
        <ul class="blog-topics">
          <li><a href="#">Engineering</a></li>
          <li><a href="#">Design</a></li>
          <li><a href="#">Culture</a></li>
          <li><a href="#">Support & Guidelines</a></li>
        </ul>
      </div>
      <div class="col-sm-12 hr-divider">
        <hr>
      </div>
      <div class="col-sm-12 no-padding">
        <h5>GET BLOG UPDATES</h5>
        <div class="support-text">
          <p>
            Here goes a nice, to-the-point copy on why should someone subscribe to RazorFlow blog updates.
          </p>
        </div>
          <form>
         <div class="input-group">
            <input type="email" class="form-control start" name="email">
            <span class="input-group-btn">
              <input class="btn btn-secondary btn-border btn-inline" type="submit" value="Subscribe">
            </span>
        </div>
          </form>
      </div>
  </div>
  <div class="col-md-8">
    <div class="posts">
    <div class="post">
      <div class="post-title">Hold on to your butts</div>
      <div class="post-meta">
        Posted in 
        <a href="#">Engineering</a> 
        <span class="divider">&nbsp;</span>
        <span class="posted-date"><a href="#">On 14 July, 2014</a></span>
      </div>
      <div class="post-content">
        <p>
          Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.
        </p>
        <p>
          Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.
        </p>
      </div>
      <div class="upper-case">
        <a href="#">Share this article</a>
      </div>
    </div>

    <div class="post">
      <div class="post-title">Hold on to your butts</div>
      <div class="post-meta">
        Posted in 
        <a href="#">Engineering</a> 
        <span class="divider">&nbsp;</span>
        <span class="posted-date"><a href="#">On 14 July, 2014</a></span>
      </div>
      <div class="post-content">
        <p>
          Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.
        </p>
        <p>
          Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.
        </p>
      </div>
      <div class="upper-case">
        <a href="#">Share this article</a>
      </div>
    </div>
  </div>
    <div class="older-posts col-md-2">
      <div><a href="#">&laquo; OLDER</a></div>
    </div>
  </div>
</div>
<?php
require $_SERVER['DOCUMENT_ROOT']."/layout/footer.php";
