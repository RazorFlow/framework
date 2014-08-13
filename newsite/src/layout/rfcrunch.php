<?php

function get_crunched_url ($scripts) {
	$webRoot = $_SERVER['DOCUMENT_ROOT'];
	$hashString = "";
	foreach($scripts as $script) {
		$path = $webRoot."/static/".$script;
		if(file_exists($path)) {
			$hashString .= $path;
			$hashString .= filemtime($path);
		}
	}

	$hash = sha1($hashString);
	if(!file_exists($webRoot."/static/compiled/".$hash.".js")) {
		create_crunched_file ($hash, $scripts);
	}
	return "/static/compiled/".$hash.".js";
}

function create_crunched_file ($hash, $scripts) {
	$webRoot = $_SERVER['DOCUMENT_ROOT'];
	$hashPath = $webRoot."/static/compiled/".$hash.".js";
	if(file_exists($hashPath)) {
		unlink($hashPath);
	}
	$outFile = fopen($hashPath, "w");
	foreach ($scripts as $script) {
		$path = $webRoot."/static/".$script;
		fwrite($outFile, file_get_contents($path));
		fwrite($outFile, ";\n\n");
	}
	fclose($outFile);
} 

function get_crunched_styles ($styles) {
	$webRoot = $_SERVER['DOCUMENT_ROOT'];
	$hashString = "";
	foreach($styles as $style) {
		$path = $webRoot."/static/".$style;
		if(file_exists($path)) {
			$hashString .= $path;
			$hashString .= filemtime($path);
		}
	}

	$hash = sha1($hashString);
	if(!file_exists($webRoot."/static/compiled/".$hash.".css")) {
		create_crunched_style ($hash, $styles);
	}
	return "/static/compiled/".$hash.".css";
}

function create_crunched_style ($hash, $styles) {
	$webRoot = $_SERVER['DOCUMENT_ROOT'];
	$hashPath = $webRoot."/static/compiled/".$hash.".css";
	if(file_exists($hashPath)) {
		unlink($hashPath);
	}
	$outFile = fopen($hashPath, "w");
	foreach ($styles as $style) {
		$path = $webRoot."/static/".$style;
		fwrite($outFile, file_get_contents($path));
		fwrite($outFile, "\n\n");
	}
	fclose($outFile);
} 