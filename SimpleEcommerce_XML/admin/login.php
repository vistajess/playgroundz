<?php
include('../config/config.php');
session_start();
$message = "";
if (isset($_POST['login'])) {
	$result = mysqli_query($conn,"SELECT * FROM tbluser WHERE username='" . $_POST["username"] . "' and userpass = '". $_POST["password"]."'");
	$row  = mysqli_fetch_array($result);
	if(is_array($row) && $row['userTypeID'] === '1' ) {
		$_SESSION["username"] = $row['username'];
		$_SESSION["password"] = $row['userpass'];
		$message = "Correct credentials";
		header('Location: admin_index.php');
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
<body class="admin-login-bg">
<?php include('header.php'); ?>

	<div class="admin-login"  style="position: relative;height:100%">
		<div class="container">
				<div class=" panel center admin-login-panel">
						<div class="panel-header">
							ADMIN LOGIN
						</div>
						<div class="panel-body">
							<form name="frmUser" method="post" action="">
								<div class="user-login">
									<div class="form-group">
										<i class="fa fa-user"></i> <input type="text" placeholder="Username" name="username">
									</div>
									<div class="form-group">
										<i class="fa fa-lock"></i> <input type="password" placeholder="Password" name="password">
									</div>
									<div class="form-group">
										<button type="submit" name="login">Login</button>
									</div>
									<div class="message"><?php if($message != "") { echo $message; } ?></div>
								</div>
							</form>
						</div>
				</div>
		</div>
	</div>	
</body>
</html>
