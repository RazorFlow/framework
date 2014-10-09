<?php

/*
 * This example updates a snippet.
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

// Move the snippet to this category
$category_id	= 7;

// ID of the snippet to update
$snippet_id	= 4;

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Update the snippet
$result = $api->misc->updateSnippet($type, $snippet_id, $category_id);

if (!$result->isError()) {
	// Request completed successfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
