<?php
include('../../config/config.php');

	$xml = new  DOMDocument("1.0", "utf-8");
	$xml->formatOutput = true;
	$xml->preserveWhiteSpace = false;
	$xml->Load('../../data/tags.xml');

	// $sql = "SELECT Auto_increment FROM information_schema.tables WHERE table_name='tbltag'";
	// $query = mysqli_query($conn, $sql);
	// $result = mysqli_fetch_row($query);
	$name = $_POST['tag_name'];
	
	$stmt = $conn->prepare("INSERT INTO tbltag (tag_name) VALUES(?)");
  $stmt->bind_param("s",$name);
  $stmt->execute();
  $id = mysqli_insert_id($conn);


	$new_tag = $xml->createElement("tag");
	$new_tag->appendChild($xml->createElement('id', $id));
	$new_tag->appendChild($xml->createElement('name', $name));

	$xml->getElementsByTagName('tags')->item(0)->appendChild($new_tag);

	$xml->Save('../../data/tags.xml');


  header('Location: ../tag_list.php');
?>
