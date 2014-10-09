<?php

namespace DeskPRO\Builder;

/**
 * The Organization Builder Class
 * Builds the Organization
 *
 * @author Abhinav Kumar <abhinav.kumar@deskpro.com>
 */
class Organization
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
	 * Gets the Organization's ID
	 *
	 * @return int
	 */
	public function getId()
	{
		return @$this->_dataArray['id'];
	}

	/**
	 * Sets the ID
	 * @param int $id Organization ID
	 * @return \DeskPRO\Builder\Organization
	 */
	public function setId($id)
	{
		$this->_dataArray['id'] = $id;

		return $this;
	}

	/**
	 * Sets the Organization's name
	 * 
	 * @param string $name Name to set
	 * @return \DeskPRO\Builder\Organization
	 */
	public function setName($name)
	{
		$this->_dataArray['name'] = $name;

		return $this;
	}

	/**
	 * Sets the contact data
	 * 
	 * @param \DeskPRO\Builder\ContactData $contactData the contact data
	 * @return \DeskPRO\Builder\Organization
	 */
	public function addContactData(\DeskPRO\Builder\ContactData $contactData)
	{
		$this->_dataArray['contact_data'] = $contactData->getDataArray();

		return $this;
	}

	/**
	 * Sets a custom field
	 * 
	 * @param string $key The custom field key
	 * @param mixed $value The custom field value
	 * @return \DeskPRO\Builder\Organization
	 */
	public function addCustomField($key, $value)
	{
		$this->_dataArray['field'][$key] = $value;

		return $this;
	}

	/**
	 * Adds the Organization to an UserGroup
	 * 
	 * @param int $groupId The UserGroup ID to the add the user to
	 * @return \DeskPRO\Builder\Organization
	 */
	public function addToGroup($groupId)
	{
		@$this->_dataArray['group_id'][] = $groupId;

		return $this;
	}

	/**
	 * Adds a label
	 * 
	 * @param string $label The label to add
	 * @return \DeskPRO\Builder\Organization
	 */
	public function addLabel($label)
	{
		@$this->_dataArray['label'][] = $label;

		return $this;
	}

	/**
	 * Sets the summary
	 * 
	 * @param string $summary The summary to set
	 * @return \DeskPRO\Builder\Organization
	 */
	public function setSummary($summary)
	{
		@$this->_dataArray['summary'] = $summary;

		return $this;
	}

}
