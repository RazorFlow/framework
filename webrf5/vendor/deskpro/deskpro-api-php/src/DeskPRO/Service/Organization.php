<?php

namespace DeskPRO\Service;

/**
 * The Organization API
 * Handles organization related operations
 *
 * @link https://support.deskpro.com/kb/articles/90-people Official Documentation
 * @author Abhinav Kumar <abhinav.kumar@deskpro.com>
 */
class Organization extends AbstractService
{

	/**
	 * Creates and returns a search criteria
	 * 
	 * @return \DeskPRO\Criteria\Organization
	 */
	public function createCriteria()
	{
		return new \DeskPRO\Criteria\Organization();
	}

	public function createOrganizationEditor()
	{
		return new \DeskPRO\Builder\Organization();
	}

	/**
	 * Search for organization matching criteria
	 * 
	 * @param \DeskPRO\Criteria $criteria
	 * @return \DeskPRO\Api\Result Result Object
	 */
	public function find(\DeskPRO\Criteria $criteria)
	{
		return $this->call('GET', '/organizations', $criteria->toArray());
	}

	/**
	 * Gets an Organization by organization ID
	 * 
	 * @param int $organizationId
	 * @return \DeskPRO\Api\Result Result Object
	 */
	public function findById($organizationId)
	{
		return $this->call('GET', '/organizations/' . intval($organizationId));
	}

	/**
	 * Saves an Organization
	 * 
	 * @param \DeskPRO\Builder\Organization $organization
	 * @return \DeskPRO\Api\Result Result Object
	 */
	public function save(\DeskPRO\Builder\Organization $organization)
	{
		if ($organization->getId()) {
			return $this->call('POST', '/organizations/' . intval($organization->getId()), $organization->getDataArray());
		}

		return $this->call('POST', '/organizations', $organization->getDataArray());
	}

	/**
	 * Deletes an Organization by ID
	 * 
	 * @param int $organizationId Organization ID
	 * @return \DeskPRO\Api\Result
	 */
	public function deleteById($organizationId)
	{
		return $this->call('DELETE', '/organizations/' . intval($organizationId));
	}

	/**
	 * Gets a link to an organization's picture
	 * 
	 * @param int $organizationId Organization ID
	 * @return \DeskPRO\Api\Result
	 */
	public function getPicture($organizationId)
	{
		return $this->call('GET', '/organizations/' . intval($organizationId) . '/picture');
	}

	/**
	 * Sets the Organization's picture
	 * 
	 * @param int $organizationId Organization ID
	 * @param \DpApiFileUpload|string|null $file File to upload
	 * @param int|null $blob_id Existing attachment ID (blob ID), possibly from uploadFile()
	 * @return \DpApiRes
	 */
	public function setPicture($organizationId, $file = null, $blob_id = null)
	{
		if ($blob_id) {
			$params = array('blob_id' => $blob_id);
		} else if ($file) {
			$params = array('file' => $file);
		} else {
			$params = array();
		}

		$params = $this->_enforceFileUploadIsset($params, 'file');

		return $this->call('POST', '/organizations/' . intval($organizationId) . '/picture', $params);
	}

	/**
	 * Deletes an Organization picture
	 * 
	 * @param int $organizationId Organization ID
	 * @return \DeskPRO\Api\Result
	 */
	public function deletePicture($organizationId)
	{
		return $this->call('DELETE', '/organizations/' . intval($organizationId) . '/picture');
	}

	/**
	 * Gets all SLAs for an organization.
	 * 
	 * @param int $organizationId Organization ID
	 * @return \DeskPRO\Api\Result
	 */
	public function getSlas($organizationId)
	{
		return $this->call('GET', '/organizations/' . intval($organizationId) . '/slas');
	}

	/**
	 * Adds an SLA for an organization.
	 *
	 * @param int $organizationId Organization ID
	 * @param int $slaId SLA ID to add
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function addSla($organizationId, $slaId)
	{
		$params = array('sla_id' => $slaId);
		return $this->call('POST', '/organizations/' . intval($organizationId) . '/slas', $params);
	}

	/**
	 * Determines if an organization has a particular SLA
	 *
	 * @param int $organizationId
	 * @param int $slaId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getSla($organizationId, $slaId)
	{
		return $this->call('GET', '/organizations/' . intval($organizationId) . '/slas/' . intval($slaId));
	}

	/**
	 * Deletes an SLA for an organization.
	 *
	 * @param int $organizationId
	 * @param int $slaId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function deleteSla($organizationId, $slaId)
	{
		return $this->call('DELETE', '/organizations/' . intval($organizationId) . '/slas/' . intval($slaId));
	}

	/**
	 * Gets all contact details for an organization.
	 *
	 * @param int $organizationId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getContactDetails($organizationId)
	{
		return $this->call('GET', '/organizations/' . intval($organizationId) . '/contact-details');
	}

	/**
	 * Determines if a particular contact ID exists for an organization.
	 *
	 * @param int $organizationId
	 * @param int $contactId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getContactDetail($organizationId, $contactId)
	{
		return $this->call('GET', '/organizations/' . intval($organizationId) . '/contact-details/' . intval($contactId));
	}

	/**
	 * Removes a particular contact detail from an organization.
	 *
	 * @param int $organizationId
	 * @param int $contactId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function removeContactDetail($organizationId, $contactId)
	{
		return $this->call('DELETE', '/organizations/' . intval($organizationId) . '/contact-details/' . intval($contactId));
	}

	/**
	 * Gets the list of groups that the organization belongs to.
	 *
	 * @param int $organizationId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getGroupsByOrganization($organizationId)
	{
		return $this->call('GET', '/organizations/' . intval($organizationId) . '/groups');
	}

	/**
	 * Adds an organization to a group
	 *
	 * @param int $organizationId
	 * @param int $groupId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function addGroup($organizationId, $groupId)
	{
		return $this->call('POST', '/organizations/' . intval($organizationId) . '/groups', array('id' => $groupId));
	}

	/**
	 * Determines if the an organization is a member of a particular group.
	 *
	 * @param int $organizationId
	 * @param int $groupId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getGroup($organizationId, $groupId)
	{
		return $this->call('GET', '/organizations/' . intval($organizationId) . '/groups/' . intval($groupId));
	}

	/**
	 * Removes an organization from a group.
	 *
	 * @param int $organizationId
	 * @param int $groupId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function removeGroup($organizationId, $groupId)
	{
		return $this->call('DELETE', '/organizations/' . intval($organizationId) . '/groups/' . intval($groupId));
	}

	/**
	 * Gets all labels associated with an organization.
	 *
	 * @param int $organizationId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getLabels($organizationId)
	{
		return $this->call('GET', '/organizations/' . intval($organizationId) . '/labels');
	}

	/**
	 * Adds a label to an organization.
	 *
	 * @param int $organizationId
	 * @param string $label
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function addLabel($organizationId, $label)
	{
		return $this->call('POST', '/organizations/' . intval($organizationId) . '/labels', array('label' => $label));
	}

	/**
	 * Determines if an organization has a specific label.
	 *
	 * @param int $organizationId
	 * @param string $label
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getLabel($organizationId, $label)
	{
		return $this->call('GET', '/organizations/' . intval($organizationId) . '/labels/' . $label);
	}

	/**
	 * Removes a label from an organization.
	 *
	 * @param int $organizationId Organization ID
	 * @param string $label label to remove
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function removeLabel($organizationId, $label)
	{
		return $this->call('DELETE', '/organizations/' . intval($organizationId) . '/labels/' . $label);
	}

	/**
	 * Gets a list of custom organizations fields.
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getFields()
	{
		return $this->call('GET', '/organizations/fields');
	}

	/**
	 * Gets a list of available user groups.
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getGroups()
	{
		return $this->call('GET', '/organizations/groups');
	}

	/**
	 * Gets members of an organization.
	 *
	 * @param int $organizationId
	 * @param int $page Page number of results to retrieve - defaults to 1
	 * @param null|string $order Order of results (if not specified, uses API default)
	 * @param null|int $cache_id If specified, uses the cached results from this set if possible.
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getMembers($organizationId, $page = 1, $order = null, $cache_id = null)
	{
		$params = array();
		$params['page'] = $page;
		if ($order !== null) {
			$params['order'] = $order;
		}
		if ($cache_id !== null) {
			$params['cache'] = $cache_id;
		}

		return $this->call('GET', '/organizations/' . intval($organizationId) . '/members', $params);
	}

	/**
	 * Gets tickets for an organization.
	 *
	 * @param int $organizationId
	 * @param int $page Page number of results to retrieve - defaults to 1
	 * @param null|string $order Order of results (if not specified, uses API default)
	 * @param null|int $cache_id If specified, uses the cached results from this set if possible.
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getOrganizationTickets($organizationId, $page = 1, $order = null, $cache_id = null)
	{
		$params = array();
		$params['page'] = $page;
		if ($order !== null) {
			$params['order'] = $order;
		}
		if ($cache_id !== null) {
			$params['cache'] = $cache_id;
		}

		return $this->call('GET', '/organizations/' . intval($organizationId) . '/tickets', $params);
	}

	/**
	 * Gets chats for an organization.
	 *
	 * @param int $organizationId
	 * @param int $page Page number of results to retrieve - defaults to 1
	 * @param null|string $order Order of results - this is not currently used by the API
	 * @param null|int $cache_id If specified, uses the cached results from this set if possible.
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getOrganizationChats($organizationId, $page = 1, $order = null, $cache_id = null)
	{
		$params = array();
		$params['page'] = $page;
		if ($order !== null) {
			$params['order'] = $order;
		}
		if ($cache_id !== null) {
			$params['cache'] = $cache_id;
		}

		return $this->call('GET', '/organizations/' . intval($organizationId) . '/chats', $params);
	}

	/**
	 * Gets activity stream for an organization.
	 *
	 * @param int $organizationId
	 * @param int $page Page number of results to retrieve - defaults to 1
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getOrganizationActivityStream($organizationId, $page = 1)
	{
		$params = array();
		$params['page'] = $page;

		return $this->call('GET', '/organizations/' . intval($organizationId) . '/activity-stream', $params);
	}

	/**
	 * Gets billing charges for an organization.
	 *
	 * @param int $organizationId
	 * @param int $page Page number of results to retrieve - defaults to 1
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getOrganizationBillingCharges($organizationId, $page = 1)
	{
		$params = array();
		$params['page'] = $page;

		return $this->call('GET', '/organizations/' . intval($organizationId) . '/billing-charges', $params);
	}

	/**
	 * Gets email domains for an organization.
	 *
	 * @param int $organizationId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getOrganizationEmailDomains($organizationId)
	{
		$params = array();

		return $this->call('GET', '/organizations/' . intval($organizationId) . '/email-domains', $params);
	}

	/**
	 * Add email domain for an organization.
	 *
	 * @param int $organizationId
	 * @param string $domain
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function addOrganizationEmailDomains($organizationId, $domain)
	{
		$params = array();
		$params['domain'] = $domain;

		return $this->call('POST', '/organizations/' . intval($organizationId) . '/email-domains', $params);
	}

	/**
	 * Determines if email domain exists for an organization.
	 *
	 * @param int $organizationId
	 * @param string $domain
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getOrganizationEmailDomain($organizationId, $domain)
	{
		return $this->call('GET', '/organizations/' . intval($organizationId) . '/email-domains/' . $domain);
	}

	/**
	 * Deletes an email domain for an organization.
	 *
	 * @param int $organizationId
	 * @param string $domain
	 * @param boolean $remove_users True to remove users from this domain from the organization
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function deleteOrganizationEmailDomain($organizationId, $domain, $remove_users = false)
	{
		$params = array(
			'remove_users' => ($remove_users ? 1 : 0)
		);

		return $this->call('DELETE', '/organizations/' . intval($organizationId) . '/email-domains/' . $domain, $params);
	}

	/**
	 * Moves email domain users for an organization if they have no organization.
	 *
	 * @param int $organizationId
	 * @param string $domain
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function moveOrganizationEmailDomainUsers($organizationId, $domain)
	{
		return $this->call('POST', '/organizations/' . intval($organizationId) . '/email-domains/' . $domain . '/move-users');
	}

	/**
	 * Moves email domain users for an organization if they have an organization.
	 *
	 * @param int $organizationId
	 * @param string $domain
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function moveOrganizationEmailDomainTakenUsers($organizationId, $domain)
	{
		return $this->call('POST', '/organizations/' . intval($organizationId) . '/email-domains/' . $domain . '/move-taken-users');
	}

}
