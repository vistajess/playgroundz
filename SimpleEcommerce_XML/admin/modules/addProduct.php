<?php
if($_FILES['photo']['name'])
{
	//if no errors...
	if(!$_FILES['photo']['error'])
	{
		//now is the time to modify the future file name and validate the file
		$new_file_name = strtolower($_FILES['photo']['tmp_name']); //rename file
		if($_FILES['photo']['size'] > (2024000)) //can't be larger than 1 MB
		{
			$valid_file = false;
			$message = 'Oops!  Your file\'s size is to large.';
		} else { 
			$valid_file = true; 
		};
		
		//if the file has passed the test
		if($valid_file)
		{
			//move it to where we want it to be
			$currentdir = getcwd();
			$target = '../../images/' . basename($_FILES['photo']['name']);
			move_uploaded_file($_FILES['photo']['tmp_name'], $target);
			$message = 'Congratulations!  Your file was accepted.';
		} 
	}
	//if there is an error...
	else
	{
		//set that to be the returned message
		$message = 'Ooops!  Your upload triggered the following error:  '.$_FILES['photo']['error'];
	}
}

//you get the following information for each file:
// $_FILES['field_name']['name']
// $_FILES['field_name']['size']
// $_FILES['field_name']['type']
// $_FILES['field_name']['tmp_name']
// =============================================================================
// ---------------------------- END OF UPLOAD ---------------------------------
// =============================================================================

include('../../config/config.php');

	$xml = new  DOMDocument("1.0", "utf-8");
	$xml->formatOutput = true;
	$xml->preserveWhiteSpace = false;
	$xml->Load('../../data/products.xml');

	$sql = "SELECT Auto_increment FROM information_schema.tables WHERE table_name='tblproduct'";
	$query = mysqli_query($conn, $sql);
	$result = mysqli_fetch_row($query);

	$id = $result[0];
	$name = $_POST['tag_name'];
	$description = $_POST['description'];
	$quantity = $_POST['quantity'];
	$price = $_POST['price'];
	$image = basename($_FILES['photo']['name']);
	$category = $_POST['category'];

	$new_product = $xml->createElement("product");
	$new_product->appendChild($xml->createElement('id', $id));
	$new_product->appendChild($xml->createElement('name', $name));
	$new_product->appendChild($xml->createElement('description', $description));
	$new_product->appendChild($xml->createElement('quantity', $quantity));
	$new_product->appendChild($xml->createElement('price', $price));
	$new_product->appendChild($xml->createElement('image', $image));
	$new_product->appendChild($xml->createElement('category', $category));

	$xml->getElementsByTagName('products')->item(0)->appendChild($new_product);

	$xml->Save('../../data/products.xml');

  $stmt = $conn->prepare("INSERT INTO tbltag (tag_name) VALUES(?)");
  $stmt->bind_param("s",$name);
  $stmt->execute();
  header('Location: ../tag_list.php');
?>