<?php

class RFUtil {
	// let's say $baseURL is "/foo/bar.php" and params are "a" => 2, 'b' => 3
	// This should create "/foo/bar.php?a=2&b=3"	
	public static function buildURL ($baseUrl, $getParams = array()) {
		// TODO: add more functionality into this build url functionality
		// NOTE: this will not work if the URL already has any GET Params

		$getParts = array();
		foreach ($getParams as $key => $value) {
			$getParts []= $key."=".$value; // TODO http encode this, which looks like a=2
		}

		$baseUrl = $baseUrl . "?" . implode("&", $getParts);

		return $baseUrl;
	}
}