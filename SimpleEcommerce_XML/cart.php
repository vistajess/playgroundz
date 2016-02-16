<?php
session_start();

if(!isset($_SESSION["username"]) && !isset($_SESSION["user_id"])) {
	header('Location: index.php');
}
include('config/config.php');
	$user_id = $_SESSION['user_id'];
	$sql = "select id from tbl_transaction order by id  desc limit 1";
	$query = mysqli_query($conn, $sql);
	$result = mysqli_fetch_row($query);
	$transaction_id = $result[0] + 1;

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
			<div id="cart_container">
				<h4><i class="fa fa-shopping-cart"></i> Shopping Cart</h4>
				<table width="100%">
					<thead>
						<th width="25%">Image</th>
						<th width="15%">Item Name</th>
						<th width="15%">Quantity</th>
						<th width="15%">Price</th>
						<th width="15%">Subtotal</th>
						<th width="15%">Remove</th>
					</thead>
					<tbody></tbody>
				</table>
				<div id="shopping-cart-details">
				</div>
			</div>
		</div>
	</div>	

	<div class="footer">
		<div class="container">
			FOOTER
		</div>
	</div>
</div>

<!--  COD PAYMENT -->
<div id="codPayment" class="modalDialog">
    <div>	<a href="#close" title="Close" class="close">X</a>
    	<h2>Cash On Delivery Method</h2>
    		<div>
    			<label class="-display">Transaction Number</label>
    			<input type="text" disabled name="transaction_id" id="transaction_id" value="<?php echo $transaction_id;?>">
    		</div>
    		 <div>
    		 	<label class="-display">Total Amount</label>
    		 	<input type="text" id="cod_total" disabled name="cod_total" value="">
    		</div>
    		<div>
    		 	<label class="-display">Shipping Address: </label>
    		 	<input type="text" id="shipping_address" name="pay_amount" value="">
    		</div>
    		<div>
    		 	<label class="-display">Shipping Contact Number: </label>
    		 	<input type="text" id="shipping_contact_number" name="pay_amount" value="">
    		</div>
    		<div>
    			<button type="button" id="cod_pay" name="cod_pay" class="cod_pay">Pay</button>
    		</div>
    </div>
</div>
<?php include('footer.php'); ?>
</body>
<script type="text/javascript">
	var cart_items = JSON.parse('<?php echo $product_json;?>');
	var user_id = '<?php echo $user_id;?>';
</script>
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/typeahead.js"></script>
<script type="text/javascript" src="js/datatables_latest.js"></script>
<script type="text/javascript" src="js/cart.js"></script>
</html>
