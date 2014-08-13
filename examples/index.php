<?php

// web/index.php
$filename = __DIR__.preg_replace('#(\?.*)$#', '', $_SERVER['REQUEST_URI']);
if (php_sapi_name() === 'cli-server' && is_file($filename)) {
    return false;
}

if(substr($_SERVER['REQUEST_URI'], 0, 4) === "/app") {
	return false;
}


require_once __DIR__.'/vendor/autoload.php';
require_once __DIR__.'/internal/index.php';
