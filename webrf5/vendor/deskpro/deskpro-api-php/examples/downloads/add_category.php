<?php

/*
 * This example demonstrate how to create a new download category.
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

// Title of the new category.
$category_title	= 'How Tos';

// [OPTIONAL] Parent ID of the new category.
$parent_id 	= 1;

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Create the category
$result = $api->downloads->createCategory($category_title, $parent_id);

if (!$result->isError()) {
	// Category created successfully 
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
