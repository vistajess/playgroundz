<?php
/* Database connection end */
	include('../config/config.php');
	// $products_array_string = $_POST['products'];
	// $products_array = substr($products_array_string, 1, -1);
	// echo $products_array;

	$user_id = $_POST['user_id'];
	$payment_method = $_POST['payment_method'];
	$transaction_id = $_POST['transaction_id'];
	$total_amount = $_POST['total_amount'];
	$products = $_POST['products'];
	$shipping_address = $_POST['shipping_address'];
	$shipping_contact_number = $_POST['shipping_contact_number'];
	$date_time = date('Y-m-d H:i:s');

  // Convert JSON string to Array
  $products_array = json_decode($products, true);
  $update_product_sql = '';
  $orders_sql = '';
  // print_r($products_array); die();
  foreach ($products_array as $key => $value) {
    $product_id = $value['product_id'];
    $quantity = $value['quantity'];
    $quantity_ordered = $value['quantity_ordered'];
    $diff = $quantity - $quantity_ordered;
	  $update_product_sql .= "UPDATE tblproduct set quantity='".$diff."' where product_id = '".$product_id."';";
	 	//UPDATE THE PRODUCT QUANTITY

	 	$orders_sql .= "INSERT INTO tbl_orders (order_id,user_id,product_id,price,quantity_ordered,subtotal,total,date_purchased,address,contact) 
        VALUES ('".$transaction_id."','".$user_id."','".$value['product_id']."','".$value['price']."','".$value['quantity_ordered']."','".$value['subtotal']."','".$total_amount."','".$date_time."','".$shipping_address."','".$shipping_contact_number."');";   
  }
  $conn->multi_query($update_product_sql);
	include('../config/config.php');
  $conn->multi_query($orders_sql);
	include('../config/config.php');
	$stmt = $conn->prepare("INSERT INTO tbl_transaction (user_id,payment_method,transaction_id,total_amount,transaction_date,shipping_address,shipping_contact_number) VALUES (?,?,?,?,?,?,?)");
  $stmt->bind_param("sssssss",$user_id,$payment_method,$transaction_id,$total_amount,$date_time,$shipping_address,$shipping_contact_number);
  $stmt->execute();
  $return = Array(
  	"status" => "200",
  	"message" => "Success"
  );
 	echo json_encode($return);
?>