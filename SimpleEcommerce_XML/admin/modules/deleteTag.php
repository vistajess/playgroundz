<?php

// connect to the database
include('../../config/config.php');
// confirm that the 'id' variable has been set
if (isset($_GET['id']) && is_numeric($_GET['id']))
{
// get the 'id' variable from the URL
$id = $_GET['id'];

// delete record from database
if ($stmt = $conn->prepare("DELETE FROM tbltag WHERE tag_id = ? LIMIT 1")) {
$stmt->bind_param("s",$id);
$stmt->execute();
$stmt->close();


// delete to XML FILE
	$xml = new DOMDocument("1.0", "utf-8");
	$xml->formatOutput = true;
	$xml->preserveWhiteSpace = false;
	$xml->Load('../../data/tags.xml');

	$root = $xml->getElementsByTagName('tags')->item(0);
	$tags = $root->getElementsByTagName('tag');	

	foreach ($tags as $tag) {
		$current_id = $tag->getElementsByTagName('id')->item(0)->nodeValue;

		if($current_id == $id) 
			$root->removeChild($tag);
	}
	$xml->Save('../../data/tags.xml');

}
else
{
echo "ERROR: could not prepare SQL statement.";
}
$conn->close();

// redirect user after delete is successful
header("Location: ../tag_list.php");
}
else
// if the 'id' variable isn't set, redirect the user
{
header("Location: ../tag_list.php");
}

?>