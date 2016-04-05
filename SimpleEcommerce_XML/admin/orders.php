<!DOCTYPE html>
<html>
<?php
session_start();
if(!isset($_SESSION["username"]) && !isset($_SESSION["password"])) {
    header('Location: login.php');
}
include('header.php');
?>
<!-- <body> -->
<body class="admin-bg">

<?php include('sidebar.php');?>
<div class="container">
    <div class="admin-content">
      <h2>Order Reports <a class="custom-btn" href="generateTransactionReport.php">Generate Report</a></h2>
      <table id="dataTableOrders"  cellpadding="0" cellspacing="0" border="0" class="display" width="100%">
        <thead>
          <tr>
            <th>Order Id</th>
            <th> Date </th>
            <th>Amount</th>
            <th>Contact Number</th>
            <th> Address </th>
            <th> Status </th>
            <th> Print </th>
          </tr>
        </thead>
      </table>
    </div>

</body>
<script type="text/javascript" src="../js/jquery.js"></script>
<script type="text/javascript" src="../js/datatables_latest.js"></script>
<script type="text/javascript" src="../js/orders.js"></script>

</html>