<?php

/**
 * This example demonstrates how to find feedbacks in the database.
 *
 * In this example, we are using the Category field and the Created field
 * to find all feedbacks that are 
 *
 * in a particular $category AND
 * created before $date AND
 * marked with a custom $label.
 *
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

// feedbacks should be in this category
$category_id 	= 5;

// They should be created before this Unix $timestamp
$timestamp	= 1364816698;

// They should also contain this label
$label		= 'accepted';

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Then we need to build our list of criteria
$criteria = $api->feedbacks->createCriteria();

// Now set various criteria filters
$criteria->addCategory($category_id)
            ->createdBefore($timestamp)
            ->addLabel($label);

// Then we can get our results
$result = $api->feedbacks->find($criteria);

if (!$result->isError()) {
	// Request completed successfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}