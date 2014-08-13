<?php 
require "../version.php";
global $rf_version;
$platform = $_GET["platform"] ? "_".$_GET["platform"] : "_js";
$license = "";
$version = $rf_version;


if(isset($_GET["license"]) && $_GET["license"] == "COMMV1WSRC") {
	$license = "_wsource";
}
if(isset($_GET["version"]) && $_GET["version"] != "latest") {
	$version = "_".$_GET["version"];
}


$download_url = "https://s3.amazonaws.com/download_bucket/razorflow_framework".$platform.$license.$version.".zip";

header("location: $download_url", true, 301);
exit;
