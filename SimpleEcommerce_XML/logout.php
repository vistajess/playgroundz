<?php
session_start();
unset($_SESSION["username"]);
unset($_SESSION["user_id"]);
unset($_SESSION["password"]);
unset($_SESSION["firstname"]);
unset($_SESSION["lastname"]);

if (isset($_COOKIE['cart'])) {
    unset($_COOKIE['cart']);
    setcookie('cart', '', time() - 3600, '/'); // empty value and old timestamp
}

header("Location:index.php");
?>