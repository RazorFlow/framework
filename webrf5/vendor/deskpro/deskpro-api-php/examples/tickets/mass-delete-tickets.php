<?php

/*
 * This example deletes all the tickets in the database
 */

//-----------------------------------------------------
// DESKPRO API SETTINGS
//-----------------------------------------------------

require __DIR__.'/../../deskpro-api.php';

$deskpro_url   = 'http://example.com/deskpro';   // The URL to your helpdesk
$api_key       = '123:XYZ';                      // Your API key (Admin > Apps > API Keys)

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

use DeskPRO\Api;

class DeleteTickets
{
	protected  $api;

	public function __construct($dpUrl, $apiKey)
	{
		$this->api = new Api($dpUrl, $apiKey);
	}

	public function getAllTickets()
	{
		$criteria = $this->api->tickets->createCriteria();

		$result = $this->api->tickets->find($criteria)->getData();

		if (!$result || !isset($result['tickets'])) {
			return false;
		}

		return $result['tickets'];
	}

	public function deleteAllTickets()
	{
		$allTickets = $this->getAllTickets();

		if (empty($allTickets)) {
			echo 'No tickets found!';
			exit(1);
		}

		echo 'Deleting ', count($allTickets), ' tickets', PHP_EOL, PHP_EOL;

		foreach ($allTickets as $ticket) {
			if (!isset($ticket['id'])) {
				continue;
			}

			$result = $this->api->tickets->delete($ticket['id']);
			if ($result->isError()) {
				echo $result->getErrorMessage();
				exit;
			}

			echo 'Deleted ticket # ', $ticket['id'], PHP_EOL;
		}
	}
}

$operation = new DeleteTickets($deskpro_url, $api_key);
$operation->deleteAllTickets();