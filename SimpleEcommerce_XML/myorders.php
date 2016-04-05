<?php
session_start();

if(!isset($_SESSION["username"]) && !isset($_SESSION["user_id"])) {
	header('Location: index.php');
}
include('config/config.php');
$sql = "SELECT category_id,category_name FROM tblcategory";
$result = $conn->query($sql);
$json_rows = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
       $json_rows[] = $row;
    }
    $category_json = json_encode($json_rows);
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
				<div class="wrapper">
					<h2>My Orders</h2>
					<table id="dataTableOrders"  cellpadding="0" cellspacing="0" border="0" class="display" width="100%">
		        <thead>
		          <tr>
		            <th>Order Id</th>
		            <th> Date </th>
		            <th>Amount</th>
		            <th>Contact Number</th>
		            <th> Address </th>
		            <th> Status </th>
		            <th> Print </th>
		          </tr>
		        </thead>
		      </table>
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
	var categories = JSON.parse('<?php echo $category_json; ?>');
	var user_id = "<?php echo $_SESSION['user_id']; ?>";
</script>
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/typeahead.js"></script>
<script type="text/javascript" src="js/datatables_latest.js"></script>
<script type="text/javascript" src="js/customer_profile_order.js"></script>
</html>
