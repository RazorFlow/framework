<?php

namespace DeskPRO\Criteria;

/**
 * Criteria for Chat Search
 *
 * @author Abhinav Kumar <abhinav.kumar@deskpro.com>
 * @link https://support.deskpro.com/kb/articles/105-feedback DeskPRO task API documentation
 */
class Chat extends \DeskPRO\Criteria\AbstractCriteria
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
	 * Adds an Agent to the search criteria
	 * 
	 * @param int $agentId ID of the Agent to add
	 * @return \DeskPRO\Criteria\Chat
	 */
	public function addAgent($agentId)
	{
		@$this->_criteria['agent_id'][] = $agentId;

		return $this;
	}

	/**
	 * Adds an Department to the search criteria
	 * 
	 * @param int $departmentId ID of the Department to add
	 * @return \DeskPRO\Criteria\Chat
	 */
	public function addDepartment($departmentId)
	{
		@$this->_criteria['department_id'][] = $departmentId;

		return $this;
	}

	/**
	 * Adds a label to the criteria
	 * 
	 * @param string $label label to search for
	 * @return \DeskPRO\Criteria\Chat
	 */
	public function addLabel($label)
	{
		@$this->_criteria['label'][] = $label;

		return $this;
	}

	/**
	 * Requires chat to be created by the specified person ID.
	 * 
	 * @param int $personId ID of the person to search for
	 * @return \DeskPRO\Criteria\Chat
	 */
	public function createdBy($personId)
	{
		@$this->_criteria['person_id'][] = $personId;

		return $this;
	}

	/**
	 * Adds a status to the criteria
	 * 
	 * @param string $status Possible values are ended and open.
	 * @return \DeskPRO\Criteria\Chat
	 */
	public function addStatus($status)
	{
		@$this->_criteria['status'][] = $status;

		return $this;
	}

}
