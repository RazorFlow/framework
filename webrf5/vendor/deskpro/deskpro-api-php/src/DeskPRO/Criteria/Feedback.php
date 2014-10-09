<?php

namespace DeskPRO\Criteria;

/**
 * Criteria for Feedback Search
 *
 * @author Abhinav Kumar <abhinav.kumar@deskpro.com>
 * @link https://support.deskpro.com/kb/articles/105-feedback DeskPRO task API documentation
 */
class Feedback extends \DeskPRO\Criteria\AbstractCriteria
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
	 * Adds a category
	 * 
	 * @param int $categoryId
	 * @param bool $nested TRUE to include child categories and FALSE otherwise
	 * @return \DeskPRO\Criteria\Feedback
	 */
	public function addCategory($categoryId, $nested = TRUE)
	{
		if ($nested) {
			@$this->_criteria['category_id'][] = $categoryId;
		} else {
			@$this->_criteria['category_id_specific'][] = $categoryId;
		}

		return $this;
	}

	/**
	 * Requires the feedback to have been created before the specified date
	 * 
	 * @param int $timestamp Unix timestamp
	 * @return \DeskPRO\Criteria\Feedback
	 */
	public function createdBefore($timestamp)
	{
		$this->_criteria['date_created_end'] = $timestamp;

		return $this;
	}

	/**
	 * Requires the feedback to have been created after the specified date
	 * 
	 * @param int $timestamp Unix timestamp
	 * @return \DeskPRO\Criteria\Feedback
	 */
	public function createdAfter($timestamp)
	{
		$this->_criteria['date_created_start'] = $timestamp;

		return $this;
	}

	/**
	 * Adds a label
	 * 
	 * @param string $label label to add
	 * @return \DeskPRO\Criteria\Feedback
	 */
	public function addLabel($label)
	{
		@$this->_criteria['label'][] = $label;

		return $this;
	}

	/**
	 * Adds a status
	 * 
	 * @param string $status Requires the feedback to be in this status. Possible values: new, active, closed, hidden.
	 * @return \DeskPRO\Criteria\Feedback
	 */
	public function addStatus($status)
	{
		@$this->_criteria['status'][] = $status;

		return $this;
	}

	/**
	 * Adds a status category
	 * 
	 * @param int $statusCategoryId
	 * @return \DeskPRO\Criteria\Feedback
	 */
	public function addStatusCategory($statusCategoryId)
	{
		@$this->_criteria['status_category_id'][] = $statusCategoryId;

		return $this;
	}

}
