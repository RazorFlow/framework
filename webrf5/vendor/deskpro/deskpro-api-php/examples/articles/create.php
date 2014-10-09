<?php

/*
 * This example demonstrates how to create an article via the API
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

// Article title
$title 		= 'How to add another domain';

// Content of the article
$content 	= '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>';

// Category id where this article should be saved
$category_id 	= 7;

// [OPTIONAL] Label to add to the article
$label 		= 'howtos';

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Create an Article editor
$ticket = $api->articles->createArticleEditor();

// Now set the various values for the article
$ticket->setTitle($title)
	->setContent($content)
	->addLabel($label)
	->addCategory($category_id);

// The new ticket is now ready to be saved	
$result = $api->articles->save($ticket);

if (!$result->isError()) {
	// Request completed successfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}