<?php 
function custom_title () {
	return "Contact Support";
}

function rf_topbar () {
	return array (
		'url' => '/support/',
		'title' => 'RazorFlow Support'
	);
}

if(!function_exists('rf_trackpage')) {
    function rf_trackpage () {
        return array (
            'name' => "Operating Times",
            'opts' => array (
            )
        );
    }
}


require $_SERVER['DOCUMENT_ROOT']."/layout/header.php";
?>
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
        <h2>Operating times</h2>
        <p>For phone support, and requirements discussion, we are available from <strong>9 AM to 11:30 PM (GMT+0530)</strong> (Indian Standard Time). If you would like to schedule a call with us, it would be helpful if it would be within these times</p>
        <p>Our operating times in other time-zones are:</p>
        <table class="table table-horzontal">
            <thead><tr><th>Time Zone</th><th>Suggested Time</th></tr></thead>
            <tbody>
                <tr><td>Pacific Time (USA)</td><td>Before 11:30 AM</td></tr>
                <tr><td>Eastern Time (USA)</td><td>Before 2:30 PM</td></tr>
                <tr><td>GMT/UTC</td><td>Before 6:30 PM</td></tr>
                <tr><td>Australia</td><td>After 1:30 PM</td></tr>
            </tbody>
        </table>
        </div>
    </div>
</div>
<?php
require $_SERVER['DOCUMENT_ROOT']."/layout/footer.php";
