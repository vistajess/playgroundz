<?php 
class Person {
	protected $name;
	public function __construct($name) {
		$this->name = $name;
	}
}

class Business {
	protected $staff;
	public function __construct(Staff $staff) {
		$this->staff = $staff;
	}

	//Type hinting can be use when a function require a specific type of parameter
	public function hire(Person $person) {
		//add $person to the staff collection
		$this->staff->add($person);
	}

	public function kick() {
		$this->staff->remove();
	}

	public function getStaffMembers() {
		return $this->staff->members();
	}

}

class Staff {
	protected $members = [];

	public function __construct($members = []) {
		$this->members = $members;
	}
	public function add(Person $person) {
		$this->members[] = $person;
	}

	public function remove() {
		foreach ($this->members as $key => $object) {
	    if ($key == 2) {
	        unset($this->members[2]);
	    }
		}
	}

	public function members() {
		return $this->members; 
	}
}

$jess = new Person('Jess Vista');
$jom = new Person('Jose Mari Vista');
$chris = new Person('Chris Vista');
$staff = new Staff([$jess]);
$google = new Business($staff);

$google->hire($jom);
$google->hire($chris);
var_dump($google->getStaffMembers());
$google->kick();
var_dump($google->getStaffMembers());
?>