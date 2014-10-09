<?php
/*
 * This file loads the DeskPRO API in to your PHP project.
 *
 * 1) Include this file in your project:
 *
 *     require 'deskpro-api.php';
 *
 * 2) Use the DeskPRO API:
 *
 *     $api = new \DeskPRO\Api('http://example.com/deskpro', '123:XYZ');
 *
 * To learn more about how to use the API, refer to the README:
 * https://github.com/DeskPRO/deskpro-api-php/blob/master/README.md
 */


define('DESKPRO_API_LIB_PATH', realpath(__DIR__.'/src'));

spl_autoload_register(function($classname) {
	if (strpos($classname, 'DeskPRO\\') !== 0) {
		return false;
	}

	$path = DESKPRO_API_LIB_PATH . DIRECTORY_SEPARATOR . str_replace('\\', DIRECTORY_SEPARATOR, $classname) . '.php';
	if (file_exists($path)) {
		require $path;
		return true;
	} else {
		return false;
	}
});