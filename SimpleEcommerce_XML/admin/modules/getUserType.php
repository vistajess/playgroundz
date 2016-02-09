<?php
/* Database connection end */
include('../../config/config.php');
// storing  request (ie, get/post) global array to a variable  
$requestData= $_REQUEST;


$columns = array( 
// datatable column index  => database column name
	0 =>'user_type_id', 
	1 => 'type_name',
	2 => 'actions',
);

// getting total number records without any search
$sql = "SELECT * ";
$sql.=" FROM tbluser_type";
$query=mysqli_query($conn, $sql) or die("getUserType.php: get Tag");
$totalData = mysqli_num_rows($query);
$totalFiltered = $totalData;  // when there is no search parameter then total number rows = total number filtered rows.


$sql = "SELECT * ";
$sql.=" FROM tbluser_type WHERE 1=1";
if( !empty($requestData['search']['value']) ) {   // if there is a search parameter, $requestData['search']['value'] contains search parameter
	$sql.=" AND ( user_type_id LIKE '".$requestData['search']['value']."%' ";    
	$sql.=" OR type_name LIKE '".$requestData['search']['value']."%' )";
}
$query=mysqli_query($conn, $sql) or die("getUserType.php: get Tag");
$totalFiltered = mysqli_num_rows($query); // when there is a search parameter then we have to modify total number filtered rows as per search result. 
$sql.=" ORDER BY ". $columns[$requestData['order'][0]['column']]."   ".$requestData['order'][0]['dir']."  LIMIT ".$requestData['start']." ,".$requestData['length']."   ";
/* $requestData['order'][0]['column'] contains colmun index, $requestData['order'][0]['dir'] contains order such as asc/desc  */	
$query=mysqli_query($conn, $sql) or die("getUserType.php: get Tag");

$data = array();
while( $row=mysqli_fetch_array($query) ) {  // preparing an array
	$nestedData=array(); 

	$nestedData[] = $row["user_type_id"];
	$nestedData[] = $row["type_name"];
	$nestedData[] = "<a id='edit_usertype_modal' href='#editUserType' data-type_name='".$row["type_name"]."' data-user_type_id='".$row["user_type_id"]."'>Edit</a>
									<a href='modules/deleteUserType.php?id=".$row['user_type_id']."' onClick=\"javascript: return confirm('Do you want to delete this user type');\">Delete</a>";
	
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


