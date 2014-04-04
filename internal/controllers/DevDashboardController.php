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
			$fileContents = $file->getContents();
			$res []= array(
				"meta" => $this->getFileMeta($fileContents),
				"basename" => $file->getBaseName (".".$fileType)
      );
		}

		return $res;
	}

	private function buildExampleArray () {
		global $rfExampleConfig;
		$examples = array ('js' => array(), 'php' => array());
		$examples['js']['demos'] = $this->find('js', 'demos', 'js');
		$examples['js']['examples'] = $this->find('js', 'examples', 'js');
		$examples['js']['testcases'] = $this->find('js', 'testcases', 'js');

		$examples['php']['demos'] = $this->find('php', 'demos', 'php');
		$examples['php']['examples'] = $this->find('php', 'examples', 'php');
		$examples['php']['testcases'] = $this->find('php', 'testcases', 'php');

		$examples['html']['demos'] = $this->find('html', 'demos', 'html');
		$examples['html']['examples'] = $this->find('html', 'examples', 'html');
		$examples['html']['testcases'] = $this->find('html', 'testcases', 'html');

		return $examples;
	}

  private function getFileMeta($contents){
    $re = "/\/\*\&(.*)\*\//s";
    preg_match_all($re, $contents, $matches);

    if($matches && count($matches[1]) > 0){
      $meta = $matches[1][0];
      return json_decode($meta, true);
    }

    return array();
  }

	public function devIndex(Request $request, Application $app) {
		$examples = $this->buildExampleArray ();

		return $app['twig']->render('dev/index.twig', array(
			'examples' => $examples
		));
	}

	public function prodIndex(Request $request, Application $app) {
		$examples = $this->buildExampleArray ();

		return $app['twig']->render('prod/index.twig', array(
			'examples' => $examples
		));
	}


	public function devJSExample (Request $request, Application $app, $type, $id) {
		global $rfExampleConfig;
		$examples = $this->buildExampleArray ();

		$fileContents = file_get_contents($rfExampleConfig['examplePaths']['js'][$type].'/'.$id.'.js');

		return $app['twig']->render('dev/jsExample.twig', array(
			'type' => $type,
			'id' => $id,
			'file_contents' => $fileContents
		));
	}

	public function devPHPExample(Request $request, Application $app, $type, $id) {
		global $rfExampleConfig;
		$filePath = $rfExampleConfig['examplePaths']['php'][$type].'/'.$id.'.php';

		$this->createHeader ($app);

		global $_rfConfig;
		$_rfConfig = array(
			"staticRoot" => "",
			"rfDev" => false
		);
		global $phpHead, $phpBody;
		$phpHead = $app['twig']->render('dev/phpHead.twig', array(
		));
		$phpBody = $app['twig']->render('dev/phpBody.twig', array(
		));

		function _rf_alternate_head () {
			global $phpHead, $phpBody;
			echo $phpHead;
		}

		function _rf_alternate_body() {
			global $phpHead, $phpBody;
			echo $phpBody;
		}

		ob_start();
		require $rfExampleConfig['devLibPaths']['rfphp'];
		require $filePath;
		$contents = ob_get_contents();
		ob_end_clean();

		return new Response ($contents);
	}

	public function devHTMLExample (Request $request, Application $app, $type, $id) {
		global $rfExampleConfig;
		$examples = $this->buildExampleArray ();

		$fileContents = file_get_contents($rfExampleConfig['examplePaths']['html'][$type].'/'.$id.'.html');

		return $app['twig']->render('dev/htmlExample.twig', array(
			'type' => $type,
			'id' => $id,
			'file_contents' => $fileContents
		));
	}

	public function prodPHPExample(Request $request, Application $app, $type, $id) {
		global $rfExampleConfig;
		$filePath = $rfExampleConfig['examplePaths']['php'][$type].'/'.$id.'.php';

		$this->createHeader ($app);

		global $_rfConfig;
		$_rfConfig = array(
			"staticRoot" => $rfExampleConfig['prodLibPaths']['rfStatic']
		);

		ob_start();
		require $rfExampleConfig['prodLibPaths']['rfphp'];
		require $filePath;
		$contents = ob_get_contents();
		ob_end_clean();

		return new Response ($contents);
	}

	protected function createHeader ($app) {
		global $razorflow_assets;
		$razorflow_assets = $app['twig']->render('dev/jsIncludes.twig', array(
		));
	}

	public function prodJSExample (Request $request, Application $app, $type, $id) {
		return $app['twig']->render('prod/jsExample.twig', array(
			'type' => $type,
			'id' => $id
		));
	}
}
