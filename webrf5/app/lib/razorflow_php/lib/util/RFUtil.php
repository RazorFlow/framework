<?php

class RFUtil {
	// let's say $baseURL is "/foo/bar.php" and params are "a" => 2, 'b' => 3
	// This should create "/foo/bar.php?a=2&b=3"	
	public static function buildURL ($baseUrl, $getParams = array()) {
		// TODO: add more functionality into this build url functionality
		// NOTE: this will not work if the URL already has any GET Params

		$getParts = array();

		// TODO: @swaroopsm
		// Is this a security Risk? If so, find a better solution.
		foreach ($_GET as $key => $value) {
			$getParams[$key] = $value;
		}

		$url = parse_url($baseUrl, PHP_URL_PATH);
		foreach ($getParams as $key => $value) {
			$getParts []= $key."=".$value; // TODO http encode this, which looks like a=2
		}
		
		$baseUrl = $url . "?" . implode("&", $getParts);

		return $baseUrl;
	}
}