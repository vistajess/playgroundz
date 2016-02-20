<?php
require 'paypalStart.php';
use PayPal\Api\Amount;
use PayPal\Api\Details;
use PayPal\Api\ExecutePayment;
use PayPal\Api\Payment;
use PayPal\Api\PaymentExecution;
use PayPal\Api\Transaction;

if (isset($_GET['success']) && $_GET['success'] == 'true') {
  $cart_total = $_COOKIE['grand_total'];
  $paymentId = $_GET['paymentId'];
  $payment = Payment::get($paymentId, $api);

  $execution = new PaymentExecution();
  $execution->setPayerId($_GET['PayerID']);

   $transaction = new Transaction();
    $amount = new Amount();
    $details = new Details();

    $details->setShipping(1.2)
        ->setTax(1.3)
        ->setSubtotal($cart_total);
    $total = $cart_total + 1.2 + 1.3;
    $amount->setCurrency('USD');
    $amount->setTotal($total);
    $amount->setDetails($details);
    $transaction->setAmount($amount);

    $execution->addTransaction($transaction);

    try {
    	$result = $payment->execute($execution, $api);

    	try {
            $payment = Payment::get($paymentId, $api);
             // ResultPrinter::printResult("Executed Payment", "Payment", $payment->getId(), $execution, $result);
            echo "Executed Payment";
        } catch (Exception $ex) {
 	        // ResultPrinter::printError("Get Payment", "Payment", null, null, $ex);
 	        echo 'Error GET PAYMENT';
            exit(1);
        }
    } catch (Exception $ex) {
    	// ResultPrinter::printError("Executed Payment", "Payment", null, null, $ex);
    	echo "Error Executed Payment";
			exit(1);
    }
    // ResultPrinter::printResult("Get Payment", "Payment", $payment->getId(), null, $payment);
    echo 'Result Get Payment';

    include('../config/config.php');
    $payment_method = 'paypal';
    $user_id = $_COOKIE['user_id'];
    $transaction_id = $_GET['paymentId'];
    $shipping_address = $_COOKIE['shipping_address'];
    $shipping_contact_number = $_COOKIE['shipping_contact_number'];
    $date_time = date('Y-m-d H:i:s');
    $stmt = $conn->prepare("INSERT INTO tbl_transaction (user_id,payment_method,transaction_id,total_amount,transaction_date,shipping_address,shipping_contact_number) VALUES (?,?,?,?,?,?,?)");
    $stmt->bind_param("sssssss",$user_id,$payment_method,$transaction_id,$total,$date_time,$shipping_address,$shipping_contact_number);
    $stmt->execute();

    header('Location: ../paypal_success_transaction.php');
    return $payment;

    } else {
    // ResultPrinter::printResult("User Cancelled the Approval", null);
    	echo 'User Cancelled the Approval';
    exit;
	}
?>