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
	0 =>'tag_id', 
	1 => 'tag_name',
	2 => 'actions',
);

// getting total number records without any search
$sql = "SELECT * ";
$sql.=" FROM tbltag";
$query=mysqli_query($conn, $sql) or die("getTag.php: get Tag");
$totalData = mysqli_num_rows($query);
$totalFiltered = $totalData;  // when there is no search parameter then total number rows = total number filtered rows.


$sql = "SELECT * ";
$sql.=" FROM tbltag WHERE 1=1";
if( !empty($requestData['search']['value']) ) {   // if there is a search parameter, $requestData['search']['value'] contains search parameter
	$sql.=" AND ( tag_id LIKE '".$requestData['search']['value']."%' ";    
	$sql.=" OR tag_name LIKE '".$requestData['search']['value']."%' )";
}
$query=mysqli_query($conn, $sql) or die("getTag.php: get Tag");
$totalFiltered = mysqli_num_rows($query); // when there is a search parameter then we have to modify total number filtered rows as per search result. 
$sql.=" ORDER BY ". $columns[$requestData['order'][0]['column']]."   ".$requestData['order'][0]['dir']."  LIMIT ".$requestData['start']." ,".$requestData['length']."   ";
/* $requestData['order'][0]['column'] contains colmun index, $requestData['order'][0]['dir'] contains order such as asc/desc  */	
$query=mysqli_query($conn, $sql) or die("getTag.php: get Tag");

$data = array();
while( $row=mysqli_fetch_array($query) ) {  // preparing an array
	$nestedData=array(); 

	$nestedData[] = $row["tag_id"];
	$nestedData[] = $row["tag_name"];
	$nestedData[] = "<a id='edit_tag_modal' href='#editTag' data-tag_name='".$row["tag_name"]."' data-tag_id='".$row["tag_id"]."'>Edit</a>
									<a href='modules/deleteTag.php?id=".$row['tag_id']."' onClick=\"javascript: return confirm('Do you want to delete this tag');\">Delete</a>";
	
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


