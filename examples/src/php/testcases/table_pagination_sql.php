<?php
class SampleDashboard extends StandaloneDashboard {
  protected $pdo;
  public function initialize(){
    $this->pdo = new PDO("sqlite:fixtures/databases/Chinook_Sqlite.sqlite");
  }

  private function getEmployees ($limit, $offset) {
    $query = $this->pdo->query("SELECT Employee.EmployeeId, Employee.FirstName, Employee.LastName, Employee.City, Employee.State, Employee.Country FROM Employee LIMIT $limit OFFSET $offset");
    return  $query->fetchAll(PDO::FETCH_ASSOC);
  }

  private function getEmployeesCount () {
    $query = $this->pdo->query("SELECT count(Employee.EmployeeId) as e FROM Employee");
    return $query->fetchAll(PDO::FETCH_ASSOC)[0]['e'];
  }
 
  private function populateData($employees){
    $data = array();
    for($i=0; $i<count($employees);$i++){
      $d = array(
        'FirstName' => $employees[$i]['FirstName'],
        'LastName' => $employees[$i]['LastName'],
        'City' => $employees[$i]['City'],
        'State' => $employees[$i]['State'],
        'Country' => $employees[$i]['Country']
      );

      $data []= $d;
    }

    return $data;
  }

  public function buildDashboard () {
    $table = new TableComponent('table1');
    $table->setCaption ("List of Employees");
    $table->setDimensions (6, 3);
    $table->addColumn ('FirstName', "First Name");
    $table->addColumn ('LastName', "Last Name");
    $table->addColumn ('City', "City");
    $table->addColumn ('State', "State", array('textItalicFlag' => true));
    $table->addColumn ('Country', "Country");
    $table->setRowDataSource('paginate', $this);
    $table->setNumberOfRows($this->getEmployeesCount());
    $table->setRowsPerPage(2);

    $this->addComponent($table);
  }

  public function paginate($source, $targets, $params) { 
    $limit = $params['limit']['take'];
    $offset = $params['limit']['skip'];
    $employees = $this->getEmployees($limit, $offset);
    $rows = $this->populateData($employees);

    return $rows;
  }

}

$db = new SampleDashboard();
$db->renderStandalone();
  
