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
	<?php include('header.php'); ?>
</head>
<body class="admin-bg">
Welcome <?php echo $_SESSION["username"]; ?>
<?php include('sidebar.php');?>
<div class="container">

</div>
</body>
</html>