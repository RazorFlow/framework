<?php
/**
 * Static content controller.
 *
 * This file will render views from views/pages/
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.Controller
 * @since         CakePHP(tm) v 0.2.9
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

App::uses('AppController', 'Controller');
App::uses('SampleDashboard', 'Lib');

/**
 * Static content controller
 *
 * Override this controller by placing a copy in controllers directory of an application
 *
 * @package       app.Controller
 * @link http://book.cakephp.org/2.0/en/controllers/pages-controller.html
 */
class MyController extends AppController {

	public $uses = array();
	public $components = array('RequestHandler');


	public function embeddedDashboard () {
		$db = new SampleDashboard ();
		$db->setActionPath ("/apps/php_mvc/cakephp/my/dashboardAction");
		$this->set('db', $db);
		$this->render("embeddedDashboard");
	}

	public function dashboardAction () {
		$db = new SampleDashboard ();
		return new CakeResponse(array('body'=> $db->getJSONForAction ()));
		// return new CakeResponse (array('body' => $db->getJSONForAction ()));
	}

}
