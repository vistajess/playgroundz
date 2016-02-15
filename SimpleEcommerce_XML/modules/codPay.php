<?php

	$products_array_string = $_POST['products'];
	$products_array = substr($products_array_string, 1, -1);
	echo $products_array;
?>`