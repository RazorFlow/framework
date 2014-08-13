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

if(!function_exists('rf_trackpage')) {
    function rf_trackpage () {
        return array (
            'name' => "Home",
            'opts' => array (
            )
        );
    }
}

require "layout/header.php";
?>
<div class="col-md-12 homeBanner hidden-sm hidden-xs">
  <div class="container">
    <div class="col-md-6 bannerText">
      <h1>HTML5 Dashboards without the headache</h1>
      <p>Build interactive, mobile-friendly dashboards in PHP and JavaScript. Stop worrying about cross-browser quirks and use our easy and productive APIs to build complete, full-featured dashboards.</p>
      <a href="/download/" class="btn btn-secondary getRFBtn">
        Get RazorFlow Now!
      </a>
      <a href="/tour/" class="btn btn-default productTourBtn">
        <i class="rf-icon rf_tour_icon"></i>
        Product Tour
      </a>
    </div>
    <div class="col-md-6 hero-banner">
      
    </div>
  </div>
</div>
<div class="col-md-12 homeBanner visible-sm visible-xs">
  <div class="container">
    <div class="col-sm-12 hero-banner">
      
    </div>
  </div>
</div>

<div class="col-md-12 bannerText visible-sm visible-xs">
  <h1>HTML5 Dashboards without the headache</h1>
  <a href="/download/" class="btn btn-secondary getRFBtn hidden-sm hidden-xs">
    Get RazorFlow Now!
  </a>
  <a href="/tour/" class="btn btn-primary productTourBtn">
    <i class="rf-icon rf_tour_icon"></i>
    Product Tour
  </a>
</div>

<div class="col-md-12" id="homeSubBanner">
  <div class="container">
    <div class="col-md-4 section">
      <i class="sp_icon sp_star"></i>
      <p class="subTitle">MORE THAN JUST JAVASCRIPT CHARTS</p>
      <p>Still manually stitching charts, grids, tables and KPIs to build a dashboard? With RazorFlow Dashboard framework, this becomes a thing of the past.</p>
    <p>Consistent interaction model and coherent design across browsers and devices is all taken care of.
    <!-- <a href="#">Learn More</a></p> -->
    </div>

    <div class="col-md-4 section">
      <i class="sp_icon sp_ninja"></i>
      <p class="subTitle">BUILT FOR YOU, THE DEVELOPER</p>
      <p>Use our well-designed APIs to build your first HTML5 dashboard in under an hour, which works across platforms and devices.</p>
    <p>Comprehensive documentation, pre-build dashboards and an extensive feature gallery help you get started fast.</p>
    </div>
    
    <div class="col-md-4 section">
      <i class="sp_icon sp_touch"></i>
      <p class="subTitle">AN EXPERIENCE CENTERED AROUND DATA</p>
      <p>With no chart junk and 3D charts, at RazorFlow, we have made some fundamental choices for you.</p>
    <p>We have built an interaction model for drill-downs and tool-tips that just work to help your users get more value out of their data.</p>
    </div>

  </div>
</div>

<div class="col-md-12 visible-lg" id="homeAnimSection">
  <div class="container">
    <div class="col-md-12 animContainer">
      <h2 class="text-center">HOW RAZORFLOW WORKS</h2>

      <div id="homepage_hype_container">
      </div>

    </div>
      <!-- text content for search engines: -->

      <div style="display:none">

        <div>JavaScript</div>
        <div>2</div>
        <div>Write code using our simple PHP or JavaScript API. Fetch data, define components, configure interactivity and drill-downs.</div>
        <div>CONFIGURE COMPONENTS</div>
        <div>Your users can view the dashboard on any device, enabling them to take their data wherever they go. Dashboards can also be embedded in any web or mobile HTML5 application.</div>
        <div>DELIGHT USERS</div>
        <div>The RazorFlow Dashboard Engine automatically determines optimal layout, and rendering system for your user's device. The engine also manages all interactivity, drill-down and data updates.</div>
        <div>var sales = new ChartComponent ();
    sales.setCaption ("Yearly Sales");
    sales.setLabels (["2012", "2013", "2014"
    sales.addSeries ([11321, 12512, 14112],
      numberPrefix: "$"
    });db.addComponent (sales);
    </div>
        <div>AUTO OPTIMIZATION</div>
        <div>REPLAY</div>
        <div>1</div>
        <div>1234567</div>
        <div>$sales = new ChartComponent ();
    $sales->setCaption ("Yearly Sales");
    $sales->setLabels (["2012", "2013", "20
    $sales->addSeries ([11321, 12512, 14112
      'numberPrefix' => "$"
    ));$db->addComponent ($sales);
    </div>
        <div>3</div>
        <div>PHP</div>

      </div>

      <!-- end text content: -->
  </div>
</div>

<div class="col-md-12" id="homeCustomer">
  <div class="container">
    <div class="col-md-12 custContainer">
      <h2 class="text-center">SOME OF OUR CUSTOMERS</h2>
      <div class="logoContainer">
        <div class="logoRow">
        <img src="static/images/customer/thaismartcard.png">
        <img src="static/images/customer/vodafone.png">
        <img src="static/images/customer/haensel_ams_greyscale.png">
        </div>
        <div class="logoRow">
        <img src="static/images/customer/perception_software_logo_greyscale.png">
        <img src="static/images/customer/interface_group_logo_greyscale.png">
        <img src="static/images/customer/lorenz_technologies_logo_greyscale.png">
        </div>
      </div>
    </div>
  </div>
</div>

<div class="col-md-12" id="homeFeatures">
  <div class="container">
    <div class="col-md-12 featContainer">
      <h2 class="text-center">Features</h2>
      <p class="text-center">POWERFUL FEATURES FOR YOUR USERS</p>
    </div>

    <div class="col-md-6 featureSection">
  <div class="featureIconContainer">
    <i class="sp_icon sp_dashboard"></i>
  </div>
    <div class="featureContent">
      <h5>Complete set of dashboard elements</h5>
      <p>Includes all the components that you need to build dashboards in a single package.</p>
  </div>
</div>
<div class="col-md-6 featureSection">
  <div class="featureIconContainer">
    <i class="sp_icon sp_light"></i>
  </div>
    <div class="featureContent">
      <h5>Light and Fast</h5>
      <p>Built with mobile devices in mind, RazorFlow Dashboard Framework is engineered for the fastest load times.</p>
  </div>
</div>
<div class="col-md-6 featureSection">
  <div class="featureIconContainer">
    <i class="sp_icon sp_chart"></i>
  </div>
    <div class="featureContent">
      <h5>Full-featured charting</h5>
      <p>Supports Industry-Standard Column, Pie, Bar, Line charts and more.</p>
  </div>
</div>
<div class="col-md-6 featureSection">
  <div class="featureIconContainer">
    <i class="sp_icon sp_clock"></i>
  </div>
    <div class="featureContent">
      <h5>Real-time updates</h5>
      <p>Dashboards can be updated in real-time without having to reload the page, and are compatible with web sockets.</p>
  </div>
</div>
<div class="col-md-6 featureSection">
  <div class="featureIconContainer">
    <i class="sp_icon sp_theme"></i>
  </div>
    <div class="featureContent">
      <h5>Powerful theme-builder</h5>
      <p>The theme-builder allows you to change the look of your dashboard in just a few clicks.</p>
  </div>
</div>
<div class="col-md-6 featureSection">
  <div class="featureIconContainer">
    <i class="sp_icon sp_mobile"></i>
  </div>
    <div class="featureContent">
      <h5>Built for touch</h5>
      <p>All dashboards work great on touch devices like smartphones and tablets, with no extra work.</p>
  </div>
</div>
<div class="col-md-6 featureSection">
  <div class="featureIconContainer">
    <i class="sp_icon sp_wrappers"></i>
  </div>
    <div class="featureContent">
      <h5>Server-side wrappers</h5>
      <p>Build complete interactive dashboards in PHP with no JavaScript or HTML coding required.</p>
  </div>
</div>
<div class="col-md-6 featureSection">
  <div class="featureIconContainer">
    <i class="sp_icon sp_embedded"></i>
  </div>
    <div class="featureContent">
      <h5>Embed and integrate</h5>
      <p>Embed dashboards into existing pages and web applications, and integrate fully using a JavaScript API.</p>
  </div>
</div>
 
    <div class="col-md-12 text-center tourBtnContainer">
      <a href="/tour/" class="btn btn-secondary prodTourBtn" href="#">
          PRODUCT TOUR
      </a>
    </div>

  </div>
</div>


<?php
require "layout/footer.php";