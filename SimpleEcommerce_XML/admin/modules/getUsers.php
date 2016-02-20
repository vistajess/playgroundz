<?php
/* Database connection end */
include('../../config/config.php');
// storing  request (ie, get/post) global array to a variable  
$requestData= $_REQUEST;


$columns = array( 
// datatable column index  => database column name
  0 =>'userID', 
  1 => 'firstName',
  2 => 'lastName',
  3 => 'email',
  4 => 'contactNo',
);

// getting total number records without any search
$sql = "SELECT * FROM `tbluser` where userTypeID = '3'";
$query=mysqli_query($conn, $sql) or die("getUsers.php: get User");
$totalData = mysqli_num_rows($query);
$totalFiltered = $totalData;  // when there is no search parameter then total number rows = total number filtered rows.


$sql = "SELECT * FROM `tbluser` where userTypeID = '3'";
if( !empty($requestData['search']['value']) ) {   // if there is a search parameter, $requestData['search']['value'] contains search parameter
  $sql.=" AND ( userID LIKE '".$requestData['search']['value']."%' ";    
  $sql.=" OR firstName LIKE '".$requestData['search']['value']."%' )";
}
$query=mysqli_query($conn, $sql) or die("getTransaction.php: get Transaction");
$totalFiltered = mysqli_num_rows($query); // when there is a search parameter then we have to modify total number filtered rows as per search result. 
$sql.=" ORDER BY ". $columns[$requestData['order'][0]['column']]."   ".$requestData['order'][0]['dir']."  LIMIT ".$requestData['start']." ,".$requestData['length']."   ";
/* $requestData['order'][0]['column'] contains colmun index, $requestData['order'][0]['dir'] contains order such as asc/desc  */  
$query=mysqli_query($conn, $sql) or die("getTag.php: get Tag");

$data = array();
while( $row=mysqli_fetch_array($query) ) {  // preparing an array
  $nestedData=array(); 

  $nestedData[] = $row["userID"];
  $nestedData[] = $row["firstName"];
  $nestedData[] = $row["lastName"];
  $nestedData[] = $row["email"];
  $nestedData[] = $row["contactNo"];
  $nestedData[] = "<a href='#delete_user_modal' id='delete_modal_button' data-id='".$row['userID']."'>Delete</a>";
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


