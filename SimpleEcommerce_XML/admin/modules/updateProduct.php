<?php

// connect to the database
include('../../config/config.php');
// confirm that the 'id' variable has been set
if (isset($_POST['product_id']) && is_numeric($_POST['product_id'])){

if($_FILES['product_image']['name'] != ''){
	//if no errors...
	if(!$_FILES['product_image']['error'])
	{
		//now is the time to modify the future file name and validate the file
		$new_file_name = strtolower($_FILES['product_image']['tmp_name']); //rename file
		if($_FILES['product_image']['size'] > (2024000)) //can't be larger than 1 MB
		{
			$valid_file = false;
			$message = 'Oops!  Your file\'s size is to large.';
			echo $message;
		} else { 
			$valid_file = true; 
		};
		
		//if the file has passed the test
		if($valid_file)
		{
			//move it to where we want it to be
			$currentdir = getcwd();
			$target = '../../images/' . basename($_FILES['product_image']['name']);
			move_uploaded_file($_FILES['product_image']['tmp_name'], $target);
			$message = 'Congratulations!  Your file was accepted.';
			echo $message;
			$product_image =  basename($_FILES['product_image']['name']);
		} 
	}
	//if there is an error...
	else
	{
		//set that to be the returned message
		$message = 'Ooops!  Your upload triggered the following error:  '.$_FILES['product_image']['error'];
		echo $message;
	}
} else {
	$product_image = $_POST['product_image'];
}
// get the 'id' variable from the URL
$product_id = $_POST['product_id'];
$product_name = $_POST['product_name'];
$category_id = $_POST['category_id'];
$description = $_POST['description'];
$quantity = $_POST['quantity'];
$price = $_POST['price'];

// update record from database
$sql = "UPDATE tblproduct set product_name ='".$product_name."',category_id ='".$category_id."',description ='".$description."',quantity ='".$quantity."',price ='".$price."',product_image ='".$product_image."' WHERE product_id = '".$product_id."' LIMIT 1";
$conn->query($sql);
if ($conn->query($sql)) {

	$xml = new DOMDocument("1.0", "utf-8");
	$xml->formatOutput = true;
	$xml->preserveWhiteSpace = false;
	$xml->Load('../../data/products.xml');

	$root = $xml->getElementsByTagName('products')->item(0);
	$products = $root->getElementsByTagName('product');	

	foreach ($products as $product) {
		if($product->getElementsByTagName('id')->item(0)->nodeValue == $product_id) {
			$product->getElementsByTagName('name')->item(0)->nodeValue = $product_name;
			$product->getElementsByTagName('description')->item(0)->nodeValue = $description;
			$product->getElementsByTagName('quantity')->item(0)->nodeValue = $quantity;
			$product->getElementsByTagName('price')->item(0)->nodeValue = $price;
			$product->getElementsByTagName('image')->item(0)->nodeValue = $product_image;
			$product->getElementsByTagName('category')->item(0)->nodeValue = $category_id;
		}
	}

	$xml->Save('../../data/products.xml');
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
header("Location: ../products_list.php");
}
else
// if the 'id' variable isn't set, redirect the user
{
header("Location: ../products_list.php");
}

?>