<?php

/*
 * This example demonstrates how to create a download via the API
 */

 //-----------------------------------------------------
// DESKPRO API SETTINGS
//-----------------------------------------------------

require __DIR__.'/../../deskpro-api.php';

$deskpro_url   = 'http://example.com/deskpro';   // The URL to your helpdesk
$api_key       = '123:XYZ';                      // Your API key (Admin > Apps > API Keys)

// First, create the API object
$api = new \DeskPRO\Api($deskpro_url, $api_key);

//-----------------------------------------------------
// EXAMPLE VARIABLES
//-----------------------------------------------------

// Download title
$title 		= 'Importing tool for V5';

// Path to the local file you want to save for this download
$file		= '/path/to/file.ext';

// Category id where this download should be saved
$category_id 	= 7;

// [OPTIONAL] Label to add to the download
$label 		= 'freebies';

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Create an download editor
$builder = $api->downloads->createDownloadEditor();

// Now set the various values for the download
$builder->attachFile($file)
            ->addCategory($category_id)
            ->addLabel($label)
            ->setTitle($title);

// The new download is now ready to be saved	
$result = $api->downloads->save($builder);

if (!$result->isError()) {
	// Request completed successfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}