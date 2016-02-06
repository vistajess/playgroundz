<?php
session_start();

if(!isset($_SESSION["username"]) && !isset($_SESSION["password"])) {
	header('Location: login.php');
}
?>
<!DOCTYPE html>
<html>
<head>
	<title>User Dashboard</title>
</head>
<body>
Welcome <?php echo $_SESSION["username"]; ?>
<a href="logout.php">Logout</a>
<div class="side-bar">
	<ul class="links">
		<li>
			<a href="">Users</a>
		</li>
		<li>
			<a href="category_list.php">Categories</a>
		</li>
		<li>
			<a href="tag_list.php">Tags</a>
		</li>
		<li>
			<a href="products_list.php">Products</a>
		</li>
	</ul>
</div>


</body>
</html>