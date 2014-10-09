<?php

namespace DeskPRO\Builder;

/**
 * The Ticket Builder Class
 * Builds a Ticket
 *
 * @author Abhinav Kumar <abhinav.kumar@deskpro.com>
 */
class Ticket
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
	 * Sets the person who created the ticket
	 * Tries to find an User with the given ID, if no ID is given
	 * a new person will be created with the given info
	 * 
	 * @param \DeskPRO\Builder\Person $person
	 * @return \DeskPRO\Builder\Ticket
	 */
	public function setCreatedBy(\DeskPRO\Builder\Person $person)
	{
		if ($person->getId()) {
			$this->_dataArray['person_id'] = $person->getId();
		} else {
			$personDataArray = $person->getDataArray();

			$this->_dataArray['person_email'] = $person->getEmail();

			$this->_dataArray['person_name'] = $person->getName();
			
			if (isset($personDataArray['organization']) && !empty($personDataArray['organization'])) {
				$this->_dataArray['person_organization'] = $personDataArray['organization'];
			}
			
			if (isset($personDataArray['organization_position'])) {
				$this->_dataArray['person_organization_position'] = $personDataArray['organization_position'];
			}
		}
		return $this;
	}

	/**
	 * Sets the subject of the ticket
	 * 
	 * @param string $subject Subject of the ticket
	 * @return \DeskPRO\Builder\Ticket
	 */
	public function setSubject($subject)
	{
		$this->_dataArray['subject'] = $subject;

		return $this;
	}

	/**
	 * Sets the first message of the ticket
	 * 
	 * @param string $message Message
	 * @param bool $asAgent If true, the message is considered to be written by the API agent rather than the ticket owner. Defaults to false.
	 * @param bool $isHtml If true, the message parameter is treated as HTML.
	 * @return \DeskPRO\Builder\Ticket
	 */
	public function setMessage($message, $isHtml = false, $asAgent = false)
	{
		$this->_dataArray['message'] = $message;

		$this->_dataArray['message_as_agent'] = $asAgent ? 1 : 0;

		$this->_dataArray['message_is_html'] = $isHtml ? 1 : 0;

		return $this;
	}

	/**
	 * Assigns the ticket to the specified agent
	 * 
	 * @param int $personId ID of the person to assign the ticket to
	 * @return \DeskPRO\Builder\Ticket
	 */
	public function assignToAgent($personId)
	{
		$this->_dataArray['agent_id'] = $personId;

		return $this;
	}

	/**
	 * Assigns the ticket to the specified agent
	 * 
	 * @param int $teamId ID of the Team to assign the ticket to
	 * @return \DeskPRO\Builder\Ticket
	 */
	public function assignToTeam($teamId)
	{
		$this->_dataArray['agent_team_id'] = $teamId;

		return $this;
	}

	/**
	 * Attaches a file/blob to the ticket
	 * 
	 * @param DpApiFileUpload|string|null $file File to upload
	 * @param integer|null $blobId Existing attachment ID (blob ID), possibly from uploadFile()
	 * @return \DeskPRO\Builder\Ticket
	 */
	public function attach($file = null, $blobId = null)
	{
		if ($file) {
			@$this->_dataArray['attach'][] = $file;
		} elseif ($blobId) {
			@$this->_dataArray['attach_id'][] = $blobId;
		}

		return $this;
	}

	/**
	 * Attaches multiple files/blobs to the ticket
	 * 
	 * @param DpApiFileUpload|string|null $file File to upload
	 * @param integer|null $blobId Existing attachment ID (blob ID), possibly from uploadFile()
	 * @return \DeskPRO\Builder\Ticket
	 */
	public function attachMultiple($file = null, $blobId = null)
	{
    if(!isset($this->_dataArray['attach'])) {
      $this->_dataArray['attach'] = array();
    }

    if(!isset($this->_dataArray['attach'])) {
      $this->_dataArray['attach_id'] = array();
    }

		if ($file) {
			@$this->_dataArray['attach'] []= $file;
		} elseif ($blobId) {
			@$this->_dataArray['attach_id'][] = $blobId;
		}

		return $this;
	}

	/**
	 * Sets the ticket category
	 * 
	 * @param int $categoryId ID of the category the ticket is in
	 * @return \DeskPRO\Builder\Ticket
	 */
	public function setCategory($categoryId)
	{
		$this->_dataArray['category_id'] = $categoryId;

		return $this;
	}

	/**
	 * Sets the ticket department
	 * 
	 * @param int $departmentId ID of the department the ticket is in
	 * @return \DeskPRO\Builder\Ticket
	 */
	public function setDepartment($departmentId)
	{
		$this->_dataArray['department_id'] = $departmentId;

		return $this;
	}

	/**
	 * Adds a custom field to the ticket
	 * 
	 * @param string $key Custom field key
	 * @param mixed $value Custom field value
	 * @return \DeskPRO\Builder\Ticket
	 */
	public function addCustomField($key, $value)
	{
		$this->_dataArray[$key] = $value;

		return $this;
	}

	/**
	 * Adds a label to the ticket
	 * 
	 * @param string $label label to add
	 * @return \DeskPRO\Builder\Ticket
	 */
	public function addLabel($label)
	{
		@$this->_dataArray['label'][] = $label;

		return $this;
	}

	/**
	 * Sets the ticket language
	 * 
	 * @param int $languageId ID of the language to set to the ticket
	 * @return \DeskPRO\Builder\Ticket
	 */
	public function setLanguage($languageId)
	{
		$this->_dataArray['language_id'] = $languageId;

		return $this;
	}

	/**
	 * Sets the ticket priority
	 * 
	 * @param int $priorityId ID of the priority to set to the ticket
	 * @return \DeskPRO\Builder\Ticket
	 */
	public function setPriority($priorityId)
	{
		$this->_dataArray['priority_id'] = $priorityId;

		return $this;
	}

	/**
	 * Sets the product the ticket is associated with
	 * 
	 * @param int $productId ID of the product
	 * @return \DeskPRO\Builder\Ticket
	 */
	public function setProduct($productId)
	{
		$this->_dataArray['product_id'] = $productId;

		return $this;
	}

	/**
	 * Sets the ticket status
	 * 
	 * @param string $status Status to set.Possible values are awaiting_user, awaiting_agent, closed, hidden, resolved. Defaults to awaiting_agent
	 * @return \DeskPRO\Builder\Ticket
	 */
	public function setStatus($status)
	{
		$this->_dataArray['status'] = $status;

		return $this;
	}

	/**
	 * Adds an SLA to the ticket<br/>
	 * Can only add SLAs that agents may manually add.
	 * 
	 * @param int $slaId ID of the SLA to add
	 * @return \DeskPRO\Builder\Ticket
	 */
	public function addSla($slaId)
	{
		@$this->_dataArray['sla_id'][] = $slaId;

		return $this;
	}

	/**
	 * Sets the ticket urgency
	 * 
	 * @param int $urgency Urgency of the ticket (1-10).
	 * @return \DeskPRO\Builder\Ticket
	 */
	public function setUrgency($urgency)
	{
		$this->_dataArray['urgency'] = $urgency;

		return $this;
	}

	/**
	 * Sets the ticket workflow
	 * 
	 * @param int $workflowId Workflow ID to set
	 * @return \DeskPRO\Builder\Ticket
	 */
	public function setWorkflow($workflowId)
	{
		$this->_dataArray['workflow_id'] = $workflowId;

		return $this;
	}

}
