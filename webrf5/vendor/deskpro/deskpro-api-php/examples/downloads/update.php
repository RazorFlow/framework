<?php

/**
 * This example demonstrates how to update an existing download
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

// ID of the download to be updated
$download_id	= 5;

// New title to set
$new_title	= 'Importer for V5 [Supports legacy versions]';

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Initialize an download editor
$download = $api->downloads->createDownloadEditor();

// Set the download ID
$builder->setId($download_id);

// Set the new title
$builder->setTitle($new_title);

// Save the download to persist the changes
$result = $api->downloads->save($download);			

if (!$result->isError()) {
	// Update persisted sucessfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
