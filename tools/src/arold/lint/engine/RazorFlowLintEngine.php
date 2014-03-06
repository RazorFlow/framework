<?php
final class RazorFlowLintEngine extends ArcanistLintEngine {
	$linters = array();

    $paths = $this->getPaths();

    foreach ($paths as $key => $path) {
      if (!$this->pathExists($path)) {
        unset($paths[$key]);
      }
      if (!preg_match('@^src/js/@', $path)) {
      	// If something isn't in "src/js" it doesn't get linted
        unset($paths[$key]);
      }
    }

    $text_paths = preg_grep('/\.(php|css|hpp|cpp|l|y)$/', $paths);
    $linters[] = id(new ArcanistTextLinter())->setPaths($text_paths);
    $linters[] = id(new ArcanistJSHintLinter())
      ->setPaths(preg_grep('/\.js$/', $paths));

    return $linters;
  }
}