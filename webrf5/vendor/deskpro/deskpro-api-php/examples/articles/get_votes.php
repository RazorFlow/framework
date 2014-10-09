<?php

/*
 * This example demonstrate how to get all votes on an article.
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

// ID of the article to fetch the votes for
$article_id	= 5;

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Get the votes
$result = $api->articles->getArticleVotes($article_id);

if (!$result->isError()) {
	// votes retrieved sucessfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
