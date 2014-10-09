<?php

/*
 * This example updates a snippet category.
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

// The type of snippet $type categories
// Can be either of 'tickets' or 'chat'
$type		= 'tickets';

// Snippet category ID to fetch
$category_id	= 7;

// Whether to make this category 'Global'
$is_global	= true;

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Get the category
$result = $api->misc->updateSnippetCategory($type, $category_id, $is_global);

if (!$result->isError()) {
	// Request completed successfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
