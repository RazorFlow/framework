<?php

/**
 * This example demonstrates how to update an existing article
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

// ID of the article to be updated
$article_id	= 5;

$new_title	= 'Updating your PHP Version [Updated with PHP 5.5]';

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Initialize an article editor
$article = $api->articles->createArticleEditor();

// Set the article ID
$builder->setId($article_id);

// Set the new title
$builder->setTitle($new_title);

// Save the article to persist the changes
$result = $api->articles->save($article);			

if (!$result->isError()) {
	// Update persisted sucessfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
