<?php

namespace DeskPRO\Builder;

/**
 * The Article Builder Class
 * Builds an Article
 *
 * @author Abhinav Kumar <abhinav.kumar@deskpro.com>
 */
class Article
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
	 * Attaches a file
	 * 
	 * @param DpApiFileUpload|string|null $file File to attach
	 * @return \DeskPRO\Builder\Article
	 */
	public function attachFile($file)
	{
		@$this->_dataArray['attach'][] = $file;

		return $this;
	}

	/**
	 * Attaches a blob by ID
	 * 
	 * @param int $blobId ID of the blob to attach
	 * @return \DeskPRO\Builder\Article
	 */
	public function attachBlob($blobId)
	{
		@$this->_dataArray['attach_id'][] = $blobId;

		return $this;
	}

	/**
	 * Adds a category
	 * 
	 * @param int $categoryId ID of the category
	 * @return \DeskPRO\Builder\Article
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
	 * @return \DeskPRO\Builder\Article
	 */
	public function setContent($content)
	{
		$this->_dataArray['content'] = $content;

		return $this;
	}

	/**
	 * Sets the creation/publishing date of the article
	 * 
	 * @param int $timestamp Unix timestamp of the date
	 * @return \DeskPRO\Builder\Article
	 */
	public function setDate($timestamp)
	{
		$this->_dataArray['date'] = $timestamp;

		return $this;
	}

	/**
	 * Schedules an action to be performed on the given date/time
	 * 
	 * @param string $action The action to perform. Possible values are delete or archive.
	 * @param int $time Unix timestamp of when to perform the action
	 * @return \DeskPRO\Builder\Article
	 */
	public function scheduleAction($action, $time)
	{
		$this->_dataArray['end_action'] = $action;
		$this->_dataArray['date_end'] = $time;

		return $this;
	}

	/**
	 * Sets the Unix timestamp when an article should be published.
	 * 
	 * @param int $timestamp Unix timestamp
	 * @return \DeskPRO\Builder\Article
	 */
	public function setPublishDate($timestamp)
	{
		$this->_dataArray['date_published'] = $timestamp;

		return $this;
	}

	/**
	 * Adds a custom field value
	 * 
	 * @param string $key The custom field name/key
	 * @param mixed $value The custom field value
	 * @return \DeskPRO\Builder\Article
	 */
	public function addCustomField($key, $value)
	{
		@$this->_dataArray['field'][$key] = $value;

		return $this;
	}

	/**
	 * Adds a label
	 * 
	 * @param string $label the label to add
	 * @return \DeskPRO\Builder\Article
	 */
	public function addLabel($label)
	{
		@$this->_dataArray['label'][] = $label;

		return $this;
	}

	/**
	 * Associates the article to a product
	 * 
	 * @param int $productId ID of the product
	 * @return \DeskPRO\Builder\Article
	 */
	public function addProduct($productId)
	{
		@$this->_dataArray['product_id'][] = $productId;

		return $this;
	}

	/**
	 * Sets the article status
	 * 
	 * @param string $status Status to set
	 * @return \DeskPRO\Builder\Article
	 */
	public function setStatus($status)
	{
		$this->_dataArray['status'] = $status;

		return $this;
	}

	/**
	 * Sets the article title
	 * 
	 * @param string $title
	 * @return \DeskPRO\Builder\Article
	 */
	public function setTitle($title)
	{
		$this->_dataArray['title'] = $title;

		return $this;
	}

}
