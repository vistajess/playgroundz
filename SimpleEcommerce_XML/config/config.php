<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ecommerce_kim";

// $servername = "mysql.hostinger.ph";
// $username = "u959518742_kim";
// $password = "123456";
// $dbname = "u959518742_kim";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
?>