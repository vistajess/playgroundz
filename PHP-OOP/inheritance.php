<?php

// Abstract classes are class that cannot be instantiated ,
//but can be inherited by subclasses
abstract class Shape {
	protected $color;

	//  `__construct($color = 'red')` setting default value for the params
	public function __construct($color = 'red') {
		$this->color = $color;
	}

	public function getColor() {
		return $this->color;
	}

	//template method design pattern
	//Having abstract function must provide a `getArea` function 
	//in every subclasses
	abstract protected function getArea();
}

class Square extends Shape {
	protected $length = 4;
	public function getArea() {
		return pow($this->length, 2);
	}
}

class Triangle extends Shape {
	protected $base = 4;
	protected $height = 7;
	public function getArea() {
		return .5 * $this->base * $this->height;
	}
}

class Circle extends Shape {
	protected $radius = 5;

	public function getArea() {
		return M_PI * pow($this->radius, 2); 
	}
}

var_dump((new Circle('blue'))->getArea());
?>