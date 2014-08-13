<?php 
function custom_title () {
	return "Page not found";
}

function rf_topbar () {
	return array (
		'url' => '/',
		'title' => '404 Page not Found'
	);
}

function extra_scripts () {
  return array(
  );
}

function extra_styles () {
  return array(
  );
}

if(!function_exists('rf_trackpage')) {
    function rf_trackpage () {
        return array (
            'name' => "404",
            'opts' => array (
            )
        );
    }
}


require $_SERVER['DOCUMENT_ROOT']."/layout/header.php";
?>
<div class="container">
<div class='row'>
                <div class='col-md-5 pull-left'>
                    <h2>404, Page Not Found</h2>
                    <p>The page you are looking for is not found.</p>

                    <div class="well">
                    <h3>Looking for RazorFlow PHP?</h3>
                    <p>RazorFlow PHP was superceded by a new, improved version called the <b>RazorFlow Dashboard Framework</b> which is more flexible, lighter and server-agnostic. However, the RazorFlow Dashboard Framework is not compatible with RazorFlow PHP code, and we have stopped development on RazorFlow PHP.</p>
                    <ul>
                    <li><p>Need to refer to documentation for RazorFlow PHP? Visit the <a href="http://php.archive.razorflow.com/">RazorFlow PHP Archive Page</a> to find a copy of the documentation</p></li>
                    <li><p>Are you using RazorFlow PHP in production and wish to purchase a license for it? <a href="/support/presale-query/">Contact our sales team</a> and we'll help you get a license.</p></li>
                    <li><p>Are you currently using RazorFlow PHP and wish to migrate to RazorFlow Dashboard Framework? <a href="/dashboard/buy/">Pre-order now</a> and get free phone support for migration.</p></li>
                    </ul>
                    </div>
                </div>
            </div>
    </div>
<?php
require $_SERVER['DOCUMENT_ROOT']."/layout/footer.php";
