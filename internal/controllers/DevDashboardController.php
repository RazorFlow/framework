<?php

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Finder\Finder;


class DevDashboardController {
	private function find ($lang, $type, $fileType) {
		global $rfExampleConfig;

		$finder = new Finder();
		$finder->in($rfExampleConfig['examplePaths'][$lang][$type])->name("*.".$fileType);
		$res = array();
		foreach($finder as $file) {
			$res []= $file->getBaseName (".".$fileType);
		}

		return $res;
	}

	private function buildExampleArray () {
		global $rfExampleConfig;
		$examples = array ('js' => array());
		$examples['js']['demos'] = $this->find('js', 'demos', 'js');
		$examples['js']['examples'] = $this->find('js', 'examples', 'js');
		$examples['js']['testcases'] = $this->find('js', 'testcases', 'js');

		return $examples;
	}
	public function index (Request $request, Application $app) {
		$examples = $this->buildExampleArray ();

		return $app['twig']->render('dev/index.twig', array(
			'examples' => $examples
		));
	}

	public function jsExample (Request $request, Application $app, $type, $id) {
		global $rfExampleConfig;
		$examples = $this->buildExampleArray ();

		$fileContents = file_get_contents($rfExampleConfig['examplePaths']['js'][$type].'/'.$id.'.js');

		return $app['twig']->render('dev/jsExample.twig', array(
			'type' => $type,
			'id' => $id,
			'file_contents' => $fileContents
		));
	}
}