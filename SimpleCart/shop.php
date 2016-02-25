<?php
include('config.php');
session_start();

$sql = "SELECT * FROM product_tbl";
$result = $conn->query($sql);
$json_rows = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
       $json_rows[] = $row;
    }
    $product_json = json_encode($json_rows);
} else {
    echo "0 results";
}

$userid = '';
$username = '';
$firstname = '';
$lastname = '';
$usertypeid = '';
$address = '';
if(isset($_SESSION['username'])) {
	$userid = $_SESSION['userid'];
	$username = $_SESSION['username'];
	$firstname = $_SESSION['firstname'];
	$lastname = $_SESSION['lastname'];
	$address = $_SESSION['address'];
}

$conn->close();
?>
<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<link rel="stylesheet" type="text/css" href="css/modal.css">
</head>
<body>
<div class="container">
	<h6>
		<?php
		if(isset($_SESSION["username"])) {
			echo 'YOU ARE LOGGED IN ' .$_SESSION["username"];
			echo '<a href="logout.php">Logout</a>';
		} else {
			echo 'YOU ARE NOT LOGGED IN ';
			echo '<a href="login.php">Login</a>';
		}
		?>
	</h6>

  <button id="floating_button" class="btn btn-info" data-toggle="modal" data-target="#shopModal">Floating Button</button>
	<div class="row">
		<div class="search col-md-3">
			<div class="form-group">
				<label>Search Item</label><br>
				<input type="text" id="search_item" class="margin-bottom-10"><br>
				<button id="search_btn" class="btn btn-info">Search</button>
				<button id="show_all" class="btn btn-warning">Reset Search</button>
			</div>
			<div class="form-group">
				<label>Sort Items By</label>
					<select id="sort_items">
						<option value="id">ID</option>
						<option value="name">Name</option>
						<option value="price">Price</option>
					</select>
			</div>
		</div>
		<div class="col-md-9">
			<h3>PRODUCT LIST</h3>
			<div id="product-container">
			</div>
		</div>
	</div>
</div>
<!-- Trigger the modal with a button -->
<!-- Modal -->
<div id="shopModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Product Details</h4>
      </div>
      <div class="modal-body">
       	<div class="col-md-12">	
					<h3>SHOPPING CART</h3>
						<div id="cart-container">
							<ul id="cart-list">
							</ul>
						</div>
						<div class="actions">
							<?php
								if(isset($_SESSION["username"])) {
									echo '<button id="order_button" class="btn btn-success"> Send Order</button>';
								} else {
									echo '<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Register before Order</button>';
								}
							?>
						</div>
					</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>  

<!-- Modal -->
<div id="itemDetail" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Product Details</h4>
      </div>
      <div class="modal-body">
        <p>Some text in the modal.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>  

<!-- Modal -->
<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Register</h4>
      </div>
      <div class="modal-body">
       	<form id="registration">
	    		<div>
	    			<label class="-display">First Name</label>
	    			<input required type="text" name="firstname">
	    		</div>
	    		<div>
	    			<label class="-display">Last Name</label>
	    			<input required type="text" name="lastname">
	    		</div>
	    		<div>
	    			<label class="-display">Address</label>
	    			<input required type="text" name="address">
	    		</div>
	    		<div>
	    			<label class="-display">Username</label>
	    			<input required type="text" name="username">
	    		</div>
	    		<div>
	    			<label class="-display">Password</label>
	    			<input required type="text" name="password">
	    		</div>
	    		<div>
	    			<button type="button" id="register_order" class="btn btn-default">Register and Order</button>
	    		</div>
	    	</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
<script type="text/javascript">
	var products = JSON.parse('<?php echo $product_json; ?>');
	var user_info = {
		"id" : '<?php echo $userid;?>',
		"username" : '<?php echo $username;?>',
		"firstname" : '<?php echo $firstname;?>',
		"lastname" : '<?php echo $lastname;?>',
		"address" : '<?php echo $address;?>',
	};
</script>
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/index.js"></script>
<script type="text/javascript" src="js/ajaxOrders.js"></script>
</body>
</html>