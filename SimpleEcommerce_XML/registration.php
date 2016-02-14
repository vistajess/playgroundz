<?php
	session_start();
	include('config/config.php');
	if(isset($_POST['btnRegister'])) {

		$registerMessage;

		$firstName = $_POST['firstName'];

		if(isset($_POST['middleName']))
			$middleName = $_POST['middleName'];

		$lastName = $_POST['lastName'];
		$email1 = $_POST['email'];
		$email2 = $_POST['email2'];

		$password1 = $_POST['password1'];
		$password2 = $_POST['password2'];

		$birthdate = $_POST['birthdate'];

		if(isset($_POST['contact']))
			$contact = $_POST['contact'];

		$captcha1 = $_SESSION['captcha'];
		$captcha2 = $_POST['captcha'];

		$result = mysqli_query($conn, "SELECT * FROM tblUser WHERE email = '$email1'");

		if($email1 != $email2) {
			$registerMessage = "The two email address you entered are not the same.";
			$_SESSION['registerMessage'] = $registerMessage;
		}	else if ($password1 != $password2) {
			$registerMessage = "The two passwords you entered are not the same.";
			$_SESSION['registerMessage'] = $registerMessage;
		}	else if ($captcha1 != $captcha2) {
			$registerMessage = "The captcha code you entered is not correct.";
			$_SESSION['registerMessage'] = $registerMessage;
		} else if (mysqli_num_rows($result) > 0) {
			$registerMessage = "The email you entered is already registered.";
			$_SESSION['registerMessage'] = $registerMessage;
		}
		
		if(!isset($registerMessage)) {
			mysqli_query($conn, "INSERT INTO tblUser (firstName, middleName, lastName, contactNo, email, userPass, userTypeID, userName, birthdate) 
						  VALUES ('$firstName', '$middleName', '$lastName', '$contact', '$email1', '$password1', '3', 'guest', '$birthdate')");

			$registerMessage = "Your have successfully created a new account.";
			$_SESSION['registerMessage'] = $registerMessage;
		}
		// header('Location: /index.php/#login');
	}
	$_SESSION['captcha'] = rand(1000, 9999);
?>

<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
<form id = "registerForm" action = <?php echo $_SERVER['PHP_SELF'] ?> method = "POST">
					<table>
						<tr>
							<td class = "label"> <label for = "firstName"> First Name </label> </td>
							<td class = "label"> <label for = "middleName"> Middle Name </label> </td>
							<td class = "label"> <label for = "lastName"> Last Name </label> </td>
						</tr>

						<tr>
							<td> <input type = "text" name = "firstName" id = "firstName" required = "required"/> </td>
							<td> <input type = "text" name = "middleName" id = "middleName" /> </td>
							<td> <input type = "text" name = "lastName" id = "lastName" required = "required"/> </td>
						</tr>

						<tr>
							<td class = "label" colspan = "2"> <label for = "email"> Email Address </label> </td>
							<td class = "label"> <label for = "password1"> Password </label> </td>
							
						</tr>
						<tr>
							<td colspan = "2"> <input type = "email" name = "email" id = "email" style = "width: 350px;" required = "required"/> </td>
							<td> <input type = "password" name = "password1" id = "password1"  required = "required"/> </td>
						</tr>
						<tr>
							<td  class = "label" colspan = "2"> <label for = "email2"> Re-enter Email </label> </td>
							<td  class = "label" > <label for = "password2">Re-enter Password </label> </td>
							
						</tr>
						<tr>
							<td colspan = "2"> <input type = "email" name = "email2" id = "email2" style = "width: 350px;" required = "required"/> </td>
							<td> <input type = "password" name = "password2" id = "password2"  required = "required"/> </td>
						</tr>

						<tr>
							<td class = "label"> <label for = "birthdate"> Birthdate </label> </td>
							<td class = "label"> <label for = "contact">Contact No. </label> </td>
							<td> <img src = "generateCaptcha.php" /> </td>
						</tr>
						<tr>
							<td> <input type = "date" name = "birthdate" id = "birthdate" required = "required"/> </td>
							<td> <input type = "text" name = "contact" id = "contact" /> </td>
							<td> <input type = "text" name = "captcha" id = "captcha" placeholder = "Enter the code above"  required = "required"/> </td>
						</tr>
						<tr>
							<td></td>
							<td style = "margin-top: 20px;"> <input style = "margin-top: 40px;" type = "submit" value = "Create Account" name = "btnRegister" id = "btnRegister" /> </td>
							<td></td>
						</tr>
					</table>
					<center>
						<?php
							if(isset($_SESSION['registerMessage'])) {
								echo "<p>";
								echo $_SESSION['registerMessage'];
								echo "</p>";
							}
						?>
					</center>
				</form>

</body>
</html>