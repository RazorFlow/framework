<?php

function extra_scripts () {
  return array(
    // "vendor/fancybox/jquery.fancybox.pack.js",
    // 'vendor/jquery.validate.min.js',
    "js/rfHomepage.js"
  );
}

function extra_styles () {
  return array(
    // "vendor/fancybox/jquery.fancybox.css"
  );
}

function rf_topbar () {
  return array (
    'title' => "About Company",
    "url" => "/about/company.php"
  );
}

if(!function_exists('rf_trackpage')) {
    function rf_trackpage () {
        return array (
            'name' => "Company",
            'opts' => array (
            )
        );
    }
}

require "../layout/header.php";
?>

<!-- Marker & Company front icons container -->
<div class="row container col-xs-12 hidden-xs">
  <div class="col-xs-3 col-xs-offset-1"></div>
  <div class="col-xs-1  marker-wrapper">
    <div class="aboutMarker"></div>
  </div>
  <div class="col-xs-3 col-xs-offset-1"></div>
</div>
<div class="container col-xs-12 hidden-xs">
  <div class="col-xs-3 col-xs-offset-1"></div>
  <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1">
  <a href="/about/company.php" class="pull-right rf-icon rf_company_inactive icon-lg"></a>
  </div>
  <div class="col-xs-1"></div>
  <div class="col-xs-1">
  <a href="/about/team.php" class="pull-right rf-icon rf_team icon-lg rf-icon-inactive"></a>
  </div>
  <div class="col-xs-3 col-xs-offset-1"></div>
</div>

<div class="container content-start">
  <br>
  <div class="row col-lg-12 col-md-12 company-front-icons hidden-xs">
  </div>
  <h3 class="upper-case center info-heading">See What You've Been Missing</h3>

  <div class="info company">
    <p>
      RazorFlow is a team of 6 people located in Bangalore, India. We've all been professional developers at one point in our careers. Four of us still spend a majority of our day thinking about and writing code. As developers, we know the ecstasy when a few lines of code actually helps make other people's lives richer and easier. However, a lot of our time is spent trying to work with other cumbersome and confusing things.
    </p>
    <p>
      Our first product - the RazorFlow Dashboard Framework is meant to make the life of developers happy by empowering them to build an amazing experience for a very common project - an interactive data-driven dashboard. We researched how people build dashboards, and personally spoke to several hundred beta testers, re-wrote the entire framework more than once, and performed endless iterations over a span of 3 years until we felt we nailed how dashboards should be built.
    </p>
    <p>
      In our free time, we are avid players of <a href="http://en.wikipedia.org/wiki/Counter-Strike:_Global_Offensive">CS:GO</a>, and contribute to various open-source projects.
    </p>
  </div>
</div>
</div>

<div class="company-banner hidden-xs hidden-sm">
  <div class="row">
  </div>
  <div class="banner-wrapper">
    <!-- <div class="stats col-md-12">
      <div class="col-md-4">
        <span>263</span>
        <hr>
        <span>Hours of Go</span>
      </div>
      <div class="col-md-4">
        <span>54,825</span>
        <hr>
        <span>Hours worked since 2012</span>
      </div>
      <div class="col-md-4">
        <span>9</span>
        <hr>
        <span>No. of customers</span>
      </div>
    </div> -->
  </div>
</div>

<div class="container team-link">
  <h6><a href="/about/team.php" class="pull-right right-icon"><span>Meet the team</span> <i class="rf-icon rf_arrow_right"></i></a></h6>
</div>
<?php
require $_SERVER['DOCUMENT_ROOT']."/layout/footer.php";
