<?php
include('../../config/config.php');

	$xml = new  DOMDocument("1.0", "utf-8");
	$xml->formatOutput = true;
	$xml->preserveWhiteSpace = false;
	$xml->Load('../../data/category.xml');

	// $sql = "SELECT Auto_increment FROM information_schema.tables WHERE table_name='tblcategory'";
	// $query = mysqli_query($conn, $sql);
	// $result = mysqli_fetch_row($query);
	$name = $_POST['category_name'];
	$details = $_POST['category_details'];

	$stmt = $conn->prepare("INSERT INTO tblcategory (category_name,category_details) VALUES(?,?)");
  $stmt->bind_param("ss",$name,$details);
  $stmt->execute();
  $id = mysqli_insert_id($conn);

	$new_category = $xml->createElement("category");
	$new_category->appendChild($xml->createElement('id', $id));
	$new_category->appendChild($xml->createElement('name', $name));
	$new_category->appendChild($xml->createElement('details', $details));

	$xml->getElementsByTagName('categories')->item(0)->appendChild($new_category);

	$xml->Save('../../data/category.xml');

  header('Location: ../category_list.php');
?>
