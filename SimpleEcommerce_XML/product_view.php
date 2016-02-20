<?php
session_start();

if(!isset($_SESSION["username"]) && !isset($_SESSION["user_id"])) {
	header('Location: index.php');
}


include('config/config.php');
if (isset($_GET['product_id']) && is_numeric($_GET['product_id'])) {
	$product_id = $_GET['product_id'];
	$query = "SELECT * FROM tblproduct left join tblcategory on tblproduct.category_id = tblcategory.category_id WHERE product_id='".$product_id."'";
	// $query = "SELECT * FROM tblproduct WHERE product_id ='".$product_id."'";
	$result = mysqli_query($conn, $query);
	$row = mysqli_fetch_assoc($result);

};
?>
<!DOCTYPE html>
<html>
<head>
	<title></title>
<?php include('header_links.php'); ?>
</head>
<body>
<div class="content-wrapper  product-view">
	<div class="header">
	<?php include('header.php'); ?>
	</div>

	<div class="content">
		<div class="container product-container">
			<h3 class="title">Product Details</h3>
			<div class="left-panel">
				<img class="image" src="images/<?php echo $row['product_image']; ?>">
			</div>
			<div class="right-panel">
				<p>Category Name: <?php echo $row['category_name']; ?></p>
				<p>Product Name: <?php echo $row['product_name']; ?></p>
				<p>Description: <?php echo $row['description']; ?></p>
				<p>Inventory : <?php echo $row['quantity']; ?></p>
				<p>Price : <?php echo $row['price']; ?></p>
				<p><button id="add-cart" class="product_view_btn" data-product_id="<?php echo $row['product_id']; ?>">Add To Cart</button>
				   <a href="cart.php"class="product_view_btn" style="background: #DD6E41;" >My Cart</a></p>
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
	var product_id = "<?php echo $row['product_id']; ?>";
</script>
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/product_view.js"></script>
</html>
