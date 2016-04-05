<?php
/* Database connection end */
include('../../config/config.php');
// storing  request (ie, get/post) global array to a variable  
$requestData= $_REQUEST;
$status = $_GET['status'];

$columns = array( 
// datatable column index  => database column name
  0 =>'user_id', 
  1 => 'transaction_date',
  2 => 'payment_method',
  3 => 'transaction_id',
  4 => 'total_amount',
  5 => 'status',
);

if($status == 'all') {
  // getting total number records without any search
  $sql = "SELECT * ";
  $sql.=" FROM tbl_transaction where status != 'pending'";
  $query=mysqli_query($conn, $sql) or die("getTransaction.php: get Transaction");
  $totalData = mysqli_num_rows($query);
  $totalFiltered = $totalData;  // when there is no search parameter then total number rows = total number filtered rows.
} else {
// getting total number records without any search
  $sql = "SELECT * ";
  $sql.=" FROM tbl_transaction where status ='".$status."'";
  $query=mysqli_query($conn, $sql) or die("getTransaction.php: get Transaction");
  $totalData = mysqli_num_rows($query);
  $totalFiltered = $totalData;  // when there is no search parameter then total number rows = total number filtered rows.

}

if($status == 'all') {
  $sql = "SELECT * ";
  $sql.=" FROM tbl_transaction WHERE 1=1 and status !='pending'";
}else {
  $sql = "SELECT * ";
  $sql.=" FROM tbl_transaction WHERE 1=1 and status ='".$status."'";
}
if( !empty($requestData['search']['value']) ) {   // if there is a search parameter, $requestData['search']['value'] contains search parameter
  $sql.=" AND ( transaction_id LIKE '".$requestData['search']['value']."%' ";    
  $sql.=" OR payment_method LIKE '".$requestData['search']['value']."%' )";
}
$query=mysqli_query($conn, $sql) or die("getTransaction.php: get Transaction 32");
$totalFiltered = mysqli_num_rows($query); // when there is a search parameter then we have to modify total number filtered rows as per search result. 
$sql.=" ORDER BY ". $columns[$requestData['order'][0]['column']]."   ".$requestData['order'][0]['dir']."  LIMIT ".$requestData['start']." ,".$requestData['length']."   ";
/* $requestData['order'][0]['column'] contains colmun index, $requestData['order'][0]['dir'] contains order such as asc/desc  */  
$query=mysqli_query($conn, $sql) or die("getTag.php: get Tag");

$data = array();
while( $row=mysqli_fetch_array($query) ) {  // preparing an array
  $nestedData=array(); 

  $nestedData[] = $row["user_id"];
  $nestedData[] = $row["transaction_date"];
  $nestedData[] = $row["payment_method"];
  $nestedData[] = $row["transaction_id"];
  $nestedData[] = $row["total_amount"];
  $nestedData[] = $row["status"];
  
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


