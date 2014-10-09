<?php

namespace DeskPRO\Service;

/**
 * The Chats API
 * Handles chat related operations
 *
 * @link https://support.deskpro.com/kb/articles/98-chats Official Documentation
 * @author Abhinav Kumar <abhinav.kumar@deskpro.com>
 */
class Chats extends AbstractService
{

	/**
	 * Creates and returns a search criteria
	 * 
	 * @return \DeskPRO\Criteria\Chat
	 */
	public function createCriteria()
	{
		return new \DeskPRO\Criteria\Chat();
	}

	/**
	 * Finds chats matching the criteria
	 * 
	 * @param \DeskPRO\Criteria\Chat $criteria
	 * @return \DeskPRO\Api\Result
	 */
	public function find(\DeskPRO\Criteria\Chat $criteria)
	{
		return $this->interface->call('GET', '/chats', $criteria);
	}

	/**
	 * Gets information about a chat
	 * 
	 * @param int $chatId
	 * @return \DeskPRO\Api\Result Result Object
	 */
	public function findById($chatId)
	{
		return $this->interface->call('GET', '/chats/' . intval($chatId));
	}

	/**
	 * Updates a Chat
	 * 
	 * @param int $chatId ID of the chat that needs to be updated
	 * @param int $departmentId ID of the new Department the chat is in.
	 * @return \DeskPRO\Api\Result
	 */
	public function update($chatId, $departmentId)
	{
		return $this->call('POST', '/chats/' . intval($chatId), array(
			'departmentId' => $departmentId
		));
	}

	/**
	 * Leave a chat and takes an additional action
	 *
	 * @param int $chatId
	 * @param string $action Additional action to take (empty, unassign, or end)
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function leave($chatId, $action = '')
	{
		$params = array('action' => $action);

		return $this->call('POST', '/chats/' . intval($chatId) . '/leave', $params);
	}

	/**
	 * Ends a chat.
	 *
	 * @param int $chatId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function end($chatId)
	{
		return $this->call('POST', '/chats/' . intval($chatId) . '/end');
	}

	/**
	 * Gets all messages in a chat
	 *
	 * @param int $chatId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getMessages($chatId)
	{
		return $this->call('GET', '/chats/' . intval($chatId) . '/messages');
	}

	/**
	 * Creates a new message in a chat.
	 *
	 * @param int $chatId
	 * @param string $message
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function addMessage($chatId, $message)
	{
		$params = array('message' => $message);

		return $this->call('POST', '/chats/' . intval($chatId) . '/messages', $params);
	}

	/**
	 * Adds a chat participant.
	 *
	 * @param int $chatId
	 * @param int $personId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function addParticipant($chatId, $personId)
	{
		$params = array();

		$params['personId'] = $personId;

		return $this->call('POST', '/chats/' . intval($chatId) . '/participants', $params);
	}

	/**
	 * Returns whether a person is a participant (CC user) in a chat.
	 *
	 * @param int $chatId
	 * @param int $personId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getParticipant($chatId, $personId)
	{
		return $this->call('GET', '/chats/' . intval($chatId) . '/participants/' . intval($personId));
	}

	/**
	 * Removes a participant from a chat.
	 *
	 * @param int $chatId
	 * @param int $personId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function removeParticipant($chatId, $personId)
	{
		return $this->call('DELETE', '/chats/' . intval($chatId) . '/participants/' . intval($personId));
	}

	/**
	 * Gets all labels associated with a chat.
	 *
	 * @param int $chatId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getLabels($chatId)
	{
		return $this->call('GET', '/chats/' . intval($chatId) . '/labels');
	}

	/**
	 * Adds a label to a chat.
	 *
	 * @param int $chatId
	 * @param string $label
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function addLabel($chatId, $label)
	{
		return $this->call('POST', '/chats/' . intval($chatId) . '/labels', array('label' => $label));
	}

	/**
	 * Determines if a chat has a specific label.
	 *
	 * @param int $chatId
	 * @param string $label
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getLabel($chatId, $label)
	{
		return $this->call('GET', '/chats/' . intval($chatId) . '/labels/' . $label);
	}

	/**
	 * Removes a label from a chat.
	 *
	 * @param int $chatId
	 * @param string $label
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function removeLabel($chatId, $label)
	{
		return $this->call('DELETE', '/chats/' . intval($chatId) . '/labels/' . $label);
	}

}
