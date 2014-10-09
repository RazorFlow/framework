<?php

namespace DeskPRO\Service;

/**
 * The People Service
 * Handles people related operations
 * 
 * @link https://support.deskpro.com/kb/articles/90-people Official Documentation
 * @author Abhinav Kumar <abhinav.kumar@deskpro.com>
 */
class People extends AbstractService
{

	/**
	 * Creates a Person Builder
	 *
	 * @return \DeskPRO\Builder\Person
	 */
	public function createPersonEditor()
	{
		return new \DeskPRO\Builder\Person();
	}

	/**
	 * Creates and returns a search criteria
	 * 
	 * @return \DeskPRO\Criteria\People
	 */
	public function createCriteria()
	{
		return new \DeskPRO\Criteria\People();
	}

	/**
	 * Search for people matching criteria
	 * 
	 * @param \DeskPRO\Criteria $criteria
	 * @return \DeskPRO\Api\Result Result Object
	 */
	public function find(\DeskPRO\Criteria\People $criteria)
	{
		return $this->call('GET', '/people', $criteria->toArray());
	}

	/**
	 * Finds a Person by ID
	 * 
	 * @param int $personId Person's ID to search
	 * @return \DeskPRO\Api\Result
	 */
	public function findById($personId)
	{
		return $this->call('GET', '/people/' . intval($personId));
	}

	/**
	 * Deletes a Person by ID
	 *
	 * @param int $personId ID of the Person to delete
	 * @return \DeskPRO\Api\Result
	 */
	public function deleteById($personId)
	{
		return $this->call('DELETE', '/people/' . intval($personId));
	}

	/**
	 * Saves a Person
	 * 
	 * @param \DeskPRO\Builder\Person $person
	 * @return \DeskPRO\Api\Result
	 * @throws \Exception if required parameters are missing
	 */
	public function save(\DeskPRO\Builder\Person $person)
	{
		if ($person->getId()) {
			return $this->call('POST', '/people/' . intval($person->getId()), $person->getDataArray());
		}

		return $this->call('POST', '/people', $person->getDataArray());
	}

	/**
	 * Merges two people.
	 *
	 * @param integer $target The person that the other will be merged into
	 * @param integer $from This person will be removed on a successful merge
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function merge($target, $from)
	{
		return $this->call('POST', '/people/' . intval($target) . '/merge/' . intval($from));
	}

	/**
	 * Clears all active sessions for a person
	 *
	 * @param int $personId The person's ID
	 * @return \DeskPRO\Api\Result
	 */
	public function clearSessions($personId)
	{
		return $this->interface->call('POST', '/people/' . $personId . '/clear-session');
	}

	/**
	 * Gets a list of automatically applied SLAs for a person
	 *
	 * @param int $personId The Person's ID
	 * @return \DeskPRO\Api\Result
	 */
	public function getSlas($personId)
	{
		return $this->call('GET', '/people/' . intval($personId) . '/slas');
	}

	/**
	 * Adds an SLA for a person.
	 *
	 * @param int $personId The Person's ID
	 * @param int $slaId The SLA ID
	 * @return \DeskPRO\Api\Result
	 */
	public function addSla($personId, $slaId)
	{
		$params = array('sla_id' => $slaId);
		return $this->call('POST', '/people/' . intval($personId) . '/slas', $params);
	}

	/**
	 * Determines if a person has a particular SLA
	 *
	 * @param int $personId
	 * @param int $slaId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getSla($personId, $slaId)
	{
		return $this->call('GET', '/people/' . intval($personId) . '/slas/' . intval($slaId));
	}

	/**
	 * Deletes a particular SLA for a person.
	 *
	 * @param int $personId The Person's ID
	 * @param int $slaId The SLA ID
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function deleteSla($personId, $slaId)
	{
		return $this->call('DELETE', '/people/' . intval($personId) . '/slas/' . intval($slaId));
	}

	/**
	 * Get the picture for a person
	 *
	 * @param int $personId The Person's ID
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getPicture($personId)
	{
		return $this->call('GET', '/people/' . intval($personId) . '/picture');
	}

	/**
	 * Set the picture of a person
	 *
	 * @param int $personId The Person's ID
	 * @param DpApiFileUpload|string|null $file File to upload
	 * @param integer|null $blobId Existing attachment ID (blob ID), possibly from uploadFile()
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function setPersonPicture($personId, $file = null, $blobId = null)
	{
		if ($blob_id) {
			$params = array('blob_id' => $blob_id);
		} else if ($file) {
			$params = array('file' => $file);
		} else {
			$params = array();
		}

		$params = $this->_enforceFileUploadIsset($params, 'file');

		return $this->call('POST', '/people/' . intval($personId) . '/picture', $params);
	}

	/**
	 * Delete the picture of a person
	 *
	 * @param int $personId The Person's ID
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function deletePicture($personId)
	{
		return $this->call('DELETE', '/people/' . intval($personId) . '/picture');
	}

	/**
	 * Gets all emails for a person.
	 *
	 * @param int $personId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getEmails($personId)
	{
		return $this->call('GET', '/people/' . intval($personId) . '/emails');
	}

	/**
	 * Adds an email for a person.
	 * 
	 * @param int $personId
	 * @param string $email
	 * @param string $comment
	 * @param boolean $setPrimary
	 * @return \DeskPRO\Api\Result
	 */
	public function addEmail($personId, $email, $comment = '', $setPrimary = FALSE)
	{
		$params = array(
			'email' => $email,
			'comment' => $comment,
			'set_primary' => $setPrimary
		);

		return $this->call('POST', '/people/' . intval($id) . '/emails', $params);
	}

	/**
	 * Gets information about a particular email ID for a person.
	 *
	 * @param int $personId
	 * @param int $emailId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getEmail($personId, $emailId)
	{
		return $this->call('GET', '/people/' . intval($personId) . '/emails/' . intval($emailId));
	}

	/**
	 * Updates a particular email ID for a person.
	 *
	 * @param int $personId The Persons's ID
	 * @param int $emailId The EmailID to update
	 * @param bool $setPrimary Whether to make this the primary email
	 * @param string $comment Email comment
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function updateEmail($personId, $emailId, $setPrimary = false, $comment = null)
	{
		return $this->call('POST', '/people/' . intval($personId) . '/emails/' . intval($emailId), array(
			'set_primary' => $setPrimary,
			'comment' => $comment
		));
	}

	/**
	 * Deletes a particular email ID for a person.
	 *
	 * @param int $personId
	 * @param int $emailId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function deleteEmail($personId, $emailId)
	{
		return $this->call('DELETE', '/people/' . intval($personId) . '/emails/' . intval($emailId));
	}

	/**
	 * Gets tickets for a person.
	 *
	 * @param int $personId
	 * @param int $page Page number of results to retrieve - defaults to 1
	 * @param null|string $order Order of results (if not specified, uses API default)
	 * @param null|int $cache_id If specified, uses the cached results from this set if possible.
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getTickets($personId, $page = 1, $order = null, $cache_id = null)
	{
		$params = array();

		$params['page'] = $page;
		if ($order !== null) {
			$params['order'] = $order;
		}

		if ($cache_id !== null) {
			$params['cache'] = $cache_id;
		}

		return $this->call('GET', '/people/' . intval($personId) . '/tickets', $params);
	}

	/**
	 * Gets chats for a person.
	 *
	 * @param int $personId
	 * @param int $page Page number of results to retrieve - defaults to 1
	 * @param null|string $order Order of results - this is currently not used by the API!
	 * @param null|int $cache_id If specified, uses the cached results from this set if possible.
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getChats($personId, $page = 1, $order = null, $cache_id = null)
	{
		$params = array();

		$params['page'] = $page;

		if ($order !== null) {
			$params['order'] = $order;
		}

		if ($cache_id !== null) {
			$params['cache'] = $cache_id;
		}

		return $this->call('GET', '/people/' . intval($personId) . '/chats', $params);
	}

	/**
	 * Gets activity stream for a person.
	 *
	 * @param int $personId
	 * @param int $page Page number of results to retrieve - defaults to 1
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getActivityStream($personId, $page = 1)
	{
		$params = array();

		$params['page'] = $page;

		return $this->call('GET', '/people/' . intval($personId) . '/activity-stream', $params);
	}

	/**
	 * Gets notes for a person.
	 *
	 * @param int $personId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getNotes($personId)
	{
		return $this->call('GET', '/people/' . intval($personId) . '/notes');
	}

	/**
	 * Creates a note for a person.
	 *
	 * @param int $personId The Person's ID
	 * @param string $note The Note content to add
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function createNote($personId, $note)
	{
		return $this->call('POST', '/people/' . intval($personId) . '/notes', array('note' => $note));
	}

	/**
	 * Gets billing charges for a person.
	 *
	 * @param int $personId
	 * @param int $page Page number of results to retrieve - defaults to 1
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getBillingCharges($personId, $page = 1)
	{
		$params = array();
		$params['page'] = $page;

		return $this->call('GET', '/people/' . intval($personId) . '/billing-charges', $params);
	}

	/**
	 * Gets all contact details for a person.
	 *
	 * @param int $personId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getContactDetails($personId)
	{
		return $this->call('GET', '/people/' . intval($personId) . '/contact-details');
	}

	/**
	 * Determines if a particular contact ID exists for a person.
	 *
	 * @param int $personId The Person's ID
	 * @param int $contactId The contact ID to check
	 *
	 * @return DpResultApi
	 */
	public function getContactDetail($personId, $contactId)
	{
		return $this->call('GET', '/people/' . intval($personId) . '/contact-details/' . intval($contactId));
	}

	/**
	 * Removes a particular contact detail from a person.
	 *
	 * @param int $personId The Person's ID
	 * @param int $contactId The contact ID to remove
	 *
	 * @return DpResultApi
	 */
	public function removeContactDetail($personId, $contactId)
	{
		return $this->call('DELETE', '/people/' . intval($personId) . '/contact-details/' . intval($contactId));
	}

	/**
	 * Gets the list of groups that the person belongs to.
	 *
	 * @param int $personId The Person's ID
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getPersonGroups($personId)
	{
		return $this->call('GET', '/people/' . intval($personId) . '/groups');
	}

	/**
	 * Adds a person to a group
	 *
	 * @param int $personId The Person's ID
	 * @param int $groupId The group ID to add the person to
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function addToGroup($personId, $groupId)
	{
		return $this->call('POST', '/people/' . intval($personId) . '/groups', array('id' => $groupId));
	}

	/**
	 * Determines if the a person is a member of a particular group.
	 *
	 * @param int $personId The Person's ID
	 * @param int $groupId The group ID to check
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function checkInGroup($personId, $groupId)
	{
		return $this->call('GET', '/people/' . intval($personId) . '/groups/' . intval($groupId));
	}

	/**
	 * Removes a person from a group.
	 *
	 * @param int $personId The Person's ID
	 * @param int $groupId The group ID to remove the person from
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function removeFromGroup($personId, $groupId)
	{
		return $this->call('DELETE', '/people/' . intval($personId) . '/groups/' . intval($groupId));
	}

	/**
	 * Gets all labels associated with a person.
	 *
	 * @param int $personId The Person's ID
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getPersonLabels($personId)
	{
		return $this->call('GET', '/people/' . intval($personId) . '/labels');
	}

	/**
	 * Adds a label to a person.
	 *
	 * @param int $personId The Person's ID
	 * @param string $label The label to add
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function addPersonLabel($personId, $label)
	{
		return $this->call('POST', '/people/' . intval($personId) . '/labels', array('label' => $label));
	}

	/**
	 * Determines if a person has a specific label.
	 *
	 * @param int $personId The Person's ID
	 * @param string $label The label to check
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getPersonLabel($personId, $label)
	{
		return $this->call('GET', '/people/' . intval($personId) . '/labels/' . $label);
	}

	/**
	 * Removes a label from a person.
	 *
	 * @param int $personId The Person's ID
	 * @param string $label The label to remove
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function removePersonLabel($personId, $label)
	{
		return $this->call('DELETE', '/people/' . intval($personId) . '/labels/' . $label);
	}

	/**
	 * Gets a list of custom people fields.
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getFields()
	{
		return $this->call('GET', '/people/fields');
	}

	/**
	 * Gets a list of available user groups.
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getGroups()
	{
		return $this->call('GET', '/people/groups');
	}

}
