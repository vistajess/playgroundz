<?php
require 'src/start.php';
?>

<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
<?php
 	if($user->member) {
 		echo 'you are a member';
 	} else {
 		echo 'You are not a member. <a href="member/payment2.php">Become a member</a>';
 	}
 ?>
</body>
</html>