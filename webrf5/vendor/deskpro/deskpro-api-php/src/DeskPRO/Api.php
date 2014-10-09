<?php

namespace DeskPRO;

/**
 * Copyright 2013 DeskPRO Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * This is a class to make accessing the REST API exposed by DeskPRO easier.
 * It wraps various API calls in a simple to use PHP API.
 *
 * To use, simply create the object with the URL to your DeskPRO root and API key:
 *  $api = new DpApi('http://example.com/deskpro', '1:APIKEYHERE');
 *
 * Then call whatever API method you want:
 *  $results = $api->findTickets(array());
 *
 * API methods will return false on failure. getLastErrors() can be called to get
 * more specific error messages.
 *
 * For more information on the return values and available parameters in the DeskPRO
 * API, see here: https://support.deskpro.com/kb/17-deskpro-api
 *
 * @version 0.1.0
 */
class Api
{

	/**
	 * URL to DeskPRO root (eg, http://example.com/deskpro)
	 *
	 * @var string
	 */
	protected $_root;

	/**
	 * API key (id:secret format)
	 *
	 * @var string
	 */
	protected $_api_key;

	/**
	 * Agent performing the API request if using a super user key
	 *
	 * @var integer
	 */
	protected $_agent_id;

	/**
	 * The token (id:secret) format of an agent. If provided, the key and agent ID are ignored.
	 *
	 * @var string
	 */
	protected $_api_token;

	/**
	 * List of errors from last API call. False if no errors occurred.
	 *
	 * @var bool|array
	 */
	protected $_errors = false;

	/**
	 * Raw results object from the last API call, or null if there were no previous calls.
	 *
	 * @var DpApiResult|null
	 */
	protected $_last;

	/**
	 * @var bool
	 */
	protected $_verify_ssl = false;

	/**
	 * @var callable
	 */
	protected $_curl_init_callback;
	
	/** @var \DeskPRO\Service\Articles Articles Service */
	public $articles;
	
	/** @var \DeskPRO\Service\Chats Chats Service */
	public $chats;
	
	/** @var \DeskPRO\Service\Downloads Downloads Service */
	public $downloads;
	
	/** @var \DeskPRO\Service\Feedbacks Feedbck Service */
	public $feedbacks;
	
	/** @var \DeskPRO\Service\Misc Misc API Service */
	public $misc;
	
	/** @var \DeskPRO\Service\News News Service */
	public $news;
	
	/** @var \DeskPRO\Service\Organization Organization Service */
	public $organization;
	
	/** @var \DeskPRO\Service\People The people service */
	public $people;

	/** @var \DeskPRO\Service\Tasks The tasks service */
	public $tasks;
	
	/** @var \DeskPRO\Service\Tickets Tickets service */
	public $tickets;

	/**
	 * @param string $dp_root
	 * @param string $api_key Pre-created key from the admin interface
	 * @param integer $agent_id If the API key is a super user key, specify the agent performing the action.
	 * @param string $api_token Agen token from the token exchange
	 *
	 * @throws Exception
	 */
	public function __construct($dp_root, $api_key = null, $agent_id = 0, $api_token = null)
	{
		if (!function_exists('curl_init')) {
			throw new Exception("cURL is not available. The DeskPRO API wrapper cannot be used.");
		}
		
		$this->articles		= new Service\Articles($this);
		
		$this->chats		= new Service\Chats($this);

		$this->downloads	= new Service\Downloads($this);
		
		$this->feedbacks	= new Service\Feedbacks($this);
		
		$this->misc		= new Service\Misc($this);

		$this->news		= new Service\News($this);

		$this->organization	= new Service\Organization($this);
		
		$this->people		= new Service\People($this);
		
		$this->tasks		= new Service\Tasks($this);
		
		$this->tickets		= new Service\Tickets($this);

		$this->setRoot($dp_root);
		$this->setApiKey($api_key);
		$this->setAgentId($agent_id);
		$this->setApiToken($api_token);

		// Do a get request to /, to make sure it's a valid DeskPRO url
		$this->call('GET', '/');
	}

	/**
	 * Enable SSL certificate verification when using the API over HTTPS.
	 * If you enable SSL verification you should ensure your server has the latest CA root certificates installed.
	 * If you want to specify other options (e.g., CURLOPT_CAINFO or CURLOPT_CAPATH) you should add a cURL init
	 * callback with setCurlInitCallback().
	 */
	public function enableSslVerification()
	{
		$this->_verify_ssl = true;
	}

	/**
	 * Disable SSL certificate verification when using the API over HTTPS.
	 * This is the default.
	 */
	public function disableSslVerification()
	{
		$this->_verify_ssl = false;
	}

	/**
	 * Set a callback function that is called when a new cURL resource is created.
	 *
	 * The function is past four arguments:
	 * - $ch: The cURL resource
	 * - $method: GET/POST/DELETE/PUT)
	 * - $end: The endpoint being called (eg /tickets)
	 * - $params: An array of parameters being past to the resource
	 *
	 * The function return value is not used.
	 *
	 * Use this to set option on the cURL resource. For example:
	 *
	 * <code>
	 * $api = new DpApi('...', '...');
	 * $api->enableSslVerification();
	 * $api->setCurlInitCallback(function($ch, $method, $end, $params) {
	 *     curl_setopt($ch, CURLOPT_CAINFO, '/path/to/my/ca.crt');
	 * });
	 * </code>
	 *
	 * @param callable $callback
	 */
	public function setCurlInitCallback($callback)
	{
		$this->_curl_init_callback = $callback;
	}

	/**
	 * @param string $root
	 */
	public function setRoot($root)
	{
		if (substr($root, -1) == '/') {
			$root = substr($root, 0, -1);
		}

		$this->_root = $root;
	}

	/**
	 * @return string
	 */
	public function getRoot()
	{
		return $this->_root;
	}

	/**
	 * @param string $api_key
	 */
	public function setApiKey($api_key)
	{
		$this->_api_key = $api_key;
	}

	/**
	 * @param string $api_token
	 */
	public function setApiToken($api_token)
	{
		$this->_api_token = $api_token;
	}

	/**
	 * @param integer $agent_id
	 */
	public function setAgentId($agent_id)
	{
		$this->_agent_id = intval($agent_id);
	}

	/**
	 * @return int
	 */
	public function getAgentId()
	{
		return $this->_agent_id;
	}

	/**
	 * Calls an API method
	 *
	 * @param string $method Request method (GET, POST, PUT, DELETE)
	 * @param string $end URL to the end point (eg, /tickets), relative to DP root
	 * @param array $params List of parameters to pass to method
	 *
	 * @throws Exception
	 *
	 * @return DpApiResult
	 */
	public function call($method, $end, array $params = array())
	{
		if (substr($end, 0, 1) == '/') {
			$end = substr($end, 1);
		}
		if (substr($end, -1) == '/') {
			$end = substr($end, 0, -1);
		}

		$url = $this->_root . '/api/' . $end;

		$method = strtoupper($method);
		$has_files = $this->_hasFileUploads($params);

		$curl = curl_init($url);
		curl_setopt($curl, CURLOPT_FOLLOWLOCATION, false);
		curl_setopt($curl, CURLOPT_HEADER, true);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, $this->_verify_ssl);

		if ($this->_curl_init_callback) {
			call_user_func($this->_curl_init_callback, $curl, $method, $end, $params);
		}

		if ($this->_api_token) {
			$headers = array(
				'X-DeskPRO-API-Token: ' . $this->_api_token
			);
		} else {
			$headers = array(
				'X-DeskPRO-API-Key: ' . $this->_api_key
			);
			if ($this->_agent_id) {
				$headers[] = 'X-DeskPRO-Agent-ID: ' . $this->_agent_id;
			}
		}

		switch ($method) {
			case 'POST':
			case 'PUT':
			case 'DELETE':
				curl_setopt($curl, CURLOPT_CUSTOMREQUEST, strtoupper($method));
				if ($has_files) {
					$boundary = '---DPAPICURL-' . md5(microtime());
					$raw_params = $this->_getCurlMultiPart($params, $boundary) . "--$boundary--\r\n";
					curl_setopt($curl, CURLOPT_POSTFIELDS, $raw_params);

					$headers[] = 'Content-Type: multipart/form-data; boundary=' . $boundary;
					$headers[] = 'Content-Length: ' . strlen($raw_params);
				} else {
					curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($params));
				}
				break;

			case 'GET':
				if ($has_files) {
					throw new Exception('Cannot upload files when sending a GET request.');
				}

				curl_setopt($curl, CURLOPT_HTTPGET, true);
				$url .= '?' . http_build_query($params);
				curl_setopt($curl, CURLOPT_URL, $url);
		}
		
		curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

		$response = curl_exec($curl);
		curl_close($curl);

		if (!$response) {
			throw new Exception\CoreException('Invalid DeskPRO URL: ' . $url);
			
		}

		do {
			$header_end = strpos($response, "\r\n\r\n");
			if ($header_end === false) {
				$headers = $response;
				$body = '';
			} else {
				$headers = substr($response, 0, $header_end);
				$body = substr($response, $header_end + 4);
			}
			if (preg_match('#^HTTP/1.\d 100#', $headers)) {
				$is_continue = true;
				$response = $body;
			} else {
				$is_continue = false;
			}
		} while ($is_continue);

		$results = new Api\Result($headers, $body);

		if (!$results->isValidDeskPROResponse()) {
			throw new Exception\CoreException('Not a valid DeskPRO response, Please check your $dp_root URL carefully');
			
		}

		$this->_errors = false;
		$this->_last = $results;

		return $results;
	}

	/**
	 * @return DpApiResult|null
	 */
	public function getLastResults()
	{
		return $this->_last;
	}

	/**
	 * @return array|bool
	 */
	public function getLastErrors()
	{
		return $this->_errors;
	}

	/**
	 * Detects whether the parameters have a file to be uploaded
	 *
	 * @param array $params
	 * @return bool
	 */
	protected function _hasFileUploads(array $params)
	{
		foreach ($params AS $param) {
			if ($param instanceof Api\FileUpload) {
				return true;
			} else if (is_array($param) && $this->_hasFileUploads($param)) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Builds a multipart/form-data response to pass to cURL for a set of params.
	 *
	 * @param array $params Array of params. May be recursive, may contain file uploads
	 * @param string $boundary MIME boundary
	 * @param string $path Path to get here (for form names)
	 *
	 * @return string
	 */
	protected function _getCurlMultiPart(array $params, $boundary, $path = '')
	{
		$output = '';

		foreach ($params AS $key => $value) {
			$form_name = ($path === '' ? $key : $path . '[' . $key . ']');
			if (is_array($value)) {
				$output .= $this->_getCurlMultiPart($value, $boundary, $form_name);
			} else if ($value instanceof Api\FileUpload) {
				$type = $value->getType() ? : 'application/octet-stream';
				$headers = array('Content-Type: ' . $type);
				$output .= $this->_getMultiPartValue($boundary, $form_name, $value->getData(), $value->getFilename(), $headers);
			} else {
				$output .= $this->_getMultiPartValue($boundary, $form_name, $value);
			}
		}

		return $output;
	}

	/**
	 * Gets a single multipart/form-data value
	 *
	 * @param string $boundary
	 * @param string $name
	 * @param string $value
	 * @param string|null $filename If uploaded file, provide name here
	 * @param array $headers List of additional headers
	 *
	 * @return string
	 */
	protected function _getMultiPartValue($boundary, $name, $value, $filename = null, array $headers = array())
	{
		$output = "--$boundary\r\nContent-Disposition: form-data; name=\"$name\"";
		if ($filename) {
			$output .= "; filename=\"$filename\"";
		}
		$output .= "\r\n";
		foreach ($headers AS $header) {
			$output .= "$header\r\n";
		}
		$output .= "\r\n$value\r\n";

		return $output;
	}

	/**
	 * Gets the response from a results object, if it did not error.
	 * Throws exceptions if authentication data is incorrect or the API did not return JSON
	 * (usually an indication of an incorrect URL).
	 *
	 * @param DpApiResult $results
	 *
	 * @return array|bool False on error
	 *
	 * @throws DpApiResponseException
	 * @throws DpApiAuthException
	 */
	protected function _getResponse(DpApiResult $results)
	{
		if ($results->getResponseCode() == 401) {
			throw new DpApiAuthException('Invalid API authentication');
		}

		$json = $results->getJson();

		if ($json === false) {
			throw new DpApiResponseException('API did not return valid JSON');
		}

		if (!empty($json['error_code'])) {
			if ($json['error_code'] == 'multiple') {
				$this->_errors = $json['errors'];
			} else {
				$this->_errors = array(array($json['error_code'], $json['error_message']));
			}

			return false;
		}

		return $json;
	}

	/**
	 * Gets the result when expecting a success response.
	 *
	 * @param DpApiResult $results
	 *
	 * @return bool|array
	 */
	protected function _getSuccessResponse(DpApiResult $results)
	{
		$json = $this->_getResponse($results);
		return ($json && (!empty($json['success']) || in_array(substr($results->getResponseCode(), 0, 1), array('2', '3')) ));
	}

	/**
	 * Gets the result when expecting an exists response
	 *
	 * @param DpApiResult $results
	 *
	 * @return bool
	 */
	protected function _getExistsResponse(DpApiResult $results)
	{
		$json = $this->_getResponse($results);
		return ($json && !empty($json['exists']));
	}

	/**
	 * Ensures that the input is a file upload. If it's a string,
	 * it is assumed to be a local file.
	 *
	 * @param mixed $input
	 *
	 * @return DpApiFileUpload
	 *
	 * @throws DpApiException
	 */
	protected function _enforceFileUpload($input)
	{
		if ($input instanceof DpApiFileUpload) {
			return $input;
		} else if (is_scalar($input)) {
			return new DpApiFileUpload($input);
		} else {
			throw new DpApiException('Cannot force an input to a file (expected string or DpApiFileUpload object)');
		}
	}

	/**
	 * Ensures that a particular parameter is a file upload, if it is set.
	 *
	 * @param array $params
	 * @param string $key
	 * @param bool $multiple
	 *
	 * @return array
	 *
	 * @throws DpApiException
	 */
	protected function _enforceFileUploadIsset(array $params, $key, $multiple = false)
	{
		if (!isset($params[$key])) {
			return $params;
		}

		if (is_array($params[$key])) {
			if ($multiple) {
				foreach ($params[$key] AS &$value) {
					$value = $this->_enforceFileUpload($value);
				}
			} else {
				throw new DpApiException("Passed multiple files to $key when only one was expected");
			}
		} else {
			$params[$key] = $this->_enforceFileUpload($params[$key]);
		}

		return $params;
	}

}
