<?php
if($_FILES['product_image']['name']){
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
		} 
	}
	//if there is an error...
	else
	{
		//set that to be the returned message
		$message = 'Ooops!  Your upload triggered the following error:  '.$_FILES['product_image']['error'];
		echo $message;
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

	// $sql = "SELECT Auto_increment FROM information_schema.tables WHERE table_name='tblproduct'";
	// $query = mysqli_query($conn, $sql);
	// $result = mysqli_fetch_row($query);

	// $id = $result[0];
	$name = $_POST['product_name'];
	$description = $_POST['description'];
	$quantity = $_POST['quantity'];
	$price = $_POST['price'];
	$product_image = basename($_FILES['product_image']['name']);
	$category = $_POST['category_id'];
	$tags_array_string = $_POST['tags_array'];
	$tags_array_id = [];
	$tags_sql = '';


  $stmt = $conn->prepare("INSERT INTO tblproduct (product_name,category_id,description,quantity,price,product_image) VALUES(?,?,?,?,?,?)");
  $stmt->bind_param("ssssss",$name,$category,$description,$quantity,$price,$product_image);
  $stmt->execute();

  $id = mysqli_insert_id($conn);
	include('../../config/config.php');


	$tag_names = str_replace( array('[',']') , ''  , implode("','", $tags_array_string));
	$sql = "SELECT tag_id FROM tbltag WHERE tag_name IN ({$tag_names})";
	$query = mysqli_query($conn, $sql);
	while( $row = mysqli_fetch_array($query) ) {
		$tags_array_id[] = $row['tag_id'];
	};

	$tags_sql = '';
	foreach ($tags_array_id as &$tag_id) {
	  $tags_sql .= "INSERT INTO tblproduct_tag (product_id, tag_id, category_id) 
	  				VALUES ('".$id."','".$tag_id."','".$category."');";
	  //SAVE EACH ITEMS IN THE PRODUCT TAG TABLE
	};
	$conn->multi_query($tags_sql);
	$conn->close();

	//====================== XML INTEGRATION

	$new_product = $xml->createElement("product");
	$new_product->appendChild($xml->createElement('id', $id));
	$new_product->appendChild($xml->createElement('name', $name));
	$new_product->appendChild($xml->createElement('description', $description));
	$new_product->appendChild($xml->createElement('quantity', $quantity));
	$new_product->appendChild($xml->createElement('price', $price));
	$new_product->appendChild($xml->createElement('image', $product_image));
	$new_product->appendChild($xml->createElement('category', $category));

	$xml->getElementsByTagName('products')->item(0)->appendChild($new_product);

	$xml->Save('../../data/products.xml');

  header('Location: ../products_list.php');
  $return = Array(
  	"status" => "200",
  	"message" => "Success"
  );
?>