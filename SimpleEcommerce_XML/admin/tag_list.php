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
    	<h2>Tags List</h2>
    	<a href="#addTagModal">Add Tag</a>
    	<table id="dataTableTag"  cellpadding="0" cellspacing="0" border="0" class="display" width="100%">
    				<thead>
    					<tr>
    						<th>ID</th>
    						<th>Tag&nbsp;Name</th>
    						<th>Actions</th>
    					</tr>
    				</thead>
    		</table>
    </div>
<!-- ADD TAG -->
<div id="addTagModal" class="modalDialog">
    <div>	<a href="#close" title="Close" class="close">X</a>
    	<h2>Add Tag</h2>
    	<form method="post" action="modules/addTag.php">
    		<div>
    			<label class="-display">Tag Name</label>
    			<input type="text" name="tag_name">
    		</div>
    		<div>
    			<button type="submit" name="add_tag">Add Tag</button>
    		</div>
    	</form>
    </div>
</div>
<!-- EDIT TAG -->
<div id="editTag" class="modalDialog">
    <div>   <a href="#close" title="Close" class="close">X</a>
        <h2>Update Tag</h2>
        <form>
            <div>
                <label class="-display">Tag ID</label>
                <input type="text" name="tag_id" id="edit_tag_id" disabled>
            </div>
            <div>
                <label class="-display">Tag Name</label>
                <input type="text" name="tag_name" id="edit_tag_name">
            </div>
            <div>
                <button type="submit" name="update_tag" id="update_tag">Update Tag</button>
            </div>
        </form>
    </div>
</div>
</body>
<script type="text/javascript" src="../js/jquery.js"></script>
<script type="text/javascript" src="../js/datatables_latest.js"></script>
<script type="text/javascript" src="../js/tags.js"></script>

</html>