<?php
session_start();

if(!isset($_SESSION["username"]) && !isset($_SESSION["user_id"])) {
	header('Location: index.php');
}
include('config/config.php');
if( isset( $_COOKIE['cart']  )) { 
	$cart =  $_COOKIE['cart'];
	$cart_items = substr($cart, 1, -1);
} else { 
  $cart = array('0');
  $cart_items = implode(",",$cart);
} 

$sql = "SELECT * FROM `tblproduct` WHERE product_id in (".$cart_items.")";
echo $sql;
$result = $conn->query($sql);
$json_rows = array();
$dummy_arr = array(
			        array('product_id' => '', 
			        		'product_name' => '',
			        		'product_image' => '',
			        		'description' => '',
			        		'price' => '',
			        		'quantity' => '',
			        		'category_id' => '',
			        )
        );
$product_json = json_encode($dummy_arr);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
       $json_rows[] = $row;
    }
    $product_json = json_encode($json_rows);
} else {
   echo "0 results";
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
			<div id="cart_container">
				<h4><i class="fa fa-shopping-cart"></i> Shopping Cart</h4>
				<table width="100%">
					<tr>
						<th width="25%">Image</th>
						<th width="25%">Item Name</th>
						<th width="25%">Quantity</th>
						<th width="25%">Price</th>
					</tr>
				</table>
			</div>
		</div>
	</div>	

	<div class="footer">
		<div class="container">
			FOOTER
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
