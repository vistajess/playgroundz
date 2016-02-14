<?php
require '../src/start.php';
use PayPal\Api\Amount;
use PayPal\Api\Details;
use PayPal\Api\ExecutePayment;
use PayPal\Api\Payment;
use PayPal\Api\PaymentExecution;
use PayPal\Api\Transaction;

if (isset($_GET['success']) && $_GET['success'] == 'true') {

	$paymentId = $_GET['paymentId'];
  $payment = Payment::get($paymentId, $api);

  $execution = new PaymentExecution();
  $execution->setPayerId($_GET['PayerID']);

   $transaction = new Transaction();
    $amount = new Amount();
    $details = new Details();

    $details->setShipping(2.2)
        ->setTax(1.3)
        ->setSubtotal(17.50);

    $amount->setCurrency('USD');
    $amount->setTotal(21);
    $amount->setDetails($details);
    $transaction->setAmount($amount);

    $execution->addTransaction($transaction);

    try {
    	$result = $payment->execute($execution, $api);

    	try {
            $payment = Payment::get($paymentId, $api);
             // ResultPrinter::printResult("Executed Payment", "Payment", $payment->getId(), $execution, $result);
        } catch (Exception $ex) {
 	        // ResultPrinter::printError("Get Payment", "Payment", null, null, $ex);
 	        echo 'GET PAYMENT';
            exit(1);
        }
    } catch (Exception $ex) {
    	// ResultPrinter::printError("Executed Payment", "Payment", null, null, $ex);
    	echo "Executed Payment";
			exit(1);
    }
    // ResultPrinter::printResult("Get Payment", "Payment", $payment->getId(), null, $payment);
    echo 'Get Payment';
    return $payment;

    } else {
    // ResultPrinter::printResult("User Cancelled the Approval", null);
    	echo 'User Cancelled the Approval';
    exit;
	}
?>