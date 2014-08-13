<?php 
function custom_title () {
	return "Download";
}

function rf_topbar () {
	return array (
		'title' => 'Download',
    "url" => "/download/"
	);
}

function extra_scripts () {
  return array(
    'vendor/jquery.validate.min.js',
    'js/rfDownloadPage.js',
    'js/rfValidate.js'
  );
}

if(!function_exists('rf_trackpage')) {
    function rf_trackpage () {
        return array (
            'name' => "Download Start",
            'opts' => array (
            )
        );
    }
}


require $_SERVER['DOCUMENT_ROOT']."/layout/header.php";
?>
<div class="container">
<div class="row rfBody">
  <div class="col-md-8">
    <div class="panel-container">
      <div class="panel">
        <h6>Select a Technology</h6>
        <hr>
        <div class="panel-body">
          <div class="col-md-9 no-padding-right tech-container">
            <div class="col-md-3 technologies tech-active" data-value="js">
              <div class="full">
                <div class="sp_icon sp_js"></div>
                <p>JavaScript</p>
              </div>
            </div>
            <div class="col-md-3 technologies" data-value="php">
              <div class="full">
                <div class="sp_icon sp_php"></div>
                <p>PHP</p>
              </div>
            </div>
            <div class="col-md-3 technologies disabled" data-value="dotnet">
              <div class="full">
                <div class="sp_icon sp_dotnet"></div>
                <p class="coming-soon">Coming soon</p>
              </div>
            </div>
            <div class="col-md-3 technologies disabled" data-value="java">
              <div class="full">
                <div class="sp_icon sp_java"></div>
                <p class="coming-soon">Coming soon</p>
              </div>
            </div>
          </div>
          <div class="col-md-1 or-border">
          <div class="vr"></div>
            <p>OR</p>
          </div>
          <div class="col-md-2 technologies" data-value="suite">
            <div class="full">
              <div class="sp_icon sp_all"></div>
              <p>Entire Suite</p>
            </div>
          </div>
        </div>
      </div>
      <div class="panel">
        <h6>Enter Your Details</h6>
        <hr>
        <div class="panel-body">
          <form class="form-inline download-form rfForm" role="form" method="POST" action="/download/thanks.php">
            <div class="form-group col-md-6 col-xs-12">
                <input type="text" class="form-control" id="inputName" required="required" placeholder="Full Name" name="input[name]">
            </div>
            <div class="form-group col-md-6 col-xs-12">
                <input type="email" class="form-control rf-medium" id="inputEmail" required="required" placeholder="Email address" name="input[email]">
            </div>

            <div class="form-group col-md-12 col-xs-12 form-companyName">
                <input type="text" class="form-control rf-large" id="inputCompany" placeholder="Company name (optional)" name="input[company]">
            </div>
            
            <div class="form-group col-md-12 rfsubmit">
                <button type="submit" class="btn btn-primary"><i class="rf-icon rf_download"></i>Download</button>
            </div>

            <input id="techType" type="hidden" name="input[tech]" value="js">

            <br>
            <div class="checkbox">
              <label>
                <input type="checkbox" value="1" name="input[email_notify]" checked="checked">
                Be notified of RazorFlow Releases by email.
              </label>
            </div>
            <div class="checkbox">
              <label>
                <input type="checkbox" value="1" name="input[phone_consultation]">
                Yes! I want a 30 minute FREE requirements consultation over phone!
              </label>
            </div>
          </form>
          <p class="downInfo">By clicking on download you agree to our <a href="/license/developer.php">Terms and Contitions</a></p>
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 subsection">
    <h6>Developer License Allows you to</h6>
    <ul>
    <li>You can develop dashboards and host them on unlimited development and test servers.</li>
    <li>You must purchase a license before deploying to production servers.</li>
    <li>There is no time-limit on evaluation.</li>
    <li>You can request technical support over email. <a href="/contact/support.php">Contact us here</a>.</li>
    <li>If you're using RazorFlow for a personal, non-commerical, educational or non-profit use, you may qualify for a discount. <a href="/contact/sales.php">Contact sales</a> to know more.</li>
    </ul>
  </div>
</div>
</div>
<?php
require $_SERVER['DOCUMENT_ROOT']."/layout/footer.php";
