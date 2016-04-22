<?php
namespace Laracasts;
use Laracasts\Users\Person;

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
