<?php
session_start();

if(!isset($_SESSION["username"]) && !isset($_SESSION["user_id"])) {
	header('Location: index.php');
}
include('config/config.php');
$sql = "SELECT * FROM tblproduct";
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
			<table id="products"  cellpadding="0" cellspacing="0" border="0" class="display" width="100%">
				<thead>
					<tr>
						<th>Product&nbsp;ID</th>
						<th>Product&nbsp;Image</th>
						<th>Product&nbsp;Name</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Actions</th>
					</tr>
					</thead>
			</table>

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
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/typeahead.js"></script>
<script type="text/javascript" src="js/datatables_latest.js"></script>
<script type="text/javascript" src="js/getAllProduct.js"></script>
</html>
