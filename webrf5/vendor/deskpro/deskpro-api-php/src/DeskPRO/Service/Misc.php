<?php

namespace DeskPRO\Service;

/**
 * Misc API operations
 *
 * @author Abhinav Kumar <abhinav.kumar@deskpro.com>
 */
class Misc extends AbstractService
{

	/**
	 * Uploads a file and returns information about the "blob" that was created.
	 * This blob can then be used in other places that accept "attach_id" values.
	 *
	 * @param DpApiFileUpload|string $upload
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function uploadFile($upload)
	{
		$upload = $this->_enforceFileUpload($upload);

		return $this->call('POST', '/misc/upload', array('file' => $upload));
	}

	/**
	 * This allows you to exchange an agent's email and password for a token
	 * which can be used to access the API.
	 *
	 * @param string $email
	 * @param string $password
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function exchangeForToken($email, $password)
	{
		return $this->call('POST', '/token-exchange', array('email' => $email, 'password' => $password));
	}

	/**
	 * Gets the person attached to a session code.
	 *
	 * @param string $session_code
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getSessionPerson($session_code)
	{
		return $this->call('GET', '/misc/session-person/' . $session_code);
	}

	/**
	 * Gets snippet categories
	 *
	 * @param string $type 'tickets' or 'chat'
	 * @return bool|array
	 */
	public function listSnippetCategories($type)
	{
		return $this->call('GET', '/text-snippets/' . $type . '/categories');
	}

	/**
	 * Gets information about the category.
	 *
	 * @param string $type 'tickets' or 'chat'
	 * @param int $id The category ID
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getSnippetCategory($type, $id)
	{
		return $this->call('GET', '/text-snippets/' . $type . '/categories/' . $id);
	}

	/**
	 * Update a snippet category
	 *
	 * @param string $type 'tickets' or 'chat'
	 * @param int $id The category ID
	 * @param array $info Data to write to the category
	 * @return \DeskPRO\Api\Result
	 */
	public function updateSnippetCategory($type, $id, $isGlobal = false)
	{
		$info = array(
			'perm_type'	=> $isGlobal ? 'global' : ''
		);
		
		return $this->call('POST', '/text-snippets/' . $type . '/categories/' . intval($id), $info);
	}

	/**
	 * Gets snippets. Optionally narrow results by providing a category.
	 *
	 * @param string $type 'tickets' or 'chat'
	 * @param int|null $category_id Only get snippets in this category
	 * @return \DeskPRO\Api\Result
	 */
	public function listSnippets($type, $category_id = null)
	{
		$params = array('category_id' => $category_id);

		return $this->call('GET', '/text-snippets/' . $type, $params);
	}

	/**
	 * Update a snippet
	 *
	 * @param string $type 'tickets' or 'chat'
	 * @param int $id The snippet ID
	 * @param array $info The data to write to the snippet
	 * @return \DeskPRO\Api\Result
	 */
	public function updateSnippet($type, $id, $categoryId)
	{
		$info = array(
			'category_id' => $categoryId
		);
		
		return $this->call('POST', '/text-snippets/' . $type . '/' . intval($id), $info);
	}

	/**
	 * Gets information about the snippet.
	 *
	 * @param string $type 'tickets' or 'chat'
	 * @param int $id The snippet ID
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function getSnippet($type, $id)
	{
		return $this->call('GET', '/text-snippets/' . $type . '/' . $id);
	}

	/**
	 * Deletes the snippet.
	 *
	 * @param string $type 'tickets' or 'chat'
	 * @param int $id
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function deleteSnippet($type, $id)
	{
		return $this->call('DELETE', '/text-snippets/' . intval($id));
	}

	/**
	 * Deletes the snippet category
	 *
	 * @param string $type 'tickets' or 'chat'
	 * @param int $id
	 *
	 * @return \DeskPRO\Api\Result
	 */
	public function deleteSnippetCategory($type, $id)
	{
		return $this->call('DELETE', '/text-snippets/' . $type . '/' . intval($id));
	}

}
