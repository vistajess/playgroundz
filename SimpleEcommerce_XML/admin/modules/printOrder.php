<!DOCTYPE html>
<?php
include('../../config/config.php');
session_start();
if(!isset($_SESSION["username"]) && !isset($_SESSION["password"])) {
    header('Location: login.php');
}
if (isset($_GET['id']) && is_numeric($_GET['id'])) {
	$order_id = $_GET['id'];
	$query = "SELECT * FROM tbl_orders left join tblproduct on tbl_orders.product_id = tblproduct.product_id WHERE order_id = ".$order_id."";
	$result = mysqli_query($conn, $query);
	$row = mysqli_fetch_assoc($result);

	$user_query = "SELECT * FROM tbluser WHERE userID='".$row['user_id']."'";
	$user_result = mysqli_query($conn, $user_query);
	$user = mysqli_fetch_assoc($user_result);
};
?>
<html>
<head>
	<title></title>
	<style type="text/css">
		.text-center {
			text-align: center;
		}
	</style>
</head>
<body>
<div>
	<h2 class="text-center">Order Reports</h2>
	<h4>Details</h4>
	<p>Order Number: <?php echo $row['id'];?></p>
	<p>Date Ordered: <?php echo $row['date_purchased'];?></p><br/>
	<p>Name: <?php echo $user['firstName']." ".$user['lastName'];?></p>
	<p>Contact: <?php echo $row['contact'];?></p>
	<p>Address: <?php echo $row['address'];?></p>
	<table border="1" >
    <thead>
      <tr>
        <th>Product Id</th>
        <th>Product Name</th>
        <th>Price</th>
        <th>Quantity Ordered</th>
        <th>subtotal</th>
      </tr>
    </thead>
      <tbody>
        <?php
          while( $record = mysqli_fetch_array( $result ) ){ ?>
          	<tr>
          		<td><?php echo $record['product_id'];?></td>
          		<td><?php echo $record['product_name'];?></td>
          		<td><?php echo $record['price'];?></td>
          		<td><?php echo $record['quantity_ordered'];?></td>
          		<td><?php echo $record['subtotal'];?></td>
          	</tr>          	          	
          <?php 
        	}
        ?>
      </tbody>
    </table>
  <p>Total Amount: <?php echo 'P '.$row['total'];?></p>
</div>
<script type="text/javascript">
	window.print();
</script>
</body>
</html>