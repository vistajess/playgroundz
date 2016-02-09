<?php
include('../../config/config.php');

	$sql = "SELECT Auto_increment FROM information_schema.tables WHERE table_name='tbluser_type'";
	$query = mysqli_query($conn, $sql);
	$result = mysqli_fetch_row($query);

	$id = $result[0];
	$name = $_POST['type_name'];

  $stmt = $conn->prepare("INSERT INTO tbluser_type (type_name) VALUES(?)");
  $stmt->bind_param("s",$name);
  $stmt->execute();
  header('Location: ../usertype_list.php');
?>
