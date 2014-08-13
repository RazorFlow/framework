<meta>
{
  "title": "Embedding into CakePHP MVC App",
  "subtitle": "",
  "id": "php_cakephp",
  "index": 0
}
</meta>

### See the finished version

You can find the final dashboard that we will be building over here:

* Demo: [http://examples.razorflow.com/apps/php_mvc/cakephp/my/embeddedDashboard/](http://examples.razorflow.com/apps/php_mvc/cakephp/my/embeddedDashboard/)
* Source Code: [https://github.com/RazorFlow/examples/tree/master/apps/php_mvc/cakephp](https://github.com/RazorFlow/examples/tree/master/apps/php_mvc/cakephp)

### Set up the project

Before you begin please ensure that you've understood the process of how to {{ linkArticle ('php_create_embed')}};

1. Install and set up a CakePHP Project.
2. copy the `razorflow_php` folder into the `app/Vendor` folder of your project. There should now be a file: `app/Vendor/razorflow_php/razorflow.php`
3. (If you want to use CakePHP's asset loader), copy `razorflow.min.wrapper.js` from the download package into `app/webroot/js/` and `razorflow.min.css` to `app/webroot/css/` and the image files to `app/webroot/img`.

### Create your dashboard

Create a new file in the `lib` folder. For example, if we're creating a "Sales Dashboard", we'd create a file `app/lib/SalesDashboard.php`. This is where we define the dashboard.

~~~
<?php

App::import("vendor", "razorflow_php/razorflow");

class SalesDashboard extends EmbeddedDashboard {
  public function buildDashboard(){
  	// Build the dashboard here
  }
}
?>
~~~

So where can you access this dashboard? You can't open this file directly. You'll need to embed it somewhere.

### Embed this dashboard into a view.

After this point, the situation varies depending on how you're using CakePHP, but we're explaining it for the simplest use case, and you should take care to adapt it to your exact usage of Cake PHP.

The first thing you'd want to do is decide which page you want to embed the dashboard into. If it doesn't exist, create a new controller and action.

~~~
<?php

App::uses('AppController', 'Controller');
App::uses('SalesDashboard', 'Lib');

class MyController extends AppController {

	public $uses = array();

	public function embeddedDashboard () {

		$this->render("embeddedDashboard");
	}
}
?>
~~~

Notice that you use the `App::uses` to import the `SalesDashboard` class that you used earlier. Now we can create an object of `SampleDashboard`, into a variable called `$db` and pass this to the view

~~~
	public function embeddedDashboard () {
		$db = new SalesDashboard ();
		$this->set('db', $db);
		$this->render("embeddedDashboard");
	}
~~~

Now, we have to embed the dashboard inside a view. The specific view will depend on your implementation, but for this example it is in `app/Views/My/embedded_dashboard.cpl`. This is what we wrote for the embedded dashboard:

~~~
<?php
$this->Html->script('razorflow.wrapper.min', array('inline' => false));
$this->Html->script('razorflow.devtools.min', array('inline' => false));
$this->Html->css('razorflow.min', null, array('inline' => false));
?>
<h2>Embedded Dashboard</h2>

<?php $db->renderEmbedded(); ?>
~~~

Now load `http://localhost/cakephp/my/embeddedDashboard` (your URL will vary depending on the action/route you've chosen), and you should see the embedded dashboard.

### Adding interactivity.

In order to add interactivity, you will need to create another endpoint/Path/Action dedicated as a **Dashboard Action Path** - this will be used to handle interactivity. There are 2 steps in setting up the action path:

1. Have a CakePHP action to handle the RazorFlow Action Path.
2. Set the action path of the dashboard as the absoluteURL

The full code for the controller is:

~~~
class MyController extends AppController {

	public $uses = array();
	public $components = array('RequestHandler');


	public function embeddedDashboard () {
		$db = new SalesDashboard ();
		$db->setActionPath ("/apps/php_mvc/cakephp/my/dashboardAction");
		$this->set('db', $db);
		$this->render("embeddedDashboard");
	}

	public function dashboardAction () {
		$db = new SalesDashboard ();
		return new CakeResponse(array('body'=> $db->getJSONForAction ()));
		// return new CakeResponse (array('body' => $db->getJSONForAction ()));
	}
}
~~~

Here's what is happening with this code:

1. There's a `dashboardAction` cakephp action, which is the PHP action which handles all the interactivity.
2. You're using `$db->setActionPath` to set the action path of the dashboard to the Absolute URL which would end up in the dashboard action.
3. In the `dashboardAction` function, we create a new instance of SalesDashboard and check the `getJSONForAction` to get the response JSON. And this response is sent back as a `CakeResponse` which sets the appropriate headers and everything.

