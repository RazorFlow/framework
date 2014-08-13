<!DOCTYPE HTML>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>RazorFlow Demos | RazorFlow - HTML5 Dashboard Framework</title>
    <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700' rel='stylesheet' type='text/css'>

        <link rel="stylesheet" type="text/css" href="/static/css/rfweb.css" />
        <link rel="stylesheet" type="text/css" href="/static/transfer/build/css/razorflow.min.css" />
        <script type="text/javascript" src="/static/vendor/head.min.js"></script>
    <script type="text/javascript">
    var scriptList = [];
        scriptList.push("/static/transfer/build/js/razorflow.min.js");
        scriptList.push("/static/js/rfDemoStandalone.js");
        scriptList.push("/static/transfer/build/js/rfDemos.js");
        head.load(scriptList);
      <?php 
        $dbId = htmlentities($_GET['id']);
       ?>
      window.dbId = '<?php echo $dbId; ?>';
    </script>
    <script type="text/javascript">
      window.analytics=window.analytics||[],window.analytics.methods=["identify","group","track","page","pageview","alias","ready","on","once","off","trackLink","trackForm","trackClick","trackSubmit"],window.analytics.factory=function(t){return function(){var a=Array.prototype.slice.call(arguments);return a.unshift(t),window.analytics.push(a),window.analytics}};for(var i=0;i<window.analytics.methods.length;i++){var key=window.analytics.methods[i];window.analytics[key]=window.analytics.factory(key)}window.analytics.load=function(t){if(!document.getElementById("analytics-js")){var a=document.createElement("script");a.type="text/javascript",a.id="analytics-js",a.async=!0,a.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.io/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(a,n)}},window.analytics.SNIPPET_VERSION="2.0.9",
      window.analytics.load("oh3w6qenjy");
              window.analytics.page("Demos", {"name":"Demos"});
  </script>
  <body>
  <div id="dbTarget">
  </div>
</body>
</html>