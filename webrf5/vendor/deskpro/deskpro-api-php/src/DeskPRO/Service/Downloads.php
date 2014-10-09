<?php

namespace DeskPRO\Service;

/**
 * The Downloads Service
 * Handles Downloads related operations
 *
 * @link https://support.deskpro.com/kb/articles/100-download Official Documentation
 * @author Abhinav Kumar <abhinav.kumar@deskpro.com>
 */
class Downloads extends AbstractService
{

	/**
	 * Creates and returns a search criteria
	 * 
	 * @return \DeskPRO\Criteria\Downloads
	 */
	public function createCriteria()
	{
		return new \DeskPRO\Criteria\Downloads();
	}

	/**
	 * Creates and returns a DownloadsBuilder object
	 * 
	 * @return \DeskPRO\Builder\Downloads
	 */
	public function createDownloadEditor()
	{
		return new \DeskPRO\Builder\Downloads();
	}

	/**
	 * Finds tasks matching the criteria
	 * 
	 * @param \DeskPRO\Criteria\Downloads $criteria
	 * @return \DeskPRO\Api\Result
	 */
	public function find(\DeskPRO\Criteria\Downloads $criteria)
	{
		return $this->call('GET', '/download', $criteria->toArray());
	}

	/**
	 * Gets a Downloads by ID
	 * 
	 * @param int $downloadId
	 * @return \DeskPRO\Api\Result
	 */
	public function findById($downloadId)
	{
		return $this->call('GET', '/downloads/' . intval($downloadId));
	}

	/**
	 * Saves a Downloads
	 * 
	 * @param \DeskPRO\Builder\Downloads $download
	 * @return \DeskPRO\Api\Result
	 */
	public function save(\DeskPRO\Builder\Downloads $download)
	{
		$info = $this->_enforceFileUploadIsset($download->getDataArray(), 'attach', true);

		if ($download->getId()) {
			return $this->call('POST', '/downloads/' . intval($download->getId()), $info);
		}
		return $this->call('POST', '/download', $info);
	}

	/**
	 * Deletes a download by ID
	 * 
	 * @param int $downloadId ID of the download to be deleted
	 * @return \DeskPRO\Api\Result
	 */
	public function deleteById($downloadId)
	{
		return $this->call('DELETE', '/downloads/' . intval($downloadId));
	}

	/**
	 * Gets all comments on a download entry.
	 * 
	 * @param int $downloadId ID of the download to search for comments
	 * @return \DeskPRO\Api\Result
	 */
	public function getComments($downloadId)
	{
		return $this->call('GET', '/downloads/' . intval($downloadId) . '/comments');
	}

	/**
	 * Add a comment for a download entry
	 * 
	 * @param int $downloadId ID of the download entry
	 * @param string $content Text of the comment.
	 * @param int $personId ID of the person that owns the comment. If not provided, defaults to the agent making the request.
	 * @param string $status Status of the comment. Defaults to visible.
	 * @return \DeskPRO\Api\Result
	 */
	public function addComment($downloadId, $content, $personId = null, $status = null)
	{
		$params = array(
			'content' => $content,
			'person_id' => $personId,
			'status' => $status
		);

		return $this->call('POST', '/downloads/' . intval($downloadId) . '/comments', $params);
	}

	/**
	 * Gets info about a specific download comment
	 * 
	 * @param int $downloadId ID of the download
	 * @param int $commentId ID of the comment
	 * @return \DeskPRO\Api\Result
	 */
	public function getComment($downloadId, $commentId)
	{
		return $this->call('GET', '/downloads/' . intval($downloadId) . '/comments/' . intval($commentId));
	}

	/**
	 * Updates a comment
	 * 
	 * @param int $downloadId ID of the download entry
	 * @param int $commentId Comment ID
	 * @param string $content new content
	 * @param string $status new status
	 * @return \DeskPRO\Api\Result
	 */
	public function updateComment($downloadId, $commentId, $content, $status = NULL)
	{
		$params = array(
			'content' => $content,
			'status' => $status
		);

		return $this->call('POST', '/downloads/' . intval($downloadId) . '/comments/' . intval($commentId), $params);
	}

	/**
	 * Deletes a download comment
	 * 
	 * @param int $downloadId Downloads ID
	 * @param int $commentId Comment ID that needs to be deleted
	 * @return \DeskPRO\Api\Result
	 */
	public function deleteComment($downloadId, $commentId)
	{
		return $this->call('DELETE', '/downloads/' . intval($downloadId) . '/comments/' . intval($commentId));
	}

	/**
	 * Gets all labels associated with a download.
	 *
	 * @param int $downloadId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getLabels($downloadId)
	{
		return $this->call('GET', '/downloads/' . intval($downloadId) . '/labels');
	}

	/**
	 * Adds a label to a download.
	 *
	 * @param int $downloadId
	 * @param string $label
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function addLabel($downloadId, $label)
	{
		return $this->call('POST', '/downloads/' . intval($downloadId) . '/labels', array('label' => $label));
	}

	/**
	 * Determines if a download has a specific label.
	 *
	 * @param int $downloadId
	 * @param string $label
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getLabel($downloadId, $label)
	{
		return $this->call('GET', '/downloads/' . intval($downloadId) . '/labels/' . $label);
	}

	/**
	 * Removes a label from a download.
	 *
	 * @param int $downloadId
	 * @param string $label
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function removeLabel($downloadId, $label)
	{
		return $this->call('DELETE', '/downloads/' . intval($downloadId) . '/labels/' . $label);
	}

	/**
	 * Gets a list of download comments awaiting validation.
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getValidatingComments()
	{
		return $this->call('GET', '/downloads/validating-comments');
	}

	/**
	 * Gets a list of download categories ("types" in the admin interface).
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getCategories()
	{
		return $this->call('GET', '/downloads/categories');
	}

	/**
	 * Creates a download category.
	 *
	 * @param array $params
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function createCategory($title, $parentId = null, $displayOrder = null, $userGroupIds = array())
	{
		$params = array(
			'title' => $title,
			'parent_id' => $parentId,
			'display_order' => $displayOrder,
			'usergroup_id' => $userGroupIds
		);

		return $this->call('POST', '/downloads/categories', $params);
	}

	/**
	 * Gets a download category.
	 *
	 * @param int $categoryId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getCategory($categoryId)
	{
		return $this->call('GET', '/downloads/categories/' . intval($categoryId));
	}

	/**
	 * Updates a download category.
	 *
	 * @param int $categoryId
	 * @param array $params
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function updateCategory($categoryId, $title, $parentId = null, $displayOrder = null)
	{
		$params = array(
			'title' => $title,
			'parent_id' => $parentId,
			'display_order' => $displayOrder
		);

		return $this->call('POST', '/downloads/categories/' . intval($categoryId), $params);
	}

	/**
	 * Deletes a download category.
	 *
	 * @param int $categoryId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function deleteCategory($categoryId)
	{
		return $this->call('DELETE', '/downloads/categories/' . intval($categoryId));
	}

	/**
	 * Gets download in a download category.
	 *
	 * @param int $categoryId
	 * @param int $page Page number of results to retrieve - defaults to 1
	 * @param null|string $order Order of results (if not specified, uses API default)
	 * @param null|int $cache_id If specified, uses the cached results from this set if possible.
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getCategoryDownloads($categoryId, $page = 1, $order = null, $cache_id = null)
	{
		$params = array();
		$params['page'] = $page;
		if ($order !== null) {
			$params['order'] = $order;
		}
		if ($cache_id !== null) {
			$params['cache'] = $cache_id;
		}

		return $this->call('GET', '/downloads/categories/' . intval($categoryId) . '/download', $params);
	}

	/**
	 * Gets all groups that can access a download category
	 *
	 * @param int $categoryId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getCategoryGroups($categoryId)
	{
		return $this->call('GET', '/downloads/categories/' . intval($categoryId) . '/groups');
	}

	/**
	 * Adds a group to a download category
	 *
	 * @param int $category_id
	 * @param int $group_id
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function addCategoryGroup($category_id, $group_id)
	{
		$params = array(
			'id' => $group_id
		);

		return $this->call('POST', '/downloads/categories/' . intval($category_id) . '/groups', $params);
	}

	/**
	 * Determines if a particular group ID exists for a download category.
	 *
	 * @param int $categoryId
	 * @param int $groupId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getCategoryGroup($categoryId, $groupId)
	{
		return $this->call('GET', '/downloads/categories/' . intval($categoryId) . '/groups/' . intval($groupId));
	}

	/**
	 * Removes a group's access to a download category
	 *
	 * @param int $categoryId
	 * @param int $groupId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function deleteCategoryGroup($categoryId, $groupId)
	{
		$results = $this->call('DELETE', '/downloads/categories/' . intval($categoryId) . '/groups/' . intval($groupId));
		return $this->_getSuccessResponse($results);
	}

}
