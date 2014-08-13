<?php

$title = "";
if(function_exists('custom_title')) {
    $title = custom_title ();
}
if(strlen($title) > 0) {
  $title = $title . " | ";
}

$scripts = array ("js/header.js");
if(function_exists('extra_scripts')) {
  $scripts = array_merge($scripts, extra_scripts ());
}

$styles = array ("css/razorflow.css");

?>

<!DOCTYPE HTML>
<html>
  <head>
      <style type="text/css">
        p {
          line-height: 20px !important;
        }
      </style>
      <script>
        (function(_,e,rr,s){_errs=[s];var c=_.onerror;_.onerror=function(){var a=arguments;_errs.push(a);
            c&&c.apply(this,a)};var b=function(){var c=e.createElement(rr),b=e.getElementsByTagName(rr)[0];
                c.src="//beacon.errorception.com/"+s+".js";c.async=!0;b.parentNode.insertBefore(c,b)};
                _.addEventListener?_.addEventListener("load",b,!1):_.attachEvent("onload",b)})
        (window,document,"script","53804aa6f0450f9b6c000012");
    </script>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>RazorFlow - HTML5 Dashboard Framework</title>

    <?php foreach($styles as $style) { ?>
    <link rel="stylesheet" type="text/css" href="/static/<?php echo $style; ?>" />
    <?php } ?>
    <script type="text/javascript">
      window.analytics=window.analytics||[],window.analytics.methods=["identify","group","track","page","pageview","alias","ready","on","once","off","trackLink","trackForm","trackClick","trackSubmit"],window.analytics.factory=function(t){return function(){var a=Array.prototype.slice.call(arguments);return a.unshift(t),window.analytics.push(a),window.analytics}};for(var i=0;i<window.analytics.methods.length;i++){var key=window.analytics.methods[i];window.analytics[key]=window.analytics.factory(key)}window.analytics.load=function(t){if(!document.getElementById("analytics-js")){var a=document.createElement("script");a.type="text/javascript",a.id="analytics-js",a.async=!0,a.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.io/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(a,n)}},window.analytics.SNIPPET_VERSION="2.0.9",
      window.analytics.load("oh3w6qenjy");
  </script>
  </head>
<body>
<div class="page-wrap">
<div class="rfheader">
    <div class="container">
        <h2>Browser not supported</h2>
    </div>

</div>
<div class="container content-start">
  <div class="col-md-12 content-start only-content">
    <h3>Your browser is not supported</h3>

    <p>
      Thank you for your interest in the RazorFlow! We build the RazorFlow Dashboard Framework - a powerful mobile-friendly HTML5 Dashboard Framework. Our framework lets developers build great looking interactive dashboards that users love, with just a few lines of code.
    </p>

    <p>
      We have detected that you're using an older browser: (Browser Name Here). Unfortunately, your browser is not supported by our product, or even our website, so you are being shown this message.
    </p>

    <p>
      At RazorFlow, we leverage the power of modern browsers to create great experiences that users love, and we are sure you would too. We understand that some people cannot upgrade or change their browsers due to policies and requirements by their employer organizations, we can only hope this situation changes soon.
    </p>

    <p>
      In the meantime, we're hard at work leveraging the very best features modern web has to offer, to build a dashboard framework that's fast, powerful, interactive and most importantly - something that users love to use. The future is going to be great! RazorFlow will be there, and we sincerely hope to have you with us.
    </p>

    <h6>Calls to action</h6>
    <ul style="padding-left: 15px;">
      <li><a href="http://browsehappy.com/">Upgrade to a modern browser.</a></li>
    </ul>

    <h6>Small low-priority text links</h6>
    <ul style="padding-left: 15px;">
      <li>If your browser has been improperly detected, please let us know at <strong><a href="mailto: support@razorflow.com">support@razorflow.com</a></strong></li>
    </ul>

  </div>
</div>
</div>
</body>
</html>