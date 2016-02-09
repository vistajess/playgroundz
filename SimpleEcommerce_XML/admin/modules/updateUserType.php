<?php

// connect to the database
include('../../config/config.php');
// confirm that the 'id' variable has been set
if (isset($_POST['user_type_id']) && is_numeric($_POST['user_type_id'])){
// get the 'id' variable from the URL
$user_type_id = $_POST['user_type_id'];
$type_name = $_POST['type_name'];

// update record from database
$sql = "UPDATE tbluser_type set type_name ='".$type_name."' WHERE user_type_id = '".$user_type_id."' LIMIT 1";
$conn->query($sql);
if ($conn->query($sql)) {

	// $xml = new DOMDocument("1.0", "utf-8");
	// $xml->formatOutput = true;
	// $xml->preserveWhiteSpace = false;
	// $xml->Load('../../data/tags.xml');

	// $root = $xml->getElementsByTagName('tags')->item(0);
	// $tags = $root->getElementsByTagName('tag');	

	// foreach ($tags as $tag) {
	// 	if($tag->getElementsByTagName('id')->item(0)->nodeValue == $tag_id) {
	// 		$tag->getElementsByTagName('name')->item(0)->nodeValue = $tag_name;
	// 	}
	// }

	// $xml->Save('../../data/tags.xml');
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