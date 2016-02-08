<?php

// connect to the database
include('../../config/config.php');
// confirm that the 'id' variable has been set
if (isset($_POST['category_id']) && is_numeric($_POST['category_id'])){
// get the 'id' variable from the URL
$category_id = $_POST['category_id'];
$category_name = $_POST['category_name'];
$category_details = $_POST['category_details'];

// update record from database
$sql = "UPDATE tblcategory set category_name ='".$category_name."',category_details ='".$category_details."' WHERE category_id = '".$category_id."' LIMIT 1";
$conn->query($sql);
if ($conn->query($sql)) {

	$xml = new DOMDocument("1.0", "utf-8");
	$xml->formatOutput = true;
	$xml->preserveWhiteSpace = false;
	$xml->Load('../../data/category.xml');

	$root = $xml->getElementsByTagName('categories')->item(0);
	$categories = $root->getElementsByTagName('category');	

	foreach ($categories as $category) {
		if($category->getElementsByTagName('id')->item(0)->nodeValue == $category_id) {
			$category->getElementsByTagName('name')->item(0)->nodeValue = $category_name;
			$category->getElementsByTagName('details')->item(0)->nodeValue = $category_details;
		}
	}

	$xml->Save('../../data/category.xml');
	$return = Array(
		"status" => "200",
		"message" => "Success",
	);

  echo json_encode($return);
}
else
{
echo "ERROR: could not prepare SQL statement.";
}
$conn->close();

// redirect user after delete is successful
// header("Location: ../category_list.php");
}
else
// if the 'id' variable isn't set, redirect the user
{
// header("Location: ../category_list.php");
}

?>