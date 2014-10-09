<?php

namespace DeskPRO\Api;

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
class Dp
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

        $this->setRoot($dp_root);
        $this->setApiKey($api_key);
        $this->setAgentId($agent_id);
        $this->setApiToken($api_token);
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

        $results = new DpApiResult($headers, $body);

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
            if ($param instanceof DpApiFileUpload) {
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
			$form_name = ($path === '' ? $key : $path.'['.$key.']');
            if (is_array($value)) {
                $output .= $this->_getCurlMultiPart($value, $boundary, $form_name);
            } else if ($value instanceof DpApiFileUpload) {
				$type = $value->getType() ?: 'application/octet-stream';
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
		return ($json && ( !empty($json['success']) || in_array(substr($results->getResponseCode(), 0, 1), array('2', '3')) ));
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

    // ################### MISC ACTIONS ####################

    /**
     * Uploads a file and returns information about the "blob" that was created.
     * This blob can then be used in other places that accept "attach_id" values.
     *
     * @param DpApiFileUpload|string $upload
     *
     * @return array|bool
     */
    public function uploadFile($upload)
    {
        $upload = $this->_enforceFileUpload($upload);

        $results = $this->call('POST', '/misc/upload', array('file' => $upload));
        return $this->_getResponse($results);
    }

    /**
     * This allows you to exchange an agent's email and password for a token
     * which can be used to access the API.
     *
     * @param string $email
     * @param string $password
     *
     * @return array|bool
     */
    public function exchangeForToken($email, $password)
    {
        $results = $this->call('POST', '/token-exchange', array('email' => $email, 'password' => $password));
        return $this->_getResponse($results);
    }

    /**
     * Gets the person attached to a session code.
     *
     * @param string $session_code
     *
     * @return array|bool
     */
    public function getSessionPerson($session_code)
    {
        $results = $this->call('GET', '/misc/session-person/' . $session_code);
        return $this->_getResponse($results);
    }

    // ################### ORGANIZATION ACTIONS ####################

    /**
     * Finds organizations matching the criteria
     *
     * @param array $criteria
     * @param integer $page Page number of results to retrieve - defaults to 1
     * @param null|string $order Order of results (if not specified, uses API default)
     * @param null|integer $cache_id If specified, uses the cached results from this set if possible.
     *
     * @return array|bool
     */
    public function findOrganizations(array $criteria, $page = 1, $order = null, $cache_id = null)
    {
        $criteria['page'] = $page;
        if ($order !== null) {
            $criteria['order'] = $order;
        }
        if ($cache_id !== null) {
            $criteria['cache_id'] = $cache_id;
        }

        return $this->call('GET', '/organizations', $criteria);
        return $this->_getResponse($results);
    }

    /**
     * Creates an organization with the given data.
     *
     * @param array $info
     *
     * @return array|bool
     */
    public function createOrganization(array $info)
    {
        return $this->call('POST', '/organizations', $info);
        return $this->_getResponse($results);
    }

    /**
     * Gets information about the given organization.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getOrganization($id)
    {
        return $this->call('GET', '/organizations/' . intval($id));
        return $this->_getResponse($results);
    }

    /**
     * Updates information about the given organization.
     *
     * @param integer $id
     * @param array $info
     *
     * @return bool
     */
    public function updateOrganization($id, array $info)
    {
        return $this->call('POST', '/organizations/' . intval($id), $info);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Deletes the given organization.
     *
     * @param integer $id
     *
     * @return bool
     */
    public function deleteOrganization($id)
    {
        return $this->call('DELETE', '/organizations/' . intval($id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets members of an organization.
     *
     * @param integer $id
     * @param integer $page Page number of results to retrieve - defaults to 1
     * @param null|string $order Order of results (if not specified, uses API default)
     * @param null|integer $cache_id If specified, uses the cached results from this set if possible.
     *
     * @return array|bool
     */
    public function getOrganizationMembers($id, $page = 1, $order = null, $cache_id = null)
    {
        $params = array();
        $params['page'] = $page;
        if ($order !== null) {
            $params['order'] = $order;
        }
        if ($cache_id !== null) {
            $params['cache'] = $cache_id;
        }

        $results = $this->call('GET', '/organizations/' . intval($id) . '/tickets', $params);
        return $this->_getResponse($results);
    }

    /**
     * Gets tickets for an organization.
     *
     * @param integer $id
     * @param integer $page Page number of results to retrieve - defaults to 1
     * @param null|string $order Order of results (if not specified, uses API default)
     * @param null|integer $cache_id If specified, uses the cached results from this set if possible.
     *
     * @return array|bool
     */
    public function getOrganizationTickets($id, $page = 1, $order = null, $cache_id = null)
    {
        $params = array();
        $params['page'] = $page;
        if ($order !== null) {
            $params['order'] = $order;
        }
        if ($cache_id !== null) {
            $params['cache'] = $cache_id;
        }

        $results = $this->call('GET', '/organizations/' . intval($id) . '/tickets', $params);
        return $this->_getResponse($results);
    }

    /**
     * Gets chats for an organization.
     *
     * @param integer $id
     * @param integer $page Page number of results to retrieve - defaults to 1
     * @param null|string $order Order of results - this is not currently used by the API
     * @param null|integer $cache_id If specified, uses the cached results from this set if possible.
     *
     * @return array|bool
     */
    public function getOrganizationChats($id, $page = 1, $order = null, $cache_id = null)
    {
        $params = array();
        $params['page'] = $page;
        if ($order !== null) {
            $params['order'] = $order;
        }
        if ($cache_id !== null) {
            $params['cache'] = $cache_id;
        }

        $results = $this->call('GET', '/organizations/' . intval($id) . '/chats', $params);
        return $this->_getResponse($results);
    }

    /**
     * Gets activity stream for an organization.
     *
     * @param integer $id
     * @param integer $page Page number of results to retrieve - defaults to 1
     *
     * @return array|bool
     */
    public function getOrganizationActivityStream($id, $page = 1)
    {
        $params = array();
        $params['page'] = $page;

        $results = $this->call('GET', '/organizations/' . intval($id) . '/activity-stream', $params);
        return $this->_getResponse($results);
    }

    /**
     * Gets billing charges for an organization.
     *
     * @param integer $id
     * @param integer $page Page number of results to retrieve - defaults to 1
     *
     * @return array|bool
     */
    public function getOrganizationBillingCharges($id, $page = 1)
    {
        $params = array();
        $params['page'] = $page;

        $results = $this->call('GET', '/organizations/' . intval($id) . '/billing-charges', $params);
        return $this->_getResponse($results);
    }

    /**
     * Gets email domains for an organization.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getOrganizationEmailDomains($id)
    {
        $params = array();

        $results = $this->call('GET', '/organizations/' . intval($id) . '/email-domains', $params);
        return $this->_getResponse($results);
    }

    /**
     * Add email domain for an organization.
     *
     * @param integer $id
     * @param string $domain
     *
     * @return array|bool
     */
    public function addOrganizationEmailDomains($id, $domain)
    {
        $params = array();
        $params['domain'] = $domain;

        $results = $this->call('POST', '/organizations/' . intval($id) . '/email-domains', $params);
        return $this->_getResponse($results);
    }

    /**
     * Determines if email domain exists for an organization.
     *
     * @param integer $id
     * @param string $domain
     *
     * @return bool
     */
    public function getOrganizationEmailDomain($id, $domain)
    {
        $results = $this->call('GET', '/organizations/' . intval($id) . '/email-domains/' . $domain);
        return $this->_getExistsResponse($results);
    }

    /**
     * Deletes an email domain for an organization.
     *
     * @param integer $id
     * @param string $domain
     * @param boolean $remove_users True to remove users from this domain from the organization
     *
     * @return bool
     */
    public function deleteOrganizationEmailDomain($id, $domain, $remove_users = false)
    {
        $params = array(
            'remove_users' => ($remove_users ? 1 : 0)
        );
        $results = $this->call('DELETE', '/organizations/' . intval($id) . '/email-domains/' . $domain, $params);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Moves email domain users for an organization if they have no organization.
     *
     * @param integer $id
     * @param string $domain
     *
     * @return bool
     */
    public function moveOrganizationEmailDomainUsers($id, $domain)
    {
        $results = $this->call('POST', '/organizations/' . intval($id) . '/email-domains/' . $domain . '/move-users');
        return $this->_getSuccessResponse($results);
    }

    /**
     * Moves email domain users for an organization if they have an organization.
     *
     * @param integer $id
     * @param string $domain
     *
     * @return bool
     */
    public function moveOrganizationEmailDomainTakenUsers($id, $domain)
    {
        $results = $this->call('POST', '/organizations/' . intval($id) . '/email-domains/' . $domain . '/move-taken-users');
        return $this->_getSuccessResponse($results);
    }

    /**
     * Get the picture for an organization
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getOrganizationPicture($id)
    {
        return $this->call('GET', '/organizations/' . intval($id) . '/picture');
        return $this->_getResponse($results);
    }

    /**
     * Set the picture of an organization
     *
     * @param integer $id
     * @param DpApiFileUpload|string|null $file File to upload
     * @param integer|null $blob_id Existing attachment ID (blob ID), possibly from uploadFile()
     *
     * @return bool
     */
    public function setOrganizationPicture($id, $file = null, $blob_id = null)
    {
        if ($blob_id) {
            $params = array('blob_id' => $blob_id);
        } else if ($file) {
            $params = array('file' => $file);
        } else {
            $params = array();
        }

        $params = $this->_enforceFileUploadIsset($params, 'file');

        return $this->call('POST', '/organizations/' . intval($id) . '/picture', $params);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Delete the picture of an organization
     *
     * @param integer $id
     *
     * @return bool
     */
    public function deleteOrganizationPicture($id)
    {
        return $this->call('DELETE', '/organizations/' . intval($id) . '/picture');
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets all SLAs for an organization.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getOrganizationSlas($id)
    {
        return $this->call('GET', '/organizations/' . intval($id) . '/slas');
        return $this->_getResponse($results);
    }

    /**
     * Adds an SLA for an organization.
     *
     * @param integer $id
     * @param integer $sla_id
     *
     * @return array|bool
     */
    public function addOrganizationSla($id, $sla_id)
    {
        $params = array('sla_id' => $sla_id);
        return $this->call('POST', '/organizations/' . intval($id) . '/slas', $params);
        return $this->_getResponse($results);
    }

    /**
     * Determines if an organization has a particular SLA
     *
     * @param integer $org_id
     * @param integer $sla_id
     *
     * @return bool
     */
    public function getOrganizationSla($org_id, $sla_id)
    {
        return $this->call('GET', '/organizations/' . intval($org_id) . '/slas/' . intval($sla_id));
        return $this->_getExistsResponse($results);
    }

    /**
     * Deletes an SLA for an organization.
     *
     * @param integer $org_id
     * @param integer $sla_id
     *
     * @return bool
     */
    public function deleteOrganizationSla($org_id, $sla_id)
    {
        return $this->call('DELETE', '/organizations/' . intval($org_id) . '/slas/' . intval($sla_id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets all contact details for an organization.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getOrganizationContactDetails($id)
    {
        return $this->call('GET', '/organizations/' . intval($id) . '/contact-details');
        return $this->_getResponse($results);
    }

    /**
     * Adds a contact detail for an organization.
     *
     * @param integer $id
     * @param string $type Type of contact detail
     * @param array $data Type-specific contact data
     * @param string $comment
     *
     * @return array|bool
     */
    public function addOrganizationContactDetail($id, $type, array $data, $comment = '')
    {
        $params = array(
            'type' => $type,
            'data' => $data,
            'comment' => $comment
        );
        $results = $this->call('POST', '/organizations/' . intval($id) . '/contact-details', $params);
        return $this->_getResponse($results);
    }

    /**
     * Determines if a particular contact ID exists for an organization.
     *
     * @param integer $organization_id
     * @param integer $contact_id
     *
     * @return bool
     */
    public function getOrganizationContactDetail($organization_id, $contact_id)
    {
        return $this->call('GET', '/organizations/' . intval($organization_id) . '/contact-details/' . intval($contact_id));
        return $this->_getExistsResponse($results);
    }

    /**
     * Removes a particular contact detail from an organization.
     *
     * @param integer $organization_id
     * @param integer $contact_id
     *
     * @return bool
     */
    public function removeOrganizationContactDetail($organization_id, $contact_id)
    {
        return $this->call('DELETE', '/organizations/' . intval($organization_id) . '/contact-details/' . intval($contact_id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets the list of groups that the organization belongs to.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getOrganizationGroups($id)
    {
        return $this->call('GET', '/organizations/' . intval($id) . '/groups');
        return $this->_getResponse($results);
    }

    /**
     * Adds an organization to a group
     *
     * @param integer $organization_id
     * @param integer $group_id
     *
     * @return array|bool
     */
    public function addOrganizationGroup($organization_id, $group_id)
    {
        return $this->call('POST', '/organizations/' . intval($organization_id) . '/groups', array('id' => $group_id));
        return $this->_getResponse($results);
    }

    /**
     * Determines if the an organization is a member of a particular group.
     *
     * @param integer $organization_id
     * @param integer $group_id
     *
     * @return bool
     */
    public function getOrganizationGroup($organization_id, $group_id)
    {
        return $this->call('GET', '/organizations/' . intval($organization_id) . '/groups/' . intval($group_id));
        return $this->_getExistsResponse($results);
    }

    /**
     * Removes an organization from a group.
     *
     * @param integer $organization_id
     * @param integer $group_id
     *
     * @return bool
     */
    public function removeOrganizationGroup($organization_id, $group_id)
    {
        return $this->call('DELETE', '/organizations/' . intval($organization_id) . '/groups/' . intval($group_id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets all labels associated with an organization.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getOrganizationLabels($id)
    {
        return $this->call('GET', '/organizations/' . intval($id) . '/labels');
        return $this->_getResponse($results);
    }

    /**
     * Adds a label to an organization.
     *
     * @param integer $id
     * @param string $label
     *
     * @return array|bool
     */
    public function addOrganizationLabel($id, $label)
    {
        return $this->call('POST', '/organizations/' . intval($id) . '/labels', array('label' => $label));
        return $this->_getResponse($results);
    }

    /**
     * Determines if an organization has a specific label.
     *
     * @param integer $id
     * @param string $label
     *
     * @return bool
     */
    public function getOrganizationLabel($id, $label)
    {
        return $this->call('GET', '/organizations/' . intval($id) . '/labels/' . $label);
        return $this->_getExistsResponse($results);
    }

    /**
     * Removes a label from an organization.
     *
     * @param integer $id
     * @param string $label
     *
     * @return bool
     */
    public function removeOrganizationLabel($id, $label)
    {
        return $this->call('DELETE', '/organizations/' . intval($id) . '/labels/' . $label);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets a list of custom organizations fields.
     *
     * @return array|bool
     */
    public function getOrganizationsFields()
    {
        return $this->call('GET', '/organizations/fields');
        return $this->_getResponse($results);
    }

    /**
     * Gets a list of available user groups.
     *
     * @return array|bool
     */
    public function getOrganizationsGroups()
    {
        return $this->call('GET', '/organizations/groups');
        return $this->_getResponse($results);
    }

    // ################### PEOPLE ACTIONS ####################

    /**
     * Finds people matching the criteria
     *
     * @param array $criteria
     * @param integer $page Page number of results to retrieve - defaults to 1
     * @param null|string $order Order of results (if not specified, uses API default)
     * @param null|integer $cache_id If specified, uses the cached results from this set if possible.
     *
     * @return array|bool
     */
    public function findPeople(array $criteria, $page = 1, $order = null, $cache_id = null)
    {
        $criteria['page'] = $page;
        if ($order !== null) {
            $criteria['order'] = $order;
        }
        if ($cache_id !== null) {
            $criteria['cache_id'] = $cache_id;
        }

        return $this->call('GET', '/people', $criteria);
        return $this->_getResponse($results);
    }

    /**
     * Creates a person with the given data.
     *
     * @param array $info
     *
     * @return array|bool
     */
    public function createPerson(array $info)
    {
        return $this->call('POST', '/people', $info);
        return $this->_getResponse($results);
    }

    /**
     * Gets information about the given person.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getPerson($id)
    {
        return $this->call('GET', '/people/' . intval($id));
        return $this->_getResponse($results);
    }

    /**
     * Updates information about the given person.
     *
     * @param integer $id
     * @param array $info
     *
     * @return bool
     */
    public function updatePerson($id, array $info)
    {
        return $this->call('POST', '/people/' . intval($id), $info);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Deletes the given person.
     *
     * @param integer $id
     *
     * @return bool
     */
    public function deletePerson($id)
    {
        return $this->call('DELETE', '/people/' . intval($id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Merges two people.
     *
     * @param integer $target The person that the other will be merged into
     * @param integer $from This person will be removed on a successful merge
     *
     * @return bool
     */
    public function mergePeople($target, $from)
    {
        $results = $this->call('POST', '/people/' . intval($target) . '/merge/' . intval($from));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Resets a person's password.
     *
     * @param integer $id
     * @param string $password
     * @param bool $send_email
     *
     * @return bool
     */
    public function resetPersonPassword($id, $password, $send_email = true)
    {
        $params = array(
            'password' => $password,
            'send_email' => $send_email ? 1 : 0
        );

        $results = $this->call('POST', '/people/' . intval($id) . '/reset-password', $params);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets tickets for a person.
     *
     * @param integer $id
     * @param integer $page Page number of results to retrieve - defaults to 1
     * @param null|string $order Order of results (if not specified, uses API default)
     * @param null|integer $cache_id If specified, uses the cached results from this set if possible.
     *
     * @return array|bool
     */
    public function getPersonTickets($id, $page = 1, $order = null, $cache_id = null)
    {
        $params = array();
        $params['page'] = $page;
        if ($order !== null) {
            $params['order'] = $order;
        }
        if ($cache_id !== null) {
            $params['cache'] = $cache_id;
        }

        return $this->call('GET', '/people/' . intval($id) . '/tickets', $params);
        return $this->_getResponse($results);
    }

    /**
     * Gets chats for a person.
     *
     * @param integer $id
     * @param integer $page Page number of results to retrieve - defaults to 1
     * @param null|string $order Order of results - this is currently not used by the API!
     * @param null|integer $cache_id If specified, uses the cached results from this set if possible.
     *
     * @return array|bool
     */
    public function getPersonChats($id, $page = 1, $order = null, $cache_id = null)
    {
        $params = array();
        $params['page'] = $page;
        if ($order !== null) {
            $params['order'] = $order;
        }
        if ($cache_id !== null) {
            $params['cache'] = $cache_id;
        }

        return $this->call('GET', '/people/' . intval($id) . '/chats', $params);
        return $this->_getResponse($results);
    }

    /**
     * Gets activity stream for a person.
     *
     * @param integer $id
     * @param integer $page Page number of results to retrieve - defaults to 1
     *
     * @return array|bool
     */
    public function getPersonActivityStream($id, $page = 1)
    {
        $params = array();
        $params['page'] = $page;

        return $this->call('GET', '/people/' . intval($id) . '/activity-stream', $params);
        return $this->_getResponse($results);
    }

    /**
     * Gets notes for a person.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getPersonNotes($id)
    {
        return $this->call('GET', '/people/' . intval($id) . '/notes');
        return $this->_getResponse($results);
    }

    /**
     * Creates a note for a person.
     *
     * @param integer $id
     * @param string $note
     *
     * @return array|bool
     */
    public function createPersonNote($id, $note)
    {
        return $this->call('POST', '/people/' . intval($id) . '/notes', array('note' => $note));
        return $this->_getResponse($results);
    }

    /**
     * Gets billing charges for a person.
     *
     * @param integer $id
     * @param integer $page Page number of results to retrieve - defaults to 1
     *
     * @return array|bool
     */
    public function getPersonBillingCharges($id, $page = 1)
    {
        $params = array();
        $params['page'] = $page;

        return $this->call('GET', '/people/' . intval($id) . '/billing-charges', $params);
        return $this->_getResponse($results);
    }

    /**
     * Get the picture for a person
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getPersonPicture($id)
    {
        return $this->call('GET', '/people/' . intval($id) . '/picture');
        return $this->_getResponse($results);
    }

    /**
     * Set the picture of a person
     *
     * @param integer $id
     * @param DpApiFileUpload|string|null $file File to upload
     * @param integer|null $blob_id Existing attachment ID (blob ID), possibly from uploadFile()
     *
     * @return bool
     */
    public function setPersonPicture($id, $file = null, $blob_id = null)
    {
        if ($blob_id) {
            $params = array('blob_id' => $blob_id);
        } else if ($file) {
            $params = array('file' => $file);
        } else {
            $params = array();
        }

        $params = $this->_enforceFileUploadIsset($params, 'file');

        return $this->call('POST', '/people/' . intval($id) . '/picture', $params);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Delete the picture of a person
     *
     * @param integer $id
     *
     * @return bool
     */
    public function deletePersonPicture($id)
    {
        return $this->call('DELETE', '/people/' . intval($id) . '/picture');
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets all SLAs for a person.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getPersonSlas($id)
    {
        return $this->call('GET', '/people/' . intval($id) . '/slas');
        return $this->_getResponse($results);
    }

    /**
     * Adds an SLA for a person.
     *
     * @param integer $id
     * @param integer $sla_id
     *
     * @return array|bool
     */
    public function addPersonSla($id, $sla_id)
    {
        $params = array('sla_id' => $sla_id);
        return $this->call('POST', '/people/' . intval($id) . '/slas', $params);
        return $this->_getResponse($results);
    }

    /**
     * Determines if a person has a particular SLA
     *
     * @param integer $person_id
     * @param integer $sla_id
     *
     * @return bool
     */
    public function getPersonSla($person_id, $sla_id)
    {
        return $this->call('GET', '/people/' . intval($person_id) . '/slas/' . intval($sla_id));
        return $this->_getExistsResponse($results);
    }

    /**
     * Deletes a particular SLA for a person.
     *
     * @param integer $person_id
     * @param integer $sla_id
     *
     * @return bool
     */
    public function deletePersonSla($person_id, $sla_id)
    {
        return $this->call('DELETE', '/people/' . intval($person_id) . '/emails/' . intval($sla_id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets all emails for a person.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getPersonEmails($id)
    {
        return $this->call('GET', '/people/' . intval($id) . '/emails');
        return $this->_getResponse($results);
    }

    /**
     * Adds an email for a person.
     *
     * @param integer $id
     * @param string $email
     * @param array $params
     *
     * @return array|bool
     */
    public function addPersonEmail($id, $email, array $params = array())
    {
        $params['email'] = $email;
        return $this->call('POST', '/people/' . intval($id) . '/emails', $params);
        return $this->_getResponse($results);
    }

    /**
     * Gets information about a particular email ID for a person.
     *
     * @param integer $person_id
     * @param integer $email_id
     *
     * @return array|bool
     */
    public function getPersonEmail($person_id, $email_id)
    {
        return $this->call('GET', '/people/' . intval($person_id) . '/emails/' . intval($email_id));
        return $this->_getResponse($results);
    }

    /**
     * Updates a particular email ID for a person.
     *
     * @param integer $person_id
     * @param integer $email_id
     * @param array $params
     *
     * @return bool
     */
    public function updatePersonEmail($person_id, $email_id, array $params)
    {
        return $this->call('POST', '/people/' . intval($person_id) . '/emails/' . intval($email_id), $params);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Deletes a particular email ID for a person.
     *
     * @param integer $person_id
     * @param integer $email_id
     *
     * @return bool
     */
    public function deletePersonEmail($person_id, $email_id)
    {
        return $this->call('DELETE', '/people/' . intval($person_id) . '/emails/' . intval($email_id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets all contact details for a person.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getPersonContactDetails($id)
    {
        return $this->call('GET', '/people/' . intval($id) . '/contact-details');
        return $this->_getResponse($results);
    }

    /**
     * Adds a contact detail for a person.
     *
     * @param integer $id
     * @param string $type Type of contact detail
     * @param array $data Type-specific contact data
     * @param string $comment
     *
     * @return array|bool
     */
    public function addPersonContactDetail($id, $type, array $data, $comment = '')
    {
        $params = array(
            'type' => $type,
            'data' => $data,
            'comment' => $comment
        );
        return $this->call('POST', '/people/' . intval($id) . '/contact-details', $params);
        return $this->_getResponse($results);
    }

    /**
     * Determines if a particular contact ID exists for a person.
     *
     * @param integer $person_id
     * @param integer $contact_id
     *
     * @return bool
     */
    public function getPersonContactDetail($person_id, $contact_id)
    {
        return $this->call('GET', '/people/' . intval($person_id) . '/contact-details/' . intval($contact_id));
        return $this->_getExistsResponse($results);
    }

    /**
     * Removes a particular contact detail from a person.
     *
     * @param integer $person_id
     * @param integer $contact_id
     *
     * @return bool
     */
    public function removePersonContactDetail($person_id, $contact_id)
    {
        return $this->call('DELETE', '/people/' . intval($person_id) . '/contact-details/' . intval($contact_id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets the list of groups that the person belongs to.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getPersonGroups($id)
    {
        return $this->call('GET', '/people/' . intval($id) . '/groups');
        return $this->_getResponse($results);
    }

    /**
     * Adds a person to a group
     *
     * @param integer $person_id
     * @param integer $group_id
     *
     * @return array|bool
     */
    public function addPersonGroup($person_id, $group_id)
    {
        return $this->call('POST', '/people/' . intval($person_id) . '/groups', array('id' => $group_id));
        return $this->_getResponse($results);
    }

    /**
     * Determines if the a person is a member of a particular group.
     *
     * @param integer $person_id
     * @param integer $group_id
     *
     * @return bool
     */
    public function getPersonGroup($person_id, $group_id)
    {
        return $this->call('GET', '/people/' . intval($person_id) . '/groups/' . intval($group_id));
        return $this->_getExistsResponse($results);
    }

    /**
     * Removes a person from a group.
     *
     * @param integer $person_id
     * @param integer $group_id
     *
     * @return bool
     */
    public function removePersonGroup($person_id, $group_id)
    {
        return $this->call('DELETE', '/people/' . intval($person_id) . '/groups/' . intval($group_id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets all labels associated with a person.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getPersonLabels($id)
    {
        return $this->call('GET', '/people/' . intval($id) . '/labels');
        return $this->_getResponse($results);
    }

    /**
     * Adds a label to a person.
     *
     * @param integer $id
     * @param string $label
     *
     * @return array|bool
     */
    public function addPersonLabel($id, $label)
    {
        return $this->call('POST', '/people/' . intval($id) . '/labels', array('label' => $label));
        return $this->_getResponse($results);
    }

    /**
     * Determines if a person has a specific label.
     *
     * @param integer $id
     * @param string $label
     *
     * @return bool
     */
    public function getPersonLabel($id, $label)
    {
        return $this->call('GET', '/people/' . intval($id) . '/labels/' . $label);
        return $this->_getExistsResponse($results);
    }

    /**
     * Removes a label from a person.
     *
     * @param integer $id
     * @param string $label
     *
     * @return bool
     */
    public function removePersonLabel($id, $label)
    {
        return $this->call('DELETE', '/people/' . intval($id) . '/labels/' . $label);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets a list of custom people fields.
     *
     * @return array|bool
     */
    public function getPeopleFields()
    {
        return $this->call('GET', '/people/fields');
        return $this->_getResponse($results);
    }

    /**
     * Gets a list of available user groups.
     *
     * @return array|bool
     */
    public function getPeopleGroups()
    {
        return $this->call('GET', '/people/groups');
        return $this->_getResponse($results);
    }

    // ################### TICKET ACTIONS ####################

    /**
     * Finds tickets matching the criteria
     *
     * @param array $criteria
     * @param int $page Page number of results to retrieve - defaults to 1
     * @param null|string $order Order of results (if not specified, uses API default)
     * @param null|integer $cache_id If specified, uses the cached results from this set if possible.
     *
     * @return array|bool
     */
    public function findTickets(array $criteria, $page = 1, $order = null, $cache_id = null)
    {
        $criteria['page'] = $page;
        if ($order !== null) {
            $criteria['order'] = $order;
        }
        if ($cache_id !== null) {
            $criteria['cache_id'] = $cache_id;
        }

        $results = $this->call('GET', '/tickets', $criteria);
        return $this->_getResponse($results);
    }

    /**
     * Creates a ticket
     *
     * @param array $info
     *
     * @return array|bool
     */
    public function createTicket(array $info)
    {
        $info = $this->_enforceFileUploadIsset($info, 'attach', true);

        $results = $this->call('POST', '/tickets', $info);
        return $this->_getResponse($results);
    }

    /**
     * Gets information about a ticket
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getTicket($id)
    {
        $results = $this->call('GET', '/tickets/' . intval($id));
        return $this->_getResponse($results);
    }

    /**
     * Updates information for a ticket
     *
     * @param integer $id
     * @param array $info
     *
     * @return bool
     */
    public function updateTicket($id, array $info)
    {
        $results = $this->call('POST', '/tickets/' . intval($id), $info);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Deletes a ticket
     *
     * @param integer $id
     * @param bool $ban If true, bans the emails used by the person creating the ticket
     *
     * @return bool
     */
    public function deleteTicket($id, $ban = false)
    {
        $results = $this->call('DELETE', '/tickets/' . intval($id), array('ban' => ($ban ? 1 : 0)));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Undeletes a ticket
     *
     * @param integer $id
     *
     * @return bool
     */
    public function undeleteTicket($id)
    {
        $results = $this->call('POST', '/tickets/' . intval($id) . '/undelete');
        return $this->_getSuccessResponse($results);
    }

    /**
     * Marks a ticket as spam.
     *
     * @param integer $id
     * @param bool $ban
     *
     * @return bool
     */
    public function markTicketAsSpam($id, $ban = false)
    {
        $results = $this->call('POST', '/tickets/' . intval($id) . '/spam', array('ban' => ($ban ? 1 : 0)));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Unmarks a ticket as spam.
     *
     * @param integer $id
     *
     * @return bool
     */
    public function unmarkTicketAsSpam($id)
    {
        $results = $this->call('POST', '/tickets/' . intval($id) . '/unspam');
        return $this->_getSuccessResponse($results);
    }

    /**
     * Assigns a ticket to the user the API key is associated with.
     *
     * @param integer $id
     *
     * @return bool
     */
    public function claimTicket($id)
    {
        $results = $this->call('POST', '/tickets/' . intval($id) . '/claim');
        return $this->_getSuccessResponse($results);
    }

    /**
     * Locks a ticket.
     *
     * @param integer $id
     *
     * @return bool
     */
    public function lockTicket($id)
    {
        $results = $this->call('POST', '/tickets/' . intval($id) . '/lock');
        return $this->_getSuccessResponse($results);
    }

    /**
     * Unlocks a ticket.
     *
     * @param integer $id
     *
     * @return bool
     */
    public function unlockTicket($id)
    {
        $results = $this->call('POST', '/tickets/' . intval($id) . '/unlock');
        return $this->_getSuccessResponse($results);
    }

    /**
     * Merges two tickets.
     *
     * @param integer $target The ticket that the other will be merged into
     * @param integer $from This ticket will be removed on a successful merge
     *
     * @return bool
     */
    public function mergeTickets($target, $from)
    {
        $results = $this->call('POST', '/tickets/' . intval($target) . '/merge/' . intval($from));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Splits 1 or more messages out of a ticket into a new ticket
     *
     * @param integer $ticket_id Ticket to split from
     * @param array $message_ids Message IDs to split out
     * @param string $subject Subject of new ticket
     *
     * @return bool
     */
    public function splitTicketMessages($ticket_id, array $message_ids, $subject = '')
    {
        $params = array(
            'message_ids' => $message_ids,
            'subject' => $subject
        );
        $results = $this->call('POST', '/tickets/' . intval($ticket_id) . '/split', $params);
        return $this->_getResponse($results);
    }

    /**
     * Gets all logs in a ticket.
     *
     * @param integer $ticket_id
     *
     * @return array|bool
     */
    public function getTicketLogs($ticket_id)
    {
        $results = $this->call('GET', '/tickets/' . intval($ticket_id) . '/logs');
        return $this->_getResponse($results);
    }

    /**
     * Gets all messages in a ticket.
     *
     * @param integer $ticket_id
     *
     * @return array|bool
     */
    public function getTicketMessages($ticket_id)
    {
        $results = $this->call('GET', '/tickets/' . intval($ticket_id) . '/messages');
        return $this->_getResponse($results);
    }

    /**
     * Creates a new ticket message in a ticket.
     *
     * @param integer $ticket_id
     * @param string $message
     * @param array $extra
     *
     * @return array|bool
     */
    public function createTicketMessage($ticket_id, $message, array $extra = array())
    {
        $extra['message'] = $message;

        $extra = $this->_enforceFileUploadIsset($extra, 'attach', true);

        $results = $this->call('POST', '/tickets/' . intval($ticket_id) . '/messages', $extra);
        return $this->_getResponse($results);
    }

    /**
     * Gets a ticket message.
     *
     * @param integer $ticket_id
     * @param integer $message_id
     *
     * @return array|bool
     */
    public function getTicketMessage($ticket_id, $message_id)
    {
        $results = $this->call('GET', '/tickets/' . intval($ticket_id) . '/messages/' . intval($message_id));
        return $this->_getResponse($results);
    }

    /**
     * Gets a ticket message's details.
     *
     * @param integer $ticket_id
     * @param integer $message_id
     *
     * @return array|bool
     */
    public function getTicketMessageDetails($ticket_id, $message_id)
    {
        $results = $this->call('GET', '/tickets/' . intval($ticket_id) . '/messages/' . intval($message_id) . '/details');
        return $this->_getResponse($results);
    }

    /**
     * Gets ticket tasks.
     *
     * @param integer $id
     *
     * @return bool
     */
    public function getTicketTasks($id)
    {
        $results = $this->call('GET', '/tickets/' . intval($id) . '/tasks');
        return $this->_getSuccessResponse($results);
    }

    /**
     * Adds a ticket task.
     *
     * @param integer $id
     * @param string $title
     *
     * @return bool
     */
    public function addTicketTask($id, $title)
    {
        $params = array('title' => $title);
        $results = $this->call('POST', '/tickets/' . intval($id) . '/tasks', $params);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets ticket SLAs.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getTicketSlas($id)
    {
        $results = $this->call('GET', '/tickets/' . intval($id) . '/slas');
        return $this->_getResponse($results);
    }

    /**
     * Add an SLA to a ticket.
     *
     * @param integer $id
     * @param integer $sla_id
     *
     * @return array|bool
     */
    public function addTicketSla($id, $sla_id)
    {
        $params = array('sla_id' => $sla_id);
        $results = $this->call('POST', '/tickets/' . intval($id) . '/slas', $params);
        return $this->_getResponse($results);
    }

    /**
     * Returns whether a ticket SLA is associated with the ticket.
     *
     * @param integer $ticket_id
     * @param integer $ticket_sla_id Note, this differs from sla_id
     *
     * @return bool
     */
    public function getTicketSla($ticket_id, $ticket_sla_id)
    {
        $results = $this->call('GET', '/tickets/' . intval($ticket_id) . '/slas/' . intval($ticket_sla_id));
        return $this->_getExistsResponse($results);
    }

    /**
     * Deletes a ticket SLA from a ticket.
     *
     * @param integer $ticket_id
     * @param integer $ticket_sla_id Note, this differs from sla_id
     *
     * @return bool
     */
    public function deleteTicketSla($ticket_id, $ticket_sla_id)
    {
        $results = $this->call('DELETE', '/tickets/' . intval($ticket_id) . '/slas/' . intval($ticket_sla_id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets ticket billing charges.
     *
     * @param integer $id
     *
     * @return bool
     */
    public function getTicketBillingCharges($id)
    {
        $results = $this->call('GET', '/tickets/' . intval($id) . '/billing-charges');
        return $this->_getSuccessResponse($results);
    }

    /**
     * Adds a ticket billing charge.
     *
     * @param integer $id
     * @param integer $time Time in seconds to bill
     * @param float $amount Amount in admin-specified currency to bill
     * @param string $comment
     *
     * @return bool
     */
    public function addTicketBillingCharge($id, $time, $amount = 0.0, $comment = '')
    {
        $params = array(
            'time' => $time,
            'amount' => $amount,
            'comment' => $comment
        );
        $results = $this->call('POST', '/tickets/' . intval($id) . '/billing-charges', $params);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Returns whether a charge is associated with the ticket.
     *
     * @param integer $ticket_id
     * @param integer $charge_id
     *
     * @return bool
     */
    public function getTicketBillingCharge($ticket_id, $charge_id)
    {
        $results = $this->call('GET', '/tickets/' . intval($ticket_id) . '/billing-charges/' . intval($charge_id));
        return $this->_getExistsResponse($results);
    }

    /**
     * Removes a billing charge from a ticket.
     *
     * @param integer $ticket_id
     * @param integer $charge_id
     *
     * @return bool
     */
    public function deleteTicketBillingCharge($ticket_id, $charge_id)
    {
        $results = $this->call('DELETE', '/tickets/' . intval($ticket_id) . '/billing-charges/' . intval($charge_id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets all participants (CC'd users) in a ticket.
     *
     * @param integer $ticket_id
     *
     * @return array|bool
     */
    public function getTicketParticipants($ticket_id)
    {
        $results = $this->call('GET', '/tickets/' . intval($ticket_id) . '/participants');
        return $this->_getResponse($results);
    }

    /**
     * Adds a ticket participant.
     *
     * @param integer $ticket_id
     * @param integer|null $person_id If non-null, the ID of the person to add
     * @param string|null $email If non-null (and person_id is null), adds the specified email as a participant. A person will be created if needed.
     *
     * @return array|bool
     */
    public function addTicketParticipant($ticket_id, $person_id = null, $email = null)
    {
        $params = array();
        if ($person_id) {
            $params['person_id'] = $person_id;
        }
        if ($email) {
            $params['email'] = $email;
        }

        $results = $this->call('POST', '/tickets/' . intval($ticket_id) . '/participants', $params);
        return $this->_getResponse($results);
    }

    /**
     * Returns whether a person is a participant (CC user) in a ticket.
     *
     * @param integer $ticket_id
     * @param integer $person_id
     *
     * @return bool
     */
    public function getTicketParticipant($ticket_id, $person_id)
    {
        $results = $this->call('GET', '/tickets/' . intval($ticket_id) . '/participants/' . intval($person_id));
        return $this->_getExistsResponse($results);
    }

    /**
     * Removes a participant from a ticket.
     *
     * @param integer $ticket_id
     * @param integer $person_id
     *
     * @return bool
     */
    public function removeTicketParticipant($ticket_id, $person_id)
    {
        $results = $this->call('DELETE', '/tickets/' . intval($ticket_id) . '/participants/' . intval($person_id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets all labels associated with a ticket.
     *
     * @param integer $ticket_id
     *
     * @return array|bool
     */
    public function getTicketLabels($ticket_id)
    {
        $results = $this->call('GET', '/tickets/' . intval($ticket_id) . '/labels');
        return $this->_getResponse($results);
    }

    /**
     * Adds a label to a ticket.
     *
     * @param integer $ticket_id
     * @param string $label
     *
     * @return array|bool
     */
    public function addTicketLabel($ticket_id, $label)
    {
        $results = $this->call('POST', '/tickets/' . intval($ticket_id) . '/labels', array('label' => $label));
        return $this->_getResponse($results);
    }

    /**
     * Determines if a ticket has a specific label.
     *
     * @param integer $ticket_id
     * @param string $label
     *
     * @return bool
     */
    public function getTicketLabel($ticket_id, $label)
    {
        $results = $this->call('GET', '/tickets/' . intval($ticket_id) . '/labels/' . $label);
        return $this->_getExistsResponse($results);
    }

    /**
     * Removes a label from a ticket.
     *
     * @param integer $ticket_id
     * @param string $label
     *
     * @return bool
     */
    public function removeTicketLabel($ticket_id, $label)
    {
        $results = $this->call('DELETE', '/tickets/' . intval($ticket_id) . '/labels/' . $label);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets a list of custom ticket fields.
     *
     * @return array|bool
     */
    public function getTicketsFields()
    {
        $results = $this->call('GET', '/tickets/fields');
        return $this->_getResponse($results);
    }

    /**
     * Gets a list of ticket departments.
     *
     * @return array|bool
     */
    public function getTicketsDepartments()
    {
        $results = $this->call('GET', '/tickets/departments');
        return $this->_getResponse($results);
    }

    /**
     * Gets a list of products.
     *
     * @return array|bool
     */
    public function getTicketsProducts()
    {
        $results = $this->call('GET', '/tickets/products');
        return $this->_getResponse($results);
    }

    /**
     * Gets a list of ticket categories.
     *
     * @return array|bool
     */
    public function getTicketsCategories()
    {
        $results = $this->call('GET', '/tickets/categories');
        return $this->_getResponse($results);
    }

    /**
     * Gets a list of ticket priorities.
     *
     * @return array|bool
     */
    public function getTicketsPriorities()
    {
        $results = $this->call('GET', '/tickets/priorities');
        return $this->_getResponse($results);
    }

    /**
     * Gets a list of ticket workflows.
     *
     * @return array|bool
     */
    public function getTicketsWorkflows()
    {
        $results = $this->call('GET', '/tickets/workflows');
        return $this->_getResponse($results);
    }

    /**
     * Gets a list of SLAs.
     *
     * @return array|bool
     */
    public function getSlas()
    {
        $results = $this->call('GET', '/tickets/slas');
        return $this->_getResponse($results);
    }

    /**
     * Gets an SLA
     *
     * @param integer $sla_id
     *
     * @return array|bool
     */
    public function getSla($sla_id)
    {
        $results = $this->call('GET', '/tickets/slas/' . intval($sla_id));
        return $this->_getResponse($results);
    }

    /**
     * Gets people that receive an SLA automatically
     *
     * @param integer $sla_id
     *
     * @return array|bool
     */
    public function getSlaPeople($sla_id)
    {
        $results = $this->call('GET', '/tickets/slas/' . intval($sla_id) . '/people');
        return $this->_getResponse($results);
    }

    /**
     * Gets organizations that receive an SLA automatically
     *
     * @param integer $sla_id
     *
     * @return array|bool
     */
    public function getSlaOrganizations($sla_id)
    {
        $results = $this->call('GET', '/tickets/slas/' . intval($sla_id) . '/organizations');
        return $this->_getResponse($results);
    }

    /**
     * Gets a list of ticket filters.
     *
     * @return array|bool
     */
    public function getTicketsFilters()
    {
        $results = $this->call('GET', '/tickets/filters');
        return $this->_getResponse($results);
    }

    /**
     * Runs the specified ticket filter and returns the results.
     *
     * @param integer $filter_id
     * @param integer $page Page number to retrieve results from
     *
     * @return array|bool
     */
    public function runTicketFilter($filter_id, $page = 1)
    {
        $params = array('page' => $page);
        $results = $this->call('GET', '/tickets/filters/' . intval($filter_id), $params);
        return $this->_getResponse($results);
    }

    // ################### CHAT ACTIONS ####################

    /**
     * Finds chats matching the criteria
     *
     * @param array $criteria
     * @param int $page Page number of results to retrieve - defaults to 1
     * @param null|string $order Order of results (if not specified, uses API default)
     * @param null|integer $cache_id If specified, uses the cached results from this set if possible.
     *
     * @return array|bool
     */
    public function findChats(array $criteria, $page = 1, $order = null, $cache_id = null)
    {
        $criteria['page'] = $page;
        if ($order !== null) {
            $criteria['order'] = $order;
        }
        if ($cache_id !== null) {
            $criteria['cache_id'] = $cache_id;
        }

        $results = $this->call('GET', '/chats', $criteria);
        return $this->_getResponse($results);
    }

    /**
     * Gets information about a chat
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getChat($id)
    {
        $results = $this->call('GET', '/chats/' . intval($id));
        return $this->_getResponse($results);
    }

    /**
     * Updates information for a chat
     *
     * @param integer $id
     * @param array $info
     *
     * @return bool
     */
    public function updateChat($id, array $info)
    {
        $results = $this->call('POST', '/chats/' . intval($id), $info);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Leave a chat.
     *
     * @param integer $id
     * @param string $action Additional action to take (empty, unassign, or end)
     *
     * @return bool
     */
    public function leaveChat($id, $action = '')
    {
        $params = array('action' => $action);
        $results = $this->call('POST', '/chats/' . intval($id) . '/leave', $params);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Ends a chat.
     *
     * @param integer $id
     *
     * @return bool
     */
    public function endChat($id)
    {
        $results = $this->call('POST', '/chats/' . intval($id) . '/end');
        return $this->_getSuccessResponse($results);
    }

    /**
     * Creates a new message in a chat.
     *
     * @param integer $chat_id
     * @param string $message
     *
     * @return array|bool
     */
    public function createChatMessage($chat_id, $message)
    {
        $params = array('message' => $message);

        $results = $this->call('POST', '/chats/' . intval($chat_id) . '/messages', $params);
        return $this->_getResponse($results);
    }

    /**
     * Gets all participants (CC'd users) in a chat.
     *
     * @param integer $chat_id
     *
     * @return array|bool
     */
    public function getChatParticipants($chat_id)
    {
        $results = $this->call('GET', '/chats/' . intval($chat_id) . '/participants');
        return $this->_getResponse($results);
    }

    /**
     * Adds a chat participant.
     *
     * @param integer $chat_id
     * @param integer $person_id
     *
     * @return array|bool
     */
    public function addChatParticipant($chat_id, $person_id)
    {
        $params = array();
        $params['person_id'] = $person_id;

        $results = $this->call('POST', '/chats/' . intval($chat_id) . '/participants', $params);
        return $this->_getResponse($results);
    }

    /**
     * Returns whether a person is a participant (CC user) in a chat.
     *
     * @param integer $chat_id
     * @param integer $person_id
     *
     * @return bool
     */
    public function getChatParticipant($chat_id, $person_id)
    {
        $results = $this->call('GET', '/chats/' . intval($chat_id) . '/participants/' . intval($person_id));
        return $this->_getExistsResponse($results);
    }

    /**
     * Removes a participant from a chat.
     *
     * @param integer $chat_id
     * @param integer $person_id
     *
     * @return bool
     */
    public function removeChatParticipant($chat_id, $person_id)
    {
        $results = $this->call('DELETE', '/chats/' . intval($chat_id) . '/participants/' . intval($person_id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets all labels associated with a chat.
     *
     * @param integer $chat_id
     *
     * @return array|bool
     */
    public function getChatLabels($chat_id)
    {
        $results = $this->call('GET', '/chats/' . intval($chat_id) . '/labels');
        return $this->_getResponse($results);
    }

    /**
     * Adds a label to a chat.
     *
     * @param integer $chat_id
     * @param string $label
     *
     * @return array|bool
     */
    public function addChatLabel($chat_id, $label)
    {
        $results = $this->call('POST', '/chats/' . intval($chat_id) . '/labels', array('label' => $label));
        return $this->_getResponse($results);
    }

    /**
     * Determines if a chat has a specific label.
     *
     * @param integer $chat_id
     * @param string $label
     *
     * @return bool
     */
    public function getChatLabel($chat_id, $label)
    {
        $results = $this->call('GET', '/chats/' . intval($chat_id) . '/labels/' . $label);
        return $this->_getExistsResponse($results);
    }

    /**
     * Removes a label from a chat.
     *
     * @param integer $chat_id
     * @param string $label
     *
     * @return bool
     */
    public function removeChatLabel($chat_id, $label)
    {
        $results = $this->call('DELETE', '/chats/' . intval($chat_id) . '/labels/' . $label);
        return $this->_getSuccessResponse($results);
    }

    // ################### NEWS ACTIONS ####################

    /**
     * Finds news matching the criteria
     *
     * @param array $criteria
     * @param integer $page Page number of results to retrieve - defaults to 1
     * @param null|string $order Order of results (if not specified, uses API default)
     * @param null|integer $cache_id If specified, uses the cached results from this set if possible.
     *
     * @return array|bool
     */
    public function findNews(array $criteria, $page = 1, $order = null, $cache_id = null)
    {
        $criteria['page'] = $page;
        if ($order !== null) {
            $criteria['order'] = $order;
        }
        if ($cache_id !== null) {
            $criteria['cache_id'] = $cache_id;
        }

        $results = $this->call('GET', '/news', $criteria);
        return $this->_getResponse($results);
    }

    /**
     * Creates a news post with the given data.
     *
     * @param array $info
     *
     * @return array|bool
     */
    public function createNews(array $info)
    {
        $results = $this->call('POST', '/news', $info);
        return $this->_getResponse($results);
    }

    /**
     * Gets information about the given news post.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getNews($id)
    {
        $results = $this->call('GET', '/news/' . intval($id));
        return $this->_getResponse($results);
    }

    /**
     * Updates information about the given news post.
     *
     * @param integer $id
     * @param array $info
     *
     * @return bool
     */
    public function updateNews($id, array $info)
    {
        $results = $this->call('POST', '/news/' . intval($id), $info);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Deletes the given news post.
     *
     * @param integer $id
     *
     * @return bool
     */
    public function deleteNews($id)
    {
        $results = $this->call('DELETE', '/news/' . intval($id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets all comments on a news entry.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getNewsComments($id)
    {
        $results = $this->call('GET', '/news/' . intval($id) . '/comments');
        return $this->_getResponse($results);
    }

    /**
     * Adds a comment to a news entry.
     *
     * @param integer $id
     * @param array $params
     *
     * @return array|bool
     */
    public function addNewsComment($id, array $params)
    {
        $results = $this->call('POST', '/news/' . intval($id) . '/comments', $params);
        return $this->_getResponse($results);
    }

    /**
     * Gets a comment on a news entry.
     *
     * @param integer $news_id
     * @param integer $comment_id
     *
     * @return array|bool
     */
    public function getNewsComment($news_id, $comment_id)
    {
        $results = $this->call('GET', '/news/' . intval($news_id) . '/comments/' . intval($comment_id));
        return $this->_getResponse($results);
    }

    /**
     * Updates a comment on a news entry.
     *
     * @param integer $news_id
     * @param integer $comment_id
     * @param array $params
     *
     * @return array|bool
     */
    public function updateNewsComment($news_id, $comment_id, array $params)
    {
        $results = $this->call('POST', '/news/' . intval($news_id) . '/comments/' . intval($comment_id), $params);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Deletes a comment on a news entry.
     *
     * @param integer $news_id
     * @param integer $comment_id
     *
     * @return array|bool
     */
    public function deleteNewsComment($news_id, $comment_id)
    {
        $results = $this->call('DELETE', '/news/' . intval($news_id) . '/comments/' . intval($comment_id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets all labels associated with a news post.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getNewsLabels($id)
    {
        $results = $this->call('GET', '/news/' . intval($id) . '/labels');
        return $this->_getResponse($results);
    }

    /**
     * Adds a label to a news post.
     *
     * @param integer $id
     * @param string $label
     *
     * @return array|bool
     */
    public function addNewsLabel($id, $label)
    {
        $results = $this->call('POST', '/news/' . intval($id) . '/labels', array('label' => $label));
        return $this->_getResponse($results);
    }

    /**
     * Determines if a news post has a specific label.
     *
     * @param integer $id
     * @param string $label
     *
     * @return bool
     */
    public function getNewsLabel($id, $label)
    {
        $results = $this->call('GET', '/news/' . intval($id) . '/labels/' . $label);
        return $this->_getExistsResponse($results);
    }

    /**
     * Removes a label from a news post.
     *
     * @param integer $id
     * @param string $label
     *
     * @return bool
     */
    public function removeNewsLabel($id, $label)
    {
        $results = $this->call('DELETE', '/news/' . intval($id) . '/labels/' . $label);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets a list of news comments awaiting validation.
     *
     * @return array|bool
     */
    public function getNewsValidatingComments()
    {
        $results = $this->call('GET', '/news/validating-comments');
        return $this->_getResponse($results);
    }

    /**
     * Gets a list of news categories.
     *
     * @return array|bool
     */
    public function getNewsCategories()
    {
        $results = $this->call('GET', '/news/categories');
        return $this->_getResponse($results);
    }

    /**
     * Creates a news category.
     *
     * @param array $params
     *
     * @return array|bool
     */
    public function createNewsCategory(array $params)
    {
        $results = $this->call('POST', '/news/categories', $params);
        return $this->_getResponse($results);
    }

    /**
     * Gets a news category.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getNewsCategory($id)
    {
        $results = $this->call('GET', '/news/categories/' . intval($id));
        return $this->_getResponse($results);
    }

    /**
     * Updates a news category.
     *
     * @param integer $id
     * @param array $params
     *
     * @return bool
     */
    public function updateNewsCategory($id, array $params)
    {
        $results = $this->call('POST', '/news/categories/' . intval($id), $params);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Deletes a news category.
     *
     * @param integer $id
     *
     * @return bool
     */
    public function deleteNewsCategory($id)
    {
        $results = $this->call('DELETE', '/news/categories/' . intval($id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets news in a news category.
     *
     * @param integer $id
     * @param integer $page Page number of results to retrieve - defaults to 1
     * @param null|string $order Order of results (if not specified, uses API default)
     * @param null|integer $cache_id If specified, uses the cached results from this set if possible.
     *
     * @return array|bool
     */
    public function getNewsCategoryNews($id, $page = 1, $order = null, $cache_id = null)
    {
        $params = array();
        $params['page'] = $page;
        if ($order !== null) {
            $params['order'] = $order;
        }
        if ($cache_id !== null) {
            $params['cache'] = $cache_id;
        }

        $results = $this->call('GET', '/news/categories/' . intval($id) . '/news', $params);
        return $this->_getResponse($results);
    }

    /**
     * Gets all groups that can access a news category
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getNewsCategoryGroups($id)
    {
        $results = $this->call('GET', '/news/categories/' . intval($id) . '/groups');
        return $this->_getResponse($results);
    }

    /**
     * Adds a group to a news category
     *
     * @param integer $category_id
     * @param integer $group_id
     *
     * @return array|bool
     */
    public function addNewsCategoryGroup($category_id, $group_id)
    {
        $params = array(
            'id' => $group_id
        );
        $results = $this->call('POST', '/news/categories/' . intval($category_id) . '/groups', $params);
        return $this->_getResponse($results);
    }

    /**
     * Determines if a particular group ID exists for a news category.
     *
     * @param integer $category_id
     * @param integer $group_id
     *
     * @return bool
     */
    public function getNewsCategoryGroup($category_id, $group_id)
    {
        $results = $this->call('GET', '/news/categories/' . intval($category_id) . '/groups/' . intval($group_id));
        return $this->_getExistsResponse($results);
    }

    /**
     * Removes a group's access to a news category
     *
     * @param integer $category_id
     * @param integer $group_id
     *
     * @return bool
     */
    public function deleteNewsCategoryGroup($category_id, $group_id)
    {
        $results = $this->call('DELETE', '/news/categories/' . intval($category_id) . '/groups/' . intval($group_id));
        return $this->_getSuccessResponse($results);
    }

    // ################### DOWNLOAD ACTIONS ####################

    /**
     * Finds downloads matching the criteria
     *
     * @param array $criteria
     * @param integer $page Page number of results to retrieve - defaults to 1
     * @param null|string $order Order of results (if not specified, uses API default)
     * @param null|integer $cache_id If specified, uses the cached results from this set if possible.
     *
     * @return array|bool
     */
    public function findDownloads(array $criteria, $page = 1, $order = null, $cache_id = null)
    {
        $criteria['page'] = $page;
        if ($order !== null) {
            $criteria['order'] = $order;
        }
        if ($cache_id !== null) {
            $criteria['cache_id'] = $cache_id;
        }

        $results = $this->call('GET', '/downloads', $criteria);
        return $this->_getResponse($results);
    }

    /**
     * Creates a download with the given data.
     *
     * @param array $info
     *
     * @return array|bool
     */
    public function createDownload(array $info)
    {
        $info = $this->_enforceFileUploadIsset($info, 'attach');

        $results = $this->call('POST', '/downloads', $info);
        return $this->_getResponse($results);
    }

    /**
     * Gets information about the given download.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getDownload($id)
    {
        $results = $this->call('GET', '/downloads/' . intval($id));
        return $this->_getResponse($results);
    }

    /**
     * Updates information about the given download.
     *
     * @param integer $id
     * @param array $info
     *
     * @return bool
     */
    public function updateDownload($id, array $info)
    {
        $info = $this->_enforceFileUploadIsset($info, 'attach');

        $results = $this->call('POST', '/downloads/' . intval($id), $info);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Deletes the given download.
     *
     * @param integer $id
     *
     * @return bool
     */
    public function deleteDownload($id)
    {
        $results = $this->call('DELETE', '/downloads/' . intval($id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets all comments on a download.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getDownloadComments($id)
    {
        $results = $this->call('GET', '/downloads/' . intval($id) . '/comments');
        return $this->_getResponse($results);
    }

    /**
     * Adds a comment to a download.
     *
     * @param integer $id
     * @param array $params
     *
     * @return array|bool
     */
    public function addDownloadComment($id, array $params)
    {
        $results = $this->call('POST', '/downloads/' . intval($id) . '/comments', $params);
        return $this->_getResponse($results);
    }

    /**
     * Gets a comment on a download.
     *
     * @param integer $download_id
     * @param integer $comment_id
     *
     * @return array|bool
     */
    public function getDownloadComment($download_id, $comment_id)
    {
        $results = $this->call('GET', '/downloads/' . intval($download_id) . '/comments/' . intval($comment_id));
        return $this->_getResponse($results);
    }

    /**
     * Updates a comment on a download.
     *
     * @param integer $download_id
     * @param integer $comment_id
     * @param array $params
     *
     * @return array|bool
     */
    public function updateDownloadComment($download_id, $comment_id, array $params)
    {
        $results = $this->call('POST', '/downloads/' . intval($download_id) . '/comments/' . intval($comment_id), $params);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Deletes a comment on a download.
     *
     * @param integer $download_id
     * @param integer $comment_id
     *
     * @return array|bool
     */
    public function deleteDownloadComment($download_id, $comment_id)
    {
        $results = $this->call('DELETE', '/downloads/' . intval($download_id) . '/comments/' . intval($comment_id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets all labels associated with a download.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getDownloadLabels($id)
    {
        $results = $this->call('GET', '/downloads/' . intval($id) . '/labels');
        return $this->_getResponse($results);
    }

    /**
     * Adds a label to a download.
     *
     * @param integer $id
     * @param string $label
     *
     * @return array|bool
     */
    public function addDownloadLabel($id, $label)
    {
        $results = $this->call('POST', '/downloads/' . intval($id) . '/labels', array('label' => $label));
        return $this->_getResponse($results);
    }

    /**
     * Determines if a download has a specific label.
     *
     * @param integer $id
     * @param string $label
     *
     * @return bool
     */
    public function getDownloadLabel($id, $label)
    {
        $results = $this->call('GET', '/downloads/' . intval($id) . '/labels/' . $label);
        return $this->_getExistsResponse($results);
    }

    /**
     * Removes a label from a download.
     *
     * @param integer $id
     * @param string $label
     *
     * @return bool
     */
    public function removeDownloadLabel($id, $label)
    {
        $results = $this->call('DELETE', '/downloads/' . intval($id) . '/labels/' . $label);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets a list of download comments awaiting validation.
     *
     * @return array|bool
     */
    public function getDownloadValidatingComments()
    {
        $results = $this->call('GET', '/downloads/validating-comments');
        return $this->_getResponse($results);
    }

    /**
     * Gets a list of downloads categories.
     *
     * @return array|bool
     */
    public function getDownloadsCategories()
    {
        $results = $this->call('GET', '/downloads/categories');
        return $this->_getResponse($results);
    }

    /**
     * Creates a download category.
     *
     * @param array $params
     *
     * @return array|bool
     */
    public function createDownloadCategory(array $params)
    {
        $results = $this->call('POST', '/downloads/categories', $params);
        return $this->_getResponse($results);
    }

    /**
     * Gets a download category.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getDownloadCategory($id)
    {
        $results = $this->call('GET', '/downloads/categories/' . intval($id));
        return $this->_getResponse($results);
    }

    /**
     * Updates a download category.
     *
     * @param integer $id
     * @param array $params
     *
     * @return bool
     */
    public function updateDownloadCategory($id, array $params)
    {
        $results = $this->call('POST', '/downloads/categories/' . intval($id), $params);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Deletes a download category.
     *
     * @param integer $id
     *
     * @return bool
     */
    public function deleteDownloadCategory($id)
    {
        $results = $this->call('DELETE', '/downloads/categories/' . intval($id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets downloads in a download category.
     *
     * @param integer $id
     * @param integer $page Page number of results to retrieve - defaults to 1
     * @param null|string $order Order of results (if not specified, uses API default)
     * @param null|integer $cache_id If specified, uses the cached results from this set if possible.
     *
     * @return array|bool
     */
    public function getDownloadCategoryDownloads($id, $page = 1, $order = null, $cache_id = null)
    {
        $params = array();
        $params['page'] = $page;
        if ($order !== null) {
            $params['order'] = $order;
        }
        if ($cache_id !== null) {
            $params['cache'] = $cache_id;
        }

        $results = $this->call('GET', '/downloads/categories/' . intval($id) . '/downloads', $params);
        return $this->_getResponse($results);
    }

    /**
     * Gets all groups that can access a download category
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getDownloadCategoryGroups($id)
    {
        $results = $this->call('GET', '/downloads/categories/' . intval($id) . '/groups');
        return $this->_getResponse($results);
    }

    /**
     * Adds a group to a download category
     *
     * @param integer $category_id
     * @param integer $group_id
     *
     * @return array|bool
     */
    public function addDownloadCategoryGroup($category_id, $group_id)
    {
        $params = array(
            'id' => $group_id
        );
        $results = $this->call('POST', '/downloads/categories/' . intval($category_id) . '/groups', $params);
        return $this->_getResponse($results);
    }

    /**
     * Determines if a particular group ID exists for a download category.
     *
     * @param integer $category_id
     * @param integer $group_id
     *
     * @return bool
     */
    public function getDownloadCategoryGroup($category_id, $group_id)
    {
        $results = $this->call('GET', '/downloads/categories/' . intval($category_id) . '/groups/' . intval($group_id));
        return $this->_getExistsResponse($results);
    }

    /**
     * Removes a group's access to a download category
     *
     * @param integer $category_id
     * @param integer $group_id
     *
     * @return bool
     */
    public function deleteDownloadCategoryGroup($category_id, $group_id)
    {
        $results = $this->call('DELETE', '/downloads/categories/' . intval($category_id) . '/groups/' . intval($group_id));
        return $this->_getSuccessResponse($results);
    }

    // ################### KB ACTIONS ####################

    /**
     * Finds articles matching the criteria
     *
     * @param array $criteria
     * @param integer $page Page number of results to retrieve - defaults to 1
     * @param null|string $order Order of results (if not specified, uses API default)
     * @param null|integer $cache_id If specified, uses the cached results from this set if possible.
     *
     * @return array|bool
     */
    public function findArticles(array $criteria, $page = 1, $order = null, $cache_id = null)
    {
        $criteria['page'] = $page;
        if ($order !== null) {
            $criteria['order'] = $order;
        }
        if ($cache_id !== null) {
            $criteria['cache_id'] = $cache_id;
        }

        return $this->call('GET', '/kb', $criteria);
        return $this->_getResponse($results);
    }

    /**
     * Creates an article with the given data.
     *
     * @param array $info
     *
     * @return array|bool
     */
    public function createArticle(array $info)
    {
        $info = $this->_enforceFileUploadIsset($info, 'attach', true);

        return $this->call('POST', '/kb', $info);
        return $this->_getResponse($results);
    }

    /**
     * Gets information about the given article.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getArticle($id)
    {
        return $this->call('GET', '/kb/' . intval($id));
        return $this->_getResponse($results);
    }

    /**
     * Updates information about the given article.
     *
     * @param integer $id
     * @param array $info
     *
     * @return bool
     */
    public function updateArticle($id, array $info)
    {
        $info = $this->_enforceFileUploadIsset($info, 'attach', true);

        return $this->call('POST', '/kb/' . intval($id), $info);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Deletes the given article.
     *
     * @param integer $id
     *
     * @return bool
     */
    public function deleteArticle($id)
    {
        return $this->call('DELETE', '/kb/' . intval($id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets all comments on an article.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getArticleComments($id)
    {
        return $this->call('GET', '/kb/' . intval($id) . '/comments');
        return $this->_getResponse($results);
    }

    /**
     * Adds a comment to an article.
     *
     * @param integer $id
     * @param array $params
     *
     * @return array|bool
     */
    public function addArticleComment($id, array $params)
    {
        return $this->call('POST', '/kb/' . intval($id) . '/comments', $params);
        return $this->_getResponse($results);
    }

    /**
     * Gets a comment on an article.
     *
     * @param integer $article_id
     * @param integer $comment_id
     *
     * @return array|bool
     */
    public function getArticleComment($article_id, $comment_id)
    {
        return $this->call('GET', '/kb/' . intval($article_id) . '/comments/' . intval($comment_id));
        return $this->_getResponse($results);
    }

    /**
     * Updates a comment on an article.
     *
     * @param integer $article_id
     * @param integer $comment_id
     * @param array $params
     *
     * @return array|bool
     */
    public function updateArticleComment($article_id, $comment_id, array $params)
    {
        return $this->call('POST', '/kb/' . intval($article_id) . '/comments/' . intval($comment_id), $params);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Deletes a comment on an article.
     *
     * @param integer $article_id
     * @param integer $comment_id
     *
     * @return array|bool
     */
    public function deleteArticleComment($article_id, $comment_id)
    {
        return $this->call('DELETE', '/kb/' . intval($article_id) . '/comments/' . intval($comment_id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets all votes associated with an article.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getArticleVotes($id)
    {
        return $this->call('GET', '/kb/' . intval($id) . '/votes');
        return $this->_getResponse($results);
    }

    /**
     * Gets all attachments associated with an article.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getArticleAttachments($id)
    {
        return $this->call('GET', '/kb/' . intval($id) . '/attachments');
        return $this->_getResponse($results);
    }

    /**
     * Adds an attachment to an article.
     *
     * @param integer $id
     * @param DpApiFileUpload|string|null $attach File to upload
     * @param integer|null $attach_id Existing attachment ID (blob ID), possibly from uploadFile()
     *
     * @return array|bool
     */
    public function addArticleAttachment($id, $attach = null, $attach_id = null)
    {
        if ($attach_id) {
            $params = array('attach_id' => $attach_id);
        } else if ($attach) {
            $params = array('attach' => $attach);
        } else {
            $params = array();
        }

        $params = $this->_enforceFileUploadIsset($params, 'attach');

        return $this->call('POST', '/kb/' . intval($id) . '/attachments', $params);
        return $this->_getResponse($results);
    }

    /**
     * Determines if an article has a specific attachment ID.
     *
     * @param integer $id
     * @param integer $attachment_id
     *
     * @return bool
     */
    public function getArticleAttachment($id, $attachment_id)
    {
        return $this->call('GET', '/kb/' . intval($id) . '/attachments/' . intval($attachment_id));
        return $this->_getExistsResponse($results);
    }

    /**
     * Removes an attachment from an article.
     *
     * @param integer $id
     * @param integer $attachment_id
     *
     * @return bool
     */
    public function removeArticleAttachment($id, $attachment_id)
    {
        return $this->call('DELETE', '/kb/' . intval($id) . '/attachments/' . intval($attachment_id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets all labels associated with an article.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getArticleLabels($id)
    {
        return $this->call('GET', '/kb/' . intval($id) . '/labels');
        return $this->_getResponse($results);
    }

    /**
     * Adds a label to an article.
     *
     * @param integer $id
     * @param string $label
     *
     * @return array|bool
     */
    public function addArticleLabel($id, $label)
    {
        return $this->call('POST', '/kb/' . intval($id) . '/labels', array('label' => $label));
        return $this->_getResponse($results);
    }

    /**
     * Determines if an article has a specific label.
     *
     * @param integer $id
     * @param string $label
     *
     * @return bool
     */
    public function getArticleLabel($id, $label)
    {
        return $this->call('GET', '/kb/' . intval($id) . '/labels/' . $label);
        return $this->_getExistsResponse($results);
    }

    /**
     * Removes a label from an article.
     *
     * @param integer $id
     * @param string $label
     *
     * @return bool
     */
    public function removeArticleLabel($id, $label)
    {
        return $this->call('DELETE', '/kb/' . intval($id) . '/labels/' . $label);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets a list of article comments awaiting validation.
     *
     * @return array|bool
     */
    public function getArticleValidatingComments()
    {
        return $this->call('GET', '/kb/validating-comments');
        return $this->_getResponse($results);
    }

    /**
     * Gets a list of articles categories.
     *
     * @return array|bool
     */
    public function getArticlesCategories()
    {
        return $this->call('GET', '/kb/categories');
        return $this->_getResponse($results);
    }

    /**
     * Creates an article category.
     *
     * @param array $params
     *
     * @return array|bool
     */
    public function createArticleCategory(array $params)
    {
        return $this->call('POST', '/kb/categories', $params);
        return $this->_getResponse($results);
    }

    /**
     * Gets an article category.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getArticleCategory($id)
    {
        return $this->call('GET', '/kb/categories/' . intval($id));
        return $this->_getResponse($results);
    }

    /**
     * Updates an article category.
     *
     * @param integer $id
     * @param array $params
     *
     * @return bool
     */
    public function updateArticleCategory($id, array $params)
    {
        return $this->call('POST', '/kb/categories/' . intval($id), $params);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Deletes an article category.
     *
     * @param integer $id
     *
     * @return bool
     */
    public function deleteArticleCategory($id)
    {
        return $this->call('DELETE', '/kb/categories/' . intval($id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets articles in an article category.
     *
     * @param integer $id
     * @param integer $page Page number of results to retrieve - defaults to 1
     * @param null|string $order Order of results (if not specified, uses API default)
     * @param null|integer $cache_id If specified, uses the cached results from this set if possible.
     *
     * @return array|bool
     */
    public function getArticleCategoryArticles($id, $page = 1, $order = null, $cache_id = null)
    {
        $params = array();
        $params['page'] = $page;
        if ($order !== null) {
            $params['order'] = $order;
        }
        if ($cache_id !== null) {
            $params['cache'] = $cache_id;
        }

        return $this->call('GET', '/kb/categories/' . intval($id) . '/articles', $params);
        return $this->_getResponse($results);
    }

    /**
     * Gets all groups that can access an article category
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getArticleCategoryGroups($id)
    {
        return $this->call('GET', '/kb/categories/' . intval($id) . '/groups');
        return $this->_getResponse($results);
    }

    /**
     * Adds a group to an article category
     *
     * @param integer $category_id
     * @param integer $group_id
     *
     * @return array|bool
     */
    public function addArticleCategoryGroup($category_id, $group_id)
    {
        $params = array(
            'id' => $group_id
        );
        return $this->call('POST', '/kb/categories/' . intval($category_id) . '/groups', $params);
        return $this->_getResponse($results);
    }

    /**
     * Determines if a particular group ID exists for an article category.
     *
     * @param integer $category_id
     * @param integer $group_id
     *
     * @return bool
     */
    public function getArticleCategoryGroup($category_id, $group_id)
    {
        return $this->call('GET', '/kb/categories/' . intval($category_id) . '/groups/' . intval($group_id));
        return $this->_getExistsResponse($results);
    }

    /**
     * Removes a group's access to an article category
     *
     * @param integer $category_id
     * @param integer $group_id
     *
     * @return bool
     */
    public function deleteArticleCategoryGroup($category_id, $group_id)
    {
        return $this->call('DELETE', '/kb/categories/' . intval($category_id) . '/groups/' . intval($group_id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets a list of articles fields.
     *
     * @return array|bool
     */
    public function getArticlesFields()
    {
        return $this->call('GET', '/kb/fields');
        return $this->_getResponse($results);
    }

    /**
     * Gets a list of articles products.
     *
     * @return array|bool
     */
    public function getArticlesProducts()
    {
        return $this->call('GET', '/kb/products');
        return $this->_getResponse($results);
    }

    // ################### FEEDBACK ACTIONS ####################

    /**
     * Finds feedback matching the criteria
     *
     * @param array $criteria
     * @param integer $page Page number of results to retrieve - defaults to 1
     * @param null|string $order Order of results (if not specified, uses API default)
     * @param null|integer $cache_id If specified, uses the cached results from this set if possible.
     *
     * @return array|bool
     */
    public function findFeedback(array $criteria, $page = 1, $order = null, $cache_id = null)
    {
        $criteria['page'] = $page;
        if ($order !== null) {
            $criteria['order'] = $order;
        }
        if ($cache_id !== null) {
            $criteria['cache_id'] = $cache_id;
        }

        $results = $this->call('GET', '/feedback', $criteria);
        return $this->_getResponse($results);
    }

    /**
     * Creates a feedback with the given data.
     *
     * @param array $info
     *
     * @return array|bool
     */
    public function createFeedback(array $info)
    {
        $info = $this->_enforceFileUploadIsset($info, 'attach', true);

        $results = $this->call('POST', '/feedback', $info);
        return $this->_getResponse($results);
    }

    /**
     * Gets information about the given feedback.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getFeedback($id)
    {
        $results = $this->call('GET', '/feedback/' . intval($id));
        return $this->_getResponse($results);
    }

    /**
     * Updates information about the given feedback.
     *
     * @param integer $id
     * @param array $info
     *
     * @return bool
     */
    public function updateFeedback($id, array $info)
    {
        $info = $this->_enforceFileUploadIsset($info, 'attach', true);

        $results = $this->call('POST', '/feedback/' . intval($id), $info);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Deletes the given feedback.
     *
     * @param integer $id
     *
     * @return bool
     */
    public function deleteFeedback($id)
    {
        $results = $this->call('DELETE', '/feedback/' . intval($id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets all comments on a feedback entry.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getFeedbackComments($id)
    {
        $results = $this->call('GET', '/kb/' . intval($id) . '/comments');
        return $this->_getResponse($results);
    }

    /**
     * Adds a comment to a feedback entry.
     *
     * @param integer $id
     * @param array $params
     *
     * @return array|bool
     */
    public function addFeedbackComment($id, array $params)
    {
        $results = $this->call('POST', '/kb/' . intval($id) . '/comments', $params);
        return $this->_getResponse($results);
    }

    /**
     * Gets a comment on a feedback entry.
     *
     * @param integer $feedback_id
     * @param integer $comment_id
     *
     * @return array|bool
     */
    public function getFeedbackComment($feedback_id, $comment_id)
    {
        $results = $this->call('GET', '/kb/' . intval($feedback_id) . '/comments/' . intval($comment_id));
        return $this->_getResponse($results);
    }

    /**
     * Updates a comment on a feedback entry.
     *
     * @param integer $feedback_id
     * @param integer $comment_id
     * @param array $params
     *
     * @return array|bool
     */
    public function updateFeedbackComment($feedback_id, $comment_id, array $params)
    {
        $results = $this->call('POST', '/kb/' . intval($feedback_id) . '/comments/' . intval($comment_id), $params);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Deletes a comment on a feedback entry.
     *
     * @param integer $feedback_id
     * @param integer $comment_id
     *
     * @return array|bool
     */
    public function deleteFeedbackComment($feedback_id, $comment_id)
    {
        $results = $this->call('DELETE', '/kb/' . intval($feedback_id) . '/comments/' . intval($comment_id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Merges two feedback records.
     *
     * @param integer $target The feedback that the other will be merged into
     * @param integer $from This feedback will be removed on a successful merge
     *
     * @return bool
     */
    public function mergeFeedback($target, $from)
    {
        $results = $this->call('POST', '/feedback/' . intval($target) . '/merge/' . intval($from));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets all votes associated with a feedback.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getFeedbackVotes($id)
    {
        $results = $this->call('GET', '/feedback/' . intval($id) . '/votes');
        return $this->_getResponse($results);
    }

    /**
     * Gets all attachments associated with a feedback.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getFeedbackAttachments($id)
    {
        $results = $this->call('GET', '/feedback/' . intval($id) . '/attachments');
        return $this->_getResponse($results);
    }

    /**
     * Adds an attachment to a feedback.
     *
     * @param integer $id
     * @param DpApiFileUpload|string|null $attach File to upload
     * @param integer|null $attach_id Existing attachment ID (blob ID), possibly from uploadFile()
     *
     * @return array|bool
     */
    public function addFeedbackAttachment($id, $attach = null, $attach_id = null)
    {
        if ($attach_id) {
            $params = array('attach_id' => $attach_id);
        } else if ($attach) {
            $params = array('attach' => $attach);
        } else {
            $params = array();
        }

        $params = $this->_enforceFileUploadIsset($params, 'attach');

        $results = $this->call('POST', '/feedback/' . intval($id) . '/attachments', $params);
        return $this->_getResponse($results);
    }

    /**
     * Determines if a feedback has a specific attachment ID.
     *
     * @param integer $id
     * @param integer $attachment_id
     *
     * @return bool
     */
    public function getFeedbackAttachment($id, $attachment_id)
    {
        $results = $this->call('GET', '/feedback/' . intval($id) . '/attachments/' . intval($attachment_id));
        return $this->_getExistsResponse($results);
    }

    /**
     * Removes an attachment from a feedback.
     *
     * @param integer $id
     * @param integer $attachment_id
     *
     * @return bool
     */
    public function removeFeedbackAttachment($id, $attachment_id)
    {
        $results = $this->call('DELETE', '/feedback/' . intval($id) . '/attachments/' . intval($attachment_id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets all labels associated with a feedback.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getFeedbackLabels($id)
    {
        $results = $this->call('GET', '/feedback/' . intval($id) . '/labels');
        return $this->_getResponse($results);
    }

    /**
     * Adds a label to a feedback.
     *
     * @param integer $id
     * @param string $label
     *
     * @return array|bool
     */
    public function addFeedbackLabel($id, $label)
    {
        $results = $this->call('POST', '/feedback/' . intval($id) . '/labels', array('label' => $label));
        return $this->_getResponse($results);
    }

    /**
     * Determines if a feedback has a specific label.
     *
     * @param integer $id
     * @param string $label
     *
     * @return bool
     */
    public function getFeedbackLabel($id, $label)
    {
        $results = $this->call('GET', '/feedback/' . intval($id) . '/labels/' . $label);
        return $this->_getExistsResponse($results);
    }

    /**
     * Removes a label from a feedback.
     *
     * @param integer $id
     * @param string $label
     *
     * @return bool
     */
    public function removeFeedbackLabel($id, $label)
    {
        $results = $this->call('DELETE', '/feedback/' . intval($id) . '/labels/' . $label);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets a list of feedback comments awaiting validation.
     *
     * @return array|bool
     */
    public function getFeedbackValidatingComments()
    {
        $results = $this->call('GET', '/feedback/validating-comments');
        return $this->_getResponse($results);
    }

    /**
     * Gets a list of feedback categories ("types" in the admin interface).
     *
     * @return array|bool
     */
    public function getFeedbackCategories()
    {
        $results = $this->call('GET', '/feedback/categories');
        return $this->_getResponse($results);
    }

    /**
     * Gets a list of feedback status categories ("statuses" in the admin interface).
     *
     * @return array|bool
     */
    public function getFeedbackStatusCategories()
    {
        $results = $this->call('GET', '/feedback/status-categories');
        return $this->_getResponse($results);
    }

    /**
     * Gets a list of feedback user categories ("categories" in the admin interface).
     *
     * @return array|bool
     */
    public function getFeedbackUserCategories()
    {
        $results = $this->call('GET', '/feedback/user-categories');
        return $this->_getResponse($results);
    }

    // ################### TASK ACTIONS ####################

    /**
     * Finds tasks matching the criteria
     *
     * @param array $criteria
     * @param integer $page Page number of results to retrieve - defaults to 1
     * @param null|string $order Order of results (if not specified, uses API default)
     * @param null|integer $cache_id If specified, uses the cached results from this set if possible.
     *
     * @return array|bool
     */
    public function findTasks(array $criteria, $page = 1, $order = null, $cache_id = null)
    {
        $criteria['page'] = $page;
        if ($order !== null) {
            $criteria['order'] = $order;
        }
        if ($cache_id !== null) {
            $criteria['cache_id'] = $cache_id;
        }

        return $this->call('GET', '/tasks', $criteria);
        return $this->_getResponse($results);
    }

    /**
     * Creates a task with the given data.
     *
     * @param array $info
     *
     * @return array|bool
     */
    public function createTask(array $info)
    {
        return $this->call('POST', '/tasks', $info);
        return $this->_getResponse($results);
    }

    /**
     * Gets information about the given task.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getTask($id)
    {
        return $this->call('GET', '/tasks/' . intval($id));
        return $this->_getResponse($results);
    }

    /**
     * Updates information about the given task.
     *
     * @param integer $id
     * @param array $info
     *
     * @return bool
     */
    public function updateTask($id, array $info)
    {
        return $this->call('POST', '/tasks/' . intval($id), $info);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Deletes the given task.
     *
     * @param integer $id
     *
     * @return bool
     */
    public function deleteTask($id)
    {
        return $this->call('DELETE', '/task/' . intval($id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets all associations for a task
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getTaskAssociations($id)
    {
        return $this->call('GET', '/tasks/' . intval($id) . '/associations');
        return $this->_getResponse($results);
    }

    /**
     * Adds an association for a task.
     *
     * @param integer $id
     * @param integer $ticket_id
     *
     * @return array|bool
     */
    public function addTaskAssociation($id, $ticket_id)
    {
        $params = array(
            'ticket_id' => $ticket_id
        );
        return $this->call('POST', '/tasks/' . intval($id) . '/associations', $params);
        return $this->_getResponse($results);
    }

    /**
     * Determines if a particular association ID exists for a task.
     *
     * @param integer $task_id
     * @param integer $association_id
     *
     * @return bool
     */
    public function getTaskAssociation($task_id, $association_id)
    {
        return $this->call('GET', '/tasks/' . intval($task_id) . '/associations/' . intval($association_id));
        return $this->_getExistsResponse($results);
    }

    /**
     * Deletes a particular task association
     *
     * @param integer $task_id
     * @param integer $association_id
     *
     * @return bool
     */
    public function deleteTaskAssociation($task_id, $association_id)
    {
        return $this->call('DELETE', '/tasks/' . intval($task_id) . '/associations/' . intval($association_id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets all comments for a task
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getTaskComments($id)
    {
        return $this->call('GET', '/tasks/' . intval($id) . '/comments');
        return $this->_getResponse($results);
    }

    /**
     * Adds a comment for a task.
     *
     * @param integer $id
     * @param string $comment
     *
     * @return array|bool
     */
    public function addTaskComment($id, $comment)
    {
        $params = array(
            'comment' => $comment
        );
        return $this->call('POST', '/tasks/' . intval($id) . '/comments', $params);
        return $this->_getResponse($results);
    }

    /**
     * Determines if a particular comment ID exists for a task.
     *
     * @param integer $task_id
     * @param integer $comment_id
     *
     * @return bool
     */
    public function getTaskComment($task_id, $comment_id)
    {
        return $this->call('GET', '/tasks/' . intval($task_id) . '/comments/' . intval($comment_id));
        return $this->_getExistsResponse($results);
    }

    /**
     * Deletes a particular task comment
     *
     * @param integer $task_id
     * @param integer $comment_id
     *
     * @return bool
     */
    public function deleteTaskComment($task_id, $comment_id)
    {
        return $this->call('DELETE', '/tasks/' . intval($task_id) . '/comments/' . intval($comment_id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets all labels associated with a task.
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getTaskLabels($id)
    {
        return $this->call('GET', '/tasks/' . intval($id) . '/labels');
        return $this->_getResponse($results);
    }

    /**
     * Adds a label to a task.
     *
     * @param integer $id
     * @param string $label
     *
     * @return array|bool
     */
    public function addTaskLabel($id, $label)
    {
        return $this->call('POST', '/tasks/' . intval($id) . '/labels', array('label' => $label));
        return $this->_getResponse($results);
    }

    /**
     * Determines if a task has a specific label.
     *
     * @param integer $id
     * @param string $label
     *
     * @return bool
     */
    public function getTaskLabel($id, $label)
    {
        return $this->call('GET', '/tasks/' . intval($id) . '/labels/' . $label);
        return $this->_getExistsResponse($results);
    }

    /**
     * Removes a label from a task.
     *
     * @param integer $id
     * @param string $label
     *
     * @return bool
     */
    public function removeTaskLabel($id, $label)
    {
        return $this->call('DELETE', '/tasks/' . intval($id) . '/labels/' . $label);
        return $this->_getSuccessResponse($results);
    }

    // ################### GLOSSARY ACTIONS ####################

    /**
     * Gets glossary words
     *
     * @param string $word If specified, limits words to those that contain this
     *
     * @return array|bool
     */
    public function getGlossaryWords($word = '')
    {
        $params = array('word' => $word);
        return $this->call('GET', '/glossary', $params);
        return $this->_getResponse($results);
    }

    /**
     * Adds a glossary word.
     *
     * @param array $words List of words to associate with definition
     * @param string $definition
     *
     * @return array|bool
     */
    public function addGlossaryWord(array $words, $definition)
    {
        $params = array('word' => $words, 'definition' => $definition);
        return $this->call('POST', '/glossary', $params);
        return $this->_getResponse($results);
    }

    /**
     * Looks up a glossary word
     *
     * @param string $word
     *
     * @return array|bool
     */
    public function lookupGlossaryWord($word)
    {
        $params = array('word' => $word);
        return $this->call('GET', '/glossary/lookup', $params);
        return $this->_getResponse($results);
    }

    /**
     * Gets a glossary word
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getGlossaryWord($id)
    {
        return $this->call('GET', '/glossary/' . intval($id));
        return $this->_getResponse($results);
    }

    /**
     * Deletes a glossary word
     *
     * @param integer $id
     *
     * @return bool
     */
    public function deleteGlossaryWord($id)
    {
        return $this->call('DELETE', '/glossary/' . intval($id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets a glossary word definition
     *
     * @param integer $id
     *
     * @return array|bool
     */
    public function getGlossaryWordDefinition($id)
    {
        return $this->call('GET', '/glossary/definitions/' . intval($id));
        return $this->_getResponse($results);
    }

    /**
     * Updates a glossary word definition
     *
     * @param integer $id
     * @param array $params Fields to update
     *
     * @return bool
     */
    public function updateGlossaryWordDefinition($id, array $params)
    {
        return $this->call('POST', '/glossary/definitions/' . intval($id), $params);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Deletes a glossary word definition
     *
     * @param integer $id
     *
     * @return bool
     */
    public function deleteGlossaryWordDefinition($id)
    {
        $results = $this->call('DELETE', '/glossary/definitions/' . intval($id));
        return $this->_getSuccessResponse($results);
    }

    // ################### TEXT SNIPPETS ####################

    /**
     * Gets snippet categories
     *
     * @param string $type 'tickets' or 'chat'
     * @return bool|array
     */
    public function listSnippetCategories($type)
    {
        $results = $this->call('GET', '/text-snippets/' . $type . '/categories');
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets information about the category.
     *
     * @param string $type 'tickets' or 'chat'
     * @param integer $id The category ID
     *
     * @return array|bool
     */
    public function getSnippetCategory($type, $id)
    {
        $results = $this->call('GET', '/text-snippets/' . $type . '/categories/' . $id);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Update a snippet category
     *
     * @param string $type 'tickets' or 'chat'
     * @param int $id The category ID
     * @param array $info Data to write to the category
     * @return array|bool
     */
    public function updateSnippetCategory($type, $id, array $info)
    {
        $results = $this->call('POST', '/text-snippets/' . $type . '/categories/' . intval($id), $info);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets snippets. Optionally narrow results by providing a category.
     *
     * @param string $type 'tickets' or 'chat'
     * @param int|null $category_id Only get snippets in this category
     * @return array|bool
     */
    public function listSnippets($type, $category_id = null)
    {
        $params = array('category_id' => $category_id);
        $results = $this->call('GET', '/text-snippets/' . $type, $params);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Update a snippet
     *
     * @param string $type 'tickets' or 'chat'
     * @param int $id The snippet ID
     * @param array $info The data to write to the snippet
     * @return array|bool
     */
    public function updateSnippet($type, $id, array $info)
    {
        $results = $this->call('POST', '/text-snippets/' . $type . '/' . intval($id), $info);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Gets information about the snippet.
     *
     * @param string $type 'tickets' or 'chat'
     * @param integer $id The snippet ID
     *
     * @return array|bool
     */
    public function getSnippet($type, $id)
    {
        $results = $this->call('GET', '/text-snippets/' . $type . '/' . $id);
        return $this->_getSuccessResponse($results);
    }

    /**
     * Deletes the snippet.
     *
     * @param string $type 'tickets' or 'chat'
     * @param integer $id
     *
     * @return array|bool
     */
    public function deleteSnippet($type, $id)
    {
        $results = $this->call('DELETE', '/text-snippets/' . intval($id));
        return $this->_getSuccessResponse($results);
    }

    /**
     * Deletes the snippet category
     *
     * @param string $type 'tickets' or 'chat'
     * @param integer $id
     *
     * @return array|bool
     */
    public function deleteSnippetCategory($type, $id)
    {
        $results = $this->call('DELETE', '/text-snippets/' . $type . '/' . intval($id));
        return $this->_getSuccessResponse($results);
    }

}

// END PRIMARY API CLASS