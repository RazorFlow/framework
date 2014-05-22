<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH . 'rfDashboards/sample.php';

class Welcome extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -  
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */

	public function __construct() {
		parent::__construct();
	}

	public function index()
	{
		$this->load->helper('url');
		$db = new SampleDashboard();
		$db->setActionPath ("/apps/php_mvc/rfci/index.php/welcome/dashboardAction");
		$data = array(
			'db' => $db
		);

		$this->load->view('welcome_message', $data);
	}

	public function dashboardAction() {
		$db = new SampleDashboard();
		echo $db->getJSONForAction();
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */