<?php

namespace DeskPRO\Builder;

/**
 * The Task Builder Class
 * Builds a Task
 *
 * @author Abhinav Kumar <abhinav.kumar@deskpro.com>
 */
class Task
{

	protected $_dataArray = array();

	/**
	 * Gets the Builder Array
	 *
	 * @return array
	 */
	public function getDataArray()
	{
		return $this->_dataArray;
	}

	/**
	 * Gets the Task's ID
	 *
	 * @return int
	 */
	public function getId()
	{
		return @$this->_dataArray['id'];
	}

	/**
	 * Sets the Task's ID
	 *
	 * @param int $id The ID to set
	 * @return \DeskPRO\Builder\Task
	 */
	public function setId($id)
	{
		$this->_dataArray['id'] = $id;

		return $this;
	}

	/**
	 * Assigns the task to the specified agent
	 * 
	 * @param int $agentId Agent's ID to assign the task to
	 * @return \DeskPRO\Builder\Task
	 */
	public function assignToAgent($agentId)
	{
		$this->_dataArray['assigned_agent_id'] = $agentId;

		return $this;
	}

	/**
	 * Assigns the task to the specified agent
	 * 
	 * @param int $teamId Agent Team's ID to assign the task to
	 * @return \DeskPRO\Builder\Task
	 */
	public function assignToTeam($teamId)
	{
		$this->_dataArray['assigned_agent_team_id'] = $teamId;

		return $this;
	}

	/**
	 * Sets the task due date
	 * 
	 * @param int $timestamp Unix timestamp of when the task is due.
	 * @return \DeskPRO\Builder\Task
	 */
	public function setDueDate($timestamp)
	{
		$this->_dataArray['date_due'] = $timestamp;

		return $this;
	}

	/**
	 * Adds a label
	 * 
	 * @param string $label label to add
	 * @return \DeskPRO\Builder\Task
	 */
	public function addLabel($label)
	{
		@$this->_dataArray['label'][] = $label;

		return $this;
	}

	/**
	 * Associate the task to a ticket
	 * 
	 * @param int $ticketId ID of the ticket this task should be associated with.
	 * @return \DeskPRO\Builder\Task
	 */
	public function setTicket($ticketId)
	{
		$this->_dataArray['ticket_id'] = $ticketId;

		return $this;
	}

	/**
	 * Sets the task title
	 * 
	 * @param string $title Title of the task to set
	 * @return \DeskPRO\Builder\Task
	 */
	public function setTitle($title)
	{
		$this->_dataArray['title'] = $title;

		return $this;
	}

	/**
	 * Sets the visibility
	 * 
	 * @param boolean $visibility FALSE for private, TRUE for public.
	 * @return \DeskPRO\Builder\Task
	 */
	public function setVisibility($visibility)
	{
		$this->_dataArray['visibility'] = ($visibility) ? 1 : 0;

		return $this;
	}

}
