<?php include('config/config.php'); 
session_start();
unset($_SESSION["registerMessage"]);

$message = "";
if (isset($_POST['login'])) {
	$result = mysqli_query($conn,"SELECT * FROM tbluser WHERE email='" . $_POST["email"] . "' and userpass = '". $_POST["password"]."'");
	$row  = mysqli_fetch_array($result);
	if(is_array($row) && $row['userTypeID'] === '3' ) {
		$_SESSION["username"] = $row['username'];
		$_SESSION["user_id"] = $row['userID'];
		$_SESSION["firstname"] = $row['firstName'];
		$_SESSION["lastname"] = $row['lastName'];
		$message = "Correct credentials";
		header('Location: home.php');
		} else {
		$message = "Invalid Username or Password!";
		}
}
?>

<!DOCTYPE html>
<html>
<head>
	<title>Cakes N Bread</title>
<?php include('header_links.php'); ?>

</head>
<body>
<div class="content-wrapper">
	<div class="header">
	<?php //include('header.php'); ?>
	</div>

	<div class="content"  style="position: relative;">
		<div class="container">
				<div class="user-panel panel">
						<div class="panel-header">
							Log in
						</div>
						<div class="panel-body">
							<form name="frmUser" method="post" action="">
								<div class="user-login">
									<div class="form-group">
										<i class="fa fa-user"></i> <input type="text" placeholder="Email Address" name="email">
									</div>
									<div class="form-group">
										<i class="fa fa-lock"></i> <input type="password" placeholder="Password" name="password">
									</div>
									<div class="form-group">
										<button type="submit" name="login">Login</button>
									</div>
									<div class="message"><?php if($message != "") { echo $message; } ?></div>
									<p>Do not have an account yet? <a href="registration.php">Click here</a></p>
									<p>Need help?</p>
								</div>
							</form>
						</div>
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
</html>
