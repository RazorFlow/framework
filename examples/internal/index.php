<?php
require "config.php";
require "controllers/DevStaticController.php";
require "controllers/DevDashboardController.php";
ini_set("date.timezone", "Asia/Kolkata");

$app = new Silex\Application();
$app['debug'] = true;

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/views',
));

global $rfExampleConfig;
// mounts
foreach($rfExampleConfig['mounts'] as $point => $path) {
	$app->get("/mount/$point/{fileName}", function ($fileName) use ($app, $path) {
		$filePath = $path.$fileName;
		$arr = explode(".", $fileName);
		$extension = array_pop($arr);
		$mime = "text/plain";

		if($extension === "css") {
			$mime = "text/css";
		}
		else if ($extension === "js") {
			$mime = "application/javascript";
		}
		else if ($extension === "html") {
			$mime = "text/html";
		}


		return $app->sendFile($filePath, 200, array('Content-Type' => $mime));
	})->assert('fileName', '.+');
}

// Development routes
$app->get('/devStatic/{lang}/{fileName}', 'DevStaticController::getDevFile')->assert('fileName', '.+');;
$app->get('/dev/', 'DevDashboardController::devIndex');
$app->get('/dev/js/bench/{id}', 'DevDashboardController::devJSBench');
$app->get('/dev/js/{type}/{id}', 'DevDashboardController::devJSExample');
$app->match('/dev/php/{type}/{id}', 'DevDashboardController::devPHPExample');
$app->match('/dev/html/{type}/{id}', 'DevDashboardController::devHTMLExample');
$app->match('/dev/test/{id}', 'DevDashboardController::devTest');
$app->match('/docs/{fileName}', 'DevStaticController::devDocs')->assert('fileName', '.+');

// Production routes
$app->get('/', 'DevDashboardController::prodIndex');
$app->get('/dashboard/js/{type}/{id}', 'DevDashboardController::prodJSExample');
$app->match('/dashboard/php/{type}/{id}', 'DevDashboardController::prodPHPExample');
$app->match('/dashboard/test/{id}', 'DevDashboardController::prodTest');

$app->run ();