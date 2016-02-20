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
      <h2>User List <a class="custom-btn" href="#addTagModal" style="display:none;">Add User</a></h2>
      
      <table id="dataTableUser"  cellpadding="0" cellspacing="0" border="0" class="display" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        </table>
    </div>
<!-- ADD TAG -->
<div id="delete_user_modal" class="modalDialog">
    <div> <a href="#close" title="Close" class="close">X</a>
      <h2>Delete User</h2>
      <form method="post" action="modules/addTag.php">
        <div>
          <label class="-display">User Id</label>
          <input type="text" name="userID" id="user_id" disabled>
        </div>
        <div>
          <label class="-display">Please input admin password before deleting : </label>
          <input type="password" name="admin_password" id="admin_password">
        </div>
        <div>
          <label class="message"></label>
        </div>
        <div>
          <button type="button" name="delete_user" id="deleteUser">Delete User</button>
        </div>
      </form>
    </div>
</div>
</body>
<script type="text/javascript">
  var password = '<?php echo $_SESSION["password"];?>';  
</script>
<script type="text/javascript" src="../js/jquery.js"></script>
<script type="text/javascript" src="../js/datatables_latest.js"></script>
<script type="text/javascript" src="../js/users.js"></script>

</html>