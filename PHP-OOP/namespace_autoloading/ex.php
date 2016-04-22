<?php
// require 'src/Person.php';
// require 'src/Business.php';
// require 'src/Staff.php';

// autoloading all classes 
//use `composer dump-autoload` to autoload inside the `src folder`
use Laracasts\Users\Person;
use Laracasts\Business;
use Laracasts\Staff;

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