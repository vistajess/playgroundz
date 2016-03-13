<?php

if (is_ajax()) {
  if (isset($_POST["action"]) && !empty($_POST["action"])) { //Checks if action value exists
    $action = $_POST["action"];
    switch($action) { //Switch case for value of action
      case "saveorder": saveOrder(); break;
      case "register_order": register_order(); break;
    }
  }
}
//Function to check if the request is an AJAX request
function is_ajax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

function register_order() {
	include('../config.php');


  $registration_data = $_POST['registration_data'];
  $next_id_sql = "SELECT Auto_increment FROM information_schema.tables WHERE table_name='tbluser'";
  $query = mysqli_query($conn, $next_id_sql);
	$result = mysqli_fetch_row($query);
	$user_id = $result[0];

  $usertypeid = 2;
	$stmt = $conn->prepare("INSERT INTO tbluser (userTypeID,firstName,lastName,address,contactNo,username,userpass) VALUES(?,?,?,?,?,?,?)");
  $stmt->bind_param("sssssss",$usertypeid,$registration_data['firstname'],$registration_data['lastname'],$registration_data['address'],$registration_data['contact'],$registration_data['username'],$registration_data['password']);
  $stmt->execute();


	$sql = "SELECT count(DISTINCT order_id) FROM tbl_order";
	$query = mysqli_query($conn, $sql);
	$result = mysqli_fetch_row($query);
	$order_id = $result[0] + 1;
 	$date_time = date('Y-m-d H:i:s');

  $cartItems = $_POST['cartItems'];
  $total = $_POST['total'];
  // $user_id = $next_id[0];
  $order_sql = '';
  $transaction_sql = '';
	foreach ($cartItems as &$cart) {
	  $order_sql .= "INSERT INTO tbl_order (order_id,user_id,product_id,price,quantity,subtotal,total,date_purchased) 
	  				VALUES ('".$order_id."','".$user_id."','".$cart['id']."','".$cart['price']."','".$cart['quantity']."','".$cart['subtotal']."','".$total."','".$date_time."');";
	  //SAVE EACH ITEMS IN THE ORDER TABLE

    $transaction_sql .= "INSERT INTO tbl_transaction (order_id,user_id,product_id,price,quantity,subtotal,total,date_purchased,address,contact) 
        VALUES ('".$order_id."','".$user_id."','".$cart['id']."','".$cart['price']."','".$cart['quantity']."','".$cart['subtotal']."','".$total."','".$date_time."','".$registration_data['address']."','".$registration_data['contact']."');";        
	};
  $conn->multi_query($order_sql);
  include('../config.php');
	$conn->multi_query($transaction_sql);
	$return = Array(
		"next_id" => $next_id_sql,
		"cartItems" => $cartItems,
		"order_id" => $order_id,
		"date" => $date_time,
		"sql" => $sql
	);
  
  echo json_encode($return);
}

function saveOrder() {
	include('../config.php');
	$sql = "SELECT count(DISTINCT order_id) FROM tbl_order";
	$query = mysqli_query($conn, $sql);
	$result = mysqli_fetch_row($query);
	$order_id = $result[0] + 1;
 	$date_time = date('Y-m-d H:i:s');

  $cartItems = $_POST['cartItems'];
  $user_info = $_POST['user_info'];
  $total = $_POST['total'];
  $user_id = $user_info['id'];
  $sql = '';
	foreach ($cartItems as &$cart) {
	  $sql .= "INSERT INTO tbl_order (order_id,user_id,product_id,price,quantity,subtotal,total,date_purchased) 
	  				VALUES ('".$order_id."','".$user_id."','".$cart['id']."','".$cart['price']."','".$cart['quantity']."','".$cart['subtotal']."','".$total."','".$date_time."');";
	  //SAVE EACH ITEMS IN THE ORDER TABLE
	};

	$conn->multi_query($sql);
	$return = Array(
		"user_info" => $user_info,
		"user_id" => $user_info['id'],
		"cartItems" => $cartItems,
		"order_id" => $order_id,
		"date" => $date_time,
		"sql" => $sql
	);

  echo json_encode($return);
}

?>
