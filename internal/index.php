<?php
require "config.php";
require "controllers/DevStaticController.php";
require "controllers/DevDashboardController.php";

$app = new Silex\Application();
$app['debug'] = true;

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/views',
));

// Development routes
$app->get('/devStatic/{lang}/{fileName}', 'DevStaticController::getDevFile')->assert('fileName', '.+');;
$app->get('/dev/', 'DevDashboardController::devIndex');
$app->get('/dev/js/{type}/{id}', 'DevDashboardController::devJSExample');
$app->match('/dev/php/{type}/{id}', 'DevDashboardController::devPHPExample');
$app->match('/dev/html/{type}/{id}', 'DevDashboardController::devHTMLExample');
$app->match('/docs/{fileName}', 'DevStaticController::devDocs')->assert('fileName', '.+');

// Production routes
$app->get('/', 'DevDashboardController::prodIndex');
$app->get('/dashboard/js/{type}/{id}', 'DevDashboardController::prodJSExample');
$app->match('/dashboard/php/{type}/{id}', 'DevDashboardController::prodPHPExample');

$app->run ();