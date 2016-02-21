<?php

// connect to the database
include('../../config/config.php');
// confirm that the 'id' variable has been set
if (isset($_GET['id']) && is_numeric($_GET['id'])) {
// get the 'id' variable from the URL
  $id = $_GET['id'];

// delete record from database
if ($stmt = $conn->prepare("DELETE FROM tbluser WHERE userID = ? LIMIT 1")) {
  $stmt->bind_param("s",$id);
  $stmt->execute();
  $stmt->close();

  $return = Array(
    "status" => "200",
    "message" => "Success"
  );
  echo json_encode($return);

// delete to XML FILE
  $xml = new DOMDocument("1.0", "utf-8");
  $xml->formatOutput = true;
  $xml->preserveWhiteSpace = false;
  $xml->Load('../../data/users.xml');

  $root = $xml->getElementsByTagName('users')->item(0);
  $users = $root->getElementsByTagName('user'); 

  foreach ($users as $user) {
    $current_id = $user->getElementsByTagName('id')->item(0)->nodeValue;

    if($current_id == $id) 
      $root->removeChild($user);
  }
  $xml->Save('../../data/users.xml');

}
else
{
echo "ERROR: could not prepare SQL statement.";
}
$conn->close();

// redirect user after delete is successful
// header("Location: ../user_list.php");
}
else
// if the 'id' variable isn't set, redirect the user
{
// header("Location: ../user_list.php");
}

?>