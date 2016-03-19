<?php 

include('../../config/config.php');
// confirm that the 'id' variable has been set
if (isset($_POST['order_id']) && is_numeric($_POST['order_id'])){
// get the 'id' variable from the URL
$order_id = $_POST['order_id'];
$status = $_POST['status'];

$sql = "UPDATE tbl_transaction set status ='".$status."' WHERE transaction_id = '".$order_id."' LIMIT 1";
$conn->query($sql);

include('../../config/config.php');

$sql = "UPDATE tbl_orders set status ='".$status."' WHERE order_id = '".$order_id."' LIMIT 1";
$conn->query($sql);

	$return = Array(
		"status" => "200",
		"message" => "Success",
	);
  echo json_encode($return);
}
// update record from database
// $sql = "UPDATE tbltag set tag_name ='".$tag_name."' WHERE tag_id = '".$tag_id."' LIMIT 1";
// $conn->query($sql);
?>