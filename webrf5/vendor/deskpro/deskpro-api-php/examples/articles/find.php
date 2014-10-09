<?php

/*
 * This example demonstrates how to find articles.
 *
 * In this example, we are using the Category criteria
 * to find all articles that are in published in particular particular category.
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

// The category to search for
$category_id = 5;

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Then we need to build our list of criteria
$criteria = $api->articles->createCriteria();

$criteria->addCategory($category_id);

$result = $api->articles->find($criteria);

// Then we can get our results
$result = $api->tickets->find($criteria);

if (!$result->isError()) {
	// Request completed successfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}