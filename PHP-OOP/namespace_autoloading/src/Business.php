<?php
namespace Laracasts;
use Laracasts\Users\Person;

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