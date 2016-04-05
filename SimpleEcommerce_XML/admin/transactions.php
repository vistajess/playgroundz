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
      <h2>Transaction List <a class="custom-btn" href="generateTransactionReport.php">Generate Report</a></h2>
      
      <label>Filter by Status</label>
      <select id="transaction_status">
        <option value="all">All</option>
        <option value="paid">Paid</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select><br><br>
      <table id="dataTableTransaction"  cellpadding="0" cellspacing="0" border="0" class="display" width="100%">
        <thead>
          <tr>
            <th>UserId</th>
            <th> Date </th>
            <th>Payment Method</th>
            <th>Transaction Number</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
      </table>
    </div>

</body>
<script type="text/javascript" src="../js/jquery.js"></script>
<script type="text/javascript" src="../js/datatables_latest.js"></script>
<script type="text/javascript" src="../js/transactions.js"></script>

</html>