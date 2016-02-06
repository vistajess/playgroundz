<?php

// connect to the database
include('../../config/config.php');
// confirm that the 'id' variable has been set
if (isset($_GET['id']) && is_numeric($_GET['id']))
{
// get the 'id' variable from the URL
$id = $_GET['id'];

// delete record from database
if ($stmt = $conn->prepare("DELETE FROM tblcategory WHERE category_id = ? LIMIT 1")) {
$stmt->bind_param("s",$id);
$stmt->execute();
$stmt->close();


// delete to XML FILE
	$xml = new DOMDocument("1.0", "utf-8");
	$xml->formatOutput = true;
	$xml->preserveWhiteSpace = false;
	$xml->Load('../../data/category.xml');

	$root = $xml->getElementsByTagName('categories')->item(0);
	$categories = $root->getElementsByTagName('category');	

	foreach ($categories as $category) {
		$current_id = $category->getElementsByTagName('id')->item(0)->nodeValue;

		if($current_id == $id) 
			$root->removeChild($category);
	}
	$xml->Save('../../data/category.xml');

}
else
{
echo "ERROR: could not prepare SQL statement.";
}
$conn->close();

// redirect user after delete is successful
header("Location: ../category_list.php");
}
else
// if the 'id' variable isn't set, redirect the user
{
header("Location: view.php");
}

?>