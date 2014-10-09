<?php

namespace DeskPRO\Service;

/**
 * The Tasks API
 * Handles task related operations
 *
 * @link https://support.deskpro.com/kb/articles/113-tasks Official Documentation
 * @author Abhinav Kumar <abhinav.kumar@deskpro.com>
 */
class Tasks extends AbstractService
{

	/**
	 * Creates and returns a search criteria
	 * 
	 * @return \DeskPRO\Criteria\Task
	 */
	public function createCriteria()
	{
		return new \DeskPRO\Criteria\Task();
	}

	/**
	 * Creates and returns a TaskBuilder object
	 * 
	 * @return \DeskPRO\Builder\Task
	 */
	public function createTaskEditor()
	{
		return new \DeskPRO\Builder\Task();
	}

	/**
	 * Finds tasks matching the criteria
	 * 
	 * @param \DeskPRO\Criteria\Task $criteria
	 * @return \DeskPRO\Api\Result
	 */
	public function find(\DeskPRO\Criteria\Task $criteria)
	{
		return $this->call('GET', '/tasks', $criteria->toArray());
	}

	/**
	 * Gets an Task by task ID
	 * 
	 * @param int $taskId
	 * @return \DeskPRO\Api\Result Result Object
	 */
	public function findById($taskId)
	{
		return $this->call('GET', '/tasks/' . intval($id));
	}

	/**
	 * Saves a task
	 * 
	 * @param \DeskPRO\Builder\Task $task
	 * @return \DeskPRO\Api\Result
	 */
	public function save(\DeskPRO\Builder\Task $task)
	{
		if ($task->getId()) {
			return $this->call('POST', '/tasks/' . intval($task->getId()), $task->getDataArray());
		}

		return $this->call('POST', '/tasks', $task->getDataArray());
	}

	/**
	 * Deletes the given task.
	 *
	 * @param int $taskId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function deleteTask($taskId)
	{
		return $this->call('DELETE', '/task/' . intval($taskId));
	}

	/**
	 * Gets all associations for a task
	 *
	 * @param int $taskId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getTaskAssociations($taskId)
	{
		return $this->call('GET', '/tasks/' . intval($taskId) . '/associations');
	}

	/**
	 * Adds an association for a task.
	 *
	 * @param int $taskId Task ID
	 * @param int $ticketId Ticket ID to associate the task to
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function addTaskAssociation($taskId, $ticketId)
	{
		$params = array(
			'ticket_id' => $ticketId
		);
		return $this->call('POST', '/tasks/' . intval($taskId) . '/associations', $params);
	}

	/**
	 * Determines if a particular association ID exists for a task.
	 *
	 * @param int $taskId
	 * @param int $associationId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getTaskAssociation($taskId, $associationId)
	{
		return $this->call('GET', '/tasks/' . intval($taskId) . '/associations/' . intval($associationId));
	}

	/**
	 * Deletes a particular task association
	 *
	 * @param int $taskId
	 * @param int $associationId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function deleteTaskAssociation($taskId, $associationId)
	{
		return $this->call('DELETE', '/tasks/' . intval($taskId) . '/associations/' . intval($associationId));
	}

	/**
	 * Gets all comments for a task
	 *
	 * @param int $taskId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getTaskComments($taskId)
	{
		return $this->call('GET', '/tasks/' . intval($taskId) . '/comments');
	}

	/**
	 * Adds a comment for a task.
	 *
	 * @param int $taskId
	 * @param string $comment
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function addTaskComment($taskId, $comment)
	{
		$params = array(
			'comment' => $comment
		);
		return $this->call('POST', '/tasks/' . intval($taskId) . '/comments', $params);
	}

	/**
	 * Determines if a particular comment ID exists for a task.
	 *
	 * @param int $taskId
	 * @param int $commentId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getTaskComment($taskId, $commentId)
	{
		return $this->call('GET', '/tasks/' . intval($taskId) . '/comments/' . intval($commentId));
	}

	/**
	 * Deletes a particular task comment
	 *
	 * @param int $taskId
	 * @param int $commentId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function deleteTaskComment($taskId, $commentId)
	{
		return $this->call('DELETE', '/tasks/' . intval($taskId) . '/comments/' . intval($commentId));
	}

	/**
	 * Gets all labels associated with a task.
	 *
	 * @param int $taskId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getTaskLabels($taskId)
	{
		return $this->call('GET', '/tasks/' . intval($id) . '/labels');
	}

	/**
	 * Adds a label to a task.
	 *
	 * @param int $taskId
	 * @param string $label
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function addTaskLabel($taskId, $label)
	{
		return $this->call('POST', '/tasks/' . intval($taskId) . '/labels', array('label' => $label));
	}

	/**
	 * Determines if a task has a specific label.
	 *
	 * @param int $taskId
	 * @param string $label
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getTaskLabel($taskId, $label)
	{
		return $this->call('GET', '/tasks/' . intval($taskId) . '/labels/' . $label);
	}

	/**
	 * Removes a label from a task.
	 *
	 * @param int $taskId
	 * @param string $label
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function removeTaskLabel($taskId, $label)
	{
		return $this->call('DELETE', '/tasks/' . intval($taskId) . '/labels/' . $label);
	}

}
