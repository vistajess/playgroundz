<div class="container">
<?php 

$sql = "SELECT category_id,category_name FROM tblcategory";
$result = $conn->query($sql);



if(isset($_SESSION["username"]) && isset($_SESSION["user_id"])) { ?>
		<span class="user">Hi <?php echo $_SESSION['firstname'] . " " .$_SESSION['lastname'] ." ,";?></span>
<?php } ?>
		<ul class="navigation">
		<li> <a href="home.php">Home</a></li>
		<li> <a href="">About</a></li>
		<li style="position: relative;"> 
			<a href="category.php">Categories</a>
				<ul class="category">
					<?php
					// if ($result->num_rows > 0) {
					//     while($row = $result->fetch_assoc()) {
					 ?>
					 	<?php //echo '<li><a href="#">'.$row['category_name'].'</a></li>';?>
					 <?php
					//     }
					// }
					?>
				</ul>
		</li>
		<li> <a href="cart.php">Cart</a></li>
		<li> <a href="myorders.php">My Orders</a></li>
		<?php	if(isset($_SESSION["username"]) && isset($_SESSION["user_id"])) { ?>
			<li> <a href="logout.php">Logout</a></li>
		<?php } ?>
	</ul>
</div>