<?php

namespace DeskPRO\Criteria;

/**
 * Criteria for Chat Search
 *
 * @author Abhinav Kumar <abhinav.kumar@deskpro.com>
 * @link https://support.deskpro.com/kb/articles/89-tickets Official documentation
 */
class Ticket extends \DeskPRO\Criteria\AbstractCriteria
{

	/**
	 * Adds an Agent to the search criteria
	 * 
	 * @param int $agentId ID of the Agent to search for
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function addAgent($agentId)
	{
		@$this->_criteria['agent_id'][] = $agentId;

		return $this;
	}

	/**
	 * Adds an Agent Team to the search criteria
	 * 
	 * @param int $agentTeam ID of the team to search for
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function addAgentTeam($agentTeam)
	{
		@$this->_criteria['agent_team_id'][] = $agentTeam;

		return $this;
	}

	/**
	 * Adds a category to search criteria
	 * 
	 * @param int $categoryId ID of the category to search for
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function addCategory($categoryId)
	{
		@$this->_criteria['category_id'][] = $categoryId;

		return $this;
	}

	/**
	 * Adds a custom field to the search criteria
	 * 
	 * @param string $key Custom field key
	 * @param mixed $value Custom field value
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function addCustomField($key, $value)
	{
		@$this->_criteria[$key] = $value;

		return $this;
	}
	
	/**
	 * Adds a Department to the search criteria
	 *
	 * @param int $departmentId Department ID to search for
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function addDepartment($departmentId)
	{
		@$this->_criteria['department_id'][] = $departmentId;

		return $this;
	}

	/**
	 * Adds a label to the search criteria
	 * 
	 * @param string $label label to search for
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function addLabel($label)
	{
		@$this->_criteria['label'][] = $label;

		return $this;
	}

	/**
	 * Adds a language to the search criteria
	 * 
	 * @param int $languageId Language to search for
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function addLanguage($languageId)
	{
		@$this->_criteria['language_id'][] = $languageId;

		return $this;
	}

	/**
	 * Adds an organization to the search criteria
	 * 
	 * @param int $organizationId Organization ID to search for
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function addOrganization($organizationId)
	{
		@$this->_criteria['organization_id'] = $organizationId;

		return $this;
	}

	/**
	 * Adds a participant to the search criteria
	 * 
	 * @param int $personId
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function addParticipant($personId)
	{
		@$this->_criteria['participant'][] = $personId;

		return $this;
	}

	/**
	 * Requires ticket to be created by the specified person ID.
	 * 
	 * @param int $personId ID of the person to search for
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function createdBy($personId)
	{
		@$this->_criteria['person_id'][] = $personId;

		return $this;
	}

	/**
	 * Requires ticket to be have the specified priority ID.
	 * 
	 * @param int $priorityId ID of the priority to search for
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function addPriority($priorityId)
	{
		@$this->_criteria['priority_id'][] = $priorityId;

		return $this;
	}

	/**
	 * Requires ticket to be for the specified product ID.
	 * 
	 * @param int $productId ID of the product to search for
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function addProduct($productId)
	{
		@$this->_criteria['product_id'][] = $productId;

		return $this;
	}

	/**
	 * Adds a query string to the search criteria
	 * 
	 * @param string $text text to search for
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function addQuery($text)
	{
		$this->_criteria['query'] = $text;

		return $this;
	}

	/**
	 * Adds a status to the search criteria
	 * 
	 * @param string $status Status to search for
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function addStatus($status)
	{
		@$this->_criteria['status'][] = $status;

		return $this;
	}

	/**
	 * requires the ticket to have the SLA requirement completed (TRUE) or incomplete (FALSE).
	 * 
	 * @param bool $completed TRUE for completed and FALSE for incomplete
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function isSlaCompleted($completed)
	{
		$this->_criteria['sla_completed'] = $completed;

		return $this;
	}

	/**
	 * Adds an SLA to the search criteria
	 * 
	 * @param int $slaId SLA ID to search for
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function addSla($slaId)
	{
		@$this->_criteria['sla_id'][] = $slaId;

		return $this;
	}

	/**
	 * Requires ticket to be have the specified SLA status.
	 * 
	 * @param string $status SLA status to search for. Possible values: ok, warning, fail.
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function addSlaStatus($status)
	{
		@$this->_criteria['sla_status'][] = $status;

		return $this;
	}

	/**
	 * Adds a subject to the search criteria
	 * 
	 * @param string $subject Subject to search for
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function addSubject($subject)
	{
		@$this->_criteria['subject'][] = $subject;

		return $this;
	}

	/**
	 * Requires ticket to be have the specified urgency (1-10).
	 * 
	 * @param int $urgency
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function addUrgency($urgency)
	{
		@$this->_criteria['urgency'][] = $urgency;

		return $this;
	}

	/**
	 * Requires ticket to be have the specified workflow ID.
	 * 
	 * @param int $workflowId Workflow ID
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function addWorkflow($workflowId)
	{
		@$this->_criteria['workflow_id'][] = $workflowId;

		return $this;
	}

	/**
	 * Specify max ticket ID
	 * 
	 * @param int $ticketId Ticket ID
	 * @since build #315
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function beforeId($ticketId)
	{
		$this->_criteria['id_max'] = $ticketId;

		return $this;
	}

	/**
	 * Specify min ticket ID
	 * 
	 * @param int $ticketId Ticket ID
	 * @since build #315
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function afterId($ticketId)
	{
		$this->_criteria['id_min'] = $ticketId;

		return $this;
	}

	/**
	 * Specify a ref or the beginning characters of a ref
	 * 
	 * @param string $ref
	 * @since build #315
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function addRef($ref)
	{
		$this->_criteria['ref'] = $ref;

		return $this;
	}

	/**
	 * Adds a creation date to the search criteria
	 * 
	 * @param string $date Date to search for in the DeskPRO's DateSearch format
	 * @link https://support.deskpro.com/kb/articles/89-tickets Official documentation
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function createdOn($date)
	{
		$this->_criteria['date_created'] = $date;

		return $this;
	}

	/**
	 * Adds a resolution date to the search criteria
	 * 
	 * @param string $date Date to search for in the DeskPRO's DateSearch format
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function resolvedOn($date)
	{
		$this->_criteria['date_resolved'] = $date;

		return $this;
	}

	/**
	 * Adds a archival date to the search criteria
	 * 
	 * @param string $date Date to search for in the DeskPRO's DateSearch format
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function archivedOn($date)
	{
		$this->_criteria['date_archived'] = $date;

		return $this;
	}

	/**
	 * Adds a status changed date to the search criteria
	 * 
	 * @param string $date Date to search for in the DeskPRO's DateSearch format
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function statusChangedOn($date)
	{
		$this->_criteria['date_status'] = $date;

		return $this;
	}

	/**
	 * Searches for tickets with last agent reply on specified dates
	 * 
	 * @param string $date Date to search for in the DeskPRO's DateSearch format
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function lastAgentReplyOn($date)
	{
		$this->_criteria['date_last_agent_reply'] = $date;

		return $this;
	}

	/**
	 * Searches for tickets with last user reply on specified dates
	 * 
	 * @param string $date Date to search for in the DeskPRO's DateSearch format
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function lastUserReplyOn($date)
	{
		$this->_criteria['date_last_user_reply'] = $date;

		return $this;
	}

	/**
	 * Searches for tickets with last reply as specified dates
	 * 
	 * @param string $date Date to search for in the DeskPRO's DateSearch format
	 * @return \DeskPRO\Criteria\Ticket
	 */
	public function lastReplyOn($date)
	{
		$this->_criteria['date_last_user_reply'] = $date;

		return $this;
	}

}
