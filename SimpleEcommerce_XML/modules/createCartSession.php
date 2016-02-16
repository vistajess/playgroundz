<?php
	$cart_paypal = $_POST['cart'];
	$grand_total = $_POST['grand_total'];
	setcookie('cart_paypal',$cart_paypal,time() + (86400 * 7)); // 86400 = 1 day
	setcookie('grand_total',$grand_total,time() + (86400 * 7)); // 86400 = 1 day

  $return = Array(
  	"status" => "200",
  	"message" => "Success"
  );
 	echo json_encode($return);
?>