<?php
include('config.php');
session_start();
$message = "";
if (isset($_POST['login'])) {
	$result = mysqli_query($conn,"SELECT * FROM tbluser WHERE username='" . $_POST["username"] . "' and userpass = '". $_POST["password"]."'");
	$row  = mysqli_fetch_array($result);
	if(is_array($row) && $row['userTypeID'] === '2' ) {
		$_SESSION["userid"] = $row['userID'];
		$_SESSION["username"] = $row['username'];
		$_SESSION["firstname"] = $row['firstName'];
		$_SESSION["lastname"] = $row['lastName'];
		$_SESSION["usertypeid"] = $row['userTypeID'];
		$_SESSION["address"] = $row['address'];
		$message = "Correct credentials";
		header('Location: shop.php');
		} else {
		$message = "Invalid Username or Password!";
		}
}

?>
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
<form name="frmUser" method="post" action="">
	<div class="message"><?php if($message != "") { echo $message; } ?></div>
	<input type="text" name="username">
	<input type="password" name="password">
	<button type="submit" name="login">Login</button>
</form>
<div>
	Proceed shopping without login
	<a href="shop.php">Go to Shop</a>
</div>
</body>
</html>
