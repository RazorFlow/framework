<?php

global $rfExampleConfig;
$rfExampleConfig = array (
	'devStaticPaths' => array (
		'jsrf' => __DIR__.'/../../jsrf/src/',
		'docs' => __DIR__.'/../../docs/build/docs/',
		'jsrfBuild' => __DIR__.'/../../jsrf/build/'
	),
	'devLibPaths' => array (
		'rfphp' => __DIR__.'/../../phprf/src/razorflow.php'
	),
	'prodLibPaths' => array (
		'rfphp' => __DIR__.'/../lib/phprf/razorflow.php',
		'rfStatic' => '/static/rf/'
	),
	'examplePaths' => array(
		'js' => array (
			'demos' => __DIR__."/../src/js/demos/",
			'examples' => __DIR__."/../src/js/examples/",
			'testcases' => __DIR__."/../src/js/testcases/"
		),
		'php' => array (
			'demos' => __DIR__."/../src/php/demos/",
			'examples' => __DIR__."/../src/php/examples/",
			'testcases' => __DIR__."/../src/php/testcases/"
		)
	)
);