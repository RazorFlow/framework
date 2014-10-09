<?php

namespace DeskPRO\Service;

/**
 * The Tickets API
 * Handles ticket related operations
 *
 * @link https://support.deskpro.com/kb/articles/89-tickets Official Documentation
 * @author Abhinav Kumar <abhinav.kumar@deskpro.com>
 */
class Tickets extends \DeskPRO\Service\AbstractService
{

	/**
	 * Creates and returns a search criteria
	 * 
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function createCriteria()
	{
		return new \DeskPRO\Criteria\Ticket();
	}

	/**
	 * Creates and returns a Builder object
	 * 
	 * @return \DeskPRO\Builder\Ticket
	 */
	public function createBuilder()
	{
		return new \DeskPRO\Builder\Ticket();
	}

	/**
	 * Finds tickets matching the criteria
	 * 
	 * @param \DeskPRO\Criteria\Ticket $criteria
	 * @return \DeskPRO\Api\Result
	 */
	public function find(\DeskPRO\Criteria\Ticket $criteria)
	{
		return $this->call('GET', '/tickets', $criteria->toArray());
	}

	/**
	 * Gets information about a ticket
	 * 
	 * @param int $ticketId ID of the ticket to search for
	 * @return \DeskPRO\Api\Result
	 */
	public function findById($ticketId)
	{
		return $this->call('GET', '/tickets/' . intval($ticketId));
	}

	/**
	 * Saves a ticket
	 * 
	 * @param \DeskPRO\Builder\Ticket $ticket The ticket builder object
	 * @return \DeskPRO\Api\Result
	 */
	public function save(\DeskPRO\Builder\Ticket $ticket)
	{
		$info = $ticket->getDataArray();

		$info = $this->_enforceFileUploadIsset($info, 'attach', true);

		if ($ticket->getId()) {
			return $this->call('POST', '/tickets/' . intval($ticket->getId()), $info);
		}

		return $this->call('POST', '/tickets', $info);
	}

	/**
	 * Deletes a ticket and optionally bans the email used to create it
	 * 
	 * @param int $ticketId ID of the ticket that needs to be deleted
	 * @param bool $banEmail If true bans the email
	 * @return \DeskPRO\Api\Result
	 */
	public function delete($ticketId, $banEmail = false)
	{
		return $this->call('DELETE', '/tickets/' . intval($ticketId), array('ban' => ($banEmail ? 1 : 0)));
	}

	/**
	 * UnDeletes a ticket
	 *
	 * @param int $ticketId ID of the ticket that needs to be undeleted
	 * @return \DeskPRO\Api\Result
	 */
	public function unDelete($ticketId)
	{
		return $this->call('POST', '/tickets/' . intval($ticketId) . '/undelete');
	}

	/**
	 * Marks a ticket as spam and optionally bans the creator's email
	 *
	 * @param int $ticketId ID of the ticket that needs to be marked
	 * @param bool $banEmail If true bans the email used to create this ticket
	 * @return \DeskPRO\Api\Result
	 */
	public function markAsSpam($ticketId, $banEmail = false)
	{
		return $this->call('POST', '/tickets/' . intval($ticketId) . '/spam', array('ban' => ($banEmail ? 1 : 0)));
	}

	/**
	 * Unmarks a ticket as spam.
	 *
	 * @param int $ticketId ID of the ticket that needs to be unmarked
	 * @return \DeskPRO\Api\Result
	 */
	public function unmarkAsSpam($ticketId)
	{
		return $this->call('POST', '/tickets/' . intval($ticketId) . '/unspam');
	}

	/**
	 * Assigns the ticket to the user making the API request
	 * 
	 * @param int $ticketId ID of the ticket that needs to be assigned
	 * @return \DeskPRO\Api\Result
	 */
	public function assignToMe($ticketId)
	{
		return $this->call('POST', '/tickets/' . intval($ticketId) . '/claim');
	}

	/**
	 * Locks a ticket.
	 *
	 * @param int $ticketId
	 * @return \DeskPRO\Api\Result
	 */
	public function lock($ticketId)
	{
		return $this->call('POST', '/tickets/' . intval($ticketId) . '/lock');
	}

	/**
	 * Unlocks a ticket.
	 *
	 * @param int $ticketId
	 * @return \DeskPRO\Api\Result
	 */
	public function unlock($ticketId)
	{
		return $this->call('POST', '/tickets/' . intval($ticketId) . '/unlock');
	}

	/**
	 * Merges two tickets.
	 *
	 * @param int $target The ticket that the other will be merged into
	 * @param int $from This ticket will be removed on a successful merge
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function merge($target, $from)
	{
		return $this->call('POST', '/tickets/' . intval($target) . '/merge/' . intval($from));
	}

	/**
	 * Splits 1 or more messages out of a ticket into a new ticket
	 *
	 * @param int $ticketId Ticket to split from
	 * @param array $messageIds Message IDs to split out
	 * @param string $subject Subject of new ticket
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function splitMessages($ticketId, array $messageIds, $subject = '')
	{
		$params = array(
			'messageIds' => $messageIds,
			'subject' => $subject
		);
		return $this->call('POST', '/tickets/' . intval($ticketId) . '/split', $params);
	}

	/**
	 * Gets all logs in a ticket.
	 *
	 * @param int $ticketId
	 * @return \DeskPRO\Api\Result
	 */
	public function getLogs($ticketId)
	{
		return $this->call('GET', '/tickets/' . intval($ticketId) . '/logs');
	}

	/**
	 * Gets all messages in a ticket.
	 *
	 * @param int $ticketId
	 * @return \DeskPRO\Api\Result
	 */
	public function getMessages($ticketId)
	{
		return $this->call('GET', '/tickets/' . intval($ticketId) . '/messages');
	}

	/**
	 * Creates a new ticket message in a ticket.
	 * 
	 * @param int $ticketId Ticket ID where the reply needs to be added
	 * @param string $message Message reply text.
	 * @param array $files An array of DpApiFileUpload|string|null to upload with the reply
	 * @param array $blobIds An array of already uploaded blob IDs
	 * @param bool $isNote If true, sets the reply as a note, rather than a public reply. Defaults to false.
	 * @param bool $asAgent If true, the message is considered to be written by the API agent rather than the ticket owner. Defaults to false.
	 * @param bool $isHtml If true, the message parameter is treated as HTML.
	 * @param bool $muteNotification If true, suppresses user notification of the reply. Defaults to false.
	 * @return \DeskPRO\Api\Result
	 */
	public function createMessage($ticketId, $message, $files = array(), $blobIds = array(), $isNote = false, $asAgent = false, $isHtml = false, $muteNotification = false)
	{
		$params = array();

		$params['message'] = $message;

		if (count($files)) {
			foreach ($files as $file) {
				$params['attach'][] = $file;
			}
		}

		if (count($blobIds)) {
			foreach ($blobIds as $blobId) {
				$params['attachId'][] = $blobId;
			}
		}

		$params['is_note'] = $isNote ? 1 : 0;

		$params['message_as_agent'] = $asAgent ? 1 : 0;

		$params['message_is_html'] = $isHtml ? 1 : 0;

		$params['suppress_user_notify'] = $muteNotification ? 1 : 0;

		$params = $this->_enforceFileUploadIsset($params, 'attach', true);

		return $this->call('POST', '/tickets/' . intval($ticketId) . '/messages', $params);
	}

	/**
	 * Gets a ticket message.
	 *
	 * @param int $ticketId
	 * @param int $messageId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getMessage($ticketId, $messageId)
	{
		return $this->call('GET', '/tickets/' . intval($ticketId) . '/messages/' . intval($messageId));
	}

	/**
	 * Gets a ticket message's details.
	 *
	 * @param int $ticketId
	 * @param int $messageId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getMessageDetails($ticketId, $messageId)
	{
		return $this->call('GET', '/tickets/' . intval($ticketId) . '/messages/' . intval($messageId) . '/details');
	}

	/**
	 * Gets ticket tasks.
	 *
	 * @param int $ticketId
	 * @return \DeskPRO\Api\Result
	 */
	public function getTasks($ticketId)
	{
		return $this->call('GET', '/tickets/' . intval($ticketId) . '/tasks');
	}

	/**
	 * Adds a ticket task.
	 *
	 * @param int $ticketId
	 * @param string $title Title of the task being added.
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function addTask($ticketId, $title)
	{
		$params = array('title' => $title);

		return $this->call('POST', '/tickets/' . intval($ticketId) . '/tasks', $params);
	}

	/**
	 * Gets the SLAs for a ticket
	 *
	 * @param int $ticketId
	 * @return \DeskPRO\Api\Result
	 */
	public function getTicketSlas($ticketId)
	{
		return $this->call('GET', '/tickets/' . intval($ticketId) . '/slas');
	}

	/**
	 * Add an SLA to a ticket.
	 *
	 * @param int $ticketId
	 * @param int $slaId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function addTicketSla($ticketId, $slaId)
	{
		$params = array('slaId' => $slaId);

		return $this->call('POST', '/tickets/' . intval($ticketId) . '/slas', $params);
	}

	/**
	 * Checks whether a ticket SLA is associated with the ticket.
	 *
	 * @param int $ticketId
	 * @param int $ticketSlaId Note, this differs from slaId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getTicketSla($ticketId, $ticketSlaId)
	{
		return $this->call('GET', '/tickets/' . intval($ticketId) . '/slas/' . intval($ticketSlaId));
	}

	/**
	 * Deletes a ticket SLA from a ticket.
	 *
	 * @param int $ticketId
	 * @param int $ticketSlaId Note, this differs from slaId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function removeTicketSla($ticketId, $ticketSlaId)
	{
		return $this->call('DELETE', '/tickets/' . intval($ticketId) . '/slas/' . intval($ticketSlaId));
	}

	/**
	 * Gets ticket billing charges.
	 *
	 * @param int $ticketId
	 * @return \DeskPRO\Api\Result
	 */
	public function getBillingCharges($ticketId)
	{
		return $this->call('GET', '/tickets/' . intval($ticketId) . '/billing-charges');
	}

	/**
	 * Adds a ticket billing charge.
	 *
	 * @param int $ticketId
	 * @param int $time Time in seconds to bill
	 * @param float $amount Amount in admin-specified currency to bill
	 * @param string $comment
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function addBillingCharge($ticketId, $time, $amount = 0.0, $comment = '')
	{
		$params = array(
			'time' => $time,
			'amount' => $amount,
			'comment' => $comment
		);

		return $this->call('POST', '/tickets/' . intval($ticketId) . '/billing-charges', $params);
	}

	/**
	 * Returns whether a charge is associated with the ticket.
	 *
	 * @param int $ticketId
	 * @param int $chargeId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getBillingCharge($ticketId, $chargeId)
	{
		return $this->call('GET', '/tickets/' . intval($ticketId) . '/billing-charges/' . intval($chargeId));
	}

	/**
	 * Removes a billing charge from a ticket.
	 *
	 * @param int $ticketId
	 * @param int $chargeId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function deleteBillingCharge($ticketId, $chargeId)
	{
		return $this->call('DELETE', '/tickets/' . intval($ticketId) . '/billing-charges/' . intval($chargeId));
	}

	/**
	 * Gets all participants (CC'd users) in a ticket.
	 *
	 * @param int $ticketId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getParticipants($ticketId)
	{
		return $this->call('GET', '/tickets/' . intval($ticketId) . '/participants');
	}

	/**
	 * Adds a ticket participant.
	 *
	 * @param int $ticketId
	 * @param int|null $personId If non-null, the ID of the person to add
	 * @param string|null $email If non-null (and personId is null), adds the specified email as a participant. A person will be created if needed.
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function addParticipant($ticketId, $personId = null, $email = null)
	{
		$params = array();

		if ($personId) {
			$params['personId'] = $personId;
		}

		if ($email) {
			$params['email'] = $email;
		}

		return $this->call('POST', '/tickets/' . intval($ticketId) . '/participants', $params);
	}

	/**
	 * Returns whether a person is a participant (CC user) in a ticket.
	 *
	 * @param int $ticketId
	 * @param int $personId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getParticipant($ticketId, $personId)
	{
		return $this->call('GET', '/tickets/' . intval($ticketId) . '/participants/' . intval($personId));
	}

	/**
	 * Removes a participant from a ticket.
	 *
	 * @param int $ticketId
	 * @param int $personId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function removeParticipant($ticketId, $personId)
	{
		return $this->call('DELETE', '/tickets/' . intval($ticketId) . '/participants/' . intval($personId));
	}

	/**
	 * Gets all labels associated with a ticket.
	 *
	 * @param int $ticketId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getTicketLabels($ticketId)
	{
		return $this->call('GET', '/tickets/' . intval($ticketId) . '/labels');
	}

	/**
	 * Adds a label to a ticket.
	 *
	 * @param int $ticketId
	 * @param string $label
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function addTicketLabel($ticketId, $label)
	{
		return $this->call('POST', '/tickets/' . intval($ticketId) . '/labels', array('label' => $label));
	}

	/**
	 * Determines if a ticket has a specific label.
	 *
	 * @param int $ticketId
	 * @param string $label
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getTicketLabel($ticketId, $label)
	{
		return $this->call('GET', '/tickets/' . intval($ticketId) . '/labels/' . $label);
	}

	/**
	 * Removes a label from a ticket.
	 *
	 * @param int $ticketId
	 * @param string $label
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function removeTicketLabel($ticketId, $label)
	{
		return $this->call('DELETE', '/tickets/' . intval($ticketId) . '/labels/' . $label);
	}

	/**
	 * Gets a list of custom ticket fields.
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getFields()
	{
		return $this->call('GET', '/tickets/fields');
	}

	/**
	 * Gets a list of ticket departments.
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getDepartments()
	{
		return $this->call('GET', '/tickets/departments');
	}

	/**
	 * Gets a list of products.
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getProducts()
	{
		return $this->call('GET', '/tickets/products');
	}

	/**
	 * Gets a list of ticket categories.
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getCategories()
	{
		return $this->call('GET', '/tickets/categories');
	}

	/**
	 * Gets a list of ticket priorities.
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getPriorities()
	{
		return $this->call('GET', '/tickets/priorities');
	}

	/**
	 * Gets a list of ticket workflows.
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getWorkflows()
	{
		return $this->call('GET', '/tickets/workflows');
	}

	/**
	 * Gets a list of SLAs.
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getSlas()
	{
		return $this->call('GET', '/tickets/slas');
	}

	/**
	 * Gets an SLA
	 *
	 * @param int $slaId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getSla($slaId)
	{
		return $this->call('GET', '/tickets/slas/' . intval($slaId));
	}

	/**
	 * Gets people that receive an SLA automatically
	 *
	 * @param int $slaId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getSlaPeople($slaId)
	{
		return $this->call('GET', '/tickets/slas/' . intval($slaId) . '/people');
	}

	/**
	 * Gets organizations that receive an SLA automatically
	 *
	 * @param int $slaId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getSlaOrganizations($slaId)
	{
		return $this->call('GET', '/tickets/slas/' . intval($slaId) . '/organizations');
	}

	/**
	 * Gets a list of ticket filters.
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getTicketsFilters()
	{
		return $this->call('GET', '/tickets/filters');
	}

	/**
	 * Runs the specified ticket filter and returns the results.
	 *
	 * @param int $filterId
	 * @param int $page Page number to retrieve results from
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function runTicketFilter($filterId, $page = 1)
	{
		$params = array('page' => $page);

		return $this->call('GET', '/tickets/filters/' . intval($filterId), $params);
	}

}
