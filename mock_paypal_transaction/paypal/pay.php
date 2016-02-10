<?php
use PayPal\Api\Payment;
use PayPal\Api\PaymentExecution;
require '../src/start.php';

if(isset($_GET['approved'])) {
	$approved = $_GET['approved'] === 'true';

	if($approved) {
		$payerId = $_GET['PayerID'];
		// Get payment_id from the database
		$paymentId = $db->prepare("
			SELECT payment_id FROM 
			transactions_paypal
			WHERE hash = :hash
		");

		$paymentId->execute([
			'hash' => $_SESSION['paypal_hash']
		]);
		$paymentId = $paymentId->fetchObject()->payment_id;
		$payment = Payment::get($paymentId, $api);

		$execution = new PaymentExecution();
		$execution->setPayerId()
	} else {
		header('Location: ../paypal/cancelled.php');
	}
}

?>