<?php
session_start();
unset($_SESSION["username"]);
unset($_SESSION["user_id"]);
unset($_SESSION["password"]);
unset($_SESSION["firstname"]);
unset($_SESSION["lastname"]);

header("Location:index.php");
?>