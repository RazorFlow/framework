<?php

namespace DeskPRO\Service;

/**
 * The Articles API
 * Handles article/kb related operations
 *
 * @link https://support.deskpro.com/kb/articles/99-knowledgebase-articles Official Documentation
 * @author Abhinav Kumar <abhinav.kumar@deskpro.com>
 */
class Articles extends AbstractService
{

	/**
	 * Creates and returns a search criteria
	 * 
	 * @return \DeskPRO\Criteria\Article
	 */
	public function createCriteria()
	{
		return new \DeskPRO\Criteria\Article();
	}

	/**
	 * Creates and returns a ArticleBuilder object
	 * 
	 * @return \DeskPRO\Builder\Article
	 */
	public function createArticleEditor()
	{
		return new \DeskPRO\Builder\Article();
	}

	/**
	 * Finds articles matching the criteria
	 * 
	 * @param \DeskPRO\Criteria\Article $criteria
	 * @return \DeskPRO\Api\Result
	 */
	public function find(\DeskPRO\Criteria\Article $criteria)
	{
		return $this->interface->call('GET', '/kb', $criteria);
	}

	/**
	 * Gets an Article by article ID
	 * 
	 * @param int $articleId
	 * @return \DeskPRO\Api\Result Result Object
	 */
	public function findById($articleId)
	{
		return $this->interface->call('GET', '/kb/' . intval($articleId));
	}

	/**
	 * Saves a task
	 * 
	 * @param \DeskPRO\Builder\Article $article
	 * @return \DeskPRO\Api\Result
	 */
	public function save(\DeskPRO\Builder\Article $article)
	{
		if ($article->getId()) {
			return $this->interface->call('POST', '/kb/' . intval($article->getId()), $article->getDataArray());
		}

		return $this->interface->call('POST', '/kb/', $article->getDataArray());
	}

	/**
	 * Deletes the given article.
	 *
	 * @param int $articleId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function deleteById($articleId)
	{
		return $this->interface->call('DELETE', '/kb/' . intval($articleId));
	}

	/**
	 * Gets all comments on an article.
	 *
	 * @param int $articleId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getArticleComments($articleId)
	{
		return $this->interface->call('GET', '/kb/' . intval($articleId) . '/comments');
	}

	/**
	 * Adds a comment to an article.
	 * 
	 * @param int $articleId Article ID
	 * @param string $content Comment content
	 * @param int $personId D of the person that owns the comment. If not provided, defaults to the agent making the request.
	 * @param string $status Status of the comment. Defaults to visible.
	 * @return \DeskPRO\Api\Result
	 */
	public function addArticleComment($articleId, $content, $personId = null, $status = null)
	{
		$params = array(
			'content' => $content,
			'person_id' => $personId,
			'status' => $status
		);

		return $this->interface->call('POST', '/kb/' . intval($articleId) . '/comments', $params);
	}

	/**
	 * Gets a comment on an article.
	 *
	 * @param int $articleId ID of the article
	 * @param int $commentId ID of the comment
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getArticleComment($articleId, $commentId)
	{
		return $this->interface->call('GET', '/kb/' . intval($articleId) . '/comments/' . intval($commentId));
	}

	/**
	 * Updates a comment on an article.
	 * 
	 * @param int $articleId ID of the article
	 * @param int $commentId ID of the comment to update
	 * @param string $content New content to set
	 * @param string $status new status to set
	 * @return \DeskPRO\Api\Result
	 */
	public function updateArticleComment($articleId, $commentId, $content, $status = null)
	{
		$params = array(
			'content' => $content,
			'status' => $status
		);

		return $this->interface->call('POST', '/kb/' . intval($articleId) . '/comments/' . intval($commentId), $params);
	}

	/**
	 * Deletes a comment on an article.
	 *
	 * @param int $articleId
	 * @param int $commentId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function deleteArticleComment($articleId, $commentId)
	{
		return $this->interface->call('DELETE', '/kb/' . intval($articleId) . '/comments/' . intval($commentId));
	}

	/**
	 * Gets all votes associated with an article.
	 *
	 * @param int $articleId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getArticleVotes($articleId)
	{
		return $this->interface->call('GET', '/kb/' . intval($articleId) . '/votes');
	}

	/**
	 * Gets all attachments associated with an article.
	 *
	 * @param int $articleId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getArticleAttachments($articleId)
	{
		return $this->interface->call('GET', '/kb/' . intval($articleId) . '/attachments');
	}

	/**
	 * Adds an attachment to an article.
	 *
	 * @param int $articleId
	 * @param DpApiFileUpload|string|null $attach File to upload
	 * @param int|null $attachId Existing attachment ID (blob ID), possibly from uploadFile()
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function addArticleAttachment($articleId, $attach = null, $attachId = null)
	{
		$params = $this->_enforceFileUploadIsset(array(
			'attach' => $attach,
			'attach_id' => $attachId
		), 'attach');

		return $this->interface->call('POST', '/kb/' . intval($articleId) . '/attachments', $params);
	}

	/**
	 * Determines if an article has a specific attachment ID.
	 *
	 * @param int $articleId
	 * @param int $attachmentId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getArticleAttachment($articleId, $attachmentId)
	{
		return $this->interface->call('GET', '/kb/' . intval($articleId) . '/attachments/' . intval($attachmentId));
	}

	/**
	 * Removes an attachment from an article.
	 *
	 * @param int $articleId
	 * @param int $attachmentId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function removeArticleAttachment($articleId, $attachmentId)
	{
		return $this->interface->call('DELETE', '/kb/' . intval($articleId) . '/attachments/' . intval($attachmentId));
	}

	/**
	 * Gets all labels associated with an article.
	 *
	 * @param int $articleId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getArticleLabels($articleId)
	{
		return $this->interface->call('GET', '/kb/' . intval($articleId) . '/labels');
	}

	/**
	 * Adds a label to an article.
	 *
	 * @param int $articleId
	 * @param string $label
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function addArticleLabel($articleId, $label)
	{
		return $this->interface->call('POST', '/kb/' . intval($articleId) . '/labels', array('label' => $label));
	}

	/**
	 * Determines if an article has a specific label.
	 *
	 * @param int $articleId
	 * @param string $label
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getArticleLabel($articleId, $label)
	{
		return $this->interface->call('GET', '/kb/' . intval($articleId) . '/labels/' . $label);
	}

	/**
	 * Removes a label from an article.
	 *
	 * @param int $articleId
	 * @param string $label
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function removeArticleLabel($articleId, $label)
	{
		return $this->interface->call('DELETE', '/kb/' . intval($articleId) . '/labels/' . $label);
	}

	/**
	 * Gets a list of article comments awaiting validation.
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getValidatingComments()
	{
		return $this->interface->call('GET', '/kb/validating-comments');
	}

	/**
	 * Gets a list of articles categories.
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getCategories()
	{
		return $this->interface->call('GET', '/kb/categories');
	}

	/**
	 * Creates an article category.
	 * 
	 * @param string $title title of the category
	 * @param int $parent_id ID of the category's parent. Use 0 for no parent.
	 * @param int $display_order Order of display of categories. Lower numbers will be displayed first.
	 * @param int $usergroupId ID of user group that has access. If not provided, defaults to all users.
	 * @return \DeskPRO\Api\Result
	 */
	public function createCategory($title, $parent_id = null, $display_order = null, $usergroupId = null)
	{
		$params = array(
			'title' => $title,
			'parent_id' => $parent_id,
			'display_order' => $display_order,
			'usergroup_id' => $usergroupId
		);

		return $this->interface->call('POST', '/kb/categories', $params);
	}

	/**
	 * Gets an article category.
	 *
	 * @param int $categoryId ID of the article category
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getCategory($categoryId)
	{
		return $this->interface->call('GET', '/kb/categories/' . intval($categoryId));
	}

	/**
	 * Updates an article category.
	 *
	 * @param int $categoryId Category ID to udpate
	 * @param string $title New title to set
	 * @param int $parent_id ID of the category's parent. Use 0 for no parent.
	 * @param int $displayOrder Order of display of categories. Lower numbers will be displayed first.
	 * @return \DeskPRO\Api\Result
	 */
	public function updateCategory($categoryId, $title, $parent_id = 0, $displayOrder = null)
	{
		$params = array(
			'title' => $title,
			'parent_id' => $parent_id,
			'display_order' => $displayOrder
		);

		return $this->interface->call('POST', '/kb/categories/' . intval($categoryId), $params);
		;
	}

	/**
	 * Deletes an article category.
	 *
	 * @param int $categoryId ID of the category to be deleted
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function deleteCategoryById($categoryId)
	{
		return $this->interface->call('DELETE', '/kb/categories/' . intval($categoryId));
	}

	/**
	 * Gets articles in an article category.
	 *
	 * @param int $categoryId ID of the category to search
	 * @param int $page Page number of results to retrieve - defaults to 1
	 * @param null|string $order Order of results (if not specified, uses API default)
	 * @param null|int $cache_id If specified, uses the cached results from this set if possible.
	 *
	 * @return \DeskPRO\Api\Result A Result Object
	 */
	public function getCategoryArticles($categoryId, $page = 1, $order = null, $cache_id = null)
	{
		$params = array();

		$params['page'] = $page;

		if ($order !== null) {
			$params['order'] = $order;
		}

		if ($cache_id !== null) {
			$params['cache'] = $cache_id;
		}

		return $this->interface->call('GET', '/kb/categories/' . intval($categoryId) . '/articles', $params);
	}

	/**
	 * Gets all groups that can access an article category
	 *
	 * @param int $categoryId ID of the category
	 *
	 * @return \DeskPRO\Api\Result A Result Object
	 */
	public function getCategoryGroups($categoryId)
	{
		return $this->interface->call('GET', '/kb/categories/' . intval($categoryId) . '/groups');
	}

	/**
	 * Adds a group to an article category
	 *
	 * @param int $categoryId
	 * @param int $groupId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function addCategoryGroup($categoryId, $groupId)
	{
		return $this->interface->call('POST', '/kb/categories/' . intval($categoryId) . '/groups', array(
			'id' => $groupId
		));
	}

	/**
	 * Determines if a particular group ID exists for an article category.
	 *
	 * @param int $categoryId
	 * @param int $groupId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getCategoryGroup($categoryId, $groupId)
	{
		return $this->interface->call('GET', '/kb/categories/' . intval($categoryId) . '/groups/' . intval($groupId));
	}

	/**
	 * Removes a group's access to an article category
	 *
	 * @param int $categoryId
	 * @param int $groupId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function deleteCategoryGroup($categoryId, $groupId)
	{
		return $this->interface->call('DELETE', '/kb/categories/' . intval($categoryId) . '/groups/' . intval($groupId));
	}

	/**
	 * Gets a list of articles fields.
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getFields()
	{
		return $this->interface->call('GET', '/kb/fields');
	}

	/**
	 * Gets a list of articles products.
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getProducts()
	{
		return $this->interface->call('GET', '/kb/products');
	}

	/**
	 * Gets glossary words
	 *
	 * @param string $word If specified, limits words to those that contain this
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getWords($word = '')
	{
		$params = array('word' => $word);

		return $this->interface->call('GET', '/glossary', $params);
	}

	/**
	 * Adds a glossary word.
	 *
	 * @param array $words List of words to associate with definition
	 * @param string $definition
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function addWord(array $words, $definition)
	{
		$params = array('word' => $words, 'definition' => $definition);

		return $this->interface->call('POST', '/glossary', $params);
	}

	/**
	 * Looks up a glossary word
	 *
	 * @param string $word
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function lookupWord($word)
	{
		$params = array('word' => $word);

		return $this->interface->call('GET', '/glossary/lookup', $params);
	}

	/**
	 * Gets a glossary word
	 *
	 * @param int $wordId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getWord($wordId)
	{
		return $this->interface->call('GET', '/glossary/' . intval($wordId));
	}

	/**
	 * Deletes a glossary word
	 *
	 * @param int $wordId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function deleteWordById($wordId)
	{
		return $this->interface->call('DELETE', '/glossary/' . intval($wordId));
	}

	/**
	 * Gets a glossary word definition
	 *
	 * @param int $wordId ID of the word to find definition for
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getWordDefinition($wordId)
	{
		return $this->interface->call('GET', '/glossary/definitions/' . intval($wordId));
	}

	/**
	 * Updates a glossary word definition
	 *
	 * @param int $wordId
	 * @param array $params Fields to update
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function updateWordDefinition($wordId, array $params)
	{
		return $this->interface->call('POST', '/glossary/definitions/' . intval($wordId), $params);
	}

	/**
	 * Deletes a glossary word definition
	 *
	 * @param int $wordId
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function deleteGlossaryWordDefinition($wordId)
	{
		return $this->interface->call('DELETE', '/glossary/definitions/' . intval($wordId));
	}

}
