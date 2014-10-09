<?php

namespace DeskPRO\Criteria;

/**
 * Criteria for Task Search
 *
 * @author Abhinav Kumar <abhinav.kumar@deskpro.com>
 * @link https://support.deskpro.com/kb/articles/113-tasks DeskPRO task API documentation
 */
class Task extends \DeskPRO\Criteria\AbstractCriteria
{

	protected $_criteria = array();

	/**
	 * Serializes the criteria to an Array
	 * 
	 * @return array serialized array of criteria
	 */
	public function toArray()
	{
		return $this->_criteria;
	}

	/**
	 * Adds an Agent ID to the criteria
	 * Makes the search return tasks assigned to the specified agent
	 * 
	 * @param int $agentId Agent ID
	 * @return \DeskPRO\Criteria\Task
	 */
	public function addAssignedToAgent($agentId)
	{
		$this->_criteria['assigned_agent_id'][] = $agentId;

		return $this;
	}

	/**
	 * Adds an Agent Team ID to the criteria
	 * Makes the search return tasks assigned to the specified team
	 * 
	 * @param int $teamId Agent Team ID
	 * @return \DeskPRO\Criteria\Task
	 */
	public function addAssignedToTeam($teamId)
	{
		$this->_criteria['assigned_agent_team_id'][] = $teamId;

		return $this;
	}

	/**
	 * Searches for tasks that were completed before the specified date
	 * 
	 * @param int $timestamp Maximum Unix timestamp for when the task was completed.
	 * @return \DeskPRO\Criteria\Task
	 */
	public function completedBefore($timestamp)
	{
		$this->_criteria['date_completed_end'] = $timestamp;

		return $this;
	}

	/**
	 * Searches for tasks that were completed after the specified date
	 * 
	 * @param int $timestamp Minimum Unix timestamp for when the task was completed.
	 * @return \DeskPRO\Criteria\Task
	 */
	public function completedAfter($timestamp)
	{
		$this->_criteria['date_completed_start'] = $timestamp;

		return $this;
	}

	/**
	 * Searches for tasks that were created before the specified date
	 * 
	 * @param int $timestamp Maximum Unix timestamp for when the task was completed.
	 * @return \DeskPRO\Criteria\Task
	 */
	public function createdBefore($timestamp)
	{
		$this->_criteria['date_created_end'] = $timestamp;

		return $this;
	}

	/**
	 * Searches for tasks that were created after the specified date
	 * 
	 * @param int $timestamp Minimum Unix timestamp for when the task was created.
	 * @return \DeskPRO\Criteria\Task
	 */
	public function createdAfter($timestamp)
	{
		$this->_criteria['date_created_start'] = $timestamp;

		return $this;
	}

	/**
	 * Searches for tasks that are due before the specified date
	 * 
	 * @param int $timestamp Maximum Unix timestamp for when the task is due.
	 * @return \DeskPRO\Criteria\Task
	 */
	public function dueBefore($timestamp)
	{
		$this->_criteria['date_due_end'] = $timestamp;

		return $this;
	}

	/**
	 * Searches for tasks that are due after the specified date
	 * 
	 * @param int $timestamp Minimum Unix timestamp for when the task is due.
	 * @return \DeskPRO\Criteria\Task
	 */
	public function dueAfter($timestamp)
	{
		$this->_criteria['date_due_start'] = $timestamp;

		return $this;
	}

	/**
	 * Whether to search completed tasks
	 * 
	 * @param boolean $status true for completed tasks only, false for not completed tasks
	 * @return \DeskPRO\Criteria\Task
	 */
	public function isCompleted($status = true)
	{
		$this->_criteria['is_completed'] = ($status) ? 1 : 0;

		return $this;
	}

	/**
	 * Searched for tasks that were created by the specified person
	 * 
	 * @param int $personId Person's ID
	 * @return \DeskPRO\Criteria\Task
	 */
	public function addCreatedBy($personId)
	{
		$this->_criteria['person_id'][] = $personId;

		return $this;
	}

	/**
	 * Adds a title to the search criteria
	 * Makes the search return tasks with matching titles
	 * 
	 * @param string $title Title to search by
	 * @return \DeskPRO\Criteria\Task
	 */
	public function addTitle($title)
	{
		$this->_criteria['title'][] = $title;

		return $this;
	}

	/**
	 * Adds a visibility criteria
	 * 
	 * @param boolean $status true for public tasks and false invisible
	 * @return \DeskPRO\Criteria\Task
	 */
	public function isVisible($status)
	{
		$this->_criteria['visibility'] = $status ? 1 : 0;

		return $this;
	}

}
