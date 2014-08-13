<meta>
{
    "title": "Building a standalone dashboard with your web framework",
    "id": "webframework_standalone",
    "index": 4
}
</meta>

If you use a web framework, and wish to build a standalone dashboard - similar to the ones you can build by using the dashboard quick-start, you can easily do so. The steps involved are:

1. Create a blank page at your desired URL
2. Add some RazorFlow specific HTML to the page.
3. Include the RazorFlow JavaScript and CSS files in your page.
4. Build your dashboard.

### Create a blank page at your desired URL

You first need to create a page where your dashboard will finally be available. The process is dependent on your web server technology, and you may need to consult the documentation for that. Once the blank page has been created, open the URL in your web browser and you should see it.

### Add RazorFlow specific HTML

You need to add this HTML to the page:

~~~
<!doctype html >
<html>
    <head>
        <title>Your Dashboard Title</title>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    </head>  
    <body>
        <div id="dbTarget"></div>
    </body>
</html>
~~~

What is contained in this page?

1. The `doctype` tells the browser to display it in HTML5 mode.
2. The `<title>` tag is the title of your dashboard.
3. the `<meta>` tag tells mobile devices to not give a "zoomed-out" desktop view but rather a vertical scrolling mobile view.
4. Inside the body, you create a new div with the ID `dbTarget`. This is used by RazorFlow to find the right div to display the dashboard.

### Include the RazorFlow JavaScript and CSS files.

Upload/Copy the JS and CSS files included in the RazorFlow zip file to your static files folder. Find the path to the files on your web server, and specify them in the `<head>`

~~~
    <head>
        <title>RazorFlow Quick Start</title>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no">

        <link rel="stylesheet" type="text/css" href="css/razorflow.min.css">
        <script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
        <script type="text/javascript" src="js/razorflow.min.js"></script>
        <script type="text/javascript" src="js/razorflow.devtools.min.js"></script>
    </head>  
~~~

### Include your dashboard js file

Lastly, create a dashboard JavaScript file in the same static folder and include it in the HTML page:

~~~
        <script type="text/javascript" src="js/your_dashboard.js"></script>
~~~

### Build your dashboard

Now, you're all ready to build your dashboard! Before you begin, don't forget to create a standalone dashboard:

~~~
rf.StandaloneDashboard(function (db) {
	// Build your dashboard here.
})
~~~

