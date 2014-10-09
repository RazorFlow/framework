<?php

namespace DeskPRO\Criteria;

/**
 * Criteria for News Search
 *
 * @author Abhinav Kumar <abhinav.kumar@deskpro.com>
 * @link https://support.deskpro.com/kb/newss/101-news DeskPRO news API documentation
 */
class News extends \DeskPRO\Criteria\AbstractCriteria
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
	 * @param int $categoryId ID of the category to search
	 * @param bool $nested whether to search child categories
	 * @return \DeskPRO\Criteria\News
	 */
	public function addCategory($categoryId, $nested = true)
	{
		if ($nested) {
			@$this->_criteria['category_id'][] = $categoryId;
		} else {
			@$this->_criteria['category_id_specific'][] = $categoryId;
		}

		return $this;
	}

	/**
	 * Requires the news to have been created before the specified date. 
	 * Must be specified as a Unix timestamp.
	 * 
	 * @param int $timestamp Unix timestamp of the date
	 * @return \DeskPRO\Criteria\News
	 */
	public function createdBefore($timestamp)
	{
		$this->_criteria['date_created_end'] = $timestamp;

		return $this;
	}

	/**
	 * Requires the news to have been created after this date. 
	 * Must be specified as a Unix timestamp.
	 * 
	 * @param int $timestamp Unix timestamp of the date
	 * @return \DeskPRO\Criteria\News
	 */
	public function createdAfter($timestamp)
	{
		$this->_criteria['date_created_start'] = $timestamp;

		return $this;
	}

	/**
	 * Adds a label
	 * 
	 * @param string $lable label to search for
	 * @return \DeskPRO\Criteria\News
	 */
	public function addLabel($lable)
	{
		@$this->_criteria['label'][] = $lable;

		return $this;
	}

	/**
	 * Adds a status to the criteria
	 * 
	 * @param string $status Status to search for. Valid values are published, archived, hidden.
	 * @return \DeskPRO\Criteria\News
	 */
	public function addStatus($status)
	{
		$this->_criteria['status'][] = $status;

		return $this;
	}

}
