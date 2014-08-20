--
title: "Deploying your Dashboard"
id: "dashboard_deploy"
index: 9
--


The process of deploying a dashboard using RazorFlow Dashboard Framework to your final production server depends on the specific deployment process followed by your product. However these are the general steps and guidelines to follow:

1. Upload the files: `razorflow.min.js`, `razorflow.min.css` and the `img` folder on to your server. For this you can use FTP, your server's admin console or any other tool like SCP, or rsync.
2. Make sure that the path to the JavaScript and CSS files are properly set in the HTML of your dashboard.
3. During development, we recommend including `razorflow.devtools.min.js`. This will activate special tools which make development easier. However this isn't necessary for deployment when you upload your dashboard to the production server.


## Tips

#### Automatically turn off devtools in frameworks

If you're using a web framework which allows you to check the deployment configuration, which you can use to automatically turn off devtools. To turn off devtools, all you need to do is make sure that `razorflow.devtools.min.js` is not included.

* In rails, consider using the [asset pipeline](http://guides.rubyonrails.org/asset_pipeline.html) to make a separate build excluding devtools.
* Codeigniter also has support for [environments](http://ellislab.com/codeigniter/user-guide/general/environments.html) which can be used for this feature.

#### Easy way to auto-disable devtools in PHP

If you use `http://localhost` to access your development environment, then you can use this code to ensure that devtools are enabled only when you are loading your dashboard locally. For this we'll be looking at the `HTTP_HOST` index of [$_SERVER](http://php.net/manual/en/reserved.variables.server.php#refsect1-reserved.variables.server-indices)

~~~
<?php
if($_SERVER['HTTP_HOST'] === "localhost") { ?>
<script src="/path/to/razorflow.devtools.min.js" type="text/javascript"></script>
<?php } ?>
~~~

This should be included in the `<head>` section of your HTML after loading `razorflow.min.js`

#### Using a CDN

For added performance you can consider uploading `razorflow.min.js` and `razorflow.min.css` and the `img` files to a [CDN](http://en.wikipedia.org/wiki/Content_delivery_network) like Amazon Cloudfront. We have tested to ensure that there are no problems when using a CDN but it's vital to ensure that the "css" and "img" folders are correctly named relative to one another.
