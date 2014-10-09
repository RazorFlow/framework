<?php

namespace DeskPRO\Criteria;

/**
 * Criteria for People Search
 *
 * @author Abhinav Kumar <abhinav.kumar@deskpro.com>
 * @link https://support.deskpro.com/kb/articles/90-people DeskPRO people API documentation
 */
class People extends \DeskPRO\Criteria\AbstractCriteria
{

	protected $_criteria = array();

	/**
	 * Adds an address to search criteria
	 *
	 * @param string $address The Address to search
	 * @return \DeskPRO\Criteria\People
	 */
	public function addAddress($address)
	{
		if (!empty($address)) {
			$this->_criteria['address'][] = $address;
		}

		return $this;
	}

	/**
	 * Adds a Agent Team ID to the search criteria
	 *
	 * @param $id The Team ID to add
	 * @return \DeskPRO\Criteria\People
	 */
	public function addAgentTeam($id)
	{
		if ($id) {
			@$this->_criteria['agent_team_id'][] = $id;
		}

		return $this;
	}

	/**
	 * Adds an alphabet to the search criteria.
	 * Searches for the $letter in People's last name
	 *
	 * @param string $letter The letter to search
	 * @return \DeskPRO\Criteria\People
	 */
	public function addAlpha($letter)
	{
		@$this->_criteria['alpha'][] = $letter;

		return $this;
	}

	/**
	 * Searches for accounts that have been created before the specified date.
	 *
	 * @param int | DateTime $time accepts a timestamp or DateTime object
	 */
	public function createdBefore($time)
	{
		if ($time instanceof \DateTime) {
			$time = $time->getTimestamp();
		}

		$this->_criteria['date_created_end'] = $time;
	}

	/**
	 * Searches for accounts that have been created after the specified date.
	 *
	 * @param int | DateTime $time accepts a timestamp or DateTime object
	 */
	public function createdAfter($time)
	{
		if ($time instanceof \DateTime) {
			$time = $time->getTimestamp();
		}

		$this->_criteria['date_created_start'] = $time;
	}

	/**
	 * Adds an Email to search criteria
	 * 
	 * @param string $email The email to search
	 * @throws \Exception if $email is not a valid email
	 * @return \DeskPRO\Criteria\People
	 */
	public function addEmail($email)
	{
		if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
			$this->_criteria['email'][] = $email;
		} else {
			throw new \Exception("Bad Email: " . $email);
		}

		return $this;
	}

	/**
	 * Adds an Email Domain to search criteria
	 * 
	 * @param string $emailDomain The email domain to search
	 * @return \DeskPRO\Criteria\People
	 */
	public function addEmailDomain($emailDomain)
	{
		$this->_criteria['email_domain'][] = $emailDomain;

		return $this;
	}

	/**
	 * Adds a Custom Field to the search criteria
	 *
	 * @param string $key The custom field key|name
	 * @param mixed $value The custom field value
	 * @return \DeskPRO\Criteria\People
	 */
	public function addCustomFiled($key, $value)
	{
		@$this->_criteria['field'][$key] = $value;

		return $this;
	}

	/**
	 * Adds an IM account to the search criteria
	 *
	 * @param string $imDetail The Im account/detail to search by
	 * @return \DeskPRO\Criteria\People
	 */
	public function addIm($imDetail)
	{
		@$this->_criteria['im'][] = $imDetail;

		return $this;
	}

	/**
	 * To search on agents instead of users.
	 *
	 * @return \DeskPRO\Criteria\People
	 */
	public function agentsOnly()
	{
		$this->_criteria['is_agent'] = 1;

		return $this;
	}

	/**
	 * To search for people confirmed by an Agent.
	 *
	 * @return \DeskPRO\Criteria\People
	 */
	public function agentConfirmedOnly()
	{
		$this->_criteria['is_agent_confirmed'] = 1;

		return $this;
	}

	/**
	 * Adds a label to search criteria
	 *
	 * @param string $label The label to search for
	 * @return \DeskPRO\Criteria\People
	 */
	public function addLabel($label)
	{
		if (!empty($label)) {
			@$this->_criteria['label'][] = $label;
		}

		return $this;
	}

	/**
	 * Adds a language ID to search criteria
	 *
	 * @param int $languageId The language ID to search for
	 * @return \DeskPRO\Criteria\People
	 */
	public function addLanguage($languageId)
	{
		@$this->_criteria['language_id'][] = $languageId;

		return $this;
	}

	/**
	 * Adds a name to search criteria
	 * 
	 * @param string $name The name to search
	 * @return \DeskPRO\Criteria\People
	 */
	public function addName($name)
	{
		if (!empty($name)) {
			$this->_criteria['name'][] = $name;
		}

		return $this;
	}

	/**
	 * Adds an Organization to the search criteria
	 *
	 * @param int $organizationId The Organization ID to search for
	 * @return \DeskPRO\Criteria\People
	 */
	public function addOrganization($organizationId)
	{
		@$this->_criteria['organization_id'][] = $organizationId;

		return $this;
	}

	/**
	 * Adds a phone number to the search criteria
	 *
	 * @param string $phone The Phone number to search for
	 * @return \DeskPRO\Criteria\People
	 */
	public function addPhone($phone)
	{
		@$this->_criteria['phone'][] = $phone;

		return $this;
	}

	/**
	 * Adds a User Group to the search criteria
	 *
	 * @param int $userGroupId The UserGroup ID to add
	 * @return \DeskPRO\Criteria\People
	 */
	public function addUserGroup($userGroupId)
	{
		@$this->_criteria['usergroup_id'][] = $userGroupId;

		return $this;
	}

	/**
	 * Serializes the criteria to an Array
	 * 
	 * @return array serialized array of criteria
	 */
	public function toArray()
	{
		return $this->_criteria;
	}

}
