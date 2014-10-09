<?php

namespace DeskPRO\Service;

/**
 * The News Service
 * Handles News related operations
 *
 * @link https://support.deskpro.com/kb/articles/101-news Official Documentation
 * @author Abhinav Kumar <abhinav.kumar@deskpro.com>
 */
class News extends AbstractService
{

	/**
	 * Creates and returns a search criteria
	 * 
	 * @return \DeskPRO\Criteria\News
	 */
	public function createCriteria()
	{
		return new \DeskPRO\Criteria\News();
	}

	/**
	 * Creates and returns a NewsBuilder object
	 * 
	 * @return \DeskPRO\Builder\News
	 */
	public function createTaskEditor()
	{
		return new \DeskPRO\Builder\News();
	}

	/**
	 * Finds tasks matching the criteria
	 * 
	 * @param \DeskPRO\Criteria\News $criteria
	 * @return \DeskPRO\Api\Result
	 */
	public function find(\DeskPRO\Criteria\News $criteria)
	{
		return $this->call('GET', '/news', $criteria->toArray());
	}

	/**
	 * Gets a News by ID
	 * 
	 * @param int $newsId
	 * @return \DeskPRO\Api\Result
	 */
	public function findById($newsId)
	{
		return $this->call('GET', '/news/' . intval($newsId));
	}

	/**
	 * Saves a News
	 * 
	 * @param \DeskPRO\Builder\News $news
	 * @return \DeskPRO\Api\Result
	 */
	public function save(\DeskPRO\Builder\News $news)
	{
		$info = $this->_enforceFileUploadIsset($news->getDataArray(), 'attach', true);

		if ($news->getId()) {
			return $this->call('POST', '/news/' . intval($news->getId()), $info);
		}
		return $this->call('POST', '/news', $info);
	}

	/**
	 * Deletes a news by ID
	 * 
	 * @param int $newsId ID of the news to be deleted
	 * @return \DeskPRO\Api\Result
	 */
	public function deleteById($newsId)
	{
		return $this->call('DELETE', '/news/' . intval($newsId));
	}

	/**
	 * Gets all comments on a news entry.
	 * 
	 * @param int $newsId ID of the news to search for comments
	 * @return type
	 */
	public function getComments($newsId)
	{
		return $this->call('GET', '/news/' . intval($newsId) . '/comments');
	}

	/**
	 * Add a comment for a news entry
	 * 
	 * @param int $newsId ID of the news entry
	 * @param string $content Text of the comment.
	 * @param int $personId ID of the person that owns the comment. If not provided, defaults to the agent making the request.
	 * @param string $status Status of the comment. Defaults to visible.
	 * @return \DeskPRO\Api\Result
	 */
	public function addComment($newsId, $content, $personId = null, $status = null)
	{
		$params = array(
			'content' => $content,
			'person_id' => $personId,
			'status' => $status
		);

		return $this->call('POST', '/news/' . intval($newsId) . '/comments', $params);
	}

	/**
	 * Gets info about a specific news comment
	 * 
	 * @param int $newsId ID of the news
	 * @param int $commentId ID of the comment
	 * @return \DeskPRO\Api\Result
	 */
	public function getComment($newsId, $commentId)
	{
		return $this->call('GET', '/news/' . intval($newsId) . '/comments/' . intval($commentId));
	}

	/**
	 * Updates a comment
	 * 
	 * @param int $newsId ID of the news entry
	 * @param int $commentId Comment ID
	 * @param string $content new content
	 * @param string $status new status
	 * @return \DeskPRO\Api\Result
	 */
	public function updateComment($newsId, $commentId, $content, $status = NULL)
	{
		$params = array(
			'content' => $content,
			'status' => $status
		);

		return $this->call('POST', '/news/' . intval($newsId) . '/comments/' . intval($commentId), $params);
	}

	/**
	 * Deletes a news comment
	 * 
	 * @param int $newsId News ID
	 * @param int $commentId Comment ID that needs to be deleted
	 * @return \DeskPRO\Api\Result
	 */
	public function deleteComment($newsId, $commentId)
	{
		return $this->call('DELETE', '/news/' . intval($newsId) . '/comments/' . intval($commentId));
	}

	/**
	 * Gets all labels associated with a news.
	 *
	 * @param int $newsId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getLabels($newsId)
	{
		return $this->call('GET', '/news/' . intval($newsId) . '/labels');
	}

	/**
	 * Adds a label to a news.
	 *
	 * @param int $newsId
	 * @param string $label
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function addLabel($newsId, $label)
	{
		return $this->call('POST', '/news/' . intval($newsId) . '/labels', array('label' => $label));
	}

	/**
	 * Determines if a news has a specific label.
	 *
	 * @param int $newsId
	 * @param string $label
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getLabel($newsId, $label)
	{
		return $this->call('GET', '/news/' . intval($newsId) . '/labels/' . $label);
	}

	/**
	 * Removes a label from a news.
	 *
	 * @param int $newsId
	 * @param string $label
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function removeLabel($newsId, $label)
	{
		return $this->call('DELETE', '/news/' . intval($newsId) . '/labels/' . $label);
	}

	/**
	 * Gets a list of news comments awaiting validation.
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getValidatingComments()
	{
		return $this->call('GET', '/news/validating-comments');
	}

	/**
	 * Gets a list of news categories ("types" in the admin interface).
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getCategories()
	{
		return $this->call('GET', '/news/categories');
	}

	/**
	 * Creates a news category.
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

		return $this->call('POST', '/news/categories', $params);
	}

	/**
	 * Gets a news category.
	 *
	 * @param int $categoryId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getCategory($categoryId)
	{
		return $this->call('GET', '/news/categories/' . intval($categoryId));
	}

	/**
	 * Updates a news category.
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

		return $this->call('POST', '/news/categories/' . intval($categoryId), $params);
	}

	/**
	 * Deletes a news category.
	 *
	 * @param int $categoryId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function deleteCategory($categoryId)
	{
		return $this->call('DELETE', '/news/categories/' . intval($categoryId));
	}

	/**
	 * Gets news in a news category.
	 *
	 * @param int $categoryId
	 * @param int $page Page number of results to retrieve - defaults to 1
	 * @param null|string $order Order of results (if not specified, uses API default)
	 * @param null|int $cache_id If specified, uses the cached results from this set if possible.
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getCategoryNews($categoryId, $page = 1, $order = null, $cache_id = null)
	{
		$params = array();
		$params['page'] = $page;
		if ($order !== null) {
			$params['order'] = $order;
		}
		if ($cache_id !== null) {
			$params['cache'] = $cache_id;
		}

		return $this->call('GET', '/news/categories/' . intval($categoryId) . '/news', $params);
	}

	/**
	 * Gets all groups that can access a news category
	 *
	 * @param int $categoryId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getCategoryGroups($categoryId)
	{
		return $this->call('GET', '/news/categories/' . intval($categoryId) . '/groups');
	}

	/**
	 * Adds a group to a news category
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

		return $this->call('POST', '/news/categories/' . intval($category_id) . '/groups', $params);
	}

	/**
	 * Determines if a particular group ID exists for a news category.
	 *
	 * @param int $categoryId
	 * @param int $groupId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getCategoryGroup($categoryId, $groupId)
	{
		return $this->call('GET', '/news/categories/' . intval($categoryId) . '/groups/' . intval($groupId));
	}

	/**
	 * Removes a group's access to a news category
	 *
	 * @param int $categoryId
	 * @param int $groupId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function deleteCategoryGroup($categoryId, $groupId)
	{
		$results = $this->call('DELETE', '/news/categories/' . intval($categoryId) . '/groups/' . intval($groupId));
		return $this->_getSuccessResponse($results);
	}

}
