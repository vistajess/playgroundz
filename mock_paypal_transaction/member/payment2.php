<?php

// require __DIR__ . '/../bootstrap.php';
require '../src/start.php';
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\Payer;
use PayPal\Api\Details;
use PayPal\Api\Amount;
use PayPal\Api\Transaction;
use PayPal\Api\Payment;
use PayPal\Api\RedirectUrls;
$payer = new Payer();
$payer->setPaymentMethod("paypal");

$item1 = new Item();
$item1->setName('Ground Coffee 40 oz')
    ->setCurrency('USD')
    ->setQuantity(1)
    ->setSku("123123") // Similar to `item_number` in Classic API
    ->setPrice(100);
$item2 = new Item();
$item2->setName('Granola bars')
    ->setCurrency('USD')
    ->setQuantity(1)
    ->setSku("321321") // Similar to `item_number` in Classic API
    ->setPrice(100);

$itemList = new ItemList();
$itemList->setItems(array($item1, $item2));

$details = new Details();
$details->setShipping(1.2)
    ->setTax(1.3)
    ->setSubtotal(200);
$fakeTotal = 200 + 1.2 + 1.3;
$amount = new Amount();
$amount->setCurrency("USD")
    ->setTotal($fakeTotal)
    ->setDetails($details);

$transaction = new Transaction();
$transaction->setAmount($amount)
    ->setItemList($itemList)
    ->setDescription("Payment description")
    ->setInvoiceNumber(uniqid());


$redirectUrls = new RedirectUrls();
$redirectUrls->setReturnUrl('http://localhost:9090/member/executePayment.php?success=true')
    ->setCancelUrl('http://localhost:9090/member/executePayment.php?success=false');

$payment = new Payment();
$payment->setIntent("sale")
    ->setPayer($payer)
    ->setRedirectUrls($redirectUrls)
    ->setTransactions(array($transaction));

$request = clone $payment;

try {
    $payment->create($api);
    echo 'payment';
} catch (Exception $ex) {
    echo 'error';
	// ResultPrinter::printError("Created Payment Using PayPal. Please visit the URL to Approve.", "Payment", null, $request, $ex);
    exit(1);
}

$approvalUrl = $payment->getApprovalLink();

foreach ($payment->getLinks() as $link) {
    # code...
    if($link->getRel() == 'approval_url') {
        $redirectUrl = $link->getHref();
    }
}
header('Location: ' . $redirectUrl);
 // ResultPrinter::printResult("Created Payment Using PayPal. Please visit the URL to Approve.", "Payment", "<a href='$approvalUrl' >$approvalUrl</a>", $request, $payment);


