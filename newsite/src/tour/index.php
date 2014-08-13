<?php 
function custom_title () {
	return "Tour";
}

function rf_topbar () {
  return array (
    'title' => 'Tour',
    "url" => "/tour/"
  );
}

function setActive () {
  return "tour";
}

function extra_scripts () {
  return array(
    'vendor/bootstrap.tour.min.js',
    'transfer/build/js/razorflow.wrapper.min.js',
    'js/tour.js'
  );
}

function extra_styles() {
    return array(
        'transfer/build/css/razorflow.min.css'
    );
}

// if(!function_exists('rf_trackpage')) {
//     function rf_trackpage () {
//         return array (
//             'name' => "Download Start",
//             'opts' => array (
//             )
//         );
//     }
// }


require $_SERVER['DOCUMENT_ROOT']."/layout/header.php";
?>
<div class="container hidden-sm hidden-xs">
  <div class="row rfBody">
  <!-- WEB TOUR -->
    <div class="col-md-12 webTour">
      <?php
        require $_SERVER['DOCUMENT_ROOT']."/static/transfer/build/tour/motherboard.php";
        $tabbed = new SampleDashboard();
        $tabbed->setStaticRoot ("/static/transfer/build/");
        $tabbed->renderEmbedded();
      ?>
      <script type="text/javascript">
        renderDashboard();
      </script>
    </div>
  </div>
</div>
<!-- TAB TOUR -->
<div class="tabTour visible-sm visible-xs">
  <div class="tour-section">
    <div class="container">
      <h1>The <strong>grand, unified experience</strong></h1>
      <div class="col-sm-5 img-container">
      </div>
      <div class="col-sm-7">
        <p>
          An orchestra consists of several instruments each playing a single tune. However when they come together just right, it becomes a symphony. Everything fits together and magic is made. A RazorFlow Dashboard is made up of different components, each showing the data you choose. But when they come together, they become more than the sum of their parts. We call this the Grand Unified Experience.
        </p>
      </div>
      <div class="col-sm-12">
        <p>
          Everything in RazorFlow is designed with the experience in mind, and to ensure that everything fits together, to delight the user, and to turn your data into a symphony.
        </p>
      </div>
    </div>
  </div>

  <div class="tour-section">
    <div class="container">
      <h1>Powerful and great looking charts</h1>
      <div class="col-sm-5 img-container">
      </div>
      <div class="col-sm-7">
        <p>
          RazorFlow Dashboard Framework features comes built-in with a custom charting engine which is built for modern browsers and touch devices. Use a simple, intuitive API to configure charts and work with features like:
        </p>
        <ul>
          <li>Combining multiple chart types</li>
          <li>Dual Y Axes</li>
          <li>Intelligent Label Management</li>
        </ul>
      </div>
    </div>
  </div>


  <div class="tour-section">
    <div class="container">
      <h1>Keep your eyes on your KPIs</h1>
      <div class="col-sm-5 img-container">
      </div>
      <div class="col-sm-7 pull-right">
        <p>
          The humble KPI (Key Performance Indicator) is among the simplest but also most valuable components. A few numbers conveying so much information.
        </p>
        <p>
          RazorFlow KPIs are supercharged with useful features like Real-time updates, sparklines, gauges, targets, win-loss indicators and much more.
        </p>
      </div>
    </div>
  </div>

  <div class="tour-section">
    <div class="container">
      <h1>Includes several useful UI elements</h1>
      <div class="col-sm-5 img-container">
      </div>
      <div class="col-sm-5">
        <p>
          A Dashboard is more than just raw charts and tables. There are several other UI elements and utilities that are needed.
        </p>
        <p>
          RazorFlow Dashboard Framework is jam-packed with nifty useful things like forms, tabs, and many more. The only way you'll know for sure is if you <a href="/download/">Try RazorFlow today</a>
        </p>
      </div>
    </div>
  </div>
</div>

<!-- Modal -->
<div class="modal fade" id="tourModal" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        <div class="sp_icon sp_tour"></div>
        <p>
          Welcome to the interactive RazorFlow Dashboard tour. This guided tour will show you the different parts of a dashboard. This dashboard was built in PHP in under 90 minutes using the RazorFlow Dashboard Framework.
        </p>
        <button type="submit" id="startTour" class="btn btn-default btn-rounded">START TOUR</button>
      </div>
    </div>
  </div>
</div>
<?php
require $_SERVER['DOCUMENT_ROOT']."/layout/footer.php";
