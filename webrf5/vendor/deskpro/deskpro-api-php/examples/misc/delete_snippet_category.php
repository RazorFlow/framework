<?php

/*
 * This example delete a snippet category.
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

// Snippet category ID to delete
$category_id	= 7;

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Delete the category
$result = $api->misc->deleteSnippetCategory($type, $category_id);

if (!$result->isError()) {
	// Request completed successfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
