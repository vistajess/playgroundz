<?php
// echo json_encode($_SERVER); die();
require 'paypalStart.php';
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
//===================================
$cart_paypal = $_COOKIE['cart_paypal'];
$cart_total = $_COOKIE['grand_total'];
$shipping_address = $_COOKIE['shipping_address'];
$shipping_contact_number = $_COOKIE['shipping_contact_number'];

  // Convert JSON string to Array
$shopping_list = array();
$cart_array = json_decode($cart_paypal, true);
foreach ($cart_array as $key => $cart_item) {
    $item = new Item();
    $item->setName($cart_item['product_name'])
        ->setCurrency('USD')
        ->setQuantity($cart_item['quantity_ordered'])
        ->setSku($cart_item['product_id']) // Similar to `item_number` in Classic API
        ->setPrice($cart_item['price']);
    $shopping_list[] = $item;
//UPDATE THE PRODUCT QUANTITY
}

function getBaseUrl() {
    // output: /myproject/index.php
    $currentPath = $_SERVER['PHP_SELF']; 
    // output: Array ( [dirname] => /myproject [basename] => index.php [extension] => php [filename] => index ) 
    $pathInfo = pathinfo($currentPath); 
    // output: localhost
    $hostName = $_SERVER['HTTP_HOST']; 
    // output: http://
    $protocol = strtolower(substr($_SERVER["SERVER_PROTOCOL"],0,5))=='https://'?'https://':'http://';
    // return: http://localhost/myproject/
    return $protocol.$hostName.$pathInfo['dirname']."/";
}

$itemList = new ItemList();
// $itemList->setItems(array($item1, $item2));
$itemList->setItems($shopping_list);

$details = new Details();
$details->setShipping(1.2)
    ->setTax(1.3)
    ->setSubtotal($cart_total);
$total = $cart_total + 1.2 + 1.3;

//========================================
$amount = new Amount();
$amount->setCurrency("USD")
    ->setTotal($total)
    ->setDetails($details);

$transaction = new Transaction();
$transaction->setAmount($amount)
    ->setItemList($itemList)
    ->setDescription("Payment description")
    ->setInvoiceNumber(uniqid());


$redirectUrls = new RedirectUrls();
// echo getBaseUrl()."executePaypalPayment.php?success=true";die();
// $redirectUrls->setReturnUrl('http://localhost:5050/modules/executePaypalPayment.php?success=true')
// echo "http://".$_SERVER['HTTP_HOST']."/modules/executePaypalPayment.php?success=true"; die();
// $redirectUrls->setReturnUrl(getBaseUrl()."/modules/executePaypalPayment.php?success=true")
$redirectUrls->setReturnUrl("http://".$_SERVER['HTTP_HOST']."/modules/executePaypalPayment.php?success=true")
    ->setCancelUrl("http://".$_SERVER['HTTP_HOST']."/modules/executePaypalPayment.php?success=false");


// $redirectUrls->setReturnUrl("http://".$_SERVER['HTTP_HOST']."/modules/executePaypalPayment.php?success=true")
//     ->setCancelUrl("http://".$_SERVER['HTTP_HOST']."/modules/executePaypalPayment.php?success=false");

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
?>