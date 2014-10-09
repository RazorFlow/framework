<?php

namespace DeskPRO\Builder;

/**
 * The ContactData Builder Class
 * Builds the ContactData
 *
 * @author Abhinav Kumar <abhinav.kumar@deskpro.com>
 */
class ContactData
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
	 * Adds an address to a Person's contact details
	 *
	 * @param string $address The address to add
	 * @param string $city The city to add
	 * @param string $state The state to add
	 * @param string $zip The zipcode to add
	 * @param string $country Country to add
	 * @param string $comment Comments
	 * @return DeskPRO\Builder\ContactData
	 */
	public function addAddress($address, $city = null, $state = null, $zip = null, $country = null, $comment = null)
	{
		$this->_dataArray[] = array(
			'type' => 'address',
			'comment' => $comment,
			'data' => array(
				'address' => $address,
				'city' => $city,
				'country' => $country,
				'state' => $state,
				'zip' => $zip
		));

		return $this;
	}

	/**
	 * Adds a facebook profile to a Person's contact details
	 *
	 * @param string $profileUrl Person's facebook profile URL
	 * @param string $comment Comment
	 * @return DeskPRO\Builder\ContactData
	 */
	public function addFacebook($profileUrl, $comment = null)
	{
		$this->_dataArray[] = array(
			'type' => 'facebook',
			'comment' => $comment,
			'data' => array(
				'profile_url' => $profileUrl
		));

		return $this;
	}

	/**
	 * Adds an IM contact details to a Person
	 *
	 * @param string $service IM service to add. E.g. aim
	 * @param string $username IM Username
	 * @param string $comment Any optional comment
	 * @return DeskPRO\Builder\ContactData
	 */
	public function addIm($service, $username, $comment = '')
	{
		$this->_dataArray[] = array(
			'type' => 'instant_message',
			'comment' => $comment,
			'data' => array(
				'service' => $service,
				'username' => $username
		));

		return $this;
	}

	/**
	 * Adds a LinkedIn profile to a Person's contact details
	 *
	 * @param string $profileUrl Person's LinkedIn profile URL
	 * @param string $comment Comment
	 * @return DeskPRO\Builder\ContactData
	 */
	public function addLinkedIn($profileUrl, $comment = null)
	{
		$this->_dataArray[] = array(
			'type' => 'linked_in',
			'comment' => $comment,
			'data' => array(
				'profile_url' => $profileUrl
		));

		return $this;
	}

	/**
	 * Adds a Phone number to a Person's contact details
	 *
	 * @param int $number The phone number to add
	 * @param string $type The type of number. Valid types are phone, mobile, fax
	 * @param int $countryCode Country calling code
	 * @param string $comment Comment
	 * @return DeskPRO\Builder\ContactData
	 */
	public function addPhone($number, $type, $countryCode = null, $comment = null)
	{
		$this->_dataArray[] = array(
			'type' => 'phone',
			'comment' => $comment,
			'data' => array(
				'number' => $number,
				'type' => $type,
				'country_calling_code' => $countryCode
		));

		return $this;
	}

	/**
	 * Adds a Skype account to a Person's contact details
	 *
	 * @param string $username Skype username to add
	 * @param string $comment Comment
	 * @return DeskPRO\Builder\ContactData
	 */
	public function addSkype($username, $comment = null)
	{
		$this->_dataArray[] = array(
			'type' => 'skype',
			'comment' => $comment,
			array(
				'username' => $username
		));

		return $this;
	}

	/**
	 * Adds a Twitter account to a Person's contact details
	 *
	 * @param string $username Twitter username to add
	 * @param string $comment Comment
	 * @return DeskPRO\Builder\ContactData
	 */
	public function addTwitter($username, $comment = null)
	{
		$this->_dataArray[] = array(
			'type' => 'twitter',
			'comment' => $comment,
			'data' => array(
				'username' => $username
		));

		return $this;
	}

	/**
	 * Adds a website to a Person's contact details
	 *
	 * @param string $website The website to add
	 * @param string $comment Any optional comments
	 * @return DeskPRO\Builder\ContactData
	 */
	public function addWebsite($website, $comment = '')
	{
		$this->_dataArray[] = array(
			'type' => 'website',
			'comment' => $comment,
			'data' => array(
				'url' => $website
		));

		return $this;
	}

}
