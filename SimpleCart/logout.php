<?php
session_start();
unset($_SESSION["userid"]);
unset($_SESSION["username"]);
unset($_SESSION["firstname"]);
unset($_SESSION["lastname"]);
unset($_SESSION["usertypeid"]);
unset($_SESSION["address"]);
header("Location:login.php");
?>