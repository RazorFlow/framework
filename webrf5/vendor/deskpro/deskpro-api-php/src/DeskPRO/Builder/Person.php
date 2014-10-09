<?php

namespace DeskPRO\Builder;

/**
 * The Person Builder Class
 * Builds the Person
 *
 * @author Abhinav Kumar <abhinav.kumar@deskpro.com>
 */
class Person
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
	 * Gets the Person's ID
	 *
	 * @return int
	 */
	public function getId()
	{
		return @$this->_dataArray['id'];
	}

	/**
	 * Sets the Person's ID
	 *
	 * @param int $id The ID to set
	 * @return \DeskPRO\Builder\Person
	 */
	public function setId($id)
	{
		$this->_dataArray['id'] = $id;

		return $this;
	}

	/**
	 * Gets the person's name
	 *
	 * @param string $part The part of the name to fetch.
	 * Valid values are 'first', 'last' , 'display' and 'full'.
	 * Defaults to 'display'
	 * @return type
	 */
	public function getName($part = 'display')
	{
		switch ($part) {
			case 'first':
				return @$this->_dataArray['first_name'];

				break;

			case 'last':
				return @$this->_dataArray['last_name'];

				break;

			case 'full':
				return @$this->_dataArray['name'];

				break;

			default:
				return @$this->_dataArray['display_name'];
				break;
		}
	}

	/**
	 * Gets the primary email of the person
	 *
	 * @return string primary email of the Person
	 */
	public function getEmail()
	{
		if (isset($this->_dataArray['primary_email'])) {
			return @$this->_dataArray['primary_email'];
		}

		return @$this->_dataArray['email'];
	}

	/**
	 * Sets the person's name
	 *
	 * @param string $name The name to set
	 * @return \DeskPRO\Person
	 */
	public function setName($name)
	{
		if (!empty($name)) {
			$this->_dataArray['name'] = $name;
		}

		return $this;
	}

	/**
	 * Sets the primary email of the person
	 *
	 * @param string $email The email to set
	 * @throws \Exception if $email is not valid
	 * @return \DeskPRO\Person
	 */
	public function setEmail($email)
	{
		if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
			$this->_dataArray['email'] = $email;
		} else {
			throw new \Exception("Bad Email: " . $email);
		}

		return $this;
	}

	/**
	 * Sets a Person's password
	 *
	 * @param string $password The Password to set
	 * @return \DeskPRO\Person
	 */
	public function setPassword($password)
	{
		if (!empty($password)) {
			$this->_dataArray['password'] = $password;
		}

		return $this;
	}

	/**
	 * Adds a contact data to a person
	 *
	 * @param string $type The type of contact data to add
	 * @param array $data The contact data array
	 * @param string $comment Any additional comment (optional)
	 * @return \DeskPRO\Person
	 */
	public function addContactData(ContactData $contactData)
	{
		@$this->_dataArray['contact_data'] = $contactData->getDataArray();

		return $this;
	}

	/**
	 * Disables Auto Responses for this Person
	 *
	 * @return \DeskPRO\Person
	 */
	public function disableAutoResponses()
	{
		@$this->_dataArray['disable_autoresponses'] = 1;

		return $this;
	}

	/**
	 * Enables Auto Responses for this Person
	 *
	 * @return \DeskPRO\Person
	 */
	public function enableAutoResponses()
	{
		@$this->_dataArray['disable_autoresponses'] = 0;

		return $this;
	}

	/**
	 * Adds a Custom Field for the Person
	 *
	 * @param string $key The custom field key|name
	 * @param mixed $value The custom field value
	 * @return \DeskPRO\Person
	 */
	public function addCustomFiled($key, $value)
	{
		@$this->_dataArray['field'][$key] = $value;

		return $this;
	}

	/**
	 * Adds the Person to a User Group
	 *
	 * @param int $userGroupId The UserGroup ID to add the person to
	 * @return \DeskPRO\Person
	 */
	public function addToUserGroup($userGroupId)
	{
		@$this->_dataArray['group_id'][] = $userGroupId;

		return $this;
	}

	/**
	 * Adds a label the Person
	 *
	 * @param string $label The label to add
	 * @return \DeskPRO\Person
	 */
	public function addLabel($label)
	{
		if (!empty($label)) {
			@$this->_dataArray['label'][] = $label;
		}

		return $this;
	}

	/**
	 * Disables a Person
	 *
	 * @return \DeskPRO\Person
	 */
	public function disable()
	{
		$this->_dataArray['is_disabled'] = 1;

		return $this;
	}

	/**
	 * Enables a Person
	 *
	 * @return \DeskPRO\Person
	 */
	public function enable()
	{
		$this->_dataArray['is_disabled'] = 0;

		return $this;
	}

	/**
	 * Sets a Person's organization by name
	 *
	 * @param string $organizationName Name of the organization to add
	 * @return \DeskPRO\Person
	 */
	public function setOrganizationByName($organizationName)
	{
		@$this->_dataArray['organization'] = $organizationName;

		return $this;
	}

	/**
	 * Sets a Person's organization by organization ID
	 *
	 * @param int $organizationId ID of the organization to add
	 * @return \DeskPRO\Person
	 */
	public function setOrganizationById($organizationId)
	{
		@$this->_dataArray['organization_id'] = $organizationId;

		return $this;
	}

	/**
	 * Sets a Person's position in their organization
	 *
	 * @param string $position Position to add to the Person
	 * @return \DeskPRO\Person
	 */
	public function setOrganizationPosition($position)
	{
		$this->_dataArray['organization_position'] = $position;

		return $this;
	}

	/**
	 * Sets the person's summary
	 *
	 * @param string $summary Summary to add
	 * @return \DeskPRO\Person
	 */
	public function setSummary($summary)
	{
		$this->_dataArray['summary'] = $summary;

		return $this;
	}

	/**
	 * Sets the timezone for the Person
	 *
	 * @param string $timezone Olson time zone string identifier.
	 * @return \DeskPRO\Person
	 */
	public function setTimeZone($timezone)
	{
		$this->_dataArray['timezone'] = $timezone;

		return $this;
	}

	/**
	 * Marks the user to be sent an email upon creation
	 *
	 * @return \DeskPRO\Person
	 */
	public function sendMail()
	{
		$this->_dataArray['send_mail'] = 1;

		return $this;
	}

}
