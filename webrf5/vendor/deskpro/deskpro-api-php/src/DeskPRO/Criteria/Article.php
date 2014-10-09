<?php

namespace DeskPRO\Criteria;

/**
 * Criteria for Article Search
 *
 * @author Abhinav Kumar <abhinav.kumar@deskpro.com>
 * @link https://support.deskpro.com/kb/articles/99-knowledgebase-articles DeskPRO article API documentation
 */
class Article extends \DeskPRO\Criteria\AbstractCriteria
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
	 * 
	 * @param type $categoryId
	 * @param type $nested
	 * @return \DeskPRO\Criteria\Article
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
	 * Requires the article to have been created before the specified date. 
	 * Must be specified as a Unix timestamp.
	 * 
	 * @param int $timestamp Unix timestamp of the date
	 * @return \DeskPRO\Criteria\Article
	 */
	public function createdBefore($timestamp)
	{
		$this->_criteria['date_created_end'] = $timestamp;

		return $this;
	}

	/**
	 * Requires the article to have been created after this date. 
	 * Must be specified as a Unix timestamp.
	 * 
	 * @param int $timestamp Unix timestamp of the date
	 * @return \DeskPRO\Criteria\Article
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
	 * @return \DeskPRO\Criteria\Article
	 */
	public function addLabel($lable)
	{
		@$this->_criteria['label'][] = $lable;

		return $this;
	}

	/**
	 * Searches for new articles only
	 * 
	 * @return \DeskPRO\Criteria\Article
	 */
	public function onlyNew()
	{
		$this->_criteria['new'] = 1;

		return $this;
	}

	/**
	 * Searches for popular articles only
	 * 
	 * @return \DeskPRO\Criteria\Article
	 */
	public function onlyPopular()
	{
		$this->_criteria['popular'] = 1;

		return $this;
	}

	/**
	 * Adds a status to the criteria
	 * 
	 * @param string $status Status to search for. Valid values are published, archived, hidden.
	 * @return \DeskPRO\Criteria\Article
	 */
	public function addStatus($status)
	{
		$this->_criteria['status'][] = $status;

		return $this;
	}

}
