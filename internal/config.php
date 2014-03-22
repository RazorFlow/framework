<?php

global $rfExampleConfig;
$rfExampleConfig = array (
	'devStaticPaths' => array (
		'jsrf' => __DIR__.'/../../jsrf/src/',
		'jsrfBuild' => __DIR__.'/../../jsrf/build/'
	),
	'devLibPaths' => array (
		'rfphp' => __DIR__.'/../../src/razorflow.php'
	),
	'examplePaths' => array(
		'js' => array (
			'demos' => __DIR__."/../src/js/demos/",
			'examples' => __DIR__."/../src/js/examples/",
			'testcases' => __DIR__."/../src/js/testcases/"
		)
	)
);