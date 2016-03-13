<?php
/* Database connection end */
include('../../config/config.php');
// storing  request (ie, get/post) global array to a variable  
$requestData= $_REQUEST;


$columns = array( 
// datatable column index  => database column name
  0 => 'order_id',
  1 => 'date_purchased',
  2 => 'total_amount',
  3 => 'contact',
  4 => 'address',
);

// getting total number records without any search
$sql = "SELECT * ";
$sql.=" FROM tbl_orders group by order_id";
$query=mysqli_query($conn, $sql) or die("getOrders.php: get Transaction");
$totalData = mysqli_num_rows($query);
$totalFiltered = $totalData;  // when there is no search parameter then total number rows = total number filtered rows.


$sql = "SELECT * ";
$sql.=" FROM tbl_orders WHERE 1=1 group by order_id";
if( !empty($requestData['search']['value']) ) {   // if there is a search parameter, $requestData['search']['value'] contains search parameter
  $sql.=" AND ( id LIKE '".$requestData['search']['value']."%' ";    
  $sql.=" OR total LIKE '".$requestData['search']['value']."%' )";
}
$query=mysqli_query($conn, $sql) or die("getOrders.php: get Transaction");
$totalFiltered = mysqli_num_rows($query); // when there is a search parameter then we have to modify total number filtered rows as per search result. 
$sql.=" ORDER BY ". $columns[$requestData['order'][0]['column']]."   ".$requestData['order'][0]['dir']."  LIMIT ".$requestData['start']." ,".$requestData['length']."   ";
/* $requestData['order'][0]['column'] contains colmun index, $requestData['order'][0]['dir'] contains order such as asc/desc  */  
$query=mysqli_query($conn, $sql) or die("getTag.php: get Tag");

$data = array();
while( $row=mysqli_fetch_array($query) ) {  // preparing an array
  $nestedData=array(); 

  $nestedData[] = $row["order_id"];
  $nestedData[] = $row["date_purchased"];
  $nestedData[] = $row["total"];
  $nestedData[] = $row["contact"];
  $nestedData[] = $row["address"];
  $nestedData[] = "<a id='orders_modal' target='_blank' href='modules/printOrder.php?id=".$row['order_id']."'>Print order</a>";
  
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


