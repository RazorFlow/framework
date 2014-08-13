<?php

require_once ("rfcrunch.php");

function isIECompatible() {
    $compatible_version_from = 9; 
    $user_agent = $_SERVER['HTTP_USER_AGENT'];
    preg_match_all("/MSIE\s?([\d]+\.[\d]+)/i", $user_agent, $matches);

    if(isset($matches[1][0])) {
        $version = $matches[1][0];
        if($version >= $compatible_version_from) {
            return false;
        }

        header("location: /fallback/");
        return true;
    }

    return false;
}

isIECompatible();

if(file_exists($_SERVER['DOCUMENT_ROOT']."/perch/config/config.php")) {
    require $_SERVER['DOCUMENT_ROOT']."/perch/runtime.php";
}

$title = "";
if(function_exists('custom_title')) {
    $title = custom_title ();
}
if(strlen($title) > 0) {
	$title = $title . " | ";
}

global $scripts;
$scripts = array ("vendor/jquery.min.js", "vendor/bootstrap.min.js", "vendor/headroom.min.js", "vendor/jQuery.headroom.js", "js/header.js");
if(function_exists('extra_scripts')) {
	$scripts = array_merge($scripts, extra_scripts ());
}

$styles = array ("css/razorflow.css");
if(function_exists('extra_styles')) {
	$styles = array_merge($styles, extra_styles());
}

$activeState = "";
if(function_exists('setActive')) {
    $activeState = setActive();
}

$topbarFlag = false;
if(function_exists('rf_topbar')) {
    $topbarFlag = true;
    $tb = rf_topbar();
    $topBarTitle = $tb['title'];
    $topBarLink = $tb['url'];
}

$identifyFlag = false;
if(function_exists('rf_identify')) {
    $identifyFlag = true;
    $params = rf_identify();
    $userName = addslashes($params['name']);
    $userEmail = addslashes($params['email']);
    $userId = md5($userEmail);
}

$trackFlag = false;
if(function_exists('rf_trackpage')) {
    $trackFlag = true;
    $params = rf_trackpage();
    $pageName = addslashes($params['name']);
    $pageOpts = array();
    if(isset($params['opts'])) {
        $pageOpts = $params['opts'];
    }
    $pageOpts['name'] = $pageName;
    $pageOpts = json_encode($pageOpts);
}

$uhFlag = false;
if(isset($_GET['uh'])) {
    $uhFlag = true;
    $uhValue = addslashes($_GET['uh']);
}

global $noCrunch;

$noCrunch = $_SERVER["SERVER_NAME"] == "localhost" || isset($_GET['dev']);
if(isset($_GET['forceCrunch'])) {
    $noCrunch = false;
}

?><!DOCTYPE HTML>
<html>
  <head>
    <?php if(!$noCrunch) { ?>
    <link rel="stylesheet" type="text/css" href="<?php echo get_crunched_styles ($styles); ?>" />
    <?php } else { foreach($styles as $item) { ?>
        <link rel="stylesheet" type="text/css" href="/static/<?php echo $item; ?>" />
    <?php } } ?>
      <script>
        (function(_,e,rr,s){_errs=[s];var c=_.onerror;_.onerror=function(){var a=arguments;_errs.push(a);
            c&&c.apply(this,a)};var b=function(){var c=e.createElement(rr),b=e.getElementsByTagName(rr)[0];
                c.src="//beacon.errorception.com/"+s+".js";c.async=!0;b.parentNode.insertBefore(c,b)};
                _.addEventListener?_.addEventListener("load",b,!1):_.attachEvent("onload",b)})
        (window,document,"script","53804aa6f0450f9b6c000012");
    </script>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
    <title><?php echo $title; ?>RazorFlow - HTML5 Dashboard Framework</title>

    <script type="text/javascript">
      window.analytics=window.analytics||[],window.analytics.methods=["identify","group","track","page","pageview","alias","ready","on","once","off","trackLink","trackForm","trackClick","trackSubmit"],window.analytics.factory=function(t){return function(){var a=Array.prototype.slice.call(arguments);return a.unshift(t),window.analytics.push(a),window.analytics}};for(var i=0;i<window.analytics.methods.length;i++){var key=window.analytics.methods[i];window.analytics[key]=window.analytics.factory(key)}window.analytics.load=function(t){if(!document.getElementById("analytics-js")){var a=document.createElement("script");a.type="text/javascript",a.id="analytics-js",a.async=!0,a.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.io/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(a,n)}},window.analytics.SNIPPET_VERSION="2.0.9",
      window.analytics.load("oh3w6qenjy");
      <?php if($trackFlag) { ?>
        window.analytics.page("<?php echo $pageName; ?>", <?php echo $pageOpts; ?>);
      <?php } else { ?>
      window.analytics.page();
        <?php } ?>

<?php 
    if($identifyFlag) { ?>
    window.analytics.identify('<?php echo $userId; ?>', {
        name: "<?php echo $userName; ?>",
        email: "<?php echo $userEmail; ?>"
    });
    window.analytics.alias('<?php echo $userId; ?>')
<?php } else if($uhFlag) { ?>
    window.analytics.alias("<?php echo $uhValue; ?>");
<?php } if(false) { ?>

<?php   } ?>

  </script>
  
  <?php 
      if(!$noCrunch) {  ?>
    <script type="text/javascript" src="<?php echo get_crunched_url($scripts); ?>"></script>
    <?php } else { foreach($scripts as $item) { ?>
    <script type="text/javascript" src="/static/<?php echo $item; ?>"></script>
    <?php } } ?>

  </head>

<body>
<div class="page-wrap">
<?php require "header_content.php"; ?>
