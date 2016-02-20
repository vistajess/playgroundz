<?php
	$cart_paypal = $_POST['cart'];
	$grand_total = $_POST['grand_total'];
	$user_id = $_POST['user_id'];
	$shipping_address = $_POST['shipping_address'];
	$shipping_contact_number = $_POST['shipping_contact_number'];
	setcookie('cart_paypal',$cart_paypal,time() + (86400 * 7)); // 86400 = 1 day
	setcookie('grand_total',$grand_total,time() + (86400 * 7)); // 86400 = 1 day
	setcookie('user_id',$user_id,time() + (86400 * 7)); // 86400 = 1 day
	setcookie('shipping_address',$shipping_address,time() + (86400 * 7)); // 86400 = 1 day
	setcookie('shipping_contact_number',$shipping_contact_number,time() + (86400 * 7)); // 86400 = 1 day
	// die();
  $return = Array(
  	"status" => "200",
  	"message" => "Success"
  );
 	echo json_encode($return);
?>