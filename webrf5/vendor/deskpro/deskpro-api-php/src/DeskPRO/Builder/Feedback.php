<?php

namespace DeskPRO\Builder;

/**
 * The Feedback Builder Class
 * Builds a Feedback
 *
 * @author Abhinav Kumar <abhinav.kumar@deskpro.com>
 */
class Feedback
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
	 * Sets the title
	 * 
	 * @param string $title Title to set
	 * @return \DeskPRO\Builder\Feedback
	 */
	public function setTitle($title)
	{
		$this->_dataArray['title'] = $title;

		return $this;
	}

	/**
	 * Sets the content
	 * 
	 * @param string $content Feedback content
	 * @return \DeskPRO\Builder\Feedback
	 */
	public function setContent($content)
	{
		$this->_dataArray['content'] = $content;

		return $this;
	}

	/**
	 * Sets the category
	 * 
	 * @param int $categoryId Category ID to set
	 * @return \DeskPRO\Builder\Feedback
	 */
	public function setCategory($categoryId)
	{
		$this->_dataArray['category_id'] = $categoryId;

		return $this;
	}

	/**
	 * Adds a label
	 * 
	 * @param string $label label to add
	 * @return \DeskPRO\Builder\Feedback
	 */
	public function addLabel($label)
	{
		@$this->_dataArray['label'][] = $label;

		return $this;
	}

	/**
	 * Sets the status
	 * 
	 * @param string $status Status of the feedback. Defaults to new if not overridden by this or status_category_id.
	 * @return \DeskPRO\Builder\Feedback
	 */
	public function setStatus($status)
	{
		@$this->_dataArray['status'] = $status;

		return $this;
	}

	/**
	 * Sets the status category
	 * 
	 * @param int $statusCategoryId Status category of the feedback.
	 * @return \DeskPRO\Builder\Feedback
	 */
	public function setStatusCategory($statusCategoryId)
	{
		@$this->_dataArray['status_category_id'] = $statusCategoryId;

		return $this;
	}

	/**
	 * Sets the User Category
	 * 
	 * @param int $userCategoryId User category of the feedback.
	 * @return \DeskPRO\Builder\Feedback
	 */
	public function setUserCategory($userCategoryId)
	{
		@$this->_dataArray['user_category_id'] = $userCategoryId;

		return $this;
	}

}
