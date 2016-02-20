<?php
session_start();

if(!isset($_SESSION["username"]) && !isset($_SESSION["user_id"])) {
	header('Location: index.php');
}
include('config/config.php');
if( isset( $_COOKIE['cart']  )) { 
	$cart =  $_COOKIE['cart'];
	$cart_items = substr($cart, 1, -1);
	$sql = "SELECT * FROM `tblproduct` WHERE product_id in (".$cart_items.")";
} else { 
  $cart = array('0');
  $cart_items = implode(",",$cart);
  $sql = "SELECT * FROM `tblproduct` WHERE product_id in ('0')";
} 

$result = $conn->query($sql);
$json_rows = array();
$dummy_arr = array(
			        array('product_id' => '', 
			        		'product_name' => '',
			        		'product_image' => '',
			        		'description' => '',
			        		'price' => '',
			        		'quantity' => '',
			        		'quantity_ordered' => '',
			        		'category_id' => '',
			        		'subtotal' => '',
			        )
        );
$product_json = json_encode($dummy_arr);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
    	 $row['subtotal'] = $row['price'];
    	 $row['quantity_ordered'] = 1;
       $json_rows[] = $row;
    }
    $product_json = json_encode($json_rows);
} 
?>
<!DOCTYPE html>
<html>
<head>
	<title></title>
<?php include('header_links.php'); ?>
</head>
<body>

<div class="content-wrapper">
	<div class="header">
	<?php include('header.php'); ?>
	</div>

	<div class="content">
		<div class="container">
			<div class="success_transaction">
				<p>Paypal Transaction Completed.</p>
				<p>Thank you for shopping with us.</p>
				<p>Your transaction was successful, payment was received.</p>
				 <a href="category.php">Back to Shopping</a>
			</div>
		</div>
	</div>	

	<div class="footer">
		<div class="container">
			Copyright © 2016 cakesNbread All rights reserved	
			For more info, email us at: cakesnbread2016@ymail.com
		</div>
	</div>
</div>
<?php include('footer.php'); ?>
</body>
<script type="text/javascript">
	var cart_items = JSON.parse('<?php echo $product_json;?>');
</script>
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/typeahead.js"></script>
<script type="text/javascript" src="js/datatables_latest.js"></script>
<script type="text/javascript" src="js/cart.js"></script>
</html>
