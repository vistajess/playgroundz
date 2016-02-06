<!DOCTYPE html>
<html>
<?php
include('header.php');
?>
<body>
<div>
	<h2>Category List</h2>
	<a href="#openModal">Add Category</a>
	<br>
	<table id="dataTableCategory"  cellpadding="0" cellspacing="0" border="0" class="display" width="100%">
			<thead>
				<tr>
					<th>ID</th>
					<th>Category&nbsp;Name</th>
					<th>Category&nbsp;Details</th>
					<th>Actions</th>
				</tr>
			</thead>
	</table>

<div id="openModal" class="modalDialog">
    <div>	<a href="#close" title="Close" class="close">X</a>
    	<h2>Add Category</h2>
    	<form method="post" action="modules/addCategory.php">
    		<div>
    			<label class="-display">Category Name</label>
    			<input type="text" name="category_name">
    		</div>
    		 <div>
    		 	<label class="-display">Details</label>
    			<textarea type="text" name="category_details">
    			</textarea>
    		</div>
    		<div>
    			<button type="submit" name="add_category">Add Category</button>
    		</div>
    	</form>
    </div>
</div>
</div>
</body>
<script type="text/javascript" src="../js/jquery.js"></script>
<script type="text/javascript" src="../js/datatables_latest.js"></script>
<script type="text/javascript" src="../js/category.js"></script>

</html>