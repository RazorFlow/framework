<?php

namespace DeskPRO\Builder;

/**
 * The Download Builder Class
 * Builds an Download
 *
 * @author Abhinav Kumar <abhinav.kumar@deskpro.com>
 */
class Download
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
	 * @return \DeskPRO\Builder\Download
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
	 * @return \DeskPRO\Builder\Download
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
	 * @return \DeskPRO\Builder\Download
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
	 * @return \DeskPRO\Builder\Download
	 */
	public function setContent($content)
	{
		$this->_dataArray['content'] = $content;

		return $this;
	}

	/**
	 * Adds a label
	 * 
	 * @param string $label the label to add
	 * @return \DeskPRO\Builder\Download
	 */
	public function addLabel($label)
	{
		@$this->_dataArray['label'][] = $label;

		return $this;
	}

	/**
	 * Sets the download status
	 * 
	 * @param string $status Status to set
	 * @return \DeskPRO\Builder\Download
	 */
	public function setStatus($status)
	{
		$this->_dataArray['status'] = $status;

		return $this;
	}

	/**
	 * Sets the download title
	 * 
	 * @param string $title
	 * @return \DeskPRO\Builder\Download
	 */
	public function setTitle($title)
	{
		$this->_dataArray['title'] = $title;

		return $this;
	}

}
