<?php

// connect to the database
include('../../config/config.php');
// confirm that the 'id' variable has been set
if (isset($_GET['id']) && is_numeric($_GET['id']))
{
// get the 'id' variable from the URL
$id = $_GET['id'];

// delete record from database
if ($stmt = $conn->prepare("DELETE FROM tblproduct WHERE product_id = ? LIMIT 1")) {
$stmt->bind_param("s",$id);
$stmt->execute();
$stmt->close();


$stmt = $conn->prepare("DELETE FROM tblproduct_tag WHERE product_id = ? LIMIT 1");
$stmt->bind_param("s",$id);
$stmt->execute();
$stmt->close();

// delete to XML FILE
	$xml = new DOMDocument("1.0", "utf-8");
	$xml->formatOutput = true;
	$xml->preserveWhiteSpace = false;
	$xml->Load('../../data/products.xml');

	$root = $xml->getElementsByTagName('products')->item(0);
	$products = $root->getElementsByTagName('product');	

	foreach ($products as $product) {
		$current_id = $product->getElementsByTagName('id')->item(0)->nodeValue;

		if($current_id == $id) 
			$root->removeChild($product);
	}
	$xml->Save('../../data/products.xml');

}
else
{
echo "ERROR: could not prepare SQL statement.";
}
$conn->close();

// redirect user after delete is successful
header("Location: ../products_list.php");
}
else
// if the 'id' variable isn't set, redirect the user
{
header("Location: ../products_list.php");
}

?>