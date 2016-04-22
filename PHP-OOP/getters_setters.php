<?php
//Getters and Setters gives protection to your app
class Person {
	private $name;
	private $age;

	public function __construct($name) {
		$this->name = $name;
	}

	public function setAge($age) {
		if($age < 18) {
			throw new Exception("Person is not old enough.");
		}
		$this->age = $age * 365;
	}

	public function getName() {
		return $this->name;
	}
}

$jess = new Person('Jess');
$jess->setAge(30);
var_dump($jess);	
?>