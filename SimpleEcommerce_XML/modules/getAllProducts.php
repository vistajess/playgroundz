<?php
/* Database connection end */
include('../config/config.php');
// storing  request (ie, get/post) global array to a variable  
$requestData= $_REQUEST;


$columns = array( 
// datatable column index  => database column name
	0 => 'product_id',
	1 => 'product_image',
	2 => 'product_name',
	3 => 'price',
	4 => 'quantity',
	5 => 'actions',
);

// getting total number records without any search
$sql = "SELECT * FROM `tblproduct`";

$query=mysqli_query($conn, $sql) or die("getProducts.php: get products");
$totalData = mysqli_num_rows($query);
$totalFiltered = $totalData;  // when there is no search parameter then total number rows = total number filtered rows.


$sql = "SELECT * ";
$sql.=" FROM tblproduct WHERE 1=1";
if( !empty($requestData['search']['value']) ) {   // if there is a search parameter, $requestData['search']['value'] contains search parameter
	$sql.=" AND ( product_id LIKE '".$requestData['search']['value']."%' ";    
	$sql.=" OR product_name LIKE '".$requestData['search']['value']."%' ";

	$sql.=" OR description LIKE '".$requestData['search']['value']."%' )";
}
$query=mysqli_query($conn, $sql) or die("getProducts.php: get products");
$totalFiltered = mysqli_num_rows($query); // when there is a search parameter then we have to modify total number filtered rows as per search result. 
$sql.=" ORDER BY ". $columns[$requestData['order'][0]['column']]."   ".$requestData['order'][0]['dir']."  LIMIT ".$requestData['start']." ,".$requestData['length']."   ";
/* $requestData['order'][0]['column'] contains colmun index, $requestData['order'][0]['dir'] contains order such as asc/desc  */	
$query=mysqli_query($conn, $sql) or die("getProducts.php: get products");

$data = array();
while( $row=mysqli_fetch_array($query) ) {  // preparing an array
	$nestedData=array(); 

	$nestedData[] = '<input type="hidden" class="product_id" data-product_id="'.$row["product_id"].'">';
	$nestedData[] = '<img class="product-image" src="images/'.$row["product_image"].'">';
	$nestedData[] = '<h6 class="product-name">Product Name: ' . $row["product_name"] . '</h6>';
	$nestedData[] = '<h6 class="product-price">Price : ' . $row["price"] . '</h6>';
	$nestedData[] = '<h6 class="product-quantity">Quantity : ' . $row["quantity"] . '</h6>';
	$nestedData[] = "<a id='' class='view-product' href='product_view.php?product_id=".$row["product_id"]."' data-product_id='".$row["product_id"]."'
									data-product_name='".$row["product_name"]."' 
									data-product_image='".$row["product_image"]."' 
									data-quantity='".$row["quantity"]."' 
									data-price='".$row["price"]."'>View Product</a>";
$nestedData[] = '<span class="cart-indicator">Added to cart</span>';				
	
	$data[] = $nestedData;
}



$json_data = array(
			"draw"            => intval( $requestData['draw'] ),   // for every request/draw by clientside , they send a number as a parameter, when they recieve a response/data they first check the draw number, so we are sending same number in draw. 
			"recordsTotal"    => intval( $totalData ),  // total number of records
			"recordsFiltered" => intval( $totalFiltered ), // total number of records after searching, if there is no searching then totalFiltered = totalData
			"data"            => $data   // total data array
			);

echo json_encode($json_data);  // send data as json format

?>


