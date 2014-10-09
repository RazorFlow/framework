<?php

/*
 * This example demonstrate how to update an existing download category.
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

// ID of the download category to update
$category_id = 8;

// Updated title of the category
$title = 'Archived Downloads';

// [OPTIONAL] Updated parent of the category
$parent_id = 2;

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Update the category
$result = $api->downloads->updateCategory($category_id, $title, $parent_id);

if (!$result->isError()) {
	// Category updated successfully 
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
