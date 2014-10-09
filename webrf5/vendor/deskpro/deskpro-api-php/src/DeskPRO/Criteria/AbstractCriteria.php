<?php

namespace DeskPRO\Criteria;

/**
 * Criteria Interface
 *
 * @author Abhinav Kumar <abhinav.kumar@deskpro.com>
 */
abstract class AbstractCriteria
{

	protected $_criteria = array();

	public function toArray()
	{
		return $this->_criteria;
	}

	/**
	 * Add arbirary criteria.
	 *
	 * @param string $name
	 * @param mixed $value
	 * @return \DeskPRO\Criteria\AbstractCriteria
	 */
	public function addCriteria($name, $value)
	{
		$this->_criteria[$name] = $value;
		return $this;
	}

	/**
	 * Specifies the Page number of the result set to fetch
	 *
	 * @param int $page The page number to fetch
	 * @return \DeskPRO\Criteria
	 */
	public function page($page)
	{
		$this->_criteria['page'] = $page;

		return $this;
	}

	/**
	 * Specifies the order of the result set
	 *
	 * @param string $order The page number to fetch
	 * @return \DeskPRO\Criteria
	 */
	public function order($order)
	{
		$this->_criteria['order'] = $order;

		return $this;
	}

	/**
	 * If provided, cached results from this result set are used. 
	 * If it cannot be found or used, 
	 * the other constraints provided will be used to create a new result set.
	 * 
	 * @param int $cacheId The cache ID to retrieve
	 * @return \DeskPRO\Criteria
	 */
	public function cacheId($cacheId)
	{
		$this->_criteria['cache_id'] = $cacheId;

		return $this;
	}

}
