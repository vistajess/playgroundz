<?php
/* Database connection end */
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ecommerce_kim";

$conn = mysqli_connect($servername, $username, $password, $dbname) or die("Connection failed: " . mysqli_connect_error());
// storing  request (ie, get/post) global array to a variable  
$requestData= $_REQUEST;


$columns = array( 
// datatable column index  => database column name
	0 =>'product_id', 
	1 => 'product_name',
	2 => 'product_image',
	3 => 'description',
	4 => 'price',
	5 => 'quantity',
	6 => 'actions',
);

// getting total number records without any search
$sql = "SELECT * ";
$sql.=" FROM tblproduct";
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

	$nestedData[] = $row["product_id"];
	$nestedData[] = $row["product_name"];
	$nestedData[] = '<img src="../images/'.$row["product_image"].'">';
	$nestedData[] = $row["description"];
	$nestedData[] = $row["price"];
	$nestedData[] = $row["quantity"];
	$nestedData[] = "<a href='modules/editProduct.php?id=".$row['product_id']."'>Edit</a>
									<a href='modules/deleteProduct.php?id=".$row['product_id']."' onClick=\"javascript: return confirm('Please confirm deletion');\">Delete</a>";
	
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


