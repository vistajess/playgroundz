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
	0 =>'category_id', 
	1 => 'category_name',
	2 => 'category_details',
	3 => 'actions',
);

// getting total number records without any search
$sql = "SELECT * ";
$sql.=" FROM tblcategory";
$query=mysqli_query($conn, $sql) or die("getCategory.php: get category");
$totalData = mysqli_num_rows($query);
$totalFiltered = $totalData;  // when there is no search parameter then total number rows = total number filtered rows.


$sql = "SELECT * ";
$sql.=" FROM tblcategory WHERE 1=1";
if( !empty($requestData['search']['value']) ) {   // if there is a search parameter, $requestData['search']['value'] contains search parameter
	$sql.=" AND ( category_id LIKE '".$requestData['search']['value']."%' ";    
	$sql.=" OR category_name LIKE '".$requestData['search']['value']."%' )";
}
$query=mysqli_query($conn, $sql) or die("getCategory.php: get category");
$totalFiltered = mysqli_num_rows($query); // when there is a search parameter then we have to modify total number filtered rows as per search result. 
$sql.=" ORDER BY ". $columns[$requestData['order'][0]['column']]."   ".$requestData['order'][0]['dir']."  LIMIT ".$requestData['start']." ,".$requestData['length']."   ";
/* $requestData['order'][0]['column'] contains colmun index, $requestData['order'][0]['dir'] contains order such as asc/desc  */	
$query=mysqli_query($conn, $sql) or die("getCategory.php: get category");

$data = array();
while( $row=mysqli_fetch_array($query) ) {  // preparing an array
	$nestedData=array(); 

	$nestedData[] = $row["category_id"];
	$nestedData[] = $row["category_name"];
	$nestedData[] = $row["category_details"];
	$nestedData[] = "<a href='modules/edit_category.php?id=".$row['category_id']."'>Edit</a>
									<a href='modules/deleteCategory.php?id=".$row['category_id']."' onClick=\"javascript: return confirm('Please confirm deletion');\">Delete</a>";
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


