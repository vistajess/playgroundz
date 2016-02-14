<?php
	session_start();
	header("Content-type: image/png");

	$text = $_SESSION['captcha'];

	$font_size = 30;

	$image_width = 120;
	$image_height = 35;

	$image = imagecreate($image_width, $image_height);
	imagecolorallocate($image, 255, 255, 255);

	$text_color = imagecolorallocate($image, 0, 0, 0);

	for($i = 0; $i < 30; $i++) {
		$x1 = rand(1, 100);
		$x2 = rand(1, 120);
		$y1 = rand(1, 100);
		$y2 = rand(1, 50);

		imageline($image, $x1, $y1, $x2, $y2, $text_color);
	}

	imagettftext($image, $font_size, 0, 15, 30, $text_color, 'captcha.ttf', $text);
	imagepng($image);
?>		