<?php
require __DIR__.'/../vendor/autoload.php';
use PayPal\Rest\ApiContext;
use PayPal\Auth\OAuthTokenCredential;
session_start();


// API
$api = new ApiContext(
	new OAuthTokenCredential(
		'AfW8In-azkgCGbUO8dHwcSXCWQbHmL9IrDTfGZ0RZi-KSZv8-hjmFTuAkYuyg-s9IWSfV6FMyhWuypU0', // Paypal Client_ID
		'EGEOXp726A7ltcI3D33a7Z3_K0Tvd2dhQzZYK1gTkCy2CJ6BG9rqF2_fGOyR8RiSmYfVSC6jUB_T3dKp' // Paypal Client Secret
	)
);

$api->setConfig([
	'mode' => 'sandbox',
	'http.ConnectionTimeOut' => 30,
	'log.LogEnabled' => false,
	'log.FileName' => '',
	'log.LogLevel' => 'FINE',
	'validation.level' => 'log'
]);

?>