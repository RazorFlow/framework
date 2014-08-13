<meta>
{
    "title": "Create a new dashboard",
    "id": "php_create_standalone",
    "index": 1
}
</meta>


To create a new dashboard you must first {{ linkArticle ('php_installation') }}. After that, the steps are:

1. Create a new PHP file `yourdashboard.php` which is inside your document root (you can change this file to anything).
2. Add the following code to the dashboard (You can rename `MyDashboard` to any name you like):

~~~
<?php
// Require the RazorFlow php wrapper
require('path/to/razorflow.php');
// You can rename the "MyDashboard" class to anything you want
class MyDashboard extends StandaloneDashboard {
	public function buildDashboard () {
		// Build your dashboard here.
	}
}

$dashboard = new MyDashboard ()
$dashboard->renderStandalone ();
?>
~~~

3. Open `yourdashboard.php` in your browser.