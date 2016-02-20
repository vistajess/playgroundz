<!DOCTYPE html>
<html>
<?php
session_start();
if(!isset($_SESSION["username"]) && !isset($_SESSION["password"])) {
    header('Location: login.php');
}
include('header.php');
?>
<body class="admin-bg">

<?php include('sidebar.php');?>
<div class="container">
    <div class="admin-content">
	<h2>User Type List <a class="custom-btn" href="#addUserType">Add User Type</a></h2>
	
	<table id="dataTableUserType"  cellpadding="0" cellspacing="0" border="0" class="display" width="100%">
				<thead>
					<tr>
						<th>ID</th>
						<th>Type</th>
						<th>Actions</th>
					</tr>
				</thead>
		</table>
</div>
<!-- ADD TAG -->
<div id="addUserType" class="modalDialog">
    <div>	<a href="#close" title="Close" class="close">X</a>
    	<h2>Add UserType</h2>
    	<form method="post" action="modules/addUserType.php">
    		<div>
    			<label class="-display">User Type Name</label>
    			<input type="text" name="type_name">
    		</div>
    		<div>
    			<button type="submit" name="add_tag">Add User Type</button>
    		</div>
    	</form>
    </div>
</div>
<!-- EDIT USER TYPE -->
<div id="editUserType" class="modalDialog">
    <div>   <a href="#close" title="Close" class="close">X</a>
        <h2>Update User Type</h2>
        <form>
            <div>
                <label class="-display">User Type ID</label>
                <input type="text" name="usertype_id" id="edit_usertype_id" disabled>
            </div>
            <div>
                <label class="-display">Type Name</label>
                <input type="text" name="usertype_name" id="edit_usertype_name">
            </div>
            <div>
                <button type="submit" name="update_usertype" id="update_usertype">Update User Type</button>
            </div>
        </form>
    </div>
</div>
</body>
<script type="text/javascript" src="../js/jquery.js"></script>
<script type="text/javascript" src="../js/datatables_latest.js"></script>
<script type="text/javascript" src="../js/usertype.js"></script>

</html>