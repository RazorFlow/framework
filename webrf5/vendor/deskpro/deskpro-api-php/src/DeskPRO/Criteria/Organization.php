<?php

namespace DeskPRO\Criteria;

/**
 * Criteria for Organization Search
 *
 * @author Abhinav Kumar <abhinav.kumar@deskpro.com>
 * @link https://support.deskpro.com/kb/articles/90-people DeskPRO people API documentation
 */
class Organization extends \DeskPRO\Criteria\AbstractCriteria
{

	protected $_criteria = array();

	/**
	 * Adds an address to search criteria
	 *
	 * @param string $address The Address to search
	 * @return \DeskPRO\Criteria\Organization
	 */
	public function addAddress($address)
	{
		if (!empty($address)) {
			$this->_criteria['address'][] = $address;
		}

		return $this;
	}

	/**
	 * Adds a Custom Field to the search criteria
	 *
	 * @param string $key The custom field key|name
	 * @param mixed $value The custom field value
	 * @return \DeskPRO\Criteria\Organization
	 */
	public function addCustomField($key, $value)
	{
		@$this->_criteria['field'][$key] = $value;

		return $this;
	}

	/**
	 * Adds an IM account to the search criteria
	 *
	 * @param string $imDetail The Im account/detail to search by
	 * @return \DeskPRO\Criteria\Organization
	 */
	public function addIm($imDetail)
	{
		@$this->_criteria['im'][] = $imDetail;

		return $this;
	}

	/**
	 * Adds a label to search criteria
	 *
	 * @param string $label The label to search for
	 * @return \DeskPRO\Criteria\Organization
	 */
	public function addLabel($label)
	{
		if (!empty($label)) {
			@$this->_criteria['label'][] = $label;
		}

		return $this;
	}

	/**
	 * Adds a name to search criteria
	 * 
	 * @param string $name The name to search
	 * @return \DeskPRO\Criteria\Organization
	 */
	public function addName($name)
	{
		if (!empty($name)) {
			$this->_criteria['name'][] = $name;
		}

		return $this;
	}

	/**
	 * Adds a phone number to the search criteria
	 *
	 * @param string $phone The Phone number to search for
	 * @return \DeskPRO\Criteria\Organization
	 */
	public function addPhone($phone)
	{
		@$this->_criteria['phone'][] = $phone;

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
