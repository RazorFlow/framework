<?php

namespace DeskPRO\Builder;

/**
 * The News Builder Class
 * Builds a News Item
 *
 * @author Abhinav Kumar <abhinav.kumar@deskpro.com>
 */
class News
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
	 * Gets the Task's ID
	 *
	 * @return int
	 */
	public function getId()
	{
		return @$this->_dataArray['id'];
	}

	/**
	 * Sets the Task's ID
	 *
	 * @param int $id The ID to set
	 * @return \DeskPRO\Builder\Task
	 */
	public function setId($id)
	{
		$this->_dataArray['id'] = $id;

		return $this;
	}

	/**
	 * Adds a category
	 * 
	 * @param int $categoryId ID of the category
	 * @return \DeskPRO\Builder\News
	 */
	public function addCategory($categoryId)
	{
		$this->_dataArray['category_id'][] = $categoryId;

		return $this;
	}

	/**
	 * Sets the HTML content
	 * 
	 * @param string $content HTML content
	 * @return \DeskPRO\Builder\News
	 */
	public function setContent($content)
	{
		$this->_dataArray['content'] = $content;

		return $this;
	}

	/**
	 * Sets the creation/publishing date of the news
	 * 
	 * @param int $timestamp Unix timestamp of the date
	 * @return \DeskPRO\Builder\News
	 */
	public function setDate($timestamp)
	{
		$this->_dataArray['date'] = $timestamp;

		return $this;
	}

	/**
	 * Adds a label
	 * 
	 * @param string $label the label to add
	 * @return \DeskPRO\Builder\News
	 */
	public function addLabel($label)
	{
		@$this->_dataArray['label'][] = $label;

		return $this;
	}

	/**
	 * Sets the news status
	 * 
	 * @param string $status Status to set
	 * @return \DeskPRO\Builder\News
	 */
	public function setStatus($status)
	{
		$this->_dataArray['status'] = $status;

		return $this;
	}

	/**
	 * Sets the news title
	 * 
	 * @param string $title
	 * @return \DeskPRO\Builder\News
	 */
	public function setTitle($title)
	{
		$this->_dataArray['title'] = $title;

		return $this;
	}

}
